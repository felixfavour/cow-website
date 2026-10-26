<template>
  <section ref="section" class="home-churches relative z-[2] bg-[#0C0F19] pb-20 pt-6 lg:pb-[114px] lg:pt-[58px]">
    <div
      v-for="(row, r) in rows"
      :key="r"
      ref="rowEls"
      class="row"
      :class="{ 'mt-6': r > 0 }"
      @pointerenter="paused[r] = true"
      @pointerleave="onRowLeave(r)"
    >
      <div ref="tracks" class="track flex gap-[18px]" role="list" :aria-label="r === 0 ? 'Churches using Cloud of Worship' : undefined">
        <div
          v-for="(church, i) in row"
          :key="i"
          class="church"
          :role="i < churches.length ? 'listitem' : undefined"
          :aria-hidden="i >= churches.length || r > 0 ? 'true' : undefined"
          :tabindex="i < churches.length && r === 0 ? 0 : -1"
          :aria-label="i < churches.length ? church.name : undefined"
          @pointerenter="show($event.currentTarget, i, r)"
          @pointerleave="hideSoon"
          @focus="show($event.currentTarget, i, r)"
          @blur="hideSoon"
        >
          <img :src="church.logo" :alt="i < churches.length ? church.name : ''" class="logo" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>

    <!-- One card that glides from church to church rather than reappearing. -->
    <div
      ref="hoverCard"
      class="hover-card"
      :class="{ shown: card.shown, instant: card.instant }"
      :style="{ transform: `translate3d(${card.x}px, ${card.y}px, 0) rotate(${card.angle}deg)`, backgroundColor: card.color }"
      aria-hidden="true"
    >
      <span class="heart"><svg viewBox="0 0 256 256"><path :d="HEART" /></svg></span>
      <p class="mt-[30px] text-[16px] leading-[1.26]">
        <strong class="font-bold">{{ card.name }}</strong> is a real church that has used Cloud of Worship in
        the last 30 days.
      </p>
    </div>
  </section>
</template>

<script setup>
// Two rows of churches that drift on their own in opposite directions, pause
// under the pointer, and also travel with the page's scrolling (the top row
// left as you scroll down, the bottom row right). Hovering a church shows a
// pastel card about it, tilted; moving to another church glides that card
// across, changing colour and angle on the way.
import rccg from "~/assets/images/rccg.webp"

const HEART =
  "M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"

// TODO: every church is RCCG for now.
const churches = Array.from({ length: 10 }, () => ({ name: "Redeemed Christian Church of God", logo: rccg }))

// Bright pastels and tilts for the hover card; each church gets its own pair.
const PASTELS = ["#E2EFFF", "#FDEFD4", "#FDE2EC", "#DFF5E4", "#ECE4FF", "#FFE6D6", "#DDF4F4"]
const ANGLES = [-4.6, 3.8, -2.4, 5.4, -6, 2.6, -3.4]

// Each row repeats the list so it can loop without a gap.
const COPIES = 3
const rows = [0, 1].map(() => Array.from({ length: churches.length * COPIES }, (_, i) => churches[i % churches.length]))

const CARD_WIDTH = 183
const GAP = 18
const PITCH = CARD_WIDTH + GAP
const LOOP = PITCH * churches.length
const AUTO_SPEED = 26 // px per second
const SCROLL_FACTOR = 0.45 // px of travel per px scrolled
const DIRECTIONS = [-1, 1] // top row left, bottom row right, as you scroll down

const section = ref(null)
const rowEls = ref([])
const tracks = ref([])
const hoverCard = ref(null)
const paused = reactive([false, false])
const card = reactive({ shown: false, instant: true, x: 0, y: 0, angle: 0, color: PASTELS[0], name: churches[0].name })

const offsets = [0, -PITCH / 2]
const speeds = [1, 1]
let lastScroll = 0
let frame = 0
let lastTime = 0
let visible = false
let reducedMotion = false

const wrap = (v) => ((((v % LOOP) + LOOP) % LOOP) - LOOP)

const tick = (now) => {
  frame = visible ? requestAnimationFrame(tick) : 0
  const dt = Math.min((now - (lastTime || now)) / 1000, 0.05)
  lastTime = now
  const scroll = window.scrollY
  const scrolled = scroll - lastScroll
  lastScroll = scroll
  tracks.value.forEach((track, r) => {
    // Ease to a stop under the pointer, and back up after.
    speeds[r] += ((paused[r] || reducedMotion ? 0 : 1) - speeds[r]) * Math.min(1, dt * 6)
    offsets[r] += DIRECTIONS[r] * (AUTO_SPEED * speeds[r] * dt + scrolled * SCROLL_FACTOR)
    offsets[r] = wrap(offsets[r])
    track.style.transform = `translate3d(${offsets[r].toFixed(2)}px, 0, 0)`
  })
}

const start = () => {
  if (!frame && visible) {
    lastTime = 0
    lastScroll = window.scrollY
    frame = requestAnimationFrame(tick)
  }
}

// ---- Hover card ----

let hideTimer = 0

const show = (el, i, r) => {
  clearTimeout(hideTimer)
  const s = section.value.getBoundingClientRect()
  const c = el.getBoundingClientRect()
  const w = hoverCard.value.offsetWidth
  const h = hoverCard.value.offsetHeight
  const index = (i % churches.length) + r * 3
  // Centred over the church, its lower edge overlapping the church's top.
  const x = Math.min(Math.max(c.left - s.left + c.width / 2 - w / 2, 12), s.width - w - 12)
  const y = c.top - s.top - h + 38
  // Appearing from nothing: jump straight to the spot; already showing: glide.
  card.instant = !card.shown
  card.x = x
  card.y = y
  card.angle = ANGLES[(index * 5) % ANGLES.length]
  card.color = PASTELS[(index * 3) % PASTELS.length]
  card.name = churches[i % churches.length].name
  if (card.instant) {
    nextTick(() => {
      // Let the jump land before switching transitions back on.
      requestAnimationFrame(() => {
        card.instant = false
        card.shown = true
      })
    })
  } else {
    card.shown = true
  }
}

const hideSoon = () => {
  clearTimeout(hideTimer)
  // A short grace period, so moving to the next church glides instead.
  hideTimer = setTimeout(() => (card.shown = false), 140)
}

const onRowLeave = (r) => {
  paused[r] = false
  hideSoon()
}

let observer = null

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  tracks.value.forEach((track, r) => (track.style.transform = `translate3d(${offsets[r]}px, 0, 0)`))
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    start()
  })
  observer.observe(section.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(hideTimer)
  observer?.disconnect()
})
</script>

<style scoped>
/* The rows fade out towards the sides of the screen. */
.row {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
}
.track {
  width: max-content;
  will-change: transform;
}
.church {
  display: grid;
  flex: none;
  place-items: center;
  width: 183px;
  height: 90px;
  border-radius: 12px;
  background: #131723;
  transition: background-color 0.25s ease;
  outline: none;
}
.church:hover,
.church:focus-visible {
  background: #1a1f2e;
}
.church:focus-visible {
  box-shadow: 0 0 0 2px #8a41c9;
}
/* Grey at rest, as in the design; in colour under the pointer. */
.logo {
  width: 60px;
  height: 60px;
  border-radius: 9999px;
  filter: grayscale(1) contrast(1.05);
  transition: filter 0.3s ease, transform 0.3s ease;
}
.church:hover .logo,
.church:focus-visible .logo {
  filter: none;
  transform: scale(1.06);
}

.hover-card {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  width: 290px;
  padding: 24px 28px 26px;
  border-radius: 20px;
  color: #1a1f2e;
  pointer-events: none;
  opacity: 0;
  transition: transform 0.45s cubic-bezier(0.3, 0.8, 0.25, 1), background-color 0.45s ease, opacity 0.2s ease;
  box-shadow: 0 24px 50px -20px rgba(0, 0, 0, 0.55);
}
.hover-card.shown {
  opacity: 1;
}
.hover-card.instant {
  transition: opacity 0.2s ease;
}
.heart {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background: #fff;
}
.heart svg {
  width: 21px;
  height: 21px;
  fill: #1a1f2e;
}
</style>
