<template>
  <!--
    Two stages in one section. First it is a full-screen photo, held against
    the bottom of the screen behind the sections above so they slide off it
    (it looks as if it was underneath the whole time). Once uncovered it pins
    below the navbar, and scrolling on shrinks the photo into its box in the
    "multiple operators" layout, which fades in around it.
  -->
  <section
    ref="section"
    class="home-familiar sticky bottom-0 top-[60px] z-0 overflow-hidden bg-[#FBF7FF] md:top-[76px]"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- What's left once the photo has shrunk. -->
    <div
      class="relative mx-auto flex h-full max-w-[1600px] flex-col px-5 pt-8 md:px-10 lg:flex-row lg:justify-between lg:px-16 lg:pt-[87px]"
    >
      <div class="lg:mr-10 lg:max-w-[640px] lg:flex-1">
        <h2 ref="slotHeading" class="slot-heading font-bold text-[#1A1F2E]">
          There’s a slot for multiple operators, <br class="hidden lg:inline" />and we leave the power in your
          <br class="hidden lg:inline" />hands for what item needs to <br class="hidden lg:inline" />appear on the screen.
        </h2>

        <!-- The cursors fly home into the first three of these. -->
        <div ref="avatarRow" class="avatars mt-5 flex lg:mt-[26px]" aria-label="Operators">
          <button
            v-for="avatar in avatars"
            :key="avatar.initials"
            type="button"
            class="avatar"
            :style="{ background: avatar.color, color: avatar.textColor, '--ring': avatar.color }"
            :data-cursor-home="avatar.cursor"
            :data-name="avatar.name"
            :aria-label="`${avatar.name}: show what they just did`"
            @click="announce(avatar)"
          >{{ avatar.initials }}</button>
        </div>
        <ActivityToasts ref="toasts" />

        <div ref="box" class="box mt-8 lg:mt-[88px]" aria-hidden="true"></div>
      </div>

      <HomeStats class="hidden lg:block lg:w-[312px] lg:shrink-0" :start="statsStarted" />
    </div>

    <!-- The photo, clipped down into the box as the section scrolls on. -->
    <div ref="frame" class="frame absolute inset-0">
      <div ref="photo" class="photo absolute">
        <img
          src="/images/cow-child-2160.webp"
          srcset="/images/cow-child-1280.webp 1280w, /images/cow-child-2160.webp 2160w"
          sizes="108vw"
          width="2160"
          height="1152"
          alt="A girl lying on the grass, finding her way around Cloud of Worship on a tablet"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover"
        />
      </div>

      <div
        ref="intro"
        class="intro relative mx-auto flex max-w-[1600px] flex-col gap-4 px-5 pt-[calc(32px+5vh)] md:flex-row md:items-start md:justify-between md:px-10 md:pt-[calc(44px+5vh)] lg:px-16"
      >
        <h2 class="familiar-heading font-bold text-white">
          If you’ve never used a projection <br class="hidden md:inline" />software before, you’d somehow
          <br class="hidden md:inline" />still find this familiar
        </h2>
        <figure ref="quote" class="text-white md:w-[240px] md:shrink-0">
          <RevealText
            as="blockquote"
            :lines="['“Used by kids in the', 'children’s ministry', 'every Sunday. That’s', 'how easy it is to use.”']"
            scrub
            :progress="quoteProgress"
            class="text-[17px] leading-[1.2] md:text-[20px]"
          />
          <RevealText
            as="figcaption"
            :lines="['Victor, Foursquare Church']"
            scrub
            :progress="captionProgress"
            class="mt-3 text-[14px] leading-[1.2] text-white/70 md:text-[15px]"
          />
        </figure>
      </div>
    </div>
  </section>

  <!-- The scrolling the section stays pinned for while the photo shrinks. -->
  <div ref="spacer" class="familiar-spacer bg-[#FBF7FF]" aria-hidden="true"></div>

  <!-- On narrow screens the numbers come after, rather than beside: see
       pages/index.vue, which places them outside the box this section pins in. -->
</template>

<script setup>
// "If you've never used a projection software before…" and, after it,
// "There's a slot for multiple operators…".
//
// The photo pans gently the other way as the pointer moves over it, like
// looking around, and rises a touch more slowly than the page while it's
// being uncovered. Pinned, scrolling shrinks it into the rounded box beside
// the avatars: the clip closes in on the box while the photo zooms in on the
// girl, the photo's own text fades out, and the heading, avatars and numbers
// fade in. The cursors docked in the corner fly home into their avatars
// (HomeProjection reads this section's progress for that).

const avatars = [
  { initials: "FF", name: "Favour Felix", color: "#BC7BE8", textColor: "#FFFFFF", cursor: "Favour" },
  { initials: "LO", name: "Lanre O.", color: "#528BFE", textColor: "#FFFFFF", cursor: "Lanre O." },
  { initials: "IA", name: "Inioluwa A.", color: "#F1C778", textColor: "#1A1F2E", cursor: "Inioluwa" },
]

// Clicking an operator shows what they just did, a different thing each time.
const ACTIONS = [
  "added a slide",
  "sent “Way Maker” live",
  "queued Psalm 23",
  "started the countdown",
  "edited the announcements",
]
const toasts = ref(null)
let actionIndex = 0
const announce = (avatar) => {
  toasts.value?.push({ ...avatar, action: ACTIONS[actionIndex++ % ACTIONS.length] })
}

// How far the photo pans at the edges of the section, as a share of its size.
const PAN_X = 0.025
const PAN_Y = 0.02
// How far below its resting place the photo starts while still covered.
const RISE = 0.03
// Seconds for the pan and the shrink to catch up with the pointer and scroll.
const PAN_SMOOTHING = 0.35
const SCROLL_SMOOTHING = 0.16
// The part of the girl's photo that fills the box once shrunk: its centre, and
// its width as a share of the photo's, measured from the design.
const CROP = { x: 0.452, y: 0.563, width: 0.622 }
const BOX_RADIUS = 24
// Share of the pinned scrolling spent on the full photo before it starts to shrink.
const HOLD = 0.2
const PHOTO = { width: 2160, height: 1152 }

const section = ref(null)
const spacer = ref(null)
const frame = ref(null)
const photo = ref(null)
const intro = ref(null)
const box = ref(null)
const slotHeading = ref(null)
const avatarRow = ref(null)
const statsStarted = ref(false)
// Victor's review writes itself in, like "Prepare once, use everywhere", over
// the scrolling after the section above uncovers it and before the photo
// starts to shrink. The caption follows a little behind the quote.
const quote = ref(null)
const quoteProgress = ref(0)
const captionProgress = computed(() => clamp01((quoteProgress.value - 0.55) / 0.45))
// Share of the screen's height scrolled from uncovered to fully written.
const QUOTE_SPAN = 0.3

// HomeProjection reads this to send the cursors home.
const shrinkTarget = useState("familiarShrink", () => 0)

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const pan = { x: 0, y: 0 }
const aim = { x: 0, y: 0 }
let rise = 0
let shrink = 0
let target = 0
let geometry = null
let rafId = 0
let lastTime = 0
let reducedMotion = false

// Where the box sits, and where the photo has to end up so the design's crop
// fills it. Recomputed on resize.
const measureGeometry = () => {
  const s = section.value.getBoundingClientRect()
  const b = box.value.getBoundingClientRect()
  const W = s.width
  const H = s.height
  // The photo's box, as set in CSS: 4% wider and 6% taller each side.
  const P = { x: -0.04 * W, y: -0.06 * H, w: 1.08 * W, h: 1.12 * H }
  // The picture inside it, as object-fit: cover lays it out.
  const c = Math.max(P.w / PHOTO.width, P.h / PHOTO.height)
  const posX = parseFloat(getComputedStyle(photo.value.firstElementChild).objectPosition) / 100 || 0.5
  const R0 = { w: PHOTO.width * c, h: PHOTO.height * c }
  R0.x = P.x + (P.w - R0.w) * posX
  R0.y = P.y + (P.h - R0.h) * 0.5
  // The picture's place once shrunk.
  const B = { x: b.left - s.left, y: b.top - s.top, w: b.width, h: b.height }
  const w1 = B.w / CROP.width
  const R1 = { w: w1, h: (w1 * PHOTO.height) / PHOTO.width }
  R1.x = B.x + B.w / 2 - CROP.x * R1.w
  R1.y = B.y + B.h / 2 - CROP.y * R1.h
  // The transform (from the photo box's top-left) that takes R0 to R1.
  const k = R1.w / R0.w
  geometry = {
    W,
    H,
    B,
    P,
    k,
    tx: R1.x - P.x - k * (R0.x - P.x),
    ty: R1.y - P.y - k * (R0.y - P.y),
  }
}

const apply = () => {
  if (!geometry) return
  const { W, H, B, P, k, tx, ty } = geometry
  const e = easeInOut(clamp01(shrink / 0.55))
  const still = 1 - e

  // The clip closes in on the box.
  const r = BOX_RADIUS * e
  frame.value.style.clipPath =
    e > 0
      ? `inset(${(B.y * e).toFixed(1)}px ${((W - B.x - B.w) * e).toFixed(1)}px ${((H - B.y - B.h) * e).toFixed(1)}px ${(B.x * e).toFixed(1)}px round ${r.toFixed(1)}px)`
      : ""

  // The photo zooms in on the girl as it shrinks; panning and the rise give way.
  const px = (-pan.x * PAN_X * P.w) * still + tx * e
  const py = (-pan.y * PAN_Y * P.h + rise * RISE * P.h) * still + ty * e
  photo.value.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) scale(${lerp(1, k, e).toFixed(4)})`

  // The photo's own words leave; the new layout arrives around the box.
  const leave = 1 - smooth(0, 0.22, shrink)
  intro.value.style.opacity = leave.toFixed(3)
  intro.value.style.transform = `translateY(${(-24 * (1 - leave)).toFixed(1)}px)`
  const arrive = smooth(0.3, 0.6, shrink)
  for (const el of [slotHeading.value, avatarRow.value]) {
    el.style.opacity = arrive.toFixed(3)
    el.style.transform = `translateY(${(16 * (1 - arrive)).toFixed(1)}px)`
  }
  if (shrink >= 0.5) statsStarted.value = true
}

const measureScroll = () => {
  if (!section.value || !spacer.value) return
  // The box moves if the heading rewraps, so take its place afresh each time.
  measureGeometry()
  const vh = window.innerHeight
  const s = section.value.getBoundingClientRect()
  // While the section above still covers the photo: 1 fully, 0 not at all.
  const above = section.value.previousElementSibling
  rise = above ? clamp01((above.getBoundingClientRect().bottom - vh + s.height) / s.height) : 0
  // How far the section above has scrolled past the review's top edge.
  const uncovered = above ? quote.value.getBoundingClientRect().top - above.getBoundingClientRect().bottom : vh
  quoteProgress.value = clamp01(uncovered / (QUOTE_SPAN * vh))
  // How far through its pinned stretch the section is.
  const pinTop = parseFloat(getComputedStyle(section.value).top) || 0
  const travel = spacer.value.offsetHeight
  // The photo holds still for the first part of the pin before it shrinks.
  const pinned = clamp01((pinTop + s.height - spacer.value.getBoundingClientRect().top) / travel)
  target = clamp01((pinned - HOLD) / (1 - HOLD))
  shrinkTarget.value = target
}

const tick = (now) => {
  const dt = Math.min((now - (lastTime || now)) / 1000, 0.05)
  lastTime = now
  const kp = 1 - Math.exp(-dt / PAN_SMOOTHING)
  const ks = 1 - Math.exp(-dt / SCROLL_SMOOTHING)
  pan.x += (aim.x - pan.x) * kp
  pan.y += (aim.y - pan.y) * kp
  shrink += (target - shrink) * ks
  const settled =
    Math.abs(aim.x - pan.x) < 0.001 && Math.abs(aim.y - pan.y) < 0.001 && Math.abs(target - shrink) < 0.0005
  if (settled) {
    pan.x = aim.x
    pan.y = aim.y
    shrink = target
  }
  apply()
  rafId = settled ? 0 : requestAnimationFrame(tick)
  if (!rafId) lastTime = 0
}

const start = () => {
  if (!rafId) rafId = requestAnimationFrame(tick)
}

const onPointerMove = (e) => {
  if (reducedMotion || e.pointerType === "touch") return
  const r = section.value.getBoundingClientRect()
  // -1 at the left and top edges, 1 at the right and bottom.
  aim.x = ((e.clientX - r.left) / r.width) * 2 - 1
  aim.y = ((e.clientY - r.top) / r.height) * 2 - 1
  start()
}

const onPointerLeave = () => {
  aim.x = aim.y = 0
  start()
}

const onScroll = () => {
  measureScroll()
  if (reducedMotion) {
    shrink = target
    rise = 0
    apply()
    return
  }
  start()
}

const onResize = () => {
  measureGeometry()
  onScroll()
}

let resizeObserver = null

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  measureGeometry()
  measureScroll()
  // Arriving part-way down the page shows everything as far along as it should be.
  shrink = target
  apply()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onResize)
  resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(section.value)
  document.fonts?.ready.then(onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onResize)
  shrinkTarget.value = 0
})
</script>

<style scoped>
/* Fills the screen below the navbar, and is never shorter than its content. */
.home-familiar {
  height: max(600px, calc(100svh - 60px));
}
@media (min-width: 768px) {
  .home-familiar {
    height: max(640px, calc(100svh - 76px));
  }
}
@media (min-width: 1024px) {
  .home-familiar {
    height: max(760px, calc(100svh - 76px));
  }
}
.familiar-spacer {
  height: 150svh;
}

/* A little larger than the section all round, so panning never shows an edge. */
.frame {
  will-change: clip-path;
}
.photo {
  inset: -6% -4%;
  transform-origin: 0 0;
  will-change: transform;
}
.photo img {
  object-position: 45% 50%;
}
@media (min-width: 768px) {
  .photo img {
    object-position: 50% 50%;
  }
}

/* Both headings: 52px on a tight line at full size. */
.familiar-heading,
.slot-heading {
  font-size: clamp(36px, 3.7vw, 52px);
  line-height: 0.98;
}
.slot-heading,
.avatars {
  opacity: 0;
}

/* The image box: 443 × 249 with 24px corners at full size. */
.box {
  width: 100%;
  aspect-ratio: 443 / 249;
  border-radius: 24px;
}
@media (min-width: 1024px) {
  .box {
    width: 443px;
  }
}

/* 56px circles with a white ring, overlapping by 5px. */
.avatar {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  box-shadow: 0 0 0 3px #fbf7ff;
  font-size: 21px;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  transition:
    opacity 0.3s ease,
    transform 0.4s cubic-bezier(0.3, 1.4, 0.5, 1),
    box-shadow 0.3s ease;
}
.avatar + .avatar {
  margin-left: -5px;
}
/* Hovered, it lifts above its neighbours with a halo in its own colour,
   and its name pops up above it. */
.avatar:hover,
.avatar:focus-visible {
  z-index: 1;
  outline: none;
  transform: translateY(-4px) scale(1.08);
  box-shadow:
    0 0 0 3px #fbf7ff,
    0 0 0 6px color-mix(in srgb, var(--ring) 35%, transparent),
    0 10px 20px -6px color-mix(in srgb, var(--ring) 60%, transparent);
}
.avatar:active {
  transform: translateY(-1px) scale(1.02);
  transition-duration: 0.1s;
}
.avatar::after {
  content: attr(data-name);
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  padding: 5px 10px;
  border-radius: 9999px;
  background: #1a1f2e;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  filter: blur(4px);
  transform: translate(-50%, 4px);
  transition:
    opacity 0.2s ease,
    filter 0.25s ease,
    transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.avatar:hover::after,
.avatar:focus-visible::after {
  opacity: 1;
  filter: blur(0);
  transform: translate(-50%, 0);
}
/* The three with a cursor wait for it to land. */
.avatar[data-cursor-home]:not([data-arrived="true"]) {
  opacity: 0;
  transform: scale(0.6);
  pointer-events: none;
}
</style>
