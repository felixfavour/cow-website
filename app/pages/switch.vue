<template>
  <div class="page switch-page">
    <!-- HERO -->
    <section class="bg-white text-[#0C0F19]">
      <div
        class="mx-auto grid max-w-[1600px] items-center gap-12 px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:px-16"
      >
        <div>
          <a :href="trustpilot.url" target="_blank" rel="noopener" class="hero-badge">
            <svg class="badge-star" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.7l7.1-.6z"
                fill="currentColor"
              />
            </svg>
            <span class="badge-text">Top-rated open source tool &middot; {{ trustpilot.rating.toFixed(1) }} on Trustpilot</span>
            <PhCaretRight class="badge-arrow" weight="bold" aria-hidden="true" />
          </a>

          <RevealText
            as="h1"
            :lines="['Looking to', 'make the switch?']"
            by="words"
            effect="focus"
            immediate
            :stagger="0.08"
            :delay="0.1"
            class="sw-h1 mt-6 font-bold"
          />

          <p class="sw-lede mt-6">
            Put your Bible, songs and slides on screen from any browser, free to
            start and ready before Sunday.
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a :href="signupUrl" class="pill-btn sw-cta" @click="track('SWITCH_CTA_CLICKED', { position: 'hero' })">
              Get started for free
            </a>
            <a href="#compare" class="sw-link">See the comparison</a>
          </div>
        </div>

        <div class="sw-visual" style="background: #E2F0FF">
          <FeatureArt kind="browser" label="Cloud of Worship running in a browser window" />
        </div>
      </div>
    </section>

    <!-- COMPARISON TABLE -->
    <section id="compare" class="sw-compare bg-[#FBF7FF] text-[#0C0F19]">
      <div class="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <RevealText as="h2" :lines="['How it stacks up']" class="sw-h2 font-bold" />
        <p class="sw-intro mt-6 max-w-[520px]">
          A plain look at what each tool asks of your tech team, not just a features list.
        </p>

        <div class="sw-table-wrap mt-12">
          <table class="sw-table">
            <thead>
              <tr>
                <th scope="col" class="sw-th-label"></th>
                <th scope="col" class="sw-th-us">Cloud of Worship</th>
                <th scope="col">ProPresenter</th>
                <th scope="col">EasyWorship</th>
                <th scope="col">Proclaim</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonRows" :key="row.label">
                <th scope="row">{{ row.label }}</th>
                <td class="sw-td-us"><CellValue :value="row.us" strong /></td>
                <td><CellValue :value="row.proPresenter" /></td>
                <td><CellValue :value="row.easyWorship" /></td>
                <td><CellValue :value="row.proclaim" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="sw-footnote mt-6">
          Based on each product's public pricing and feature pages as of late 2026. Platforms and
          plans change, so check the vendor's own site for their current terms.
        </p>

        <div class="mt-10">
          <a href="#moves" class="sw-link">See what changes</a>
        </div>
      </div>
    </section>

    <!-- KEY FEATURES, in the browser: the same pinned video slideshow as the
         home page. tuck-offset="0px" drops it in as a plain section, since
         this page has no pinned hero horizon for it to rise under. -->
    <HomeFeatures tuck-offset="0px">
      <template #cta>
        <a :href="signupUrl" class="pill-btn" @click="track('SWITCH_CTA_CLICKED', { position: 'features' })">
          Get started for free
        </a>
      </template>
    </HomeFeatures>

    <!-- PER-COMPETITOR MOVES -->
    <section id="moves" class="sw-moves-section bg-white text-[#0C0F19]">
      <div class="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <RevealText as="h2" :lines="['Coming from one of these?']" class="sw-h2 font-bold" />
        <ul class="sw-moves mt-12 grid gap-5 md:grid-cols-3">
          <li v-for="move in moves" :key="move.name" class="sw-move" :style="{ background: move.tint }">
            <span class="sw-move-disc" aria-hidden="true"><component :is="move.icon" weight="fill" /></span>
            <h3>{{ move.name }}</h3>
            <p>{{ move.body }}</p>
          </li>
        </ul>

        <!-- The one fact every move has in common. -->
        <div class="sw-free mt-6 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="sw-free-eyebrow">No catch</p>
            <h3 class="sw-free-heading mt-2 font-bold">Free to use, forever.</h3>
            <p class="sw-free-body mt-3 max-w-[480px]">
              One operator, no watermark, no trial clock, no credit card. You only pay when
              your church wants more: extra operators, live transcription, a bigger song library.
            </p>
          </div>
          <a
            :href="signupUrl"
            class="pill-btn pill-btn-dark sw-free-cta"
            @click="track('SWITCH_CTA_CLICKED', { position: 'moves' })"
          >
            Get started for free
          </a>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF: the same testimonials and church wall as the home page. -->
    <HomeTestimonials />
    <HomeChurches />

    <!-- FAQ -->
    <section class="bg-[#FBF7FF] text-[#0C0F19]">
      <div
        class="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-16 lg:py-36"
      >
        <RevealText
          as="h2"
          :lines="['Questions,', 'answered.']"
          class="sw-h2 font-bold lg:sticky lg:top-[120px] lg:self-start"
        />
        <div class="sw-faqs">
          <details v-for="faq in faqs" :key="faq.question" class="sw-faq">
            <summary @click.prevent="toggleFaq">
              <h3>{{ faq.question }}</h3>
              <span class="sw-plus" aria-hidden="true"><PhPlus weight="bold" /></span>
            </summary>
            <div class="sw-faq-body"><p v-html="faq.answer"></p></div>
          </details>

          <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a :href="signupUrl" class="pill-btn" @click="track('SWITCH_CTA_CLICKED', { position: 'faq' })">
              Get started for free
            </a>
            <a href="/contact" class="sw-link">Ask us anything</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CLOSING POSTER -->
    <section class="sw-poster relative overflow-hidden">
      <div class="sw-rings" aria-hidden="true">
        <span v-for="n in 7" :key="n" class="sw-ring" :style="{ animationDelay: `${n * 1.1}s` }"></span>
      </div>
      <div
        class="relative mx-auto flex max-w-[1600px] flex-col gap-10 px-5 py-20 md:px-10 md:py-28 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-32"
      >
        <h2 class="sw-display">
          Bring your <span class="thin">next</span> Sunday over.
        </h2>
        <div class="flex flex-wrap items-center gap-x-7 gap-y-5 lg:flex-nowrap lg:pb-3">
          <a :href="signupUrl" class="pill-btn pill-btn-dark" @click="track('SWITCH_CTA_CLICKED', { position: 'poster' })">
            Get started for free
          </a>
          <a href="/pricing" class="sw-poster-link">See pricing</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { h } from "vue"
import { PhCaretRight, PhPlus, PhCheckCircle, PhX, PhMinus, PhDesktop, PhBookOpen, PhMonitorPlay } from "@phosphor-icons/vue"
import { trustpilot } from "~/data/trustpilot"

const { mergeUtmsIntoUrl } = useUtm()

const signupUrl = computed(() =>
  mergeUtmsIntoUrl("https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=switch_page")
)

// Each row's value is either a short string, `true` (shown as a check),
// `false` (shown as an X), or `null` (shown as a dash, meaning "unclear/varies").
const comparisonRows = [
  { label: "Starting price", us: "Free, 1 operator", proPresenter: "Paid, one-time or subscription", easyWorship: "Paid, one-time license", proclaim: "Paid subscription" },
  { label: "Runs in a browser", us: true, proPresenter: false, easyWorship: false, proclaim: true },
  { label: "Works fully offline", us: true, proPresenter: true, easyWorship: true, proclaim: false },
  { label: "Mac + Windows + Linux", us: true, proPresenter: null, easyWorship: false, proclaim: true },
  { label: "Bible & 3,000+ hymns included", us: true, proPresenter: false, easyWorship: false, proclaim: null },
  { label: "Live team collaboration", us: true, proPresenter: null, easyWorship: false, proclaim: true },
  { label: "Live captions / transcription", us: true, proPresenter: null, easyWorship: false, proclaim: false },
]

const moves = [
  {
    name: "From ProPresenter",
    tint: "#E2F0FF",
    icon: PhDesktop,
    body: "Keep the polish, drop the install and license keys. Cloud of Worship opens in a browser on whatever's in the booth (Windows laptop, Chromebook, old Mac mini), and the free plan covers one operator with no watermark.",
  },
  {
    name: "From EasyWorship",
    tint: "#FDEFD4",
    icon: PhBookOpen,
    body: "Keep your Bible and hymn library close at hand, now searchable with typos and all. Add live sync across your team's devices and an interface that's kept current, at no extra cost to start.",
  },
  {
    name: "From Proclaim",
    tint: "#FFE9E8",
    icon: PhMonitorPlay,
    body: "Same browser-based idea, but built just for the screen, not boxed into a bigger church-management suite. Easier to hand to a new volunteer on their first Sunday.",
  },
]

const faqs = [
  {
    question: "Can I import my existing songs and slides?",
    answer:
      "Coming from EasyWorship, yes: the desktop app can import your EasyWorship backup (.zip) directly, pulling in titles, artists and lyrics. Coming from ProPresenter or Proclaim, or want your slide designs too, rebuild your library using our song and hymn search, or add your own text and media slides directly.",
  },
  {
    question: "Does the free plan really have no watermark or time limit?",
    answer:
      'Yes. The free plan is for one operator, indefinitely, with no watermark. Teams adds multi-operator collaboration and starts at $6.99/month, see <a href="/pricing">pricing</a>.',
  },
  {
    question: "What happens if our internet drops mid-service?",
    answer:
      "Cloud of Worship caches your songs, hymns, Bible translations and media locally, so a dropped connection during the service doesn't interrupt what's on screen. Any changes you make while offline save on the device and sync back up as soon as the connection returns.",
  },
  {
    question: "What devices and operating systems does it run on?",
    answer:
      "Any computer with a modern browser: Windows, Mac, Linux or a Chromebook. There's nothing to install and no license key to manage, so the booth laptop you already have is enough.",
  },
  {
    question: "Can I use it with a projector or a second screen?",
    answer:
      "Yes. Connect a projector or second monitor the way you normally would, then send the live slide to it from the operator window. No extra hardware or drivers required.",
  },
  {
    question: "Can more than one person run it for the same service?",
    answer:
      'Yes, on the Teams plan. Operators can build and edit the same schedule from their own devices at the same time, with changes syncing live across the team. That includes a phone: open Cloud of Worship in a phone browser for a full operator, useful for a last-minute change from the pews. See <a href="/docs/teams-and-collaboration/using-cloud-of-worship-on-your-phone">using Cloud of Worship on your phone</a>.',
  },
  {
    question: "Is there help if we get stuck switching over?",
    answer:
      'Yes, and we don\'t leave you reading a manual at 8:45 on Sunday morning. Cash Baptist Church once messaged us mid-rehearsal about a stuck slide; we had it sorted before the sound check finished. Ask us anything in our <a href="DISCORD_URL_PLACEHOLDER">Discord community</a>, or work through the Help Center\'s step-by-step guides for rebuilding a service, setting up the Bible and song library, and running your first Sunday.',
  },
]

const toggleFaq = (e) => {
  const d = e.currentTarget.parentElement
  const body = d.querySelector(".sw-faq-body")
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

// Renders a comparison-table cell: a string as-is, true/false as an icon, null as a dash.
const CellValue = (props) => {
  if (typeof props.value === "string") return h("span", { class: { "sw-cell-strong": props.strong } }, props.value)
  if (props.value === true) return h(PhCheckCircle, { weight: "fill", class: "sw-cell-yes" })
  if (props.value === false) return h(PhX, { weight: "bold", class: "sw-cell-no" })
  return h(PhMinus, { weight: "bold", class: "sw-cell-unclear" })
}
CellValue.props = ["value", "strong"]

const track = (event, props) => {
  const local = location.hostname === "localhost" || location.hostname === "127.0.0.1"
  if (local) return
  window.gtag?.("event", event, props)
}

useHead({
  title: "ProPresenter, EasyWorship & Proclaim Alternative | Cloud of Worship",
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }),
    },
  ],
})
useSeoMeta({
  title: "ProPresenter, EasyWorship & Proclaim Alternative | Cloud of Worship",
  ogTitle: "A Free, Browser-Based Alternative to ProPresenter, EasyWorship & Proclaim",
  description:
    "Switching church presentation software? Compare Cloud of Worship to ProPresenter, EasyWorship and Proclaim: free for one operator, offline-ready, no watermark.",
  ogDescription:
    "Switching church presentation software? Compare Cloud of Worship to ProPresenter, EasyWorship and Proclaim: free for one operator, offline-ready, no watermark.",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/switch",
  ogType: "website",
  ogLocale: "en_US",
})

onMounted(() => {
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }
})
</script>

<style scoped>
/* The Trustpilot badge, ported from the home hero but inverted: a light
   glossy pill (the home one is dark, built for its dark stage background),
   since this hero sits on white rather than the stage. Same border sweep and
   text shine, flipped to ink-on-lavender. */
@property --badge-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.hero-badge {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
  white-space: nowrap;
  color: #1b1f2e;
  background: linear-gradient(180deg, #ffffff 0%, #f6e8ff 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(107, 23, 169, 0.1),
    0 10px 28px -12px rgba(107, 23, 169, 0.35);
  transition: box-shadow 0.3s ease;
  animation: fade-in-badge 0.6s ease-out 0.1s backwards;
}
@media (min-width: 768px) {
  .hero-badge {
    font-size: 13px;
  }
}
@keyframes fade-in-badge {
  from {
    opacity: 0;
  }
}
.hero-badge::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  padding: 1px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--badge-angle),
    rgba(107, 23, 169, 0.1) 0deg,
    rgba(107, 23, 169, 0.1) 230deg,
    rgba(168, 85, 247, 0.85) 290deg,
    #6b17a9 318deg,
    rgba(107, 23, 169, 0.1) 350deg
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: badge-spin 5s linear infinite;
}
.hero-badge::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 55%);
  pointer-events: none;
}
.hero-badge:hover {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(107, 23, 169, 0.1),
    0 0 0 1px rgba(107, 23, 169, 0.08),
    0 10px 32px -10px rgba(107, 23, 169, 0.45);
}
.badge-star {
  width: 13px;
  height: 13px;
  flex: none;
  color: #00b67a;
}
.badge-text {
  background: linear-gradient(110deg, #4b5263 40%, #3b0764 50%, #4b5263 60%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: badge-shine 5s linear infinite;
}
.badge-arrow {
  width: 0;
  height: 13px;
  flex: none;
  margin-left: -8px;
  opacity: 0;
  color: #3b0764;
  transform: translateX(-4px);
  transition:
    width 0.25s ease,
    margin 0.25s ease,
    opacity 0.2s ease,
    transform 0.25s ease;
}
.hero-badge:hover .badge-arrow,
.hero-badge:focus-visible .badge-arrow {
  width: 13px;
  margin-left: 0;
  opacity: 1;
  transform: none;
}
@keyframes badge-spin {
  to {
    --badge-angle: 360deg;
  }
}
@keyframes badge-shine {
  0% {
    background-position: 100% 0;
  }
  50%,
  100% {
    background-position: 0% 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-badge,
  .hero-badge::before,
  .badge-text {
    animation: none;
  }
}
.sw-h1 {
  font-size: 56px;
  line-height: 0.92;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .sw-h1 {
    font-size: 84px;
  }
}
@media (min-width: 1280px) {
  .sw-h1 {
    font-size: 92px;
  }
}
.sw-lede {
  max-width: 560px;
  font-size: 19px;
  line-height: 1.5;
  color: #4b5263;
}
@media (min-width: 1024px) {
  .sw-lede {
    font-size: 21px;
  }
}
.sw-cta {
  height: 52px;
  padding: 0 30px;
  font-size: 17px;
}
.sw-link {
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}
.sw-link:hover {
  color: #6b17a9;
}
.sw-visual {
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

.sw-h2 {
  font-size: 44px;
  line-height: 0.98;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .sw-h2 {
    font-size: 60px;
  }
}
@media (min-width: 1280px) {
  .sw-h2 {
    font-size: 68px;
  }
}
.sw-intro {
  font-size: 19px;
  line-height: 1.4;
  color: #4b5263;
}

/* ---- Comparison table ---- */
.sw-compare,
.sw-moves-section {
  scroll-margin-top: 60px;
}
@media (min-width: 768px) {
  .sw-compare,
  .sw-moves-section {
    scroll-margin-top: 76px;
  }
}
.sw-table-wrap {
  overflow-x: auto;
  border-radius: 20px;
  background: #fff;
}
.sw-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 16px;
}
.sw-table th,
.sw-table td {
  padding: 18px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(12, 15, 25, 0.08);
}
.sw-table thead th {
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: 18px;
  color: #1a1f2e;
  text-align: center;
}
.sw-table tbody th {
  text-align: left;
  font-weight: 600;
  color: #1a1f2e;
}
.sw-th-label,
.sw-table tbody th {
  padding-left: 24px;
}
.sw-th-us,
.sw-td-us {
  background: #f6e8ff;
}
.sw-table tbody tr:last-child td,
.sw-table tbody tr:last-child th {
  border-bottom: none;
}
.sw-cell-strong {
  font-weight: 700;
  color: #3b0764;
}
:deep(.sw-cell-yes) {
  color: #16a34a;
  font-size: 22px;
}
:deep(.sw-cell-no) {
  color: #d1442f;
  font-size: 16px;
}
:deep(.sw-cell-unclear) {
  color: #9aa1b3;
  font-size: 16px;
}
.sw-footnote {
  max-width: 640px;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

/* ---- Per-competitor moves ---- */
.sw-move {
  border-radius: 20px;
  padding: 28px 26px 30px;
  color: #1a1f2e;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.sw-move:hover {
  transform: translateY(-4px);
}
@media (prefers-reduced-motion: reduce) {
  .sw-move {
    transition: none;
  }
}
.sw-move-disc {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  background: #fff;
  color: #1b1f2e;
  font-size: 22px;
}
.sw-move h3 {
  margin-top: 18px;
  font-weight: 800;
  font-size: 26px;
  line-height: 1;
  letter-spacing: -0.01em;
}
.sw-move p {
  margin-top: 12px;
  font-size: 16px;
  line-height: 1.5;
  color: #353b4a;
}

/* ---- Free forever banner ---- */
.sw-free {
  border-radius: 24px;
  padding: 36px 32px;
  background: #f6e8ff;
}
.sw-free-eyebrow {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #8a41c9;
}
.sw-free-heading {
  font-size: 32px;
  line-height: 1;
  letter-spacing: -0.01em;
  color: #3b0764;
}
@media (min-width: 768px) {
  .sw-free-heading {
    font-size: 38px;
  }
}
.sw-free-body {
  font-size: 16px;
  line-height: 1.5;
  color: #4b5263;
}
.sw-free-cta {
  flex: none;
}

/* ---- FAQ (same shape as the feature pages) ---- */
.sw-faq {
  border-top: 1px solid rgba(12, 15, 25, 0.15);
}
.sw-faq:last-child {
  border-bottom: 1px solid rgba(12, 15, 25, 0.15);
}
.sw-faq summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 0;
  cursor: pointer;
  list-style: none;
}
.sw-faq summary::-webkit-details-marker {
  display: none;
}
.sw-faq summary h3 {
  font-weight: 800;
  font-size: 26px;
  line-height: 1.1;
  letter-spacing: -0.01em;
}
@media (min-width: 768px) {
  .sw-faq summary h3 {
    font-size: 30px;
  }
}
.sw-plus {
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
.sw-faq summary:hover .sw-plus {
  background: #e9d5ff;
}
.sw-faq[open]:not(.closing) .sw-plus {
  transform: rotate(45deg);
}
.sw-faq summary:focus-visible {
  outline: 2px solid #c084fc;
  outline-offset: 4px;
}
.sw-faq-body {
  overflow: hidden;
}
.sw-faq p {
  max-width: 640px;
  padding: 0 64px 28px 0;
  font-size: 17px;
  line-height: 1.5;
  color: #4b5263;
}
.sw-faq p :deep(a) {
  color: #6b17a9;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
.sw-faq p :deep(a):hover {
  color: #3b0764;
}

/* ---- Closing poster ---- */
.sw-poster {
  background: #a855f7;
  color: #0c0f19;
}
.sw-rings {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  background: radial-gradient(ellipse 50% 70% at 10% 100%, rgba(216, 180, 254, 0.5), transparent 70%);
}
/* Rings fire one after another from the same point the glow sits on, each
   expanding outward and fading as the next one starts. */
.sw-ring {
  position: absolute;
  left: 10%;
  bottom: 0;
  width: 2px;
  height: 2px;
  border-radius: 9999px;
  border: 2px solid rgba(12, 15, 25, 0.16);
  transform: translate(-50%, 50%) scale(0);
  opacity: 0;
  animation: sw-ring-pulse 7.7s cubic-bezier(0.2, 0.65, 0.3, 1) infinite;
}
@keyframes sw-ring-pulse {
  0% {
    transform: translate(-50%, 50%) scale(0);
    opacity: 0;
  }
  6% {
    opacity: 0.7;
  }
  65% {
    opacity: 0.12;
  }
  100% {
    transform: translate(-50%, 50%) scale(760);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sw-ring {
    animation: none;
  }
}
.sw-display {
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: min(10vw, 76px);
  line-height: 1;
  letter-spacing: -0.01em;
  text-wrap: balance;
  max-width: 640px;
}
.sw-display .thin {
  font-weight: 200;
}
.sw-poster-link {
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}
.sw-poster-link:hover {
  color: #fff;
}
</style>
