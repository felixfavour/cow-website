<template>
  <!--
    The testimonials go round on their own, one at a time: the current one sits
    in front, and two more wait on either side, smaller and more blurred the
    further they are from the centre. They can be dragged or swiped round too,
    and settle on whichever card is nearest.
  -->
  <div ref="stage" class="relative bg-[#0C0F19]">
    <section class="home-testimonials overflow-hidden bg-[#0C0F19] pb-16 lg:pb-20">
      <div class="px-5 pt-12 text-center lg:pt-[64px]">
        <p
          class="text-[11px] font-medium uppercase leading-[14px] tracking-[0.08em] text-[#8A41C9]"
        >
          Featured testimonials
        </p>
        <RevealText
          as="h2"
          :lines="['Don’t just take', 'our word for it.']"
          scrub
          :range="[0.9, 0.35]"
          class="testimonials-heading mt-[5px] font-bold text-white"
        />
      </div>

      <div
        ref="stack"
        class="stack relative mx-auto mt-8 lg:mt-[48px]"
        :class="{ dragging }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
        @pointerenter="onPointerEnter"
        @pointerleave="hovering = false"
      >
        <article
          v-for="(item, i) in testimonials"
          :key="item.name"
          :ref="(el) => (frames[i] = el)"
          class="frame"
          :aria-hidden="i !== active"
        >
          <div class="card">
            <img
              v-if="item.photo"
              :src="item.photo"
              :alt="item.name"
              class="photo"
              draggable="false"
              loading="lazy"
              decoding="async"
            />
            <div v-else class="photo monogram" aria-hidden="true">
              {{ item.monogram || initials(item.name) }}
            </div>
            <div class="card-text">
              <p class="quote">{{ item.quote }}</p>
              <footer class="mt-auto">
                <p class="name">{{ item.name }}</p>
                <p class="role">
                  <template v-for="(line, l) in item.role" :key="l"
                    >{{ line }}<br v-if="l < item.role.length - 1"
                  /></template>
                </p>
              </footer>
            </div>
          </div>
        </article>
      </div>

      <!-- Which testimonial is showing; the current one fills while it waits. -->
      <div class="mt-8 flex justify-center gap-[6px] lg:mt-[43px]">
        <button
          v-for="(item, i) in testimonials"
          :key="item.name"
          type="button"
          class="dot relative h-[10px] overflow-hidden rounded-full bg-[#2C3041]"
          :class="active === i ? 'w-[50px]' : 'w-[10px]'"
          :aria-label="`Show ${item.name}'s testimonial`"
          :aria-current="active === i ? 'true' : undefined"
          @click="goTo(i)"
        >
          <span
            :ref="(el) => (fills[i] = el)"
            class="fill absolute inset-0 rounded-full bg-[#4A5066]"
          ></span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
// "Don't just take our word for it": testimonials in glass frames that go
// round on their own. Each one rests in the centre for a few seconds, then
// glides aside as the next comes in; the others wait behind it, smaller and
// blurred by how far out they sit, and sharpen as they near the centre.
// Dragging or swiping moves them with the finger, and letting go throws them
// on and springs them onto the nearest card.
//
// Kept cheap so it stays smooth: one animation frame loop writes only
// transform, opacity and filter straight onto the cards, which have layers of
// their own, so nothing is laid out or repainted while they move. Vue only
// re-renders when the current testimonial changes.

// Real reviews from Senja and Trustpilot, in the reviewers' own words (trimmed
// with ellipses). A photo is optional; without one the card shows initials,
// or `monogram` where the name's first and last letters don't suit (a church).
import moshood from "~/assets/images/testimonials/moshood-olawale-mustapha.webp"
import adebayo from "~/assets/images/testimonials/adebayo-awoyele.webp"

const testimonials = [
  {
    name: "Loving Lord Baptist Church",
    role: ["Cavite, Philippines.", "Review on Trustpilot"],
    quote:
      "We don’t have a big budget or a big team, so finding a tool that helps us prepare our Sunday services, and finding out it’s free, felt like an answer to prayer… It has made our worship so much smoother.",
    monogram: "LL",
  },
  {
    name: "Enesi Nathan",
    role: ["Review on Trustpilot"],
    quote:
      "For the quality you get from the software, the price is one of the best values for money… All in all, Cloud of Worship has to be the best display software I’ve used.",
  },
  {
    name: "Moshood Olawale Mustapha",
    role: ["Live Streaming Lead, RCF Unilag.", "Head of Media, TEM"],
    quote:
      "As a media personnel, finding the right projection software has always been challenging. However, Cloud of Worship has revolutionized our work. Unlike other tools, it works seamlessly on the web, making it easy for our whole team to prepare and project from any device.",
    photo: moshood,
  },
  {
    name: "Aquaisua Victor Essien",
    role: ["Review on Trustpilot"],
    quote:
      "Used by kids in the children’s ministry every Sunday, that’s how easy it is to use. Media in church would have been a hassle without the software from my experience so far.",
  },
  {
    name: "Emmanuel Sebastian",
    role: ["Media Handler,", "MFMCF Unijos"],
    quote:
      "Its browser-based platform means no more complicated installations, just log in and you’re ready to go… The offline capability ensures that our presentations run smoothly, regardless of internet connectivity.",
  },
  {
    name: "Matthew Ọbańlá",
    role: ["Review on Trustpilot"],
    quote:
      "Using Cloud of Worship has simplified my church media process. We now have everything in one place. All the team members can access and work on the same schedule and nothing breaks.",
  },
  {
    name: "Monte Young",
    role: ["Review on Trustpilot"],
    quote:
      "Cloud of Worship has been the most amazing discovery. The ease of use and features are remarkable. This has absolutely changed the church worship service.",
  },
  {
    name: "Engr Adebayo Awoyele",
    role: ["Congregant,", "Foursquare Gospel Church, Ifako"],
    quote:
      "I am not a direct handler of the Cloud of Worship software, but I am a part of the congregation using it. When I suddenly realised… worship lyrics, Bible references and PowerPoint slides now come up speedily without delay, I knew something different had been added.",
    photo: adebayo,
  },
  {
    name: "John Akinkunmi",
    role: ["Review on Trustpilot"],
    quote:
      "I found it while looking for an alternative to EasyWorship. The UI is intuitively simple and easy to learn.",
  },
]

// "Matthew Ọbańlá" → "MỌ"; skips titles such as "Engr".
const initials = (name) =>
  name
    .split(" ")
    .filter((word) => !/^(engr|dr|pst|rev)\.?$/i.test(word))
    .map((word) => word[0])
    .filter((_, i, all) => i === 0 || i === all.length - 1)
    .join("")
    .toUpperCase()

// How long each testimonial rests in the centre before the next comes in.
const DWELL_S = 5
// The spring that carries the cards onto a card after a glide or a swipe:
// stiffness, and damping just short of critical so it settles without a bounce.
const STIFFNESS = 120
const DAMPING = 21
// Pixels a finger must move sideways before it counts as a drag rather than a
// tap or the start of a scroll.
const DRAG_SLOP = 6
// Seconds of the release speed carried forward when picking where a swipe
// lands, so a flick goes further than a slow drag.
const THROW_S = 0.2
// The fastest a swipe can send the cards, in testimonials per second, so a
// hard flick still glides rather than snapping across.
const MAX_SPEED = 6

// How a card looks by its distance from the centre, at whole steps; in
// between it blends. Side offsets are a share of the card's own width, so
// they scale with it. On wide screens two wait on each side, smaller, darker
// and more blurred the further out they sit, and a third is hidden further
// out. That takes at least six testimonials: the one going round from far
// left to far right does it while hidden instead of crossing the stack.
const WIDE = {
  x: [0, 46, 80, 100],
  scale: [1, 0.72, 0.52, 0.4],
  blur: [0, 3, 8, 12],
  brightness: [1, 0.7, 0.5, 0.4],
  opacity: [1, 1, 1, 0],
  // The most cards one swipe can move along.
  throw: 2,
}
// Narrow screens: one at a time. The next slides in from the side as the
// current one slides out, side by side rather than over each other.
const NARROW = {
  x: [0, 108, 216, 324],
  scale: [1, 0.92, 0.9, 0.9],
  blur: [0, 4, 8, 8],
  brightness: [1, 0.7, 0.5, 0.5],
  opacity: [1, 1, 0, 0],
  throw: 1,
}

const stage = ref(null)
const stack = ref(null)
const active = ref(0)
const dragging = ref(false)
const hovering = ref(false)

// Written to directly every frame, so kept out of Vue's reactivity.
const frames = []
const fills = []
let shown = []
let fillShown = []
let look = WIDE
// Pixels of drag that move the cards along by one testimonial.
let stepPx = 300
// Where the cards are, in testimonials: whole numbers are a card centred, and
// it counts on past the last one rather than wrapping, so the loop never
// jumps. `target` is the card it is heading for.
let position = 0
let velocity = 0
let target = 0
let waited = 0
let frame = 0
let lastTime = 0
let near = false
let reducedMotion = false

// The drag in progress: where it started, and recent samples for its speed.
let pointer = null

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const wrap = (i) => {
  const n = testimonials.length
  return ((i % n) + n) % n
}

// A value from one of the looks' rows, `at` steps from the centre.
const sample = (stops, at) => {
  const i = Math.min(Math.floor(at), stops.length - 2)
  return stops[i] + (stops[i + 1] - stops[i]) * (at - i)
}

// Card i's offset from the centre, going round in a loop so there are always
// cards on both sides: between -n/2 and n/2.
const offsetOf = (i, centre) => {
  const n = testimonials.length
  const d = i - centre
  return d - n * Math.round(d / n)
}

const place = (i, centre) => {
  const el = frames[i]
  if (!el) return
  const d = offsetOf(i, centre)
  const at = Math.min(Math.abs(d), 3)
  const x = Math.sign(d) * sample(look.x, at)
  const scale = sample(look.scale, at)
  const blur = sample(look.blur, at)
  const brightness = sample(look.brightness, at)
  const opacity = sample(look.opacity, at)
  const next = {
    transform: `translate3d(${x.toFixed(2)}%, 0, 0) scale(${scale.toFixed(4)})`,
    filter:
      blur < 0.01 && brightness > 0.999
        ? "none"
        : `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(3)})`,
    opacity: opacity.toFixed(3),
    zIndex: String(10 - Math.round(at)),
  }
  // Only touch what changed; a resting card isn't written to at all.
  const before = shown[i] || {}
  for (const key in next) {
    if (next[key] !== before[key]) el.style[key] = next[key]
  }
  shown[i] = next
}

const render = () => {
  testimonials.forEach((_, i) => place(i, position))

  const now = wrap(Math.round(position))
  if (active.value !== now) active.value = now
  // The current dot fills while its testimonial waits for the next.
  const progress = autoplays() ? clamp(waited / DWELL_S, 0, 1) : 1
  fills.forEach((fill, i) => {
    if (!fill) return
    const x = i === now ? `${((progress - 1) * 100).toFixed(1)}%` : "-100%"
    if (fillShown[i] !== x) fill.style.transform = `translateX(${x})`
    fillShown[i] = x
  })
}

// Going round on its own stops while the reader is holding or pointing at a
// card, and for anyone who asked for less motion.
const autoplays = () => !reducedMotion && !dragging.value && !hovering.value

const settled = () => position === target && velocity === 0

const tick = (now) => {
  const dt = Math.min((now - (lastTime || now)) / 1000, 0.05)
  lastTime = now

  if (!dragging.value) {
    if (reducedMotion) {
      position = target
      velocity = 0
    } else {
      velocity += (STIFFNESS * (target - position) - DAMPING * velocity) * dt
      position += velocity * dt
      if (Math.abs(target - position) < 0.0005 && Math.abs(velocity) < 0.005) {
        position = target
        velocity = 0
      }
    }
  }

  if (autoplays() && settled() && !document.hidden) {
    waited += dt
    if (waited >= DWELL_S) {
      waited = 0
      target += 1
    }
  }

  render()
  // Keep going while on screen, unless there's nothing left to move or count.
  const idle = settled() && !autoplays() && !dragging.value
  frame = near && !idle ? requestAnimationFrame(tick) : 0
  if (!frame) lastTime = 0
}

const wake = () => {
  if (near && !frame) frame = requestAnimationFrame(tick)
}

// Head for the nearest copy of testimonial i, the short way round.
const goTo = (i) => {
  target = Math.round(position + offsetOf(i, position))
  waited = 0
  wake()
}

// ---- Dragging and swiping ----

const onPointerDown = (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return
  pointer = {
    id: event.pointerId,
    x: event.clientX,
    from: position,
    samples: [{ t: event.timeStamp, p: position }],
    frame: event.target.closest(".frame"),
  }
}

const onPointerMove = (event) => {
  if (!pointer || event.pointerId !== pointer.id) return
  const dx = event.clientX - pointer.x
  if (!dragging.value) {
    if (Math.abs(dx) < DRAG_SLOP) return
    dragging.value = true
    // Start from here, so the cards don't jump by the slop.
    pointer.x = event.clientX
    pointer.from = position
    velocity = 0
    stack.value.setPointerCapture(event.pointerId)
    wake()
    return
  }
  position = pointer.from - (event.clientX - pointer.x) / stepPx
  pointer.samples.push({ t: event.timeStamp, p: position })
  if (pointer.samples.length > 6) pointer.samples.shift()
}

// Testimonials per second over the last moments of the drag.
const releaseSpeed = (now) => {
  const recent = pointer.samples.filter((s) => now - s.t < 100)
  if (recent.length < 2) return 0
  const first = recent[0]
  const last = recent[recent.length - 1]
  const seconds = (last.t - first.t) / 1000
  return seconds > 0 ? clamp((last.p - first.p) / seconds, -MAX_SPEED, MAX_SPEED) : 0
}

const onPointerUp = (event) => {
  if (!pointer || event.pointerId !== pointer.id) return
  if (dragging.value) {
    dragging.value = false
    const speed = releaseSpeed(event.timeStamp)
    // A flick lands on the card its speed carries it to, at least the next one
    // in the direction it was thrown, and no further than the layout allows.
    let landing = Math.round(position + speed * THROW_S)
    if (Math.abs(speed) > 1.5 && landing === Math.round(pointer.from)) landing += Math.sign(speed)
    const from = Math.round(pointer.from)
    target = clamp(landing, from - look.throw, from + look.throw)
    velocity = reducedMotion ? 0 : speed
    waited = 0
    wake()
  } else if (pointer.frame) {
    // A tap on a card at the side brings it to the centre.
    const i = frames.indexOf(pointer.frame)
    if (i >= 0 && i !== active.value) goTo(i)
  }
  pointer = null
}

const onPointerCancel = (event) => {
  if (!pointer || event.pointerId !== pointer.id) return
  pointer = null
  if (!dragging.value) return
  dragging.value = false
  target = Math.round(position)
  wake()
}

const onPointerEnter = (event) => {
  // Only a mouse resting on the cards holds them; a touch would leave them
  // held after the finger lifts.
  if (event.pointerType === "mouse") hovering.value = true
}
watch(hovering, (now) => {
  if (now) waited = 0
  wake()
})

// Sizes only change on resize, so they're read then rather than every frame.
const layout = () => {
  look = window.matchMedia("(min-width: 1024px)").matches ? WIDE : NARROW
  stepPx = Math.max(1, ((frames[0]?.offsetWidth || 600) * look.x[1]) / 100)
  shown = []
  fillShown = []
  render()
}

const onVisibility = () => {
  waited = 0
  wake()
}

let resizeObserver = null
let intersectionObserver = null

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  layout()
  resizeObserver = new ResizeObserver(layout)
  resizeObserver.observe(stack.value)
  // Only run while the section is on or near the screen, and give the first
  // testimonial its full turn when the reader arrives.
  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      near = entry.isIntersecting
      if (!near) return
      waited = 0
      wake()
    },
    { rootMargin: "20% 0px" }
  )
  intersectionObserver.observe(stage.value)
  document.addEventListener("visibilitychange", onVisibility)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  document.removeEventListener("visibilitychange", onVisibility)
})
</script>

<style scoped>
.testimonials-heading {
  font-size: clamp(36px, 4.2vw, 60px);
  line-height: 0.98;
}

/* ---- The stack ---- */
.stack {
  width: min(648px, calc(100% - 40px));
  height: 520px;
}
/* Drags sideways; up and down still scroll the page. */
.stack {
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}
.stack.dragging {
  cursor: grabbing;
}
/* Grows with the screen's height so the whole section fits on screen. */
@media (min-width: 1024px) {
  .stack {
    --stack-height: clamp(400px, 52svh, 520px);
    width: min(calc(var(--stack-height) * 1.58), calc(100% - 40px));
    height: var(--stack-height);
  }
}

/* Glass: a rim with a light catching its top edge. The rim is the colour the
   frosted glass shows over the section's flat background, painted solid:
   real backdrop blur on five overlapping, moving cards cost more than it
   showed. Each card gets a layer of its own, so moving, fading and blurring
   it never repaints it. The script places every card; until it runs, only
   the first one shows. */
.frame {
  position: absolute;
  inset: 0;
  padding: 9px;
  border-radius: 22px;
  background: linear-gradient(to bottom, #2c2f3c, #1b1f2a);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    0 30px 60px -30px rgba(0, 0, 0, 0.8);
  will-change: transform, opacity, filter;
}
.frame:not(:first-child) {
  opacity: 0;
}

/* A dark, faintly grainy card with the photo blending in from the right. */
.card {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 14px;
  background-color: #0b0b0c;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
.photo {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 46%;
  object-fit: cover;
  object-position: 50% 25%;
  -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent);
  mask-image: linear-gradient(to bottom, #000 55%, transparent);
}
/* Stands in for a photo: the reviewer's initials, large and faint, over a
   soft glow of the brand purple. It fades into the card like a photo does. */
.monogram {
  display: grid;
  place-items: center;
  padding-bottom: 8%;
  background: radial-gradient(circle at 50% 45%, rgba(138, 65, 201, 0.42), rgba(76, 29, 149, 0.16) 45%, transparent 72%);
  color: rgba(255, 255, 255, 0.14);
  font-family: var(--heading-font);
  font-size: 96px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  user-select: none;
}
@media (min-width: 1024px) {
  .monogram {
    padding-bottom: 0;
    font-size: clamp(120px, calc(var(--stack-height) * 0.36), 190px);
  }
}
.card-text {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 220px 24px 22px;
}
@media (min-width: 1024px) {
  .photo {
    width: 50%;
    height: 100%;
    object-position: 50% 20%;
    -webkit-mask-image: linear-gradient(to right, transparent, #000 40%);
    mask-image: linear-gradient(to right, transparent, #000 40%);
  }
  .card-text {
    width: 56%;
    padding: 48px 0 44px 36px;
  }
}
/* The max-height backs up the line clamp: inside the column flexbox, Chrome
   sizes a clamped quote by all its lines and lets the next one show through. */
.quote {
  --lines: 6;
  color: #fff;
  font-size: 18px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--lines);
  max-height: calc(var(--lines) * 1.2em);
  overflow: hidden;
}
/* The quote grows with the card, so a shorter screen still fits it. */
@media (min-width: 1024px) {
  .quote {
    --lines: 8;
    font-size: clamp(19px, calc(var(--stack-height) * 0.044), 23px);
  }
}
.name {
  color: #fff;
  font-family: var(--heading-font);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}
.role {
  margin-top: 0px;
  color: #a3a9b6;
  font-size: 12px;
  line-height: 1.2;
}
@media (min-width: 1024px) {
  .name {
    font-size: 28px;
  }
  .role {
    font-size: 13px;
  }
}

.dot {
  transition: width 0.45s cubic-bezier(0.3, 0.7, 0.2, 1);
}
.fill {
  transform: translateX(-100%);
  will-change: transform;
}
.dot:focus-visible {
  outline: 2px solid #8a41c9;
  outline-offset: 2px;
}
/* With reduced motion the cards don't go round on their own, and move in single steps. */
@media (prefers-reduced-motion: reduce) {
  .dot {
    transition: none;
  }
}
</style>
