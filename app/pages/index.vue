<template>
  <div class="page">
    <!-- HERO: pinned while the light horizon scrolls up over it -->
    <div ref="stage" class="hero-stage relative h-[200svh] -mt-[60px] md:-mt-[76px]">
      <section class="hero sticky top-0 h-[100svh] overflow-hidden bg-[#101010]">
        <HeroSlideWall :clear-to="heroText" :covered="progress >= 0.99" class="absolute inset-0" />
        <div
          class="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#101010] from-60% to-transparent pointer-events-none md:hidden"
        ></div>
        <div
          class="relative mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16 h-full flex flex-col justify-end pb-[clamp(56px,15.5vh,140px)] pointer-events-none"
        >
          <div ref="heroText" class="w-fit pointer-events-auto">
            <h1
              ref="heading"
              class="text-white font-bold text-[60px] md:text-[76px] lg:text-[90px] leading-[0.943] tracking-[-0.02em]"
            >
              <span class="line-slot"><span class="line">Run your church</span></span>
              <span class="line-slot"><span class="line">media projection easily</span></span>
            </h1>
            <div class="exit-slot mt-[22px]">
              <p ref="subtext" class="max-w-[372px] text-[18px] leading-[1.19] text-[#B7B7B7]">
                Your sub-1000 church congregation doesn't need overly complex
                software or overburdened volunteers.
              </p>
            </div>
            <div class="exit-slot -mx-6 mt-[44px] px-6 pt-[8px] pb-[26px] -mb-[26px]">
              <a
                ref="cta"
                :href="
                  mergeUtmsIntoUrl(
                    'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=hero'
                  )
                "
                class="pill-btn"
              >
                Get started for free
              </a>
            </div>
          </div>
        </div>

        <!-- The horizon: dark, then brand purple, then lavender, then white. -->
        <div
          class="horizon absolute inset-x-0 top-0 h-[200svh] pointer-events-none"
          :style="{ transform: `translateY(${horizonY}svh)` }"
          aria-hidden="true"
        ></div>
      </section>
    </div>

    <!--
      One box for these three, so the photo section can stick to the bottom of
      the screen behind the two above it (and never behind the hero).
    -->
    <div class="relative">
      <HomeFeatures />

      <HomeProjection />

      <HomeFamiliar />
    </div>

    <HomePricing />

    <HomeTestimonials />

    <!--
      One box for these, so the last section can sit pinned under the church
      rows and then under the footer. The footer is pulled up over the space
      the section leaves after itself (see .footer-over in app.vue).
    -->
    <div class="relative">
      <HomeChurches />

      <HomeCta />
    </div>
  </div>
</template>

<script setup>
const { mergeUtmsIntoUrl } = useUtm()
const heroText = ref(null)
const stage = ref(null)
const heading = ref(null)
const subtext = ref(null)
const cta = ref(null)

// 0 while the hero is untouched, 1 once the horizon has covered it. The hero
// stays pinned for one screen of scrolling while this runs.
const progress = ref(0)

// The horizon starts just below the screen and rises to cover it; its white
// part begins 80% of a screen down its height, so it ends 80svh above the top.
const horizonY = computed(() => 100 - 180 * progress.value)

const navTheme = useState("navTheme", () => "dark")

const clamp01 = (v) => Math.min(1, Math.max(0, v))

// The headline, then the subtext and button, slide up out of their slots one
// after another during the first part of the scroll.
const EXIT_START = 0.02
const EXIT_LENGTH = 0.22
const EXIT_STAGGER = 0.05

let lines = []
let frame = 0

const update = () => {
  frame = 0
  const el = stage.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const travel = el.offsetHeight - window.innerHeight
  progress.value = clamp01(-rect.top / travel)

  const items = [...lines, subtext.value, cta.value]
  items.forEach((item, i) => {
    if (!item) return
    const t = clamp01((progress.value - EXIT_START - i * EXIT_STAGGER) / EXIT_LENGTH)
    const eased = t * t * (3 - 2 * t)
    item.style.transform = eased ? `translateY(${-118 * eased}%)` : ""
  })

  // The bar goes light once the white part of the horizon reaches it.
  navTheme.value = progress.value > 0.86 ? "light" : "dark"
}

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(update)
}

useHead({
  title: "Cloud of Worship - Presentation software for your growing church",
})
useSeoMeta({
  title: "Cloud of Worship - Presentation software for your growing church",
  ogTitle: "Cloud of Worship - Presentation software for your growing church",
  description:
    "Run your church media smoothly, without the heavy setup. Cloud of Worship is a free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides for your growing church.",
  ogDescription:
    "Run your church media smoothly, without the heavy setup. Cloud of Worship is a free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides for your growing church.",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com",
  ogType: "website",
  ogLocale: "en_US",
})

useOgCard("home")

onMounted(() => {
  lines = heading.value ? [...heading.value.querySelectorAll(".line")] : []
  update()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)

  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
  navTheme.value = "dark"
})
</script>

<style scoped>
.exit-slot {
  overflow: hidden;
}
/* Each headline line slides up out of its own slot; the padding keeps
   descenders inside it. */
.line-slot {
  display: block;
  overflow: hidden;
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
}
.line {
  display: block;
  will-change: transform;
}
.exit-slot > * {
  will-change: transform;
}

/* Bowl-shaped: the edge sits higher at the sides than in the middle, like the
   rim of a planet seen from just above it. The ellipse is wider than the
   screen so its top edge stays clear all the way across. It settles on pure
   white before the ellipse ends, so the light navbar and the white features
   section meet it without a lavender band between them. */
.horizon {
  will-change: transform;
  background: radial-gradient(
    ellipse 110% 40% at 50% 0%,
    rgba(16, 16, 16, 0) 0%,
    rgba(16, 16, 16, 0) 52%,
    rgba(30, 10, 52, 0.92) 64%,
    #4c1d95 72%,
    #8a41c9 79%,
    #d8b4fe 86%,
    #f6e8ff 92%,
    #ffffff 97%
  );
}
</style>
