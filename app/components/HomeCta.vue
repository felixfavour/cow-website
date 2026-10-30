<template>
  <!--
    The whole section is one link to sign-up. It fills the screen below the
    navbar and stays pinned there: the church rows slide up off it, then the
    footer slides up over it. Its headline drifts left as you scroll, and the
    space after it is how long it holds the screen before the footer comes.
  -->
  <a
    ref="section"
    :href="signupUrl"
    class="home-cta sticky bottom-0 top-[60px] z-0 block overflow-hidden text-[#0C0F19] md:top-[76px]"
    aria-label="Sunday’s coming. Are you ready? Get started with Cloud of Worship for free"
    @pointerenter="onPointerEnter"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- Its own layer rather than the link's background, so the disc's blend
         can see it. -->
    <span class="backdrop" aria-hidden="true"></span>

    <p ref="headline" class="headline font-bold" aria-hidden="true">Sunday’s coming. Are you ready?</p>

    <RevealText
      as="p"
      :lines="['Prepare once,', 'use everywhere.']"
      scrub
      :progress="smallPrintProgress"
      class="small-print text-[17px] leading-[1.2] md:text-[20px]"
    />

    <!--
      The cursor. The disc is the section's own purple with a difference blend,
      so over the purple background it comes out black and over the black
      letters it turns them purple. The label is a separate layer on top, so
      it stays white.
    -->
    <span ref="disc" class="cta-disc" :class="{ near }" aria-hidden="true"><span></span></span>
    <span ref="label" class="cta-label" aria-hidden="true">Get Started</span>
  </a>
  <!-- The footer is pulled up over this (see .footer-over in app.vue). -->
  <div :style="{ height: `calc(100svh + ${hold}px)` }" aria-hidden="true"></div>
</template>

<script setup>
// "Sunday’s coming. Are you ready?": the last stop before the footer. Clicking
// anywhere in it goes to sign-up. Over it, the pointer becomes the black "Get Started" disc,
// which inverts the giant headline where it passes over the letters; when the
// pointer leaves, the disc drifts back to its place in the design.

const { mergeUtmsIntoUrl } = useUtm()
const signupUrl = mergeUtmsIntoUrl(
  "https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=home_cta"
)

// Where the disc rests, as a share of the section (from the design).
const REST = { x: 0.723, y: 0.67 }
// The headline is far wider than the screen. It waits at the left margin while
// the church rows uncover it, then drifts left at this many px per px scrolled
// until its last letter reaches the right margin. The section holds the screen
// long enough for that to finish this share of the screen before the footer
// reaches the headline.
const DRIFT_RATE = 2
const DRIFT_CLEAR = 0.06
// Seconds for the disc to catch up with the pointer.
const FOLLOW = 0.12

const section = ref(null)
const headline = ref(null)
const disc = ref(null)
const label = ref(null)
const near = ref(false)
// Extra scrolling, in px, the section holds the screen for once it's uncovered.
const hold = ref(0)
// The small print writes itself in as the church rows slide off the section.
const smallPrintProgress = ref(0)

const clamp01 = (v) => Math.min(1, Math.max(0, v))

const pos = { x: 0, y: 0 }
const aim = { x: 0, y: 0 }
let pointerInside = false
let frame = 0
let lastTime = 0
let reducedMotion = false

const rest = () => {
  const el = section.value
  return { x: el.offsetWidth * REST.x, y: el.offsetHeight * REST.y }
}

const placeCursor = () => {
  const move = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) translate(-50%, -50%)`
  disc.value.style.transform = move
  label.value.style.transform = move
  // Close to the headline, the disc grows a little.
  const r = headline.value.getBoundingClientRect()
  const s = section.value.getBoundingClientRect()
  const x = pos.x + s.left
  const y = pos.y + s.top
  near.value = pointerInside && x > r.left - 60 && x < r.right + 60 && y > r.top - 60 && y < r.bottom + 60
}

const tick = (now) => {
  const dt = Math.min((now - (lastTime || now)) / 1000, 0.05)
  lastTime = now
  const k = reducedMotion ? 1 : 1 - Math.exp(-dt / FOLLOW)
  pos.x += (aim.x - pos.x) * k
  pos.y += (aim.y - pos.y) * k
  const settled = Math.abs(aim.x - pos.x) < 0.3 && Math.abs(aim.y - pos.y) < 0.3
  if (settled) {
    pos.x = aim.x
    pos.y = aim.y
  }
  placeCursor()
  frame = settled ? 0 : requestAnimationFrame(tick)
  if (!frame) lastTime = 0
}

const follow = () => {
  if (!frame) frame = requestAnimationFrame(tick)
}

const setAim = (e) => {
  const s = section.value.getBoundingClientRect()
  aim.x = e.clientX - s.left
  aim.y = e.clientY - s.top
}

const onPointerEnter = (e) => {
  if (e.pointerType === "touch") return
  pointerInside = true
  setAim(e)
  follow()
}

const onPointerMove = (e) => {
  if (e.pointerType === "touch") return
  pointerInside = true
  setAim(e)
  follow()
}

const onPointerLeave = () => {
  pointerInside = false
  Object.assign(aim, rest())
  follow()
}

// How far the headline runs past the right-hand margin.
const overflow = () => {
  const margin = headline.value.offsetLeft
  return Math.max(0, headline.value.offsetWidth - (section.value.offsetWidth - 2 * margin))
}

// The church rows' bottom edge keeps moving with the page after they've gone,
// so it measures the scrolling: the drift starts as it clears the headline's
// top, with the whole headline in view.
const onScroll = () => {
  const el = section.value
  const above = el?.previousElementSibling
  if (!el || !above) return
  const vh = window.innerHeight
  const rows = above.getBoundingClientRect().bottom
  smallPrintProgress.value = clamp01((vh - rows - 0.3 * vh) / (0.5 * vh))
  const past = Math.max(0, headline.value.getBoundingClientRect().top - rows)
  const x = reducedMotion ? 0 : -Math.min(overflow(), past * DRIFT_RATE)
  headline.value.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`
  // Scrolling moves the section under a still pointer; keep the disc on it.
  if (pointerInside) placeCursor()
}

// The footer starts rising once the section is uncovered and the hold has
// passed, so the hold covers the drift, plus the headline's height and the
// clearance, beyond the section's own height.
const measureHold = () => {
  if (reducedMotion) return
  const drift = overflow() / DRIFT_RATE
  const extra = drift + headline.value.offsetHeight + DRIFT_CLEAR * window.innerHeight - section.value.offsetHeight
  hold.value = Math.max(0, Math.ceil(extra))
}

const onResize = () => {
  measureHold()
  if (!pointerInside) {
    Object.assign(aim, rest())
    Object.assign(pos, aim)
    placeCursor()
  }
  onScroll()
}

let resizeObserver = null

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  onResize()
  // The headline's width changes once its font loads.
  resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(headline.value)
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onResize)
})
</script>

<style scoped>
/* The design's shape (half as tall as wide), never taller than the screen
   below the navbar. */
/* The whole screen below the navbar. It stays pinned there while the church
   rows slide off it and then while the footer slides up over it. */
.home-cta {
  height: max(480px, calc(100svh - 60px));
}
@media (min-width: 768px) {
  .home-cta {
    height: max(520px, calc(100svh - 76px));
  }
}
.backdrop {
  position: absolute;
  inset: 0;
  background: #a855f7;
}
.home-cta:focus-visible {
  outline: 3px solid #0c0f19;
  outline-offset: -8px;
}
/* With a mouse, the disc stands in for the pointer. */
@media (hover: hover) and (pointer: fine) {
  .home-cta {
    cursor: none;
  }
}

/* 300px at full size, its capitals' tops 193px down (27% of the section). */
.headline {
  position: absolute;
  left: clamp(20px, 4.75vw, 68px);
  top: calc(26.95% - 0.1695em);
  font-family: var(--heading-font);
  font-size: clamp(120px, 20.83vw, 300px);
  line-height: 1;
  white-space: nowrap;
  will-change: transform;
}
/* Without the drift, the headline wraps to fit instead. */
@media (prefers-reduced-motion: reduce) {
  .headline {
    right: clamp(20px, 4.75vw, 68px);
    top: 20%;
    font-size: clamp(56px, 9vw, 130px);
    line-height: 0.95;
    white-space: normal;
  }
}
.small-print {
  position: absolute;
  left: clamp(20px, 4.44vw, 64px);
  bottom: 12.6%;
}

/* The disc is the blended element itself: anything that made a layer of its
   own around it (will-change, filters, a wrapper with a transform) would cut
   it off from the page behind and stop the inversion. */
.cta-disc,
.cta-label {
  position: absolute;
  left: 0;
  top: 0;
  width: 178px;
  height: 178px;
  pointer-events: none;
}
.cta-disc {
  mix-blend-mode: difference;
}
.cta-disc span {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: #a855f7;
  transition: transform 0.35s cubic-bezier(0.3, 1.3, 0.5, 1);
}
.cta-disc.near span {
  transform: scale(1.15);
}
.cta-label {
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 23px;
  font-weight: 600;
}
@media (max-width: 767px) {
  .cta-disc,
  .cta-label {
    width: 132px;
    height: 132px;
  }
  .cta-label {
    font-size: 18px;
  }
}
</style>
