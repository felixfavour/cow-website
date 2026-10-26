<template>
  <!--
    Pins below the navbar on wide screens while the two side cards slide out
    from behind the price ticket and the dark part of the section rises a
    little further into the lavender.
  -->
  <div ref="stage" class="pricing-stage relative bg-[#0C0F19]" :style="stageStyle">
    <section
      ref="section"
      class="home-pricing relative overflow-hidden bg-[#FBF7FF] pb-16 lg:sticky lg:top-[76px] lg:pb-0"
      :style="{ '--s': scale }"
    >
      <!-- The dark part: the top of a very large circle, rising from below. -->
      <svg class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <path ref="maskPath" fill="#0C0F19" />
      </svg>

      <div class="relative mx-auto max-w-[1600px] px-5 pt-16 md:px-10 lg:px-16 lg:pt-[73px]">
        <p class="text-[11px] font-medium uppercase leading-[14px] tracking-[0.08em] text-[#8A41C9]">Pricing</p>
        <RevealText
          as="h2"
          :lines="['You can start for free', 'and pay only when', 'your church needs it.']"
          scrub
          :range="[0.9, 0.35]"
          class="pricing-heading mt-[5px] font-bold text-[#1A1F2E]"
        />
        <a :href="signupUrl" class="pill-btn mt-7">Get started for free</a>
      </div>

      <div class="cluster">
        <!-- Behind the ticket until the scroll brings them out. -->
        <div ref="blueCard" class="side-card side-card-blue">
          <span class="heart" aria-hidden="true"><svg viewBox="0 0 256 256"><path :d="HEART" /></svg></span>
          <p class="side-card-text">
            Save at least 10 minutes every Sunday with Teams by reusing songs added by nearby churches.
          </p>
        </div>
        <div ref="yellowCard" class="side-card side-card-yellow">
          <span class="heart" aria-hidden="true"><svg viewBox="0 0 256 256"><path :d="HEART" /></svg></span>
          <p class="side-card-text mt-[27px]">
            Monthly cost too high? Tell us what your church can afford. We’ll reply in about 30 minutes—or 8½
            hours if we’re asleep.
          </p>
          <a href="/contact" class="pill-btn pill-btn-dark mt-[14px] gap-3">
            Contact us
            <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
              <path
                d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
              />
            </svg>
          </a>
        </div>

        <!-- The price ticket: the card, a perforation, and the stub. -->
        <div class="ticket">
          <div class="ticket-top flex flex-col items-center">
            <PillTabs v-model="cycle" :tabs="cycles" label="Billing period" id-prefix="billing" />
            <div class="price-box">
              <Transition name="price" mode="out-in">
                <p
                  :key="price.whole + price.cents"
                  class="price font-bold text-[#1A1F2E]"
                  :style="{ fontSize: price.size }"
                  :aria-label="`${price.whole}${price.cents ? '.' + price.cents : ''}`"
                >
                  <span aria-hidden="true">{{ price.whole }}</span
                  ><span v-if="price.cents" class="price-cents" aria-hidden="true">.{{ price.cents }}</span>
                </p>
              </Transition>
            </div>
            <p class="billed text-[15px] font-medium uppercase leading-[18px] tracking-[0.04em] text-[#1A1F2E]">
              {{ price.billed }}
            </p>
            <a :href="planUrl" class="pill-btn mt-[35px] w-full max-w-[286px]">Get started</a>
          </div>
          <div ref="perforation" class="perforation" aria-hidden="true"></div>
          <div class="ticket-stub grid place-items-center px-8">
            <p class="max-w-[370px] text-center text-[15px] uppercase leading-[1.25] tracking-[0.02em] text-[#1A1F2E]">
              90% of profits from Teams plan sales go directly to efforts pushing the gospel forward in churches
              across Africa and other regions.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// "You can start for free": the Teams price on a ticket, with two cards that
// slide out from behind it as you scroll. Prices come from the billing API
// (the same plans as /pricing), shown in naira in Nigeria, pounds in the UK
// and dollars elsewhere; until they load, the design's $10 stands in.

const HEART =
  "M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"

// Measured from the design at 1440px: the ticket's left edge sits 99px left of
// the page's centre, and the dark circle's top is 16px above the perforation.
const DESIGN_WIDTH = 1440
const TICKET_OFFSET = 99
const MASK_ABOVE_PERFORATION = 16
const MASK_RADIUS = 4000
const MASK_CORNER = 30
// How much higher the dark part climbs while the section is pinned.
const MASK_RISE = 44
// Scrolling the section stays pinned for (wide screens only).
const PIN_SVH = 80
const SMOOTHING = 0.16

const { mergeUtmsIntoUrl } = useUtm()
const signupUrl = mergeUtmsIntoUrl(
  "https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=home_pricing"
)

// ---- Prices ----

const { plans } = usePricingPlans()
const currency = ref("USD")
const cycle = ref(0) // 0 monthly, 1 annual

const SYMBOLS = { USD: "$", NGN: "₦", GBP: "£" }
const amountOf = (plan) => (plan.amountKobo ?? plan.amountCents ?? 0) / 100
const isYearly = (plan) => /annual|yearly/i.test(plan.alias || "")
const planFor = (yearly) =>
  plans.value?.find((p) => p.currency === currency.value && isYearly(p) === yearly) || null

const discount = computed(() => {
  const monthly = planFor(false)
  const yearly = planFor(true)
  if (!monthly || !yearly) return "10% off"
  const off = Math.round(((amountOf(monthly) * 12 - amountOf(yearly)) / (amountOf(monthly) * 12)) * 100)
  return off > 0 ? `${off}% off` : null
})

const cycles = computed(() => [
  { key: "monthly", label: "Monthly" },
  { key: "annual", label: "Annual", badge: discount.value },
])

const symbol = () => SYMBOLS[currency.value] || ""

// "4999.99" becomes "₦4,999" with "99" set small beside it, as on /pricing.
const split = (amount) => {
  const cents = Math.round(amount * 100)
  const whole = Math.floor(cents / 100)
  const rest = cents % 100
  return { whole: `${symbol()}${whole.toLocaleString("en-US")}`, cents: rest ? String(rest).padStart(2, "0") : "" }
}
const money = (amount) => {
  const { whole, cents } = split(amount)
  return cents ? `${whole}.${cents}` : whole
}

// Annual shows what it comes to per month, with the yearly total underneath.
const price = computed(() => {
  const yearly = cycle.value === 1
  const plan = planFor(yearly)
  let parts
  let billed
  if (!plan) {
    parts = { whole: yearly ? "$9" : "$10", cents: "" }
    billed = yearly ? "Billed annually at $108" : "Billed monthly"
  } else if (yearly) {
    parts = split(amountOf(plan) / 12)
    billed = `Billed annually at ${money(amountOf(plan))}`
  } else {
    parts = split(amountOf(plan))
    billed = "Billed monthly"
  }
  // Longer amounts (naira) step down so they fit the ticket.
  const length = parts.whole.length
  const size = length <= 4 ? "160px" : length <= 6 ? "128px" : "104px"
  return { ...parts, billed, size }
})

const planUrl = computed(() => {
  const plan = planFor(cycle.value === 1)
  const query = plan ? `plan_id=${plan.alias}&` : ""
  return mergeUtmsIntoUrl(
    `https://app.cloudofworship.com/signup?${query}utm_source=marketing_website&utm_medium=home_pricing`
  )
})

// ---- Scroll ----

const stage = ref(null)
const section = ref(null)
const maskPath = ref(null)
const perforation = ref(null)
const blueCard = ref(null)
const yellowCard = ref(null)
const scale = ref(1)
const wide = ref(true)
const sectionHeight = ref(800)

const stageStyle = computed(() => (wide.value ? { height: `calc(${sectionHeight.value}px + ${PIN_SVH}svh)` } : {}))

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

let target = 0
let current = 0
let rafId = 0
let lastTime = 0
let reducedMotion = false

// The dark shape: up from the bottom, round the section's bottom corners, and
// over the top of a circle whose highest point sits just above the perforation.
const drawMask = (rise) => {
  const s = section.value.getBoundingClientRect()
  const p = perforation.value.getBoundingClientRect()
  const W = s.width
  const H = s.height
  const k = W / DESIGN_WIDTH
  const R = MASK_RADIUS * Math.max(k, 0.26)
  const apex = p.top - s.top - MASK_ABOVE_PERFORATION * scale.value - rise * MASK_RISE * scale.value
  const arcY = (x) => apex + R - Math.sqrt(R * R - (x - W / 2) ** 2)
  const r = MASK_CORNER * Math.min(1, k * 1.2)
  const yEdge = arcY(r)
  maskPath.value.setAttribute(
    "d",
    `M0 ${H} L0 ${yEdge - r} Q0 ${yEdge} ${r} ${yEdge} A${R} ${R} 0 0 1 ${W - r} ${yEdge} Q${W} ${yEdge} ${W} ${yEdge - r} L${W} ${H} Z`
  )
}

// The side cards, from tucked behind the ticket to their places.
const placeCards = (c) => {
  const blue = reducedMotion ? 1 : smooth(0.1, 0.6, c)
  const yellow = reducedMotion ? 1 : smooth(0.2, 0.7, c)
  if (wide.value) {
    blueCard.value.style.transform = `translate3d(${(260 * (1 - blue)).toFixed(1)}px, ${(-12 * (1 - blue)).toFixed(1)}px, 0) rotate(${(-4.8 * blue).toFixed(2)}deg)`
    yellowCard.value.style.transform = `translate3d(${(-290 * (1 - yellow)).toFixed(1)}px, ${(10 * (1 - yellow)).toFixed(1)}px, 0) rotate(${(6.5 * yellow).toFixed(2)}deg)`
  } else {
    blueCard.value.style.transform = `translate3d(0, ${(-60 * (1 - blue)).toFixed(1)}px, 0) rotate(${(-2.5 * blue).toFixed(2)}deg)`
    yellowCard.value.style.transform = `translate3d(0, ${(-60 * (1 - yellow)).toFixed(1)}px, 0) rotate(${(2.5 * yellow).toFixed(2)}deg)`
    blueCard.value.style.opacity = blue.toFixed(3)
    yellowCard.value.style.opacity = yellow.toFixed(3)
  }
}

const render = () => {
  if (!section.value || !perforation.value) return
  placeCards(current)
  drawMask(current)
}

const measureTarget = () => {
  if (!stage.value || !section.value) return
  if (wide.value) {
    // How far through its pinned stretch the section is.
    const pinTop = parseFloat(getComputedStyle(section.value).top) || 0
    const travel = stage.value.offsetHeight - section.value.offsetHeight
    target = clamp01((pinTop - stage.value.getBoundingClientRect().top) / travel)
  } else {
    // Narrow screens don't pin: the cards come in as the stub's bottom rises
    // through the screen.
    const vh = window.innerHeight
    const top = perforation.value.getBoundingClientRect().top
    target = clamp01((vh * 0.85 - top) / (vh * 0.5))
  }
}

const tick = (now) => {
  const dt = Math.min((now - (lastTime || now)) / 1000, 0.05)
  lastTime = now
  current += (target - current) * (1 - Math.exp(-dt / SMOOTHING))
  if (Math.abs(target - current) < 0.0005) current = target
  render()
  rafId = current === target ? 0 : requestAnimationFrame(tick)
  if (!rafId) lastTime = 0
}

const onScroll = () => {
  measureTarget()
  if (reducedMotion) {
    current = target
    render()
    return
  }
  if (!rafId) rafId = requestAnimationFrame(tick)
}

const onResize = () => {
  wide.value = window.innerWidth >= 1024
  scale.value = wide.value ? Math.min(1, window.innerWidth / DESIGN_WIDTH) : 1
  if (!wide.value && blueCard.value) {
    blueCard.value.style.opacity = ""
    yellowCard.value.style.opacity = ""
  }
  nextTick(() => {
    measureTarget()
    render()
  })
}

let resizeObserver = null

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
  watch(
    plans,
    (list) => {
      if (!list?.length) return
      const has = (c) => list.some((p) => p.currency === c)
      currency.value = zone === "Africa/Lagos" && has("NGN") ? "NGN" : zone === "Europe/London" && has("GBP") ? "GBP" : "USD"
    },
    { immediate: true }
  )
  sectionHeight.value = section.value.offsetHeight
  onResize()
  measureTarget()
  current = target
  render()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onResize)
  resizeObserver = new ResizeObserver(() => {
    sectionHeight.value = section.value.offsetHeight
    measureTarget()
    render()
  })
  resizeObserver.observe(section.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onResize)
})
</script>

<style scoped>
/* Fills the screen below the navbar while pinned. */
@media (min-width: 1024px) {
  .home-pricing {
    height: max(800px, calc(100svh - 76px));
  }
}

.pricing-heading {
  font-size: clamp(36px, 3.7vw, 52px);
  line-height: 0.98;
}

/* ---- The cards ---- */
/* Narrow screens: the ticket first, then the two cards under it. */
.cluster {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 40px auto 0;
  width: calc(100% - 40px);
  max-width: 458px;
}
.cluster .ticket {
  order: -1;
}
@media (min-width: 1024px) {
  /* Placed as in the design, and scaled down with the page below 1440px. */
  .cluster {
    display: block;
    position: absolute;
    top: 131px;
    left: calc(50% - 99px * var(--s));
    width: 458px;
    max-width: none;
    margin: 0;
    transform: scale(var(--s));
    transform-origin: 0 0;
  }
}

.ticket {
  position: relative;
  z-index: 2;
}
.ticket-top {
  background: #fff;
  border-radius: 24px 24px 16px 16px;
  padding: 35px 24px 56px;
}
/* A row of white bridges with the dark part showing between them. */
.perforation {
  height: 3px;
  margin: 0 16px;
  background: repeating-linear-gradient(to right, #fff 0 4px, #0c0f19 4px 8px);
}
.ticket-stub {
  min-height: 160px;
  background: #fff;
  border-radius: 16px 16px 24px 24px;
}
/* A fixed height, so the ticket keeps its shape whatever the currency. */
.price-box {
  display: grid;
  place-items: center;
  height: 160px;
  margin-top: 41px;
}
.price,
.price span {
  font-family: var(--heading-font);
}
.price {
  line-height: 1;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.price-cents {
  font-size: 0.4em;
  vertical-align: 1.05em;
  margin-left: 0.04em;
}
.billed {
  margin-top: 14px;
}

.side-card {
  border-radius: 20px;
  color: #1a1f2e;
  margin-top: 24px;
  padding: 18px 26px 18px;
  will-change: transform;
}
.side-card-blue {
  background: #e2f0ff;
  display: flex;
  min-height: 196px;
  flex-direction: column;
  justify-content: space-between;
}
.side-card-yellow {
  background: #fdefd4;
  padding: 23px 26px 24px;
}
@media (min-width: 1024px) {
  .side-card {
    position: absolute;
    z-index: 1;
    margin: 0;
  }
  /* Positions relative to the ticket, from the design. */
  .side-card-blue {
    left: -253px;
    top: 252px;
    width: 330px;
    height: 196px;
  }
  .side-card-yellow {
    left: 446px;
    top: 193px;
    width: 284px;
  }
}
.side-card-text {
  font-size: 16px;
  line-height: 1.26;
  max-width: 232px;
}
.heart {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  background: #fff;
}
.heart svg {
  width: 20px;
  height: 20px;
  fill: #1b1f2e;
}

/* The price blurs out and back in when the billing period changes. */
.price-enter-active,
.price-leave-active {
  transition: opacity 0.2s ease, filter 0.2s ease, transform 0.2s ease;
}
.price-enter-from,
.price-leave-to {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(6px);
}
</style>
