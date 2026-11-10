<template>
  <div class="page feature-page">
    <!--
      HERO: plain white. A headline, one action, and the product floating on a
      pastel stage with two small notes drifting beside it. Each feature has
      its own pastel, so the pages feel like siblings.
    -->
    <section class="bg-white text-[#0C0F19]">
      <div
        class="mx-auto grid max-w-[1600px] items-center gap-12 px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:px-16"
      >
        <div>
          <p class="fp-eyebrow">
            <span class="fp-eyebrow-disc" aria-hidden="true">
              <component :is="feature.icon" weight="fill" />
            </span>
            {{ feature.name }}
          </p>

          <RevealText
            as="h1"
            :lines="feature.headline"
            by="words"
            effect="focus"
            immediate
            :stagger="0.08"
            :delay="0.1"
            class="fp-h1 mt-6 font-bold"
          />

          <p class="fp-lede mt-6">{{ feature.lede }}</p>

          <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a :href="signupUrl" class="pill-btn fp-cta">Get started for free</a>
            <a href="#sunday" class="fp-link">See how it goes on Sunday</a>
          </div>
        </div>

        <!-- The picture: no text selection, no dragging, no I-beam. -->
        <div class="fp-visual" :style="{ background: feature.tint }">
          <FeatureArt :kind="feature.art" :label="feature.imageAlt" />
        </div>
      </div>
    </section>

    <!-- THREE FACTS, set like the homepage numbers -->
    <section class="bg-white text-[#0C0F19]">
      <dl
        class="mx-auto grid max-w-[1600px] gap-x-10 gap-y-10 px-5 pb-20 md:grid-cols-3 md:px-10 md:pb-28 lg:px-16"
      >
        <div v-for="(fact, i) in feature.facts" :key="fact.value" class="fp-fact" :class="{ strong: i === 0 }">
          <dt class="fp-fact-value">{{ fact.value }}</dt>
          <dd class="fp-fact-label">{{ fact.label }}</dd>
        </div>
      </dl>
    </section>

    <!--
      THE RUN SHEET: the same shape for every feature. Three moments from a
      real Sunday, on a timeline, each in its own pastel.
    -->
    <section id="sunday" class="fp-sunday bg-[#FBF7FF] text-[#0C0F19]">
      <div
        class="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-16 lg:py-36"
      >
        <div class="lg:sticky lg:top-[120px] lg:self-start">
          <RevealText as="h2" :lines="feature.momentsTitle" class="fp-h2 font-bold" />
          <p class="fp-intro mt-6 max-w-[380px]">
            Here is how {{ feature.name }} fits into the run of a real service.
          </p>
        </div>

        <ol class="fp-timeline">
          <li v-for="(m, i) in feature.moments" :key="m.title" class="fp-moment">
            <span class="fp-time">{{ clock(m.time).main }}<small v-if="clock(m.time).suffix">{{ clock(m.time).suffix }}</small></span>
            <div class="fp-card" :style="{ background: pastels[i % pastels.length] }">
              <h3 class="fp-card-title">{{ m.title }}</h3>
              <p class="mt-3">{{ m.body }}</p>
              <a v-if="m.link" :href="m.link.href" class="fp-card-link">{{ m.link.label }}</a>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- QUESTIONS -->
    <section class="bg-white text-[#0C0F19]">
      <div
        class="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-16 lg:py-36"
      >
        <RevealText
          as="h2"
          :lines="['Questions,', 'answered.']"
          class="fp-h2 font-bold lg:sticky lg:top-[120px] lg:self-start"
        />
        <div class="fp-faqs">
          <details v-for="faq in feature.faqs" :key="faq.question" class="fp-faq">
            <summary @click.prevent="toggleFaq">
              <h3>{{ faq.question }}</h3>
              <span class="fp-plus" aria-hidden="true"><PhPlus weight="bold" /></span>
            </summary>
            <div class="fp-faq-body"><p>{{ faq.answer }}</p></div>
          </details>
        </div>
      </div>
    </section>

    <!-- THE REST OF THE SET -->
    <section class="bg-[#FBF7FF] text-[#0C0F19]">
      <div
        class="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <RevealText as="h2" :lines="['More for your', 'Sunday']" class="fp-h2 font-bold" />
        <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <li v-for="other in others" :key="other.slug">
            <a :href="`/features/${other.slug}`" class="fp-more" :style="{ background: other.tint }">
              <span class="fp-more-disc" aria-hidden="true">
                <component :is="other.icon" weight="fill" />
              </span>
              <span class="fp-more-name">{{ other.name }}</span>
              <PhArrowRight class="fp-more-arrow" weight="bold" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- CLOSING POSTER -->
    <section ref="poster" class="fp-poster relative overflow-hidden">
      <div class="fp-rings" aria-hidden="true"></div>
      <div
        class="relative mx-auto flex max-w-[1600px] flex-col gap-10 px-5 py-20 md:px-10 md:py-28 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-32"
      >
        <h2 class="fp-display">
          <span class="sr-only">{{ posterText }}</span>
          <span v-for="(line, l) in posterLines" :key="l" class="fp-line" aria-hidden="true">
            <template v-for="(word, w) in line" :key="w">
              <span :class="word.thin ? 'thin' : 'heavy'">{{ word.text }}</span>
              {{ " " }}
            </template>
          </span>
        </h2>
        <div class="flex flex-wrap items-center gap-x-7 gap-y-5 lg:flex-nowrap lg:pb-3">
          <a :href="signupUrl" class="pill-btn pill-btn-dark">Get started for free</a>
          <a href="/pricing" class="fp-poster-link">See pricing</a>
        </div>
      </div>
    </section>

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
import { PhArrowRight, PhPlus } from "@phosphor-icons/vue"
import { features } from "~/data/features"

const props = defineProps({
  feature: { type: Object, required: true },
})

const { mergeUtmsIntoUrl } = useUtm()
const showTestimonialPopup = ref(false)

const signupUrl = computed(() =>
  mergeUtmsIntoUrl(
    `https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=${props.feature.utm}`
  )
)

// The system's pastels, in its order.
const pastels = ["#E2F0FF", "#FDEFD4", "#FFE9E8", "#E3F5E9"]

const others = computed(() =>
  Object.values(features).filter((f) => f.slug !== props.feature.slug)
)

// "Find the verse *before*" -> heavy words, with the starred ones thin.
const posterLines = computed(() =>
  props.feature.poster.map((line) =>
    line.split(" ").map((w) =>
      w.startsWith("*") ? { text: w.replace(/\*/g, ""), thin: true } : { text: w, thin: false }
    )
  )
)
const posterText = computed(() => props.feature.poster.join(" ").replace(/\*/g, ""))

// "10:08 AM" -> big "10:08" with a small "AM"; "Thu" and "Any day" stay whole.
const clock = (t) => {
  const m = /^(\d{1,2}:\d{2}) (AM|PM)$/.exec(t)
  return m ? { main: m[1], suffix: m[2] } : { main: t, suffix: "" }
}

// The FAQ opens and closes on the system's easing, animating height.
const toggleFaq = (e) => {
  const d = e.currentTarget.parentElement
  const body = d.querySelector(".fp-faq-body")
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  body.getAnimations().forEach((a) => a.cancel())
  const ease = "cubic-bezier(0.2, 0.7, 0.2, 1)"
  if (!d.open) {
    d.open = true
    if (still) return
    const h = body.offsetHeight
    body.animate({ height: ["0px", `${h}px`], opacity: [0, 1] }, { duration: 450, easing: ease })
  } else {
    if (still) {
      d.open = false
      return
    }
    d.classList.add("closing")
    const h = body.offsetHeight
    const a = body.animate({ height: [`${h}px`, "0px"], opacity: [1, 0] }, { duration: 350, easing: ease })
    a.onfinish = () => {
      d.open = false
      d.classList.remove("closing")
    }
  }
}

const { feature } = props
const url = `https://cloudofworship.com/features/${feature.slug}`

useHead({
  title: feature.seoTitle,
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: feature.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }),
    },
  ],
})
useSeoMeta({
  title: feature.seoTitle,
  ogTitle: feature.seoTitle,
  description: feature.description,
  ogDescription: feature.description,
  ogSiteName: "Cloud of Worship",
  ogUrl: url,
  ogType: "website",
  ogLocale: "en_US",
})
useOgCard(feature.ogCard)

// The navbar follows the purple closing poster as it passes under the bar.
const poster = ref(null)
const navPoster = useState("navPoster", () => null)

const updateNav = () => {
  const line = window.innerWidth >= 768 ? 76 : 60
  const el = poster.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  navPoster.value = rect.top < line && rect.bottom > line
}

onMounted(() => {
  updateNav()
  window.addEventListener("scroll", updateNav, { passive: true })
  window.addEventListener("resize", updateNav, { passive: true })

  const local = location.hostname === "localhost" || location.hostname === "127.0.0.1"
  if (!local) {
    useGtag()
    if (window.innerWidth >= 768) showTestimonialPopup.value = true
  }
})
onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateNav)
  window.removeEventListener("resize", updateNav)
  navPoster.value = null
})
</script>

<style scoped>
/* ---- Hero ---- */
.fp-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 18px 5px 5px;
  border-radius: 9999px;
  background: #f6e8ff;
  font-size: 15px;
  font-weight: 600;
  color: #3b0764;
}
.fp-eyebrow-disc {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9999px;
  background: #fff;
  color: #1b1f2e;
  font-size: 18px;
}
.fp-h1 {
  font-size: 56px;
  line-height: 0.92;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .fp-h1 {
    font-size: 84px;
  }
}
@media (min-width: 1280px) {
  .fp-h1 {
    font-size: 92px;
  }
}
.fp-lede {
  max-width: 580px;
  font-size: 19px;
  line-height: 1.4;
  color: #4b5263;
}
@media (min-width: 1024px) {
  .fp-lede {
    font-size: 21px;
  }
}
.fp-cta {
  height: 52px;
  padding: 0 30px;
  font-size: 17px;
}
.fp-link {
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}
.fp-link:hover {
  color: #6b17a9;
}

/* The stage the product floats on. */
.fp-visual {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1.55 / 1;
  border-radius: 28px;
  padding: 5%;
  user-select: none;
  -webkit-user-select: none;
  cursor: default;
}
/* ---- Facts ---- */
.fp-fact {
  padding-top: 20px;
  border-top: 1px solid rgba(12, 15, 25, 0.15);
}
.fp-fact.strong {
  border-top-color: #0c0f19;
}
.fp-fact-value {
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: clamp(52px, 7vw, 96px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: #1a1f2e;
}
.fp-fact-label {
  margin-top: 12px;
  max-width: 300px;
  font-size: 18px;
  line-height: 1.3;
  color: #4b5263;
}

/* ---- Section type ---- */
.fp-h2 {
  font-size: 52px;
  line-height: 0.95;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .fp-h2 {
    font-size: 76px;
  }
}
@media (min-width: 1024px) {
  .fp-h2 {
    font-size: 72px;
  }
}
@media (min-width: 1280px) {
  .fp-h2 {
    font-size: 84px;
  }
}
.fp-intro {
  font-size: 19px;
  line-height: 1.4;
  color: #4b5263;
}

/* ---- Run sheet ---- */
.fp-sunday {
  scroll-margin-top: 60px;
}
@media (min-width: 768px) {
  .fp-sunday {
    scroll-margin-top: 76px;
  }
}
.fp-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.fp-moment {
  display: grid;
  gap: 10px;
}
@media (min-width: 768px) {
  .fp-moment {
    grid-template-columns: 170px minmax(0, 1fr);
    gap: 24px;
  }
  .fp-moment {
    position: relative;
  }
  /* The dashed line runs from one dot to the next, so it starts at the first
     dot and ends at the last (there is none after the final moment). */
  .fp-moment:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 154px;
    top: 41px;
    height: calc(100% + 20px);
    width: 2px;
    background: repeating-linear-gradient(
      to bottom,
      rgba(138, 65, 201, 0.5) 0 6px,
      transparent 6px 12px
    );
  }
}
.fp-time {
  position: relative;
  align-self: start;
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: 44px;
  line-height: 1;
  letter-spacing: -0.01em;
  color: #8a41c9;
  padding-top: 20px;
}
@media (min-width: 768px) {
  .fp-time {
    font-size: 50px;
  }
  .fp-time::after {
    content: "";
    position: absolute;
    right: 8px;
    top: 34px;
    width: 14px;
    height: 14px;
    border-radius: 9999px;
    background: #8a41c9;
    box-shadow: 0 0 0 5px #fbf7ff;
    z-index: 1;
  }
}
.fp-time small {
  margin-left: 6px;
  font-size: 0.4em;
  letter-spacing: 0.04em;
}
.fp-card {
  border-radius: 20px;
  padding: 24px 26px 28px;
  color: #1a1f2e;
  font-size: 17px;
  line-height: 1.4;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.fp-card:hover {
  transform: translateY(-4px);
}
@media (min-width: 1024px) {
  .fp-card {
    padding: 30px 34px 34px;
    font-size: 18px;
  }
}
.fp-card-title {
  font-weight: 800;
  font-size: 34px;
  line-height: 1;
  letter-spacing: -0.01em;
}
@media (min-width: 1024px) {
  .fp-card-title {
    font-size: 40px;
  }
}
.fp-card-link {
  display: inline-block;
  margin-top: 16px;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}
.fp-card-link:hover {
  color: #6b17a9;
}
@media (prefers-reduced-motion: reduce) {
  .fp-card {
    transition: none;
  }
}

/* ---- Questions ---- */
.fp-faq {
  border-top: 1px solid rgba(12, 15, 25, 0.15);
}
.fp-faq:last-child {
  border-bottom: 1px solid rgba(12, 15, 25, 0.15);
}
.fp-faq summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 0;
  cursor: pointer;
  list-style: none;
}
.fp-faq summary::-webkit-details-marker {
  display: none;
}
.fp-faq summary h3 {
  font-weight: 800;
  font-size: 28px;
  line-height: 1.05;
  letter-spacing: -0.01em;
}
@media (min-width: 768px) {
  .fp-faq summary h3 {
    font-size: 34px;
  }
}
.fp-plus {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: #f6e8ff;
  color: #3b0764;
  font-size: 18px;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1), background 0.2s;
}
.fp-faq summary:hover .fp-plus {
  background: #e9d5ff;
}
.fp-faq[open]:not(.closing) .fp-plus {
  transform: rotate(45deg);
}
.fp-faq summary:focus-visible {
  outline: 2px solid #c084fc;
  outline-offset: 4px;
}
.fp-faq-body {
  overflow: hidden;
}
.fp-faq p {
  max-width: 640px;
  padding: 0 64px 28px 0;
  font-size: 18px;
  line-height: 1.5;
  color: #4b5263;
}

/* ---- More features ---- */
.fp-more {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 22px 16px 16px;
  border-radius: 20px;
  color: #1a1f2e;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.fp-more:hover {
  transform: translateY(-4px);
}
.fp-more-disc {
  display: grid;
  place-items: center;
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  background: #fff;
  color: #1b1f2e;
  font-size: 22px;
}
.fp-more-name {
  flex: 1;
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: 28px;
  line-height: 1;
  letter-spacing: -0.01em;
}
.fp-more-arrow {
  flex: none;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.fp-more:hover .fp-more-arrow {
  transform: translateX(4px);
}

/* ---- Closing poster ---- */
.fp-poster {
  background: #a855f7;
  color: #0c0f19;
}
.fp-rings {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 50% 70% at 10% 100%, rgba(216, 180, 254, 0.5), transparent 70%),
    repeating-radial-gradient(
      circle at 10% 100%,
      transparent 0 64px,
      rgba(12, 15, 25, 0.1) 64px 66px
    );
}
.fp-display {
  font-size: min(19vw, 150px);
  line-height: 0.9;
  letter-spacing: -0.01em;
  text-wrap: balance;
}
.fp-line {
  display: block;
}
.heavy {
  font-weight: 800;
}
.thin {
  font-weight: 200;
}
.fp-poster-link {
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}
.fp-poster-link:hover {
  color: #fff;
}
</style>
