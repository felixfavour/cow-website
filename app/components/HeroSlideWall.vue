<template>
  <canvas ref="canvas" class="hero-slide-wall" :class="{ ready }" aria-hidden="true" />
</template>

<script setup>
// A ribbon of real Cloud of Worship slides running through space like film
// past a camera, drawn with plain WebGL (no library).
//
// The slides sit edge to edge on a band wound nearly twice round an upright
// helix, facing out from its axis. The spiral stands in the space right of
// the headline and runs from below the bottom of the screen to above the top,
// so its ends never show: the band comes up from the bottom of the hero,
// passes close to the camera on each turn, where the slides are big enough to
// read, and climbs out under the navbar. It arrives by twirling in from the
// bottom of the hero, its leading slide winding up round the spiral, fast at
// first and slowing as it lands. After that the film runs along the band:
// slowly on its own, and with the scroll. The
// scroll is eased rather than followed exactly, so a stepped mouse wheel
// still reads as one smooth run.
//
// The band is rebuilt on the CPU every frame (a few hundred vertices), which
// keeps the shaders trivial.

const IMAGES = [
  "oceans-song-slide",
  "countdown-slide",
  "bible-slide",
  "interlude-slide",
  "santo-translation-slide",
  "amazing-grace-song-slide",
  "announcements-interlude-slide",
  "song-slide-with-highlight",
  "let-us-pray-interlude-slide",
  "rahama-song-with-translation-slide",
].map((name) => `/hero/${name}.webp`)

// The band. A slide is one unit wide and keeps its 16:9 shape.
const SLIDE_W = 1
const SLIDE_H = (SLIDE_W * 9) / 16
const SLIDE_GAP = 0.02
const PITCH = SLIDE_W + SLIDE_GAP
const COLS = 16 // segments along each slide, so it bends smoothly with the band

// The helix: its radius, and how far it climbs along its axis per radian (one
// turn climbs a little under two slides' height, leaving room between turns
// for the back of the band to show). The band runs from FROM to TO radians
// round it, where 0 faces the camera: almost two turns, passing in front of
// the camera at 0 and at a full turn. Beyond those two passes it climbs (or
// drops) faster and faster, EXIT more per radian squared, so both ends leave
// the screen. The axis leans a touch (TILT_Z) and its top tips slightly away
// from the camera (TILT_X).
const RADIUS = 0.85
const CLIMB = 0.151
const FROM = -Math.PI + 0.3
const TO = 3 * Math.PI - 0.3
const EXIT = 0.16
const TILT_Z = 4
const TILT_X = -6
const SAMPLES = 2048

// The camera. The spiral stands far enough back that its two passes in front
// of the camera sit PASSES (NDC) above and below its middle, which sets the
// slides' size. Wide layouts stand it just right of the headline, MARGIN
// (NDC) clear of the text, centred upright; it may run off the right edge on
// narrower screens. Narrow layouts stack the text under the wall: the spiral
// is centred across, its middle at NDC y, and stands further back if need be
// so its slides are at most `widest` of the screen's width.
const FOV = 38
const PASSES = 0.55
const MARGIN = 0.04
const NARROW = { y: 0.3, widest: 0.78 }

// Motion, in band units (a slide is one).
const DRIFT = 0.12 // per second, the film's own run
const INTRO_SECONDS = 2.2 // the band twirls in from the bottom over this long...
// ...on this CSS-style cubic-bezier: it picks up speed softly below the
// screen, reaches the top of it in about three quarters of a second, and
// spends the rest in a long, gentle slowdown into the drift.
const INTRO_CURVE = [0.25, 0, 0.05, 1]
const SCROLL_RUN = 8 // run over the hero's whole scroll
const SMOOTHING = 0.22 // seconds for the eased scroll to catch up

// Shading: a soft light from the upper left, the back of the band in shadow,
// and fog towards the background with distance.
const LIGHT = [-0.35, 0.45, 1].map((v, _, a) => v / Math.hypot(...a))
const BACK = 0.16 // brightness of the band's back, which shows its slides mirrored
const FOG_FROM = 2.5 // fog starts this far behind the front, past the spiral's back...
const FOG_TO = 9 // ...and would hide the band completely this far behind it
// Band units over which each end of the band fades out. The ends are well off
// screen, so this only softens them if a screen ever shows one.
const END_FADE = 0.2
const BG = [16 / 255, 16 / 255, 16 / 255]
const NEAR = 0.3
const FAR = 30

const VERTEX = `
attribute vec3 aPos;
attribute vec2 aUv;
attribute float aShade;
attribute float aKeep;
uniform vec2 uLens; // focal length over aspect, focal length
varying vec2 vUv;
varying float vShade;
varying float vKeep;
varying float vX;
void main() {
  float w = -aPos.z;
  gl_Position = vec4(
    aPos.x * uLens.x,
    aPos.y * uLens.y,
    ${((FAR + NEAR) / (FAR - NEAR)).toFixed(5)} * w - ${((2 * FAR * NEAR) / (FAR - NEAR)).toFixed(5)},
    w
  );
  vUv = aUv;
  vShade = aShade;
  vKeep = aKeep;
  vX = gl_Position.x / w;
}`

const FRAGMENT = `
precision mediump float;
uniform sampler2D uTex;
uniform float uLoaded;
uniform vec3 uBg;
uniform vec2 uFade; // NDC x where the wall is fully hidden, then fully shown
varying vec2 vUv;
varying float vShade;
varying float vKeep;
varying float vX;
void main() {
  vec3 col = mix(vec3(0.12), texture2D(uTex, vUv).rgb, uLoaded) * vShade;
  float keep = vKeep * smoothstep(uFade.x, uFade.y, vX);
  gl_FragColor = vec4(mix(uBg, col, keep), 1.0);
}`

const props = defineProps({
  // The hero text block; everything left of it (plus a margin) stays plain background.
  clearTo: { type: Object, default: null },
  // The hero's scroll, from 0 at the top to 1 once the horizon covers it.
  progress: { type: Number, default: 0 },
  // True once the next section has scrolled over the hero; drawing stops.
  covered: { type: Boolean, default: false },
  // While true the wall stays hidden and still, so the hero text can make its
  // entrance first. The slides keep loading meanwhile.
  held: { type: Boolean, default: false },
})

const canvas = ref(null)
const ready = ref(false)

let gl = null
let generation = 0
let uniforms = {}
let attributes = {}
let buffers = {}
let textures = []
let frame = 0
let running = false
let lastTime = 0
let time = 0
let visible = true
let reducedMotion = false
let motionQuery = null
let resizeObserver = null
let intersectionObserver = null
let readyTimer = 0
let loaded = false

let introStart = -1
let scroll = 0 // the eased scroll progress
let aspect = 1
let pixelScale = 1
let slowFrames = 0
const focal = 1 / Math.tan(((FOV / 2) * Math.PI) / 180)
const front = [0, 0, -3] // the band at angle 0, in camera space

// ---- The helix ----

const rotate = ([x, y, z], axis, degrees) => {
  const a = (degrees * Math.PI) / 180
  const c = Math.cos(a)
  const s = Math.sin(a)
  if (axis === "x") return [x, y * c - z * s, y * s + z * c]
  return [x * c - y * s, x * s + y * c, z]
}
const tilt = (v) => rotate(rotate(v, "z", TILT_Z), "x", TILT_X)
const AXIS = tilt([0, 1, 0])
const OUT = tilt([0, 0, 1]) // from the axis to the front of the band
const ACROSS = tilt([1, 0, 0])

const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const normalize = (v) => {
  const l = Math.hypot(...v) || 1
  return v.map((c) => c / l)
}

// The band sampled evenly by angle, then indexed by distance along it. Each
// sample holds the centre line relative to the front (angle 0), the outward normal and
// the slides' up direction, flattened as [x, y, z, nx, ny, nz, ux, uy, uz].
const band = new Float32Array((SAMPLES + 1) * 9)
const lengths = new Float32Array(SAMPLES + 1)
let bandLength = 0
const buildBand = () => {
  let previous = null
  for (let i = 0; i <= SAMPLES; i++) {
    const phi = FROM + ((TO - FROM) * i) / SAMPLES
    const c = Math.cos(phi)
    const s = Math.sin(phi)
    // Height up the axis, and how fast it changes with the angle.
    const below = Math.min(phi, 0)
    const above = Math.max(phi - 2 * Math.PI, 0)
    const height = CLIMB * phi + EXIT * (above * above - below * below)
    const rise = CLIMB + 2 * EXIT * (above - below)
    const point = [0, 1, 2].map((k) => AXIS[k] * height + RADIUS * (c * OUT[k] + s * ACROSS[k] - OUT[k]))
    const normal = [0, 1, 2].map((k) => c * OUT[k] + s * ACROSS[k])
    const along = [0, 1, 2].map((k) => AXIS[k] * rise + RADIUS * (c * ACROSS[k] - s * OUT[k]))
    // Up is normal × along, so the slides read the right way round from outside.
    const up = normalize(cross(normal, normalize(along)))
    band.set([...point, ...normal, ...up], i * 9)
    lengths[i] = previous ? lengths[i - 1] + Math.hypot(...point.map((v, k) => v - previous[k])) : 0
    previous = point
  }
  bandLength = lengths[SAMPLES]
}
buildBand()

// The band's frame at distance `s` along it, interpolated between samples.
const sample = { i: 0, t: 0 }
const locate = (s) => {
  let lo = 0
  let hi = SAMPLES
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (lengths[mid] <= s) lo = mid
    else hi = mid
  }
  sample.i = lo
  sample.t = (s - lengths[lo]) / (lengths[hi] - lengths[lo] || 1)
}
const at = (k) => band[sample.i * 9 + k] + (band[(sample.i + 1) * 9 + k] - band[sample.i * 9 + k]) * sample.t

// ---- Layout ----

// Wide needs landscape as well as width. A tablet held upright is 768px or
// more across, but the headline takes most of that, so with the text on the
// left the wall shrank to a sliver at the right edge. Upright, it stacks like
// a phone. Matches the `orientation: landscape` query in pages/index.vue.
const isWide = () => canvas.value.clientWidth >= 768 && canvas.value.clientWidth > canvas.value.clientHeight

// Wide layouts put the text on the left. The spiral stands clear of it, but
// on screens too narrow for that the wall is hidden from 40px past the text
// leftwards, fading in over the short stretch before it. Narrow layouts stack the text under the
// wall and the page covers it instead.
const NO_FADE = [-3, -2.5]
let fade = NO_FADE
const layout = () => {
  const wide = isWide()
  // How far back the passes in front of the camera stand: CLIMB * PI above
  // and below the middle, which is focal / distance NDC per unit up.
  let near = (Math.PI * CLIMB * focal) / PASSES
  // The middle of the spiral, in camera space, on its axis.
  const middle = [0, 0, 0]
  if (wide) {
    let clear = -1
    if (props.clearTo) {
      const area = canvas.value.getBoundingClientRect()
      const text = props.clearTo.getBoundingClientRect()
      clear = ((text.right + 40 - area.left) / area.width) * 2 - 1
      fade = [clear - 0.08, clear]
    } else {
      fade = NO_FADE
    }
    middle[2] = -(near + RADIUS)
    // The spiral's left side is RADIUS left of its axis, at the axis's depth.
    middle[0] = ((clear + MARGIN) * -middle[2] * aspect) / focal + RADIUS
  } else {
    fade = NO_FADE
    // A slide is SLIDE_W * focal / (distance * aspect) NDC wide, of 2 across.
    near = Math.max(near, (SLIDE_W * focal) / (2 * NARROW.widest * aspect))
    middle[2] = -(near + RADIUS)
    middle[1] = (NARROW.y * -middle[2]) / focal
  }
  // The middle sits half a turn up the axis from the band at angle 0, and
  // RADIUS behind it.
  for (let k = 0; k < 3; k++) front[k] = middle[k] - AXIS[k] * CLIMB * Math.PI + RADIUS * OUT[k]
}

// ---- WebGL ----

const compile = (type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

// Every slide on the band at once, at most, with room for one cut in two by
// each end.
const MAX_SLIDES = Math.ceil(bandLength / PITCH) + 3
const STRIP = 2 * (COLS + 1) // vertices per slide
const FLOATS = 7 // x, y, z, u, v, shade, keep
const vertices = new Float32Array(MAX_SLIDES * STRIP * FLOATS)
const strips = [] // { image, count } per slide drawn this frame

const loadTexture = (src) => {
  const entry = { texture: gl.createTexture(), loadedAt: 0, generation }
  gl.bindTexture(gl.TEXTURE_2D, entry.texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([30, 30, 30, 255]))

  const img = new Image()
  img.decoding = "async"
  img.onload = () => {
    // The context may have been lost, restored or torn down while this loaded.
    if (!gl || entry.generation !== generation) return
    // WebGL 2 mipmaps the slide at full size. WebGL 1 can only mipmap powers
    // of two, so it gets a 1024x512 copy; slide text shimmers without mipmaps.
    let source = img
    if (typeof WebGL2RenderingContext === "undefined" || !(gl instanceof WebGL2RenderingContext)) {
      source = document.createElement("canvas")
      source.width = 1024
      source.height = 512
      source.getContext("2d").drawImage(img, 0, 0, source.width, source.height)
    }
    gl.bindTexture(gl.TEXTURE_2D, entry.texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    const aniso = gl.getExtension("EXT_texture_filter_anisotropic")
    if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, 8)
    entry.loadedAt = performance.now()
    if (textures.every((t) => t.loadedAt)) reveal()
  }
  img.src = src
  return entry
}

// Show the wall once every slide is in (or after a moment regardless) and it
// is no longer held, and sweep the film in.
const reveal = () => {
  clearTimeout(readyTimer)
  loaded = true
  if (ready.value || props.held) return
  ready.value = true
  introStart = reducedMotion ? -1 : time
}

const init = () => {
  const options = { antialias: true, alpha: false, depth: true }
  gl = canvas.value.getContext("webgl2", options) || canvas.value.getContext("webgl", options)
  if (!gl) return false
  generation++

  const program = gl.createProgram()
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false
  gl.useProgram(program)

  buffers.vertices = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertices)
  gl.bufferData(gl.ARRAY_BUFFER, vertices.byteLength, gl.DYNAMIC_DRAW)
  const stride = FLOATS * 4
  let offset = 0
  for (const [name, size] of [["aPos", 3], ["aUv", 2], ["aShade", 1], ["aKeep", 1]]) {
    attributes[name] = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(attributes[name])
    gl.vertexAttribPointer(attributes[name], size, gl.FLOAT, false, stride, offset)
    offset += size * 4
  }

  for (const name of ["uLens", "uTex", "uLoaded", "uBg", "uFade"]) {
    uniforms[name] = gl.getUniformLocation(program, name)
  }
  gl.uniform1i(uniforms.uTex, 0)
  gl.uniform3fv(uniforms.uBg, BG)
  gl.clearColor(...BG, 1)
  gl.enable(gl.DEPTH_TEST)

  textures = IMAGES.map(loadTexture)
  return true
}

const resize = () => {
  const el = canvas.value
  aspect = el.clientWidth / el.clientHeight || 1
  el.width = Math.round(el.clientWidth * pixelScale)
  el.height = Math.round(el.clientHeight * pixelScale)
  gl.viewport(0, 0, el.width, el.height)
  layout()
}

// Drop the resolution in steps on devices that can't keep up. It never goes
// back up, so it can't flip back and forth.
const watchFrameRate = (seconds) => {
  if (time < 2 || pixelScale <= 1) return
  slowFrames = seconds > 1 / 40 ? slowFrames + 1 : Math.max(slowFrames - 1, 0)
  if (slowFrames < 45) return
  pixelScale = Math.max(1, pixelScale - 0.5)
  slowFrames = 0
  resize()
}

// A CSS cubic-bezier(x1, y1, x2, y2) timing function: for a share of the time
// x, the share of the way along. Finds the curve's parameter for x by
// Newton's method, falling back to halving where the slope is too flat.
const cubicBezier = ([x1, y1, x2, y2]) => {
  const at = (a, b, u) => ((1 - 3 * b + 3 * a) * u + (3 * b - 6 * a)) * u * u + 3 * a * u
  const slope = (a, b, u) => 3 * (1 - 3 * b + 3 * a) * u * u + 2 * (3 * b - 6 * a) * u + 3 * a
  return (x) => {
    if (x <= 0 || x >= 1) return Math.min(Math.max(x, 0), 1)
    let u = x
    for (let i = 0; i < 8; i++) {
      const d = slope(x1, x2, u)
      if (Math.abs(d) < 1e-6) break
      u -= (at(x1, x2, u) - x) / d
    }
    if (Math.abs(at(x1, x2, u) - x) > 1e-5 || u < 0 || u > 1) {
      let lo = 0
      let hi = 1
      u = x
      for (let i = 0; i < 30; i++) {
        if (at(x1, x2, u) < x) lo = u
        else hi = u
        u = (lo + hi) / 2
      }
    }
    return at(y1, y2, u)
  }
}
const introEase = cubicBezier(INTRO_CURVE)

// How much of the band the entrance has still to fill: the film is held back
// by this much and the band is cut off that far short of its top end, so it
// feeds in from its bottom end with the film. The extra PITCH lets the cut
// clear the top end before the entrance lets go.
const introLag = () => {
  if (introStart < 0) return 0
  const t = Math.min((time - introStart) / INTRO_SECONDS, 1)
  return (bandLength + PITCH) * (1 - introEase(t))
}

// How far the film has run along the band: its own drift and the scroll.
const filmRun = () => (reducedMotion ? 0 : DRIFT * time) + scroll * SCROLL_RUN

// Lays every slide on the band into `vertices`, in camera space, with its
// shading worked out here rather than in the shader.
const buildStrips = () => {
  const lag = introLag()
  const run = filmRun() - lag
  const lead = bandLength + PITCH - lag // where the band is cut off
  const fogFrom = -front[2] + FOG_FROM
  const fogTo = -front[2] + FOG_TO
  strips.length = 0
  let v = 0
  // Slide k starts at k * PITCH + run along the band.
  const first = Math.floor(-run / PITCH) - 1
  const last = Math.ceil((bandLength - run) / PITCH)
  for (let k = first; k <= last; k++) {
    const start = k * PITCH + run
    const from = Math.max(start, 0)
    const to = Math.min(start + SLIDE_W, bandLength, lead)
    if (to <= from) continue
    for (let c = 0; c <= COLS; c++) {
      const s = from + ((to - from) * c) / COLS
      locate(s)
      const cx = at(0) + front[0]
      const cy = at(1) + front[1]
      const cz = at(2) + front[2]
      const nx = at(3)
      const ny = at(4)
      const nz = at(5)
      const ux = at(6)
      const uy = at(7)
      const uz = at(8)
      // Facing the camera, the slide takes the light; its back stays in shadow.
      const distance = Math.hypot(cx, cy, cz)
      const facing = -(nx * cx + ny * cy + nz * cz) / distance
      const lit = 0.88 + 0.14 * Math.max(nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2], 0)
      const shade = facing > 0 ? (0.45 + 0.55 * Math.min(facing / 0.5, 1)) * lit : BACK
      const fog = Math.min(Math.max((distance - fogFrom) / (fogTo - fogFrom), 0), 1)
      const ends = Math.min(s / END_FADE, (bandLength - s) / END_FADE, 1)
      const keep = (1 - fog * fog * (3 - 2 * fog)) * Math.max(ends, 0)
      const u = (s - start) / SLIDE_W
      // The top edge, then the bottom.
      for (let side = 1; side >= -1; side -= 2) {
        const h = (side * SLIDE_H) / 2
        vertices[v++] = cx + ux * h
        vertices[v++] = cy + uy * h
        vertices[v++] = cz + uz * h
        vertices[v++] = u
        vertices[v++] = side > 0 ? 1 : 0
        vertices[v++] = shade
        vertices[v++] = keep
      }
    }
    strips.push({ image: ((k % IMAGES.length) + IMAGES.length) % IMAGES.length, count: STRIP })
  }
  return v
}

const draw = () => {
  const used = buildStrips()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.uniform2f(uniforms.uLens, focal / aspect, focal)
  gl.uniform2f(uniforms.uFade, fade[0], fade[1])
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertices)
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices.subarray(0, used))
  gl.activeTexture(gl.TEXTURE0)
  const now = performance.now()
  strips.forEach((strip, i) => {
    const tex = textures[strip.image]
    gl.bindTexture(gl.TEXTURE_2D, tex.texture)
    // Each slide fades in from grey as its image arrives.
    gl.uniform1f(uniforms.uLoaded, tex.loadedAt ? Math.min((now - tex.loadedAt) / 500, 1) : 0)
    gl.drawArrays(gl.TRIANGLE_STRIP, i * STRIP, strip.count)
  })
}

const tick = (now) => {
  frame = requestAnimationFrame(tick)
  const seconds = (now - (lastTime || now)) / 1000
  lastTime = now
  const dt = Math.min(seconds, 0.05)
  if (dt <= 0) return
  time += dt
  watchFrameRate(seconds)
  scroll += (props.progress - scroll) * (reducedMotion ? 1 : 1 - Math.exp(-dt / SMOOTHING))
  draw()
}

// Only animate while the hero is on screen and the tab is in front.
const start = () => {
  if (running || !gl) return
  running = true
  lastTime = 0
  frame = requestAnimationFrame(tick)
}

const stop = () => {
  running = false
  cancelAnimationFrame(frame)
}

const sync = () => (visible && !props.covered && !props.held && !document.hidden ? start() : stop())

const onContextLost = (e) => {
  e.preventDefault()
  stop()
}

const onContextRestored = () => {
  if (!init()) return
  resize()
  sync()
}

const onMotionChange = (e) => (reducedMotion = e.matches)

onMounted(() => {
  const el = canvas.value
  pixelScale = Math.min(window.devicePixelRatio || 1, 2)
  if (!init()) return
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  reducedMotion = motionQuery.matches
  motionQuery.addEventListener("change", onMotionChange)
  readyTimer = setTimeout(reveal, 1500)
  // Arriving part-way down the page shows the band as far as it should be.
  scroll = props.progress
  resize()

  el.addEventListener("webglcontextlost", onContextLost)
  el.addEventListener("webglcontextrestored", onContextRestored)
  document.addEventListener("visibilitychange", sync)

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)
  // The text block's ref is filled in after the first render, so watch for it.
  watch(
    () => props.clearTo,
    (text, old) => {
      if (old) resizeObserver.unobserve(old)
      if (text) resizeObserver.observe(text)
      layout()
    },
    { immediate: true }
  )
  // The headline gets wider once its web font arrives.
  document.fonts?.ready.then(() => gl && layout())
  watch(() => props.covered, sync)
  watch(
    () => props.held,
    () => {
      if (loaded) reveal()
      sync()
    }
  )
  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  intersectionObserver.observe(el)
  sync()
})

onBeforeUnmount(() => {
  const el = canvas.value
  stop()
  clearTimeout(readyTimer)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  motionQuery?.removeEventListener("change", onMotionChange)
  document.removeEventListener("visibilitychange", sync)
  el.removeEventListener("webglcontextlost", onContextLost)
  el.removeEventListener("webglcontextrestored", onContextRestored)
  gl?.getExtension("WEBGL_lose_context")?.loseContext()
  gl = null
})
</script>

<style scoped>
.hero-slide-wall {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.15s ease; /* short, so the fast twirl-in shows at full strength */
}
.hero-slide-wall.ready {
  opacity: 1;
}
</style>
