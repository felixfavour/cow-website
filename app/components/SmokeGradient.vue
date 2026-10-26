<template>
  <canvas ref="canvas" class="smoke-gradient" aria-hidden="true" />
</template>

<script setup>
// The soft purple glow behind the features window, drawn as slow-moving smoke
// with plain WebGL. The panel is white with a large purple glow rising from
// the bottom corners. Domain-warped noise pushes its edge around and thins it
// in places, so it billows instead of sitting still.
//
// The glow is laid out in the design's own units (a 1362px-wide panel),
// scaled to the real width, and measured from the bottom of the panel so it
// stays put at any height.

const DESIGN_WIDTH = 1362
const RESOLUTION = 0.5 // the smoke is soft, so half-resolution is plenty
const FPS = 30
const SPEED = 1.8 // how fast the smoke drifts and swirls
// Seconds to ease towards a faster pace, and back down to a slower one.
const SPEED_UP = 0.15
const SLOW_DOWN = 0.5

const props = defineProps({
  // How many times its normal speed the smoke moves. It eases to a new pace
  // rather than jumping.
  speed: { type: Number, default: 1 },
})

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAGMENT = `
precision highp float;
uniform vec2 uSize;   // canvas size in design units
uniform float uTime;
varying vec2 vUv;

const vec3 WHITE = vec3(1.0);
const vec3 LILAC = vec3(246.0, 232.0, 255.0) / 255.0;
const vec3 PURPLE = vec3(138.0, 65.0, 201.0) / 255.0;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  // Design units, measured down from the top of the panel.
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  float t = uTime;

  // Warp the coordinates twice over with drifting noise: the smoke's swirl.
  vec2 q = p / 320.0;
  vec2 warp = vec2(
    fbm(q + vec2(0.0, t * 0.035)),
    fbm(q + vec2(5.2, 1.3) - vec2(t * 0.03, 0.0))
  );
  vec2 warp2 = vec2(
    fbm(q * 1.7 + warp * 2.0 + vec2(1.7, 9.2) + t * 0.02),
    fbm(q * 1.7 + warp * 2.0 + vec2(8.3, 2.8) - t * 0.025)
  );
  vec2 w = p + (warp2 - 0.5) * 140.0;
  // Thicker and thinner patches inside the smoke.
  float density = fbm(q * 2.2 + warp2 * 1.6 - vec2(t * 0.04, t * 0.02));

  // White everywhere until the glow.
  vec3 col = WHITE;

  // The big glow: an ellipse sitting below the panel, purple along its upper
  // edge and paling to white further down, with a 50-unit soft edge.
  float bottom = uSize.y;
  vec2 glow = (w - vec2(uSize.x * 0.5, bottom + 53.0)) / vec2(737.0, 295.0);
  float inside = 1.0 - smoothstep(0.8, 1.2, length(glow));
  float g = clamp((w.y - (bottom - 242.0)) / 621.0, 0.0, 1.0);
  vec3 glowCol = g < 0.44
    ? mix(PURPLE, LILAC, g / 0.44)
    : mix(LILAC, WHITE, clamp((g - 0.44) / 0.11, 0.0, 1.0));
  col = mix(col, glowCol, clamp(inside * (0.7 + 0.6 * density), 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}`

const canvas = ref(null)

let gl = null
let uniforms = {}
let frame = 0
let lastDraw = 0
let lastTime = 0
// A little way in, so the smoke has already billowed; also the still frame
// when motion is reduced.
let time = 40
let pace = 1
let visible = false
let reducedMotion = false
let resizeObserver = null
let intersectionObserver = null

const compile = (type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

const init = () => {
  gl = canvas.value.getContext("webgl", { antialias: false, alpha: false, depth: false })
  if (!gl) return false
  const program = gl.createProgram()
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false
  gl.useProgram(program)

  // One triangle that covers the whole canvas.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, "aPos")
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  uniforms.size = gl.getUniformLocation(program, "uSize")
  uniforms.time = gl.getUniformLocation(program, "uTime")
  return true
}

const resize = () => {
  const el = canvas.value
  if (!gl || !el.clientWidth) return
  el.width = Math.max(1, Math.round(el.clientWidth * RESOLUTION))
  el.height = Math.max(1, Math.round(el.clientHeight * RESOLUTION))
  gl.viewport(0, 0, el.width, el.height)
  // Narrow screens still get a readable glow rather than a sliver of one.
  const scale = Math.max(el.clientWidth / DESIGN_WIDTH, 0.45)
  gl.uniform2f(uniforms.size, el.clientWidth / scale, el.clientHeight / scale)
  draw(performance.now())
}

const draw = (now) => {
  if (!reducedMotion && lastTime) {
    const dt = Math.min((now - lastTime) / 1000, 0.1)
    pace += (props.speed - pace) * (1 - Math.exp(-dt / (props.speed > pace ? SPEED_UP : SLOW_DOWN)))
    time += dt * SPEED * pace
  }
  lastTime = now
  gl.uniform1f(uniforms.time, time)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

const tick = (now) => {
  frame = requestAnimationFrame(tick)
  if (now - lastDraw < 1000 / FPS) return
  lastDraw = now
  draw(now)
}

const sync = () => {
  cancelAnimationFrame(frame)
  frame = 0
  // Pick up where it left off rather than jumping on by the time it was away.
  lastTime = 0
  if (gl && visible && !reducedMotion && !document.hidden) frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!init()) return
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas.value)
  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  intersectionObserver.observe(canvas.value)
  document.addEventListener("visibilitychange", sync)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  document.removeEventListener("visibilitychange", sync)
  gl?.getExtension("WEBGL_lose_context")?.loseContext()
  gl = null
})
</script>

<style scoped>
.smoke-gradient {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
