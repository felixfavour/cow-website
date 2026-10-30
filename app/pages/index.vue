<template>
  <div class="page">
    <!-- HERO: pinned while the light horizon scrolls up over it -->
    <div ref="stage" class="hero-stage relative h-[230svh] -mt-[60px] md:-mt-[76px]">
      <section class="hero sticky top-0 h-[100svh] overflow-hidden bg-[#101010]" :class="{ entering, mounted }">
        <HeroSlideWall
          :clear-to="heroText"
          :progress="progress"
          :covered="progress >= 0.99"
          :held="!textSettled"
          class="absolute inset-0"
        />
        <div
          class="stack-fade absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#101010] from-60% to-transparent pointer-events-none"
        ></div>
        <div
          class="relative mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16 h-full flex flex-col justify-end pb-[clamp(56px,15.5vh,140px)] pointer-events-none"
        >
          <div ref="heroText" class="w-fit pointer-events-auto">
            <RevealText
              ref="heading"
              as="h1"
              :lines="['Run your church', 'media projection easily']"
              by="words"
              effect="focus"
              immediate
              :stagger="0.12"
              :delay="0.15"
              class="hero-reveal text-white font-bold text-[60px] md:text-[76px] lg:text-[90px] leading-[0.943] tracking-[-0.02em]"
            />
            <div class="exit-slot mt-[22px]">
              <div ref="subtext">
                <RevealText
                  as="p"
                  by="words"
                  :lines="[subcopy]"
                  effect="focus"
                  immediate
                  :stagger="0.04"
                  :delay="0.7"
                  class="hero-reveal max-w-[372px] text-[18px] leading-[1.19] text-[#B7B7B7]"
                />
              </div>
            </div>
            <div class="exit-slot -mx-6 mt-[44px] px-6 pt-[8px] pb-[26px] -mb-[26px]">
              <a
                ref="cta"
                :href="
                  mergeUtmsIntoUrl(
                    'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=hero'
                  )
                "
                class="hero-cta pill-btn"
              >
                Get started for free
              </a>
            </div>
          </div>
        </div>

        <!-- The horizon: dark, then brand purple, then lavender, then white. -->
        <div
          class="horizon absolute inset-x-0 top-0 h-[250svh] pointer-events-none"
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

    <!--
      On narrow screens the numbers come after the photo section rather than
      beside it. They sit outside the box above, so the section has let go of
      the screen before they arrive; inside it, the pinned section stayed put
      while they scrolled across its photo and avatars.
    -->
    <div class="bg-[#FBF7FF] px-5 pb-20 pt-4 md:px-10 lg:hidden">
      <HomeStats auto />
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

const subcopy =
  "Your sub-1000 church congregation doesn't need overly complex software or overburdened volunteers."

// On load the headline, then the subtext, come into focus word by word (see
// the delays and staggers on their RevealText).
const mounted = ref(false)

// True while the text writes in and the button fades in after it. The slots
// stop clipping meanwhile, so the blurred letters aren't cut off square.
const entering = ref(true)
const ENTRANCE_MS = 2600 // when the subtext's last word is sharp
let entranceTimer = 0
// The slide wall waits for the text to settle, then sweeps in with the button.
const textSettled = ref(false)
const TEXT_MS = 1900 // when the text reads as settled
let textTimer = 0

const heading = ref(null)
const subtext = ref(null)
const cta = ref(null)

// 0 while the hero is untouched, 1 once the horizon has covered it. The hero
// stays pinned for 1.3 screens of scrolling while this runs.
const progress = ref(0)

// The horizon starts just below the screen and rises to cover it; its white
// part begins 80% of a screen down its height, so it ends 12svh above the top.
// It rises fast enough that the screen is white before the features section
// (80svh up into this stage) climbs into view, so that section's top edge
// never cuts across the purple.
const horizonY = computed(() => 100 - 190 * progress.value)

const navTheme = useState("navTheme", () => "dark")

const clamp01 = (v) => Math.min(1, Math.max(0, v))

// The headline, then the subtext and button, slide up out of their slots one
// after another during the first part of the scroll.
const EXIT_START = 0.015
const EXIT_LENGTH = 0.17
const EXIT_STAGGER = 0.04

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
  navTheme.value = progress.value > 0.82 ? "light" : "dark"
}

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(update)
}

const seoTitle = "Cloud of Worship - Run your church media projection easily"
const seoDescription =
  "Free, browser-based presentation software for churches under 1,000. Put scripture, songs, hymns and videos on screen in seconds, even when the Wi-Fi drops."

useHead({
  title: seoTitle,
})
useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com",
  ogType: "website",
  ogLocale: "en_US",
})

useOgCard("home")

onMounted(() => {
  mounted.value = true
  entranceTimer = setTimeout(() => (entering.value = false), ENTRANCE_MS)
  textTimer = setTimeout(() => (textSettled.value = true), TEXT_MS)
  lines = heading.value ? [...heading.value.$el.querySelectorAll(".reveal-line-inner")] : []
  update()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)

  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }
})

onBeforeUnmount(() => {
  clearTimeout(entranceTimer)
  clearTimeout(textTimer)
  cancelAnimationFrame(frame)
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
  navTheme.value = "dark"
})
</script>

<style scoped>
/* The fade that keeps the wall from showing through the text is for layouts
   that stack the text under the wall: phones, and tablets held upright. Wide
   landscape screens put the wall beside the text instead (see isWide in
   HeroSlideWall). */
@media (min-width: 768px) and (orientation: landscape) {
  .stack-fade {
    display: none;
  }
}

.exit-slot {
  overflow: hidden;
}
/* Each headline line slides up out of its own slot (RevealText's lines) on
   the way out. Focus text leaves its slots unclipped, so clip them again
   once the text has written in. */
.hero:not(.entering) :deep(.reveal-line) {
  overflow: hidden;
}
.exit-slot > * {
  will-change: transform;
}

/* Keep the text out of sight until the page is live and its words can
   start coming into focus. The button fades
   in once the text has settled (TEXT_MS). */
.hero:not(.mounted) .hero-reveal {
  opacity: 0;
}
.entering .exit-slot {
  overflow: visible;
}
.hero-cta {
  animation: fade-in 0.6s ease-out 1.9s backwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-cta {
    animation: none;
  }
}

/* Bowl-shaped: the edge sits higher at the sides than in the middle, like the
   rim of a planet seen from just above it. The ellipse is wider than the
   screen so its top edge stays clear all the way across. It settles on pure
   white before the ellipse ends, so the light navbar and the white features
   section meet it without a lavender band between them. */
.horizon {
  will-change: transform;
  background: radial-gradient(
    ellipse 110% 32% at 50% 0%,
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
