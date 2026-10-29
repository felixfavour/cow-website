<template>
  <canvas
    ref="canvas"
    class="hero-slide-wall"
    :class="{ dragging, ready }"
    aria-hidden="true"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  />
</template>

<script setup>
// An endless, loosely scattered wall of real Cloud of Worship slides, drawn
// with plain WebGL (no library).
//
// The wall is a flat plane that repeats every PERIOD units in both directions.
// The vertex shader lays that plane over a gentle curve (the front of a large
// sphere) and views it from a little way off, so slides keep their size and
// shape across the screen and only lean back slightly towards the edges; the
// edges darken instead, which gives the depth without a fisheye. The curve's
// centre sits in the middle of the space right of the headline, and the wall
// fades to plain background just past the right edge of the `clearTo`
// element, so nothing sits behind the text.
//
// Rows of slides sit at slightly different depths and slide sideways at
// slightly different rates, so they drift over one another. Moving the cursor
// across the hero sends the wall flying the same way, as fast as the cursor
// went; dragging pans it directly and a flick carries on. The faster it
// travels, the more it bends: the plane trails behind the line through the
// pointer like cloth, each slide's trailing edge lifts and flutters, slides
// twist a little, and a swell rolls across the wall. A spring follows the
// speed, so when the wall slows the bend overshoots once and settles.

const IMAGES = [
  "oceans-song-slide",
  // The order picks where each slide lands: this one is in the middle of the
  // wall once the opening sweep settles, and the countdown sits further back.
  "countdown-slide",
  "interlude-slide",
  "santo-translation-slide",
  "bible-slide",
  "amazing-grace-song-slide",
  "song-slide-with-highlight",
  "announcements-interlude-slide",
  "rahama-song-with-translation-slide",
  "let-us-pray-interlude-slide",
].map((name) => `/hero/${name}.webp`)

// A slide is about half a plane unit wide. Right of the headline about 1.2
// units of the plane show across, even on very wide screens, so a period of
// 2.52 never shows the same tile twice at once.
const PERIOD = 2.52
const ROWS = 8
const SEED = 11 // picked so lyric slides sit in the middle of the first frame
// How much the wall curves: 1 would wrap it round a ball one unit across (a
// fisheye), 0 would leave it flat. The camera sits GAP in front of its centre.
const CURVE = 0.15
const GAP = 2
const SPHERE = 1 / CURVE // radius of the ball the wall lies on
const CAMERA = SPHERE + GAP // camera distance from the ball's centre
const HORIZON = Math.acos(SPHERE / CAMERA) * SPHERE // plane distance to the visible edge
const SCALE = 2.1 // NDC heights per plane unit at the curve's centre, on wide screens
const BG = [16 / 255, 16 / 255, 16 / 255]

// Motion, in plane units per second.
const DRIFT = 0.03 // the idle drift, leftwards
const WIND = 0.6 // share of the cursor's speed the wall picks up
const MAX_SPEED = 2.4
const PICKUP = 0.16 // seconds for the wall to catch up with a faster cursor
const GLIDE = 0.7 // seconds for it to ease back down once the cursor slows
const INTRO_SPEED = 0.9 // the wall sweeps in at this speed once the slides load

// How the wall bends with speed. `speed` runs from 0 at rest towards 1.
const SPEED_SCALE = 0.55 // plane units per second at which speed reaches 0.63
const SPRING = 70 // stiffness of the bend
const DAMPING = 2 * 0.5 * Math.sqrt(SPRING) // underdamped: one soft overshoot
const TWIST = 0.07 // radians a slide turns at full speed
const CURL = 0.18 // how far a trailing edge lifts at full speed, in plane units
const FLUTTER = 0.35 // how much that lift wavers
const ZOOM_KICK = 0.04 // the lens zooms in a touch at speed, as if rushing forward

// Rows nearer the camera slide a little faster than those behind them.
const DEPTH = 0.24
const PARALLAX = 0.24
const VIGNETTE = 0.6 // how much the slides darken towards the edges of the wall

// Depth buffer range, as distances from the camera.
const NEAR = 0.2
const FAR = 4
// A soft light from the upper left, in front, so tilted slides shade slightly.
const LIGHT = [-0.35, 0.45, 1].map((v, _, a) => v / Math.hypot(...a))

const VERTEX = `
attribute vec2 aUv;
uniform vec4 uTile;   // centre x, centre y (relative to the view), width, height
uniform vec4 uShape;  // depth towards the camera, twist, trailing-edge lift, swell phase
uniform vec3 uView;   // lens centre x, y (NDC), zoom
uniform float uAspect;
uniform vec2 uDir;    // unit direction the slides are travelling across the plane
uniform float uSpeed;
uniform vec2 uAnchor; // the pointer on the plane; the bend pivots on it
uniform float uTime;
varying vec2 vUv;
varying float vShade;
varying float vRim;
varying float vX;
const float CURVE = ${CURVE.toFixed(4)};
const float SPHERE = ${SPHERE.toFixed(4)};
const float CAMERA = ${CAMERA.toFixed(4)};
const vec3 LIGHT = vec3(${LIGHT.map((v) => v.toFixed(4)).join(", ")});

vec3 surface(vec2 uv) {
  vec2 local = (uv - 0.5) * uTile.zw;
  float c = cos(uShape.y);
  float s = sin(uShape.y);
  vec2 q = uTile.xy + vec2(c * local.x - s * local.y, s * local.x + c * local.y);

  // The line through the pointer leads and the plane either side trails
  // behind it, so straight edges bow like cloth pulled through the air.
  float side = dot(q - uAnchor, vec2(-uDir.y, uDir.x));
  q -= uDir * (0.75 * uSpeed * side * side / (1.0 + 1.5 * side * side));

  // The trailing edge lifts towards the viewer, and a swell rolls across.
  float trail = max(dot(0.5 - uv, uDir) * 2.0, 0.0);
  float lift = uShape.z * trail * trail
    + 0.1 * uSpeed * sin(dot(q, uDir) * 3.2 - uTime * 1.7 + uShape.w);

  // Lay the plane over the sphere, keeping distances along its surface.
  float r = length(q);
  vec2 dir = r > 0.0 ? q / r : vec2(0.0);
  float angle = r * CURVE;
  return vec3(sin(angle) * dir, cos(angle)) * (SPHERE + uShape.x + lift);
}

void main() {
  vec3 p = surface(aUv);
  vec3 n = normalize(cross(surface(aUv + vec2(0.02, 0.0)) - p, surface(aUv + vec2(0.0, 0.02)) - p));
  float facing = dot(n, normalize(vec3(0.0, 0.0, CAMERA) - p));
  vec3 unit = normalize(p);
  float reach = acos(clamp(unit.z, -1.0, 1.0)) / CURVE; // plane distance from the centre
  // Slides darken as they turn away (a fold that shows its back goes nearly
  // black) and towards the edges of the wall.
  vShade = mix(0.1, 1.0, smoothstep(-0.1, 0.6, facing))
    * (0.87 + 0.15 * max(dot(n, LIGHT), 0.0))
    * (1.0 - ${VIGNETTE.toFixed(2)} * smoothstep(0.45, 1.35, reach));
  // How squarely the sphere faces the camera here: 0 at the visible edge, 1 head-on.
  vRim = (unit.z * CAMERA - SPHERE) / (CAMERA - SPHERE);
  vUv = aUv;
  float w = CAMERA - p.z;
  gl_Position = vec4(
    p.x * uView.z / uAspect + uView.x * w,
    p.y * uView.z + uView.y * w,
    ${((FAR + NEAR) / (FAR - NEAR)).toFixed(5)} * w - ${((2 * FAR * NEAR) / (FAR - NEAR)).toFixed(5)},
    w
  );
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
varying float vRim;
varying float vX;
void main() {
  if (vRim < 0.0) discard;
  vec3 col = mix(vec3(0.12), texture2D(uTex, vUv).rgb, uLoaded) * vShade;
  float keep = smoothstep(0.0, 0.12, vRim) * smoothstep(uFade.x, uFade.y, vX);
  gl_FragColor = vec4(mix(uBg, col, keep), 1.0);
}`

const props = defineProps({
  // The hero text block; everything left of it (plus a margin) stays plain background.
  clearTo: { type: Object, default: null },
  // True once the next section has scrolled over the hero; drawing stops.
  covered: { type: Boolean, default: false },
  // While true the wall stays hidden and still, so the hero text can make its
  // entrance first. The slides keep loading meanwhile.
  held: { type: Boolean, default: false },
})

const canvas = ref(null)
const dragging = ref(false)
const ready = ref(false)

let gl = null
let generation = 0
let uniforms = {}
let indexCount = 0
let tiles = []
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

// The offset is never wrapped, because each row multiplies its x by its own
// parallax rate; tiles wrap individually when drawn.
const offset = { x: 0.3, y: 0.15 }
const velocity = { x: 0, y: 0 } // of the offset
const wind = { x: 0, y: 0 } // the cursor's smoothed velocity on the plane
const bend = { x: 0, y: 0 } // follows the slides' velocity on a spring
const bendRate = { x: 0, y: 0 }
const dir = { x: -1, y: 0 }
const anchor = { x: 0, y: 0 }
let speed = 0

const pointer = { clientX: 0, clientY: 0, moved: false, known: false, lastMove: 0, readAt: 0 }
const pointerPlane = { x: 0, y: 0 }
const here = { x: 0, y: 0 }

let lens = { x: 0, y: 0, zoom: 1 }
let aspect = 1
let pixelScale = 1
let slowFrames = 0
let cullRadius = HORIZON

// Wide needs landscape as well as width. A tablet held upright is 768px or
// more across, but the headline takes most of that, so with the text on the
// left the wall shrank to a sliver at the right edge. Upright, it stacks like
// a phone. Matches the `orientation: landscape` query in pages/index.vue.
const isWide = () => canvas.value.clientWidth >= 768 && canvas.value.clientWidth > canvas.value.clientHeight

// Wide layouts put the text on the left: hide the wall up to 40px past the
// text, then fade it in, reaching full strength no later than 45% across.
// The curve's centre goes a little left of the middle of the space that's
// left, so the wall bleeds off the right edge. Narrow layouts stack the text
// under the wall and the page covers it instead; the curve sits higher up and
// is sized by the width, about two slides across.
const NO_FADE = [-3, -2.5]
let fade = NO_FADE
const layout = () => {
  if (isWide() && props.clearTo) {
    const area = canvas.value.getBoundingClientRect()
    const text = props.clearTo.getBoundingClientRect()
    const hidden = ((text.right + 40 - area.left) / area.width) * 2 - 1
    fade = [hidden, Math.max(hidden + 0.35, -0.1)]
  } else {
    fade = NO_FADE
  }
  const shown = Math.max(fade[1], -1)
  lens = isWide()
    ? { x: shown + (1 - shown) * 0.42, y: 0, zoom: SCALE * GAP }
    : { x: 0, y: 0.42, zoom: 2.5 * aspect * GAP }
  // Tiles further than this from the centre are off screen, with room for the bend.
  cullRadius = 0.25 + Math.max(...[-1, 1].flatMap((x) => [-1, 1].map((y) => ndcToPlane(x, y, here))))
}

// Small seeded PRNG so the scatter is the same on every visit.
const random = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// The wall is ROWS staggered rows of slides with narrow gaps and the odd slide
// missing. Each row sits at its own depth and slides sideways at its own rate,
// so rows pass over and under one another without slides in a row colliding.
const buildTiles = () => {
  const rand = random(SEED)
  const pitch = PERIOD / ROWS
  const list = []
  for (let row = 0; row < ROWS; row++) {
    const layer = rand()
    const items = []
    let total = 0
    for (;;) {
      const w = 0.46 + rand() * 0.08
      const gap = rand() < 0.28 ? 0.25 + rand() * 0.2 : 0.02 + rand() * 0.03
      if (items.length && total + w + gap > PERIOD) break
      items.push({ w, gap })
      total += w + gap
    }
    // Share what's left of the period between the gaps so the row wraps seamlessly.
    const gaps = items.reduce((sum, item) => sum + item.gap, 0)
    const stretch = 1 + (PERIOD - total) / gaps
    let x = rand() * PERIOD
    items.forEach(({ w, gap }) => {
      const h = (w * 9) / 16 // slides keep their 16:9 shape
      list.push({
        row,
        x: x + w / 2,
        y: (row + 0.5) * pitch + (rand() - 0.5) * 0.05,
        w,
        h,
        depth: (layer - 0.5) * DEPTH + (rand() - 0.5) * 0.02,
        parallax: 1 + (layer - 0.5) * PARALLAX,
        spin: rand() * 2 - 1,
        curl: 0.55 + rand() * 0.45,
        flutterRate: 5 + rand() * 4,
        flutterPhase: rand() * Math.PI * 2,
        swellPhase: rand() * 1.2,
        half: Math.hypot(w, h) / 2, // centre to corner
      })
      x += w + gap * stretch
    })
  }
  assignImages(list, rand)
  // The depth test sorts out overlaps, so draw in texture order to bind each once.
  return list.sort((a, b) => a.image - b.image)
}

// About twenty slides show at once and there are ten images, so some repeat
// on screen; this keeps copies apart. Each slide takes the least used image
// that no nearby slide (across the wrap too) already has: two either side in
// its own row, the overlapping ones in the rows above and below, and the one
// directly above or below two rows away.
const NEARBY = [1.2, 0.8, 0.35] // how far apart in x counts as near, by rows apart
const assignImages = (list, rand) => {
  const uses = IMAGES.map(() => 0)
  const near = (a, b) => {
    const rows = Math.abs(a.row - b.row)
    return Math.abs(wrap(a.x - b.x)) < (NEARBY[Math.min(rows, ROWS - rows)] ?? 0)
  }
  const done = []
  for (const tile of list) {
    const taken = new Set(done.filter((other) => near(tile, other)).map((other) => other.image))
    let best = -1
    for (let image = 0; image < IMAGES.length; image++) {
      if (taken.has(image)) continue
      if (best < 0 || uses[image] < uses[best] || (uses[image] === uses[best] && rand() < 0.5)) best = image
    }
    // Nothing free nearby: fall back to the least used image overall.
    if (best < 0) best = uses.indexOf(Math.min(...uses))
    tile.image = best
    uses[best]++
    done.push(tile)
  }
}

const wrap = (value) => value - PERIOD * Math.floor(value / PERIOD + 0.5)

const compile = (type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

const buildGrid = (cols, rows) => {
  const uvs = []
  const indices = []
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) uvs.push(x / cols, y / rows)
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const a = y * (cols + 1) + x
      const b = a + cols + 1
      indices.push(a, b, a + 1, a + 1, b, b + 1)
    }
  }
  return { uvs: new Float32Array(uvs), indices: new Uint16Array(indices) }
}

const loadTexture = (src) => {
  const entry = { texture: gl.createTexture(), loadedAt: 0, generation }
  gl.bindTexture(gl.TEXTURE_2D, entry.texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([30, 30, 30, 255]))

  const img = new Image()
  img.decoding = "async"
  img.onload = () => {
    // The context may have been lost, restored or torn down while this loaded.
    if (!gl || entry.generation !== generation) return
    // Redraw into a power-of-two canvas so WebGL 1 can mipmap it; slide text
    // shimmers on the squashed edge tiles without mipmaps.
    const pot = document.createElement("canvas")
    pot.width = 1024
    pot.height = 512
    pot.getContext("2d").drawImage(img, 0, 0, pot.width, pot.height)
    gl.bindTexture(gl.TEXTURE_2D, entry.texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pot)
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
// is no longer held, and sweep it in so the bend is the first thing people see.
const reveal = () => {
  clearTimeout(readyTimer)
  loaded = true
  if (ready.value || props.held) return
  ready.value = true
  if (!reducedMotion) velocity.x = INTRO_SPEED
}

const init = () => {
  gl = canvas.value.getContext("webgl", { antialias: true, alpha: false, depth: true })
  if (!gl) return false
  generation++

  const program = gl.createProgram()
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false
  gl.useProgram(program)

  const grid = buildGrid(24, 16)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, grid.uvs, gl.STATIC_DRAW)
  const aUv = gl.getAttribLocation(program, "aUv")
  gl.enableVertexAttribArray(aUv)
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, grid.indices, gl.STATIC_DRAW)
  indexCount = grid.indices.length

  const names = ["uTile", "uShape", "uView", "uAspect", "uDir", "uSpeed", "uAnchor", "uTime"]
  for (const name of [...names, "uTex", "uLoaded", "uBg", "uFade"]) {
    uniforms[name] = gl.getUniformLocation(program, name)
  }
  gl.uniform1i(uniforms.uTex, 0)
  gl.uniform3fv(uniforms.uBg, BG)
  gl.clearColor(...BG, 1)
  gl.enable(gl.DEPTH_TEST)

  tiles = buildTiles()
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

// Where a point on screen (in NDC) lands on the plane, relative to the view,
// by casting a ray from the camera onto the sphere; returns its distance from
// the centre. Uses the lens without its zoom kick, so holding still while
// dragging can't feed back into the speed.
const ndcToPlane = (nx, ny, out) => {
  const a = ((nx - lens.x) * aspect) / lens.zoom
  const b = (ny - lens.y) / lens.zoom
  const k = a * a + b * b
  const disc = CAMERA * CAMERA - (k + 1) * (CAMERA * CAMERA - SPHERE * SPHERE)
  let r = HORIZON
  if (disc > 0) {
    const z = CAMERA - (CAMERA - Math.sqrt(disc)) / (k + 1)
    r = Math.acos(Math.min(z / SPHERE, 1)) * SPHERE
  }
  // Near the visible edge a pixel covers a lot of plane; stop short of it.
  r = Math.min(r, HORIZON * 0.96)
  const len = Math.sqrt(k) || 1
  out.x = (a / len) * r
  out.y = (b / len) * r
  return r
}

const toPlane = (clientX, clientY, rect, out) =>
  ndcToPlane(((clientX - rect.left) / rect.width) * 2 - 1, 1 - ((clientY - rect.top) / rect.height) * 2, out)

// Pointer events only record where the pointer is; the work happens here, once
// a frame. Speed is measured over the time since the last reading rather than
// the frame, so frames with no pointer event (a 60Hz mouse on a 120Hz screen)
// don't read as the cursor stopping.
const readPointer = (dt, now) => {
  let sx = 0
  let sy = 0
  if (pointer.moved) {
    pointer.moved = false
    toPlane(pointer.clientX, pointer.clientY, canvas.value.getBoundingClientRect(), here)
    if (pointer.known) {
      const dx = here.x - pointerPlane.x
      const dy = here.y - pointerPlane.y
      // Dragging keeps the slide under the pointer under the pointer.
      if (dragging.value) {
        offset.x -= dx
        offset.y -= dy
      }
      const interval = Math.max((now - pointer.readAt) / 1000, dt)
      sx = dx / interval
      sy = dy / interval
    }
    pointerPlane.x = anchor.x = here.x
    pointerPlane.y = anchor.y = here.y
    pointer.known = true
    pointer.readAt = now
  } else if (now - pointer.readAt < 50) {
    return // between pointer events: keep the last reading
  }
  // Dragging moves the offset against the pointer; the wind follows it.
  const k = 1 - Math.exp(-dt / 0.05)
  if (dragging.value) {
    velocity.x += (-sx - velocity.x) * k
    velocity.y += (-sy - velocity.y) * k
  } else {
    wind.x += (sx - wind.x) * k
    wind.y += (sy - wind.y) * k
  }
}

const step = (dt) => {
  if (!dragging.value) {
    // The cursor pushes the wall along with it; with no push it eases back to
    // the drift. It catches up quickly and slows down gently.
    const gain = reducedMotion ? 0 : WIND
    const tx = (reducedMotion ? 0 : DRIFT) - wind.x * gain
    const ty = -wind.y * gain
    const faster = tx * tx + ty * ty > velocity.x * velocity.x + velocity.y * velocity.y
    const k = 1 - Math.exp(-dt / (faster ? PICKUP : GLIDE))
    velocity.x += (tx - velocity.x) * k
    velocity.y += (ty - velocity.y) * k
  }
  const v = Math.hypot(velocity.x, velocity.y)
  if (v > MAX_SPEED) {
    velocity.x *= MAX_SPEED / v
    velocity.y *= MAX_SPEED / v
  }
  if (!dragging.value) {
    offset.x += velocity.x * dt
    offset.y += velocity.y * dt
  }

  // The slides travel opposite to the offset.
  const tx = reducedMotion ? 0 : -velocity.x
  const ty = reducedMotion ? 0 : -velocity.y
  bendRate.x += (SPRING * (tx - bend.x) - DAMPING * bendRate.x) * dt
  bendRate.y += (SPRING * (ty - bend.y) - DAMPING * bendRate.y) * dt
  bend.x += bendRate.x * dt
  bend.y += bendRate.y * dt
  const amount = Math.hypot(bend.x, bend.y)
  if (amount > 1e-4) {
    dir.x = bend.x / amount
    dir.y = bend.y / amount
  }
  speed = 1 - Math.exp(-amount / SPEED_SCALE)
}

const draw = () => {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.uniform3f(uniforms.uView, lens.x, lens.y, lens.zoom * (1 + ZOOM_KICK * speed))
  gl.uniform1f(uniforms.uAspect, aspect)
  gl.uniform2f(uniforms.uFade, fade[0], fade[1])
  gl.uniform2f(uniforms.uDir, dir.x, dir.y)
  gl.uniform1f(uniforms.uSpeed, speed)
  gl.uniform2f(uniforms.uAnchor, anchor.x, anchor.y)
  gl.uniform1f(uniforms.uTime, time)
  gl.activeTexture(gl.TEXTURE0)

  const now = performance.now()
  let bound = -1
  for (const tile of tiles) {
    const x = wrap(tile.x - offset.x * tile.parallax)
    const y = wrap(tile.y - offset.y)
    const limit = cullRadius + tile.half
    if (x * x + y * y > limit * limit) continue
    if (tile.image !== bound) {
      const tex = textures[tile.image]
      gl.bindTexture(gl.TEXTURE_2D, tex.texture)
      // Each slide fades in from grey as its image arrives.
      gl.uniform1f(uniforms.uLoaded, tex.loadedAt ? Math.min((now - tex.loadedAt) / 500, 1) : 0)
      bound = tile.image
    }
    const flutter = 1 + FLUTTER * Math.sin(time * tile.flutterRate + tile.flutterPhase)
    gl.uniform4f(uniforms.uTile, x, y, tile.w, tile.h)
    gl.uniform4f(
      uniforms.uShape,
      tile.depth,
      TWIST * speed * tile.spin,
      CURL * speed * tile.curl * flutter,
      tile.swellPhase
    )
    gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0)
  }
}

const tick = (now) => {
  frame = requestAnimationFrame(tick)
  const seconds = (now - (lastTime || now)) / 1000
  lastTime = now
  const dt = Math.min(seconds, 0.05)
  if (dt <= 0) return
  time += dt
  watchFrameRate(seconds)
  readPointer(dt, now)
  step(dt)
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

const onPointerDown = (e) => {
  if (e.button !== 0) return
  dragging.value = true
  // Grabbing a moving wall stops it, like catching a scrolling list.
  velocity.x = velocity.y = 0
  wind.x = wind.y = 0
  pointer.clientX = e.clientX
  pointer.clientY = e.clientY
  pointer.moved = true
  pointer.known = false
  pointer.lastMove = performance.now()
  canvas.value.setPointerCapture(e.pointerId)
}

// Listens on the whole hero, so moving over the headline counts too.
const onPointerMove = (e) => {
  // A finger only moves the wall while dragging it; otherwise it's scrolling.
  if (e.pointerType === "touch" && !dragging.value) return
  pointer.clientX = e.clientX
  pointer.clientY = e.clientY
  pointer.moved = true
  pointer.lastMove = performance.now()
}

const onPointerLeave = () => {
  if (!dragging.value) pointer.known = false
}

const onPointerUp = (e) => {
  if (!dragging.value) return
  dragging.value = false
  // A pause before letting go means no flick.
  if (performance.now() - pointer.lastMove > 80) velocity.x = velocity.y = 0
  if (canvas.value.hasPointerCapture(e.pointerId)) canvas.value.releasePointerCapture(e.pointerId)
}

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
  resize()

  el.addEventListener("webglcontextlost", onContextLost)
  el.addEventListener("webglcontextrestored", onContextRestored)
  el.parentElement.addEventListener("pointermove", onPointerMove, { passive: true })
  el.parentElement.addEventListener("pointerleave", onPointerLeave)
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
  el.parentElement?.removeEventListener("pointermove", onPointerMove)
  el.parentElement?.removeEventListener("pointerleave", onPointerLeave)
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
  cursor: grab;
  touch-action: pan-y;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.hero-slide-wall.ready {
  opacity: 1;
}
.hero-slide-wall.dragging {
  cursor: grabbing;
}
</style>
