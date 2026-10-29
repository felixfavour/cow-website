<template>
  <!--
    Pins below the navbar while scrolling moves through the testimonials one at
    a time: the current one sits in front, and two more wait on either side,
    smaller and more blurred the further they are from the centre. The cards
    follow the scroll position itself, so they glide as you scroll.
  -->
  <div
    ref="stage"
    class="testimonials-stage relative bg-[#0C0F19]"
    :style="{ height: `calc(${sectionHeight}px + ${TRAVEL_SVH}svh)` }"
  >
    <section
      ref="section"
      class="home-testimonials sticky top-[60px] overflow-hidden bg-[#0C0F19] pb-10 md:top-[76px]"
    >
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

      <div class="stack relative mx-auto mt-8 lg:mt-[48px]">
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

      <!-- Which testimonial is showing; the current one fills as you scroll. -->
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
// "Don't just take our word for it": testimonials in glass frames, moved
// through by scrolling. Each one rests in the centre for part of its stretch,
// then glides aside as the next comes in; the others wait behind it, smaller
// and blurred by how far out they sit, and sharpen as they near the centre.
//
// Kept cheap so scrolling stays smooth: one animation frame loop writes only
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

// Scrolling spent on each testimonial while the section is pinned.
const STEP_SVH = 40
const TRAVEL_SVH = STEP_SVH * testimonials.length
// Share of each stretch spent gliding over to the next testimonial; for the
// rest of it the current one rests in the centre.
const GLIDE = 0.5
// Seconds for the cards to catch up with the scroll position, so a stepped
// mouse wheel still reads as one smooth glide.
const SMOOTHING = 0.18

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
}
// Narrow screens: one at a time. The next slides in from the side as the
// current one slides out, side by side rather than over each other.
const NARROW = {
  x: [0, 108, 216, 324],
  scale: [1, 0.92, 0.9, 0.9],
  blur: [0, 4, 8, 8],
  brightness: [1, 0.7, 0.5, 0.5],
  opacity: [1, 1, 0, 0],
}

const stage = ref(null)
const section = ref(null)
const sectionHeight = ref(800)
const active = ref(0)

// Written to directly every frame, so kept out of Vue's reactivity.
const frames = []
const fills = []
let shown = []
let fillShown = []
let look = WIDE
let pinTop = 0
let travel = 1
let target = 0
let current = 0
let frame = 0
let lastTime = 0
let near = false
let reducedMotion = false

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

// A value from one of the looks' rows, `at` steps from the centre.
const sample = (stops, at) => {
  const i = Math.min(Math.floor(at), stops.length - 2)
  return stops[i] + (stops[i + 1] - stops[i]) * (at - i)
}

// Which testimonial is centred, possibly part-way between two, for a scroll
// position counted in stretches: it rests on each one, then glides across to
// the next over the boundary between their stretches.
const centreAt = (s) => {
  const last = testimonials.length - 1
  if (reducedMotion) return clamp(Math.floor(s), 0, last)
  const boundary = clamp(Math.round(s), 1, last)
  const t = clamp((s - boundary) / GLIDE + 0.5, 0, 1)
  return boundary - 1 + t * t * (3 - 2 * t)
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

const render = (s) => {
  const centre = centreAt(s)
  testimonials.forEach((_, i) => place(i, centre))

  const now = Math.round(centre)
  if (active.value !== now) active.value = now
  // The current dot fills across its testimonial's stretch.
  const progress = clamp(s - now, 0.2, 1)
  fills.forEach((fill, i) => {
    if (!fill) return
    const x = i === now ? `${((progress - 1) * 100).toFixed(1)}%` : "-100%"
    if (fillShown[i] !== x) fill.style.transform = `translateX(${x})`
    fillShown[i] = x
  })
}

// Where the scroll is, counted in testimonials' stretches (0 to n).
const measure = () => {
  const top = stage.value.getBoundingClientRect().top
  target = clamp((pinTop - top) / travel, 0, 1) * testimonials.length
}

const tick = (now) => {
  const dt = Math.min((now - (lastTime || now)) / 1000, 0.05)
  lastTime = now
  current += (target - current) * (1 - Math.exp(-dt / SMOOTHING))
  if (reducedMotion || Math.abs(target - current) < 0.0005) current = target
  render(current)
  frame = current === target ? 0 : requestAnimationFrame(tick)
  if (!frame) lastTime = 0
}

const onScroll = () => {
  if (!near) return
  measure()
  if (!frame) frame = requestAnimationFrame(tick)
}

// Sizes only change on resize, so they're read then rather than every frame.
const layout = () => {
  if (!stage.value || !section.value) return
  sectionHeight.value = section.value.offsetHeight
  pinTop = parseFloat(getComputedStyle(section.value).top) || 0
  travel = Math.max(1, stage.value.offsetHeight - section.value.offsetHeight)
  look = window.matchMedia("(min-width: 1024px)").matches ? WIDE : NARROW
  shown = []
  fillShown = []
  measure()
  current = target
  render(current)
}

// Scroll to where testimonial i rests in the centre.
const goTo = (i) => {
  const top =
    stage.value.getBoundingClientRect().top +
    window.scrollY -
    pinTop +
    ((i + 0.3) / testimonials.length) * travel
  window.scrollTo({ top: Math.ceil(top), behavior: "smooth" })
}

let resizeObserver = null
let intersectionObserver = null

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  layout()
  resizeObserver = new ResizeObserver(layout)
  resizeObserver.observe(stage.value)
  resizeObserver.observe(section.value)
  // Only follow the scroll while the section is on or near the screen. Coming
  // back to it after a jump shows it where it should be straight away.
  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      near = entry.isIntersecting
      if (!near) return
      measure()
      current = target
      render(current)
    },
    { rootMargin: "50% 0px" }
  )
  intersectionObserver.observe(stage.value)
  window.addEventListener("scroll", onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  window.removeEventListener("scroll", onScroll)
})
</script>

<style scoped>
.home-testimonials {
  min-height: calc(100svh - 60px);
}
@media (min-width: 768px) {
  .home-testimonials {
    min-height: calc(100svh - 76px);
  }
}

.testimonials-heading {
  font-size: clamp(36px, 4.2vw, 60px);
  line-height: 0.98;
}

/* ---- The stack ---- */
.stack {
  width: min(648px, calc(100% - 40px));
  height: 520px;
}
/* Grows with the screen's height so the whole section still fits when pinned. */
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
/* With reduced motion the script moves the cards in single steps, without gliding. */
@media (prefers-reduced-motion: reduce) {
  .dot {
    transition: none;
  }
}
</style>
