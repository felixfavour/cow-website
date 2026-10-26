<template>
  <component
    :is="as"
    ref="root"
    class="reveal-text"
    :class="{ revealed, scrub }"
    :aria-label="label"
  >
    <span
      v-for="(line, l) in parts"
      :key="l"
      class="reveal-line"
      aria-hidden="true"
    >
      <span class="reveal-line-inner">
        <template v-for="(word, w) in line" :key="w">
          <span class="reveal-word">
            <span
              v-for="(unit, u) in word.units"
              :key="u"
              class="reveal-unit"
              :style="{ '--reveal-delay': `${unit.delay}s` }"
            >{{ unit.text }}</span>
          </span>
          {{ w < line.length - 1 ? " " : "" }}
        </template>
      </span>
    </span>
  </component>
</template>

<script setup>
// Text that writes itself in, as in the design reference: a soft edge sweeps
// left to right through each line, and letters (or words) at the edge pass
// through brand purple before settling into the text's own colour.
//
// By default it plays once, over about a second, when it scrolls into view.
// With `scrub` it follows the scroll position instead: letters ahead of the
// edge wait faint and blurred, and scrolling back up runs it in reverse. The
// edge eases towards the scroll position rather than jumping with it, so a
// stepped mouse wheel still reads as one smooth sweep.
//
// Each line also sits in its own clipping slot (.reveal-line), so a page can
// slide `.reveal-line-inner` up out of view, line by line, for an exit.

const props = defineProps({
  // One string per line; lines always break where given. Pass a single
  // string to let the text wrap naturally.
  lines: { type: Array, required: true },
  as: { type: String, default: "h2" },
  // "chars" for headings, "words" for paragraphs.
  by: { type: String, default: "chars" },
  // Seconds between one letter (or word) and the next.
  stagger: { type: Number, default: null },
  // Seconds before the first letter, counted from when the text comes into view.
  delay: { type: Number, default: 0 },
  // Play straight away on mount rather than waiting to be scrolled to.
  immediate: { type: Boolean, default: false },
  // Follow the scroll position rather than playing once.
  scrub: { type: Boolean, default: false },
  // With `scrub`: where the text's top edge is, as a share of the screen's
  // height, when the reveal starts and when it finishes.
  range: { type: Array, default: () => [0.85, 0.3] },
  // With `scrub`: drive the reveal from outside (0 to 1) instead of from where
  // the text sits on screen, for text in a pinned section that doesn't move.
  progress: { type: Number, default: null },
})

// How letters waiting for the edge look in scrub mode, from the design.
const WAITING_OPACITY = 0.2
const WAITING_BLUR = 5
// How many letters (or words) the soft edge spans.
const EDGE_CHARS = 16
const EDGE_WORDS = 4
const TINT = [138, 65, 201]
// Seconds for the edge to catch up with the scroll position.
const SMOOTHING = 0.18

const root = ref(null)
const revealed = ref(false)
const label = computed(() => props.lines.join(" "))

const parts = computed(() => {
  const step = props.stagger ?? (props.by === "words" ? 0.04 : 0.022)
  let index = 0
  return props.lines.map((line, l) => {
    // Each new line starts a little before the previous one finishes.
    index = Math.max(0, index - (l ? 4 : 0))
    return line.split(" ").map((word) => ({
      units: (props.by === "words" ? [word] : [...word]).map((text) => ({
        text,
        delay: props.delay + step * index++,
      })),
    }))
  })
})

const element = () => root.value?.$el ?? root.value

// ---- Scrub mode ----

let units = []
let last = []
let finalColour = [26, 31, 46]
let frame = 0
let lastTime = 0
let target = 0
let current = 0
let reducedMotion = false

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))

const measure = () => {
  if (props.progress !== null) {
    target = reducedMotion ? 1 : Math.min(1, Math.max(0, props.progress))
    return
  }
  const el = element()
  if (!el) return
  const vh = window.innerHeight
  const [from, to] = props.range
  const top = el.getBoundingClientRect().top
  target = reducedMotion ? 1 : Math.min(1, Math.max(0, (from * vh - top) / ((from - to) * vh)))
}

// The waiting letters are drawn as their own blurred shadow, with the letter
// itself transparent. That looks the same as blurring the letter, but a blur
// filter (or an opacity) on each of hundreds of letters gives the browser
// hundreds of separate layers to blur and blend on every frame, which made
// scrolling past a long paragraph stutter.
const paint = (p) => {
  const edge = props.by === "words" ? EDGE_WORDS : EDGE_CHARS
  const front = p * (units.length + edge)
  units.forEach((unit, i) => {
    const t = Math.min(1, Math.max(0, (front - i) / edge))
    // Only touch letters whose state moved, which is the few near the edge.
    if (t === last[i]) return
    last[i] = t
    const style = unit.style
    if (t >= 1) {
      style.color = ""
      style.textShadow = ""
      return
    }
    // Purple peaks halfway through, then hands back to the text's colour.
    const tint = 1 - Math.abs(2 * t - 1)
    const alpha = (WAITING_OPACITY + (1 - WAITING_OPACITY) * t).toFixed(3)
    const colour = `rgba(${mix(finalColour, TINT, tint).join(",")},${alpha})`
    const blur = (1 - t) * WAITING_BLUR
    if (blur < 0.1) {
      style.color = colour
      style.textShadow = ""
      return
    }
    style.color = "transparent"
    // A shadow's blur radius is twice the spread of a blur filter's.
    style.textShadow = `0 0 ${(2 * blur).toFixed(2)}px ${colour}`
  })
}

const tick = (now) => {
  const dt = Math.min((now - (lastTime || now)) / 1000, 0.05)
  lastTime = now
  current += (target - current) * (1 - Math.exp(-dt / SMOOTHING))
  if (Math.abs(target - current) < 0.0005) current = target
  paint(current)
  frame = current === target ? 0 : requestAnimationFrame(tick)
  if (!frame) lastTime = 0
}

const onScroll = () => {
  measure()
  if (!frame) frame = requestAnimationFrame(tick)
}

let observer = null

onMounted(() => {
  const el = element()
  if (props.scrub) {
    units = [...el.querySelectorAll(".reveal-unit")]
    last = units.map(() => -1)
    const match = getComputedStyle(el).color.match(/\d+/g)
    if (match) finalColour = match.slice(0, 3).map(Number)
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Arriving part-way down the page shows the text as far as it should be.
    measure()
    current = target
    paint(current)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    watch(() => props.progress, onScroll)
    return
  }
  if (props.immediate || !("IntersectionObserver" in window)) {
    revealed.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      revealed.value = true
      observer.disconnect()
    },
    { rootMargin: "0px 0px -12% 0px" }
  )
  observer.observe(el)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
})
</script>

<style>
.reveal-line {
  display: block;
  overflow: hidden;
  /* Room for descenders inside the clipping slot. */
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
}
/* Scrubbed text blurs, so it must not be clipped at its edges. */
.reveal-text.scrub .reveal-line {
  overflow: visible;
}
.reveal-line-inner {
  display: block;
  will-change: transform;
}
.reveal-word {
  display: inline-block;
  white-space: nowrap;
}
.reveal-unit {
  display: inline-block;
  opacity: 0;
}
.reveal-text.scrub .reveal-unit {
  opacity: 1;
}
.reveal-text.revealed .reveal-unit {
  animation: reveal-unit 0.75s cubic-bezier(0.3, 0.7, 0.3, 1) var(--reveal-delay) both;
}
/* The last keyframe leaves colour out, so it eases back to the text's own. */
@keyframes reveal-unit {
  0% {
    opacity: 0;
    color: #c084fc;
    filter: blur(4px);
  }
  45% {
    opacity: 1;
    color: #8a41c9;
    filter: blur(0);
  }
  100% {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .reveal-unit {
    opacity: 1;
  }
  .reveal-text.revealed .reveal-unit {
    animation: none;
  }
}
</style>
