<template>
  <div ref="root" class="home-stats">
    <p class="stat-label text-[20px] leading-6 text-[#8A41C9]" :class="{ shown: started }">The result</p>
    <div v-for="(stat, i) in stats" :key="stat.label" class="stat" :class="{ shown: shown[i] }">
      <p class="stat-number font-bold text-[#1A1F2E]" :aria-label="`${stat.value}${stat.suffix}`">
        <span aria-hidden="true">{{ display[i] }}{{ stat.suffix }}</span>
      </p>
      <p class="stat-caption text-[20px] leading-6 text-[#1A1F2E]">{{ stat.label }}</p>
      <div class="stat-divider" :class="{ strong: i === 0 }" aria-hidden="true"></div>
    </div>
  </div>
</template>

<script setup>
// "The result": three numbers that fade up and count from zero to their
// value, one after another. The page decides when they start (`start`), or
// with `auto` they start themselves when scrolled into view.

const props = defineProps({
  start: { type: Boolean, default: false },
  auto: { type: Boolean, default: false },
})

const COUNT_SECONDS = 1.8
const STAGGER = 0.18

// Churches served follows the live count, rounded down to the hundred; the
// design's 3500 stands in until it loads or if it can't.
const { churchCount } = useChurchCount()
const churches = computed(() => (churchCount.value ? Math.floor(churchCount.value / 100) * 100 : 3500))

const stats = computed(() => [
  { value: churches.value, suffix: "+", label: "Churches served" },
  { value: 99, suffix: "%", label: "Uptime during service hours" },
  { value: 7, suffix: "+", label: "Countries" },
])

const root = ref(null)
const started = ref(false)
const shown = ref(stats.value.map(() => false))
const display = ref(stats.value.map(() => 0))

const frames = []
const timers = []
let reducedMotion = false

const easeOut = (t) => 1 - Math.pow(1 - t, 4)

// Count stat i from wherever it shows now up to its value.
const count = (i) => {
  cancelAnimationFrame(frames[i])
  const from = display.value[i]
  const to = stats.value[i].value
  if (reducedMotion || from === to) {
    display.value[i] = to
    return
  }
  const begin = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - begin) / 1000 / COUNT_SECONDS)
    display.value[i] = Math.round(from + (to - from) * easeOut(t))
    if (t < 1) frames[i] = requestAnimationFrame(step)
  }
  frames[i] = requestAnimationFrame(step)
}

const play = () => {
  if (started.value) return
  started.value = true
  stats.value.forEach((_, i) => {
    timers.push(
      setTimeout(() => {
        shown.value[i] = true
        count(i)
      }, (reducedMotion ? 0 : i * STAGGER) * 1000)
    )
  })
}

watch(
  () => props.start,
  (go) => go && play()
)

// If the live count lands after the numbers have counted, carry on to it.
watch(churches, () => {
  if (shown.value[0]) count(0)
})

let observer = null

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (props.start) play()
  if (!props.auto) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      play()
      observer.disconnect()
    },
    { rootMargin: "0px 0px -15% 0px" }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  frames.forEach(cancelAnimationFrame)
  timers.forEach(clearTimeout)
})
</script>

<style scoped>
/* Sizes and gaps from the design at 1440px: 132px numbers on a 108px line in
   the heading font, 20px captions, and 194px from one stat to the next. */
.stat-number,
.stat-number span {
  font-family: var(--heading-font);
}
.stat-number {
  margin-top: 2px;
  font-size: clamp(88px, 9.2vw, 132px);
  line-height: 0.82;
  font-variant-numeric: tabular-nums;
}
.stat-caption {
  margin-top: 14px;
}
.stat-divider {
  margin-top: 20px;
  height: 1px;
  background: #e5e1e9;
}
/* The first one is a dark line that fades out towards both ends. */
.stat-divider.strong {
  background: linear-gradient(to right, rgba(12, 9, 12, 0), #0c090c 50%, rgba(12, 9, 12, 0));
}
.stat + .stat {
  margin-top: 27px;
}

/* Each stat fades up as it starts to count. */
.stat-label,
.stat {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.stat-label.shown,
.stat.shown {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .stat-label,
  .stat {
    transition: none;
  }
}
</style>
