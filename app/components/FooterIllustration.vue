<template>
  <canvas ref="canvas" class="footer-illustration" aria-hidden="true" />
</template>

<script setup>
// The footer's stage illustration, hidden until the pointer finds it. The
// footer rests as plain black; hovering reveals the image in square pixel
// blocks around the cursor, which fade back to black in a few stepped frames.

const SRC = "/footer/footer-bg.webp"
const CELL = 16 // CSS px per pixel block
const RADIUS = 140 // CSS px around the pointer that is revealed
const FADE = 1.4 // seconds for a block to go dark again
const STEPS = 4 // the fade moves in steps, like a low-bit display

const canvas = ref(null)

let ctx = null
let img = null
let base = null // the image at canvas resolution
let strength = null
let cols = 0
let rows = 0
let frame = 0
let lastTime = 0
let host = null
let resizeObserver = null

// Fit like background-size: cover, then push it down a little so the stage
// lands in the lower part of the footer, under the links, as in the design.
const coverRect = (w, h) => {
  const scale = Math.max(w / img.width, h / img.height)
  const dw = img.width * scale
  const dh = img.height * scale
  return [(w - dw) / 2, h * 0.14, dw, dh]
}

const prepare = () => {
  const el = canvas.value
  if (!img?.complete || !el) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = el.clientWidth
  const h = el.clientHeight
  if (!w || !h) return
  el.width = Math.round(w * dpr)
  el.height = Math.round(h * dpr)
  ctx = el.getContext("2d")

  base = document.createElement("canvas")
  base.width = el.width
  base.height = el.height
  const b = base.getContext("2d")
  b.setTransform(dpr, 0, 0, dpr, 0, 0)
  b.drawImage(img, ...coverRect(w, h))

  cols = Math.ceil(w / CELL)
  rows = Math.ceil(h / CELL)
  strength = new Float32Array(cols * rows)
  draw()
}

const draw = () => {
  const el = canvas.value
  const dpr = el.width / el.clientWidth
  const size = CELL * dpr
  ctx.globalAlpha = 1
  ctx.clearRect(0, 0, el.width, el.height)
  let active = false
  for (let i = 0; i < strength.length; i++) {
    const s = strength[i]
    if (s <= 0) continue
    active = true
    ctx.globalAlpha = Math.ceil(s * STEPS) / STEPS
    // Copy this block of the image straight across, in device pixels.
    const x = (i % cols) * size
    const y = Math.floor(i / cols) * size
    ctx.drawImage(base, x, y, size, size, x, y, size, size)
  }
  ctx.globalAlpha = 1
  return active
}

const tick = (time) => {
  const dt = Math.min((time - (lastTime || time)) / 1000, 0.05)
  lastTime = time
  const decay = dt / FADE
  for (let i = 0; i < strength.length; i++) {
    if (strength[i] > 0) strength[i] = Math.max(0, strength[i] - decay)
  }
  // Stop the loop once every cell has settled.
  frame = draw() ? requestAnimationFrame(tick) : 0
  if (!frame) lastTime = 0
}

const onPointerMove = (e) => {
  if (!strength || e.pointerType === "touch") return
  const rect = canvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const reach = Math.ceil(RADIUS / CELL)
  const cx = Math.floor(x / CELL)
  const cy = Math.floor(y / CELL)
  for (let r = cy - reach; r <= cy + reach; r++) {
    if (r < 0 || r >= rows) continue
    for (let c = cx - reach; c <= cx + reach; c++) {
      if (c < 0 || c >= cols) continue
      const d = Math.hypot((c + 0.5) * CELL - x, (r + 0.5) * CELL - y)
      if (d > RADIUS) continue
      const i = r * cols + c
      strength[i] = Math.max(strength[i], 1 - d / RADIUS)
    }
  }
  if (!frame) frame = requestAnimationFrame(tick)
}

onMounted(() => {
  img = new Image()
  img.onload = prepare
  img.src = SRC
  // The canvas sits behind the footer's links, so listen on the footer itself.
  host = canvas.value.parentElement
  host.addEventListener("pointermove", onPointerMove)
  resizeObserver = new ResizeObserver(prepare)
  resizeObserver.observe(canvas.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  host?.removeEventListener("pointermove", onPointerMove)
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.footer-illustration {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
