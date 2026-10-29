<template>
  <!-- What a teammate just did (or a note from us), stacked in the
       bottom-right corner. -->
  <Teleport to="body">
    <div class="activity-toasts" role="status" aria-live="polite">
      <!-- The lens the glass bends the page through, on Chromium (the only
           engine that takes an SVG filter as a backdrop filter). -->
      <svg v-if="lensList.length" class="glass-defs" width="0" height="0" aria-hidden="true">
        <filter
          v-for="lens in lensList"
          :id="lens.id"
          :key="lens.id"
          x="0"
          y="0"
          width="100%"
          height="100%"
          color-interpolation-filters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="frosted" />
          <feImage
            :href="lens.href"
            x="0"
            y="0"
            :width="lens.width"
            :height="lens.height"
            preserveAspectRatio="none"
            result="lens"
          />
          <!-- Each colour bends a little differently, as real glass does. -->
          <feDisplacementMap in="frosted" in2="lens" :scale="LENS_SHIFT * 2 + 3" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          <feDisplacementMap in="frosted" in2="lens" :scale="LENS_SHIFT * 2" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          <feDisplacementMap in="frosted" in2="lens" :scale="LENS_SHIFT * 2 - 3" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          <feBlend in="red" in2="green" mode="screen" result="red-green" />
          <feBlend in="red-green" in2="blue" mode="screen" />
          <feColorMatrix type="saturate" values="1.7" />
        </filter>
      </svg>

      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :ref="(el) => measure(toast, el)"
          class="toast"
          :class="{ tall: toast.message }"
          :style="glassStyle(toast)"
        >
          <!-- The purple smoke of the features panel, glowing up through the glass. -->
          <span class="smoke" aria-hidden="true"></span>
          <img v-if="toast.image" :src="toast.image" alt="" class="toast-avatar" />
          <span v-else class="toast-avatar" :style="{ background: toast.color, color: toast.textColor }">
            {{ toast.initials }}
          </span>
          <div class="min-w-0">
            <p class="toast-line">
              <strong>{{ toast.name }}</strong> {{ toast.action }}
            </p>
            <p v-if="toast.message" class="toast-message">{{ toast.message }}</p>
            <p class="toast-meta">{{ toast.meta || "Sunday Service · just now" }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
// A toast per operator action, blurring into focus as it arrives, with a soft
// two-note chime. The chime is synthesised, so there is no file to load, and
// its audio context only starts on the click that asks for it.

// How long each toast stays (a message gets longer, to be read), and how
// many can be up at once.
const LIFETIME = 4000
const MESSAGE_LIFETIME = 9000
const MAX_TOASTS = 3
// The toast's size, as set in CSS, and how its glass edge bends the page:
// the width of the bevel, and how far (px) the page shifts at the very rim.
const TOAST = { width: 340, height: 68, radius: 24 }
const BEVEL = 16
const LENS_SHIFT = 9

const toasts = ref([])
let nextId = 0

// The lens as a displacement map: flat in the middle, and across the bevel
// a pull towards the centre that grows sharply at the rim, so the page
// behind bends round the edge the way it does through a thick pane. Red
// carries the sideways pull and green the vertical, 128 being none.
// A message toast is taller, so there is one lens per height.
const uid = useId()
const glass = ref(false)
const lenses = ref({})
const lensList = computed(() => Object.values(lenses.value))

const buildLens = (height) => {
  const width = Math.round(Math.min(TOAST.width, window.innerWidth - 32))
  const { radius } = TOAST
  if (lenses.value[height]?.width === width) return
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  const image = ctx.createImageData(width, height)
  // Signed distance to the rounded rectangle's edge: negative inside.
  const edge = (x, y) => {
    const qx = Math.abs(x - width / 2) - (width / 2 - radius)
    const qy = Math.abs(y - height / 2) - (height / 2 - radius)
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - radius
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5
      const py = y + 0.5
      const depth = -edge(px, py)
      let dx = 0
      let dy = 0
      if (depth < BEVEL) {
        // The outward normal, then a pull against it.
        const nx = edge(px + 0.5, py) - edge(px - 0.5, py)
        const ny = edge(px, py + 0.5) - edge(px, py - 0.5)
        const n = Math.hypot(nx, ny) || 1
        const pull = Math.pow(1 - Math.max(depth, 0) / BEVEL, 2.4)
        dx = (-nx / n) * pull
        dy = (-ny / n) * pull
      }
      const i = (y * width + x) * 4
      image.data[i] = 128 + dx * 127
      image.data[i + 1] = 128 + dy * 127
      image.data[i + 2] = 128
      image.data[i + 3] = 255
    }
  }
  ctx.putImageData(image, 0, 0)
  lenses.value = {
    ...lenses.value,
    [height]: { id: `${uid}-glass-${height}`, href: canvas.toDataURL(), width, height },
  }
}

const rebuildLenses = () => {
  for (const height of Object.keys(lenses.value)) buildLens(Number(height))
}

// A message toast's height depends on how its text wraps, so it is read
// once the toast is on the page.
const measure = (toast, el) => {
  if (!el || toast.height) return
  toast.height = toast.message ? el.offsetHeight : TOAST.height
  if (glass.value) buildLens(toast.height)
}

const glassStyle = (toast) => {
  const lens = glass.value && lenses.value[toast.height]
  return lens ? { backdropFilter: `url(#${lens.id})` } : null
}

onMounted(() => {
  if (!navigator.userAgentData?.brands?.some((b) => b.brand === "Chromium")) return
  glass.value = true
  buildLens(TOAST.height)
  window.addEventListener("resize", rebuildLenses)
})

const dismiss = (id) => {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

let audio = null

// A glassy two-note chime: each note is a sine with a quieter, slightly
// inharmonic overtone (which is what makes it ring like a bell rather than
// beep), struck softly and left to decay, then sent through a short
// filtered echo for a little room around it.
const chime = () => {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return
  audio ||= new AudioCtx()
  if (audio.state === "suspended") audio.resume()

  const now = audio.currentTime
  const master = audio.createGain()
  master.gain.value = 0.16
  master.connect(audio.destination)

  const echo = audio.createDelay()
  echo.delayTime.value = 0.14
  const feedback = audio.createGain()
  feedback.gain.value = 0.22
  const tone = audio.createBiquadFilter()
  tone.type = "lowpass"
  tone.frequency.value = 4200
  const wet = audio.createGain()
  wet.gain.value = 0.28
  echo.connect(tone).connect(feedback).connect(echo)
  tone.connect(wet).connect(master)

  const strike = (frequency, at, level) => {
    for (const [ratio, gain, decay] of [
      [1, level, 1.1],
      [2.76, level * 0.18, 0.35],
    ]) {
      const osc = audio.createOscillator()
      osc.type = "sine"
      osc.frequency.value = frequency * ratio
      const env = audio.createGain()
      env.gain.setValueAtTime(0, at)
      env.gain.linearRampToValueAtTime(gain, at + 0.006)
      env.gain.exponentialRampToValueAtTime(0.0001, at + decay)
      osc.connect(env)
      env.connect(master)
      env.connect(echo)
      osc.start(at)
      osc.stop(at + decay + 0.05)
    }
  }

  // E6 then B6, a fifth apart, the second a touch quieter.
  strike(1318.5, now, 0.5)
  strike(1975.5, now + 0.085, 0.38)

  setTimeout(() => master.disconnect(), 2000)
}

// A teammate's action takes initials and colours; a message from us takes
// an image, the message itself and its own meta line.
const push = ({ name, initials, color, textColor, action, image, message, meta }) => {
  const id = ++nextId
  toasts.value = [
    ...toasts.value,
    { id, name, initials, color, textColor, action, image, message, meta, height: 0 },
  ].slice(-MAX_TOASTS)
  chime()
  setTimeout(() => dismiss(id), message ? MESSAGE_LIFETIME : LIFETIME)
}

defineExpose({ push })

onBeforeUnmount(() => {
  audio?.close()
  window.removeEventListener("resize", rebuildLenses)
})
</script>

<style scoped>
.activity-toasts {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  pointer-events: none;
}
@media (max-width: 639px) {
  .activity-toasts {
    right: 16px;
    left: 16px;
    bottom: 16px;
  }
}

/* Liquid glass, after Apple's: a clear, colour-boosted pane that bends the
   page round its edges (Chromium; elsewhere it frosts it), lit from the top
   left so a bright specular rim and a curved sheen sit on it, with a soft
   thickness inside the edge. The purple smoke of the features panel glows
   up through it from the bottom corners, paling to lilac and then clear,
   just as it does behind the app window.

   Legibility: the pale tint, the lilac above the purple and the sheen keep
   both lines above 4.5:1 against any backdrop, black included. The purple
   itself stays below the text. */
.toast {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 340px;
  max-width: 100%;
  height: 68px;
  padding: 0 18px 0 14px;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(250, 247, 255, 0.6);
  -webkit-backdrop-filter: blur(16px) saturate(1.8) brightness(1.04);
  backdrop-filter: blur(16px) saturate(1.8) brightness(1.04);
  box-shadow:
    0 0 0 0.5px rgba(76, 29, 149, 0.1),
    0 2px 6px -2px rgba(26, 31, 46, 0.12),
    0 16px 36px -12px rgba(76, 29, 149, 0.38);
  color: #1a1f2e;
  -webkit-font-smoothing: antialiased;
  pointer-events: auto;
}
/* A message wraps, so the pane grows to fit it. */
.toast.tall {
  align-items: flex-start;
  height: auto;
  padding: 14px 18px 16px 14px;
}
.glass-defs {
  position: absolute;
  width: 0;
  height: 0;
}

/* Purple pooling in the bottom corners, each drifting its own way, over a
   band that runs purple at the rim to lilac and then clear. */
.smoke,
.smoke::before,
.smoke::after {
  position: absolute;
  pointer-events: none;
}
.smoke {
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    to top,
    rgba(138, 65, 201, 0.55) 0,
    rgba(246, 232, 255, 0.8) 18px,
    rgba(246, 232, 255, 0) 44px
  );
}
.smoke::before,
.smoke::after {
  content: "";
  inset: 0 -12px;
  animation: smoke-drift 7s ease-in-out infinite alternate;
}
.smoke::before {
  background: radial-gradient(96px 44px at 12px 100%, rgba(138, 65, 201, 0.85), rgba(138, 65, 201, 0));
}
.smoke::after {
  background: radial-gradient(130px 46px at calc(100% - 12px) 100%, rgba(138, 65, 201, 0.8), rgba(138, 65, 201, 0));
  animation-duration: 9s;
  animation-direction: alternate-reverse;
}
@keyframes smoke-drift {
  from {
    transform: translateX(-12px);
  }
  to {
    transform: translateX(12px);
  }
}

/* The pane's thickness: a curved sheen from the light at the top left,
   bright hairlines where the top and bottom edges catch it, a soft glow
   just inside the edge, and the purple deepening at the bottom. */
.toast::before,
.toast::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}
.toast::after {
  z-index: 1;
  background: radial-gradient(130% 100% at 18% -40%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 60%);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 -1px 1px rgba(255, 255, 255, 0.5),
    inset 0 0 16px rgba(255, 255, 255, 0.3),
    inset 0 -10px 18px -12px rgba(76, 29, 149, 0.45);
}
/* The specular rim: brightest at the top-left and bottom-right corners,
   tinged lilac along the bottom by the smoke. */
.toast::before {
  z-index: 3;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.35) 22%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(214, 180, 255, 0.45) 78%,
    rgba(255, 255, 255, 0.85) 100%
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.toast > :not(.smoke) {
  position: relative;
  z-index: 2;
}

.toast-avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.75),
    0 4px 10px -4px rgba(76, 29, 149, 0.45);
}

img.toast-avatar {
  object-fit: cover;
}

.toast-line {
  font-size: 14px;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.toast-line strong {
  font-weight: 600;
}
.toast-message {
  margin-top: 3px;
  font-size: 13px;
  line-height: 1.4;
  color: #1a1f2e;
}
.toast-meta {
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.25;
  color: #30333f;
}

/* Without transparency, a solid pane in the same colours. */
@media (prefers-reduced-transparency: reduce) {
  .toast {
    background: #f7f2fd;
    /* Over the lens, which is set on the element itself. */
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
}

/* Arrives out of a blur, rising a little; leaves the same way, drifting right. */
.toast-enter-active {
  transition:
    opacity 0.5s ease,
    filter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.toast-leave-active {
  transition:
    opacity 0.35s ease,
    filter 0.35s ease,
    transform 0.35s ease;
}
.toast-enter-from {
  opacity: 0;
  filter: blur(14px);
  transform: translateY(14px) scale(0.96);
}
.toast-leave-to {
  opacity: 0;
  filter: blur(8px);
  transform: translateX(16px) scale(0.98);
}
.toast-move {
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-from,
  .toast-leave-to {
    filter: none;
    transform: none;
  }
  .smoke::before,
  .smoke::after {
    animation: none;
  }
}
</style>
