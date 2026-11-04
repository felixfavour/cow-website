<template>
  <div class="page open-source">
    <!--
      HERO: the Ends of The Earth artwork's poster style. Brand purple, giant
      condensed type that mixes ExtraBold and ExtraLight, and a line globe.
    -->
    <section
      ref="hero"
      class="os-poster os-hero relative -mt-[60px] overflow-hidden md:-mt-[76px]"
    >
      <GlobeLines class="os-globe" />
      <div
        class="os-frame relative mx-auto flex max-w-[1600px] flex-col px-5 md:px-10 lg:px-16"
      >
        <p class="os-pill self-start lg:self-end">Our open source philosophy</p>

        <h1 class="os-display os-enter mt-8 lg:mt-2">
          <span class="sr-only"
            >Open to every church, fellowship, ministry, event, person and
            country.</span
          >
          <span class="os-line" aria-hidden="true">
            <span class="os-word heavy" style="--d: 0.1s">Open</span>
            {{ " " }}
            <span class="os-word heavy" style="--d: 0.2s">to</span>
            {{ " " }}
            <span class="os-word thin" style="--d: 0.3s">every</span>
          </span>
          <!-- The last word cycles through who it is open to. -->
          <span class="os-line" aria-hidden="true">
            <span class="os-word heavy" style="--d: 0.4s">
              <Transition name="os-swap" mode="out-in">
                <span :key="audience" class="os-swap">{{ audience }}.</span>
              </Transition>
            </span>
          </span>
        </h1>

        <div class="mt-auto pt-12">
          <p class="os-lede">
            Cloud of Worship is open source. Read the code, change it and run
            it, free.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
            <a
              :href="REPO_URL"
              target="_blank"
              rel="noopener"
              class="pill-btn pill-btn-dark"
            >
              See the code on GitHub
            </a>
            <a href="#license" class="os-text-link">How the license works</a>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY: three short principles -->
    <section class="bg-white text-[#0C0F19]">
      <div
        class="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16 py-20 md:py-28 lg:py-36"
      >
        <div
          class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-16"
        >
          <RevealText
            as="h2"
            :lines="['Why we build', 'in the open']"
            class="os-h2 font-bold"
          />
          <p class="os-intro">
            The gospel is for everyone. The tools that share it should be too.
          </p>
        </div>

        <ol class="mt-14 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-3">
          <li
            v-for="(item, i) in principles"
            :key="item.title"
            class="border-t border-[#0C0F19]/15 pt-6"
          >
            <span class="os-num">0{{ i + 1 }}</span>
            <h3
              class="mt-8 text-[32px] font-bold leading-[1] tracking-[-0.01em] md:text-[38px]"
            >
              {{ item.title }}
            </h3>
            <p class="mt-3 max-w-[340px] text-[17px] leading-[1.45] text-[#4B5263]">
              {{ item.body }}
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- LICENSE: what AGPLv3 lets you do -->
    <section id="license" class="os-license bg-[#FBF7FF] text-[#0C0F19]">
      <div
        class="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16 py-20 md:py-28 lg:py-36"
      >
        <div
          class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-16"
        >
          <RevealText
            as="h2"
            :lines="['Free to use,', 'free to change.']"
            class="os-h2 font-bold"
          />
          <p class="os-intro">Our code is licensed under AGPLv3.</p>
        </div>

        <!-- The pastel cards from the homepage's pricing section, one per freedom. -->
        <ul class="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <li
            v-for="item in freedoms"
            :key="item.title"
            class="os-freedom"
            :style="{ background: item.tint }"
          >
            <span class="os-freedom-icon" aria-hidden="true">
              <component :is="item.icon" weight="fill" />
            </span>
            <div class="mt-10">
              <h3 class="os-freedom-title">{{ item.title }}</h3>
              <p class="mt-2">{{ item.body }}</p>
            </div>
          </li>
        </ul>

        <p class="mt-10 max-w-[720px] text-[15px] leading-[1.5] text-[#4B5263]">
          This is a summary, not the license itself. Read the full
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            target="_blank"
            rel="noopener"
            class="os-inline-link"
            >GNU AGPLv3</a
          >. Questions? Email
          <a href="mailto:hello@cloudofworship.com" class="os-inline-link"
            >hello@cloudofworship.com</a
          >.
        </p>
      </div>
    </section>

    <!-- THE ENDS OF THE EARTH INITIATIVE: the artwork, as a section -->
    <section
      ref="initiative"
      class="os-poster os-initiative relative overflow-hidden"
      :class="{ armed, shown }"
    >
      <GlobeLines class="os-globe" />
      <div
        class="os-frame relative mx-auto flex max-w-[1600px] flex-col px-5 md:px-10 lg:px-16"
      >
        <p class="os-pill self-start lg:self-end">
          The Ends of The Earth Initiative
        </p>

        <h2 class="os-display mt-8 lg:mt-2">
          <span class="os-line">
            <span class="os-word heavy" style="--d: 0s">To</span>
            {{ " " }}
            <span class="os-word heavy" style="--d: 0.08s">the</span>
            {{ " " }}
            <span class="os-word heavy" style="--d: 0.16s">ends</span>
          </span>
          <span class="os-line">
            <span class="os-word thin" style="--d: 0.24s">of</span>
            {{ " " }}
            <span class="os-word thin" style="--d: 0.32s">the</span>
            {{ " " }}
            <span class="os-word heavy" style="--d: 0.4s">earth.</span>
          </span>
        </h2>

        <div
          class="mt-auto grid gap-10 pt-12 xl:grid-cols-[minmax(0,1fr)_440px] xl:items-end 2xl:grid-cols-[minmax(0,1fr)_560px]"
        >
          <div class="flex flex-col gap-3 md:flex-row md:items-end md:gap-8">
            <p class="os-stat" aria-hidden="true">90%</p>
            <p class="os-lede md:pb-[0.4em]">
              <span class="sr-only">90%</span>
              of profits from every Teams plan go to pushing the gospel forward
              in churches across Africa and beyond.
            </p>
          </div>

          <aside class="os-card">
            <h3 class="os-card-title">Your plan equips a ministry.</h3>
            <p class="mt-4">
              When your church subscribes to Teams, you help put the tools for
              spreading the good news into the hands of churches that need them
              most.
            </p>
            <p class="os-card-meta mt-6">
              <a href="/pricing" class="hover:text-white">See Teams pricing</a>
            </p>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { PhChurch, PhCode, PhHandHeart, PhShareNetwork } from "@phosphor-icons/vue"

const REPO_URL = "https://github.com/CoW-Labs/cloudofworship"

const principles = [
  {
    title: "Nothing hidden",
    body: "Read every line of the app your church runs on Sunday.",
  },
  {
    title: "Yours to change",
    body: "Fix a bug or build what your church needs.",
  },
  {
    title: "Shaped by churches",
    body: "Ideas come from the teams who use it every week.",
  },
]

const freedoms = [
  {
    title: "Use it free",
    body: "For any purpose. No fee and no license key, on Sunday or any other day.",
    icon: PhHandHeart,
    tint: "#E2F0FF",
  },
  {
    title: "Read and change it",
    body: "Every line is on GitHub. Tweak a layout or fix a bug for your team.",
    icon: PhCode,
    tint: "#FDEFD4",
  },
  {
    title: "Run your own copy",
    body: "Host it on your own setup, for your church or ministry.",
    icon: PhChurch,
    tint: "#FFE9E8",
  },
  {
    title: "Share it",
    body: "Pass it on to a sister church, or share what you built with everyone.",
    icon: PhShareNetwork,
    tint: "#E3F5E9",
  },
]

// "Open to every ___.": the hero's last word cycles once the headline has
// come into focus. "fellowship." is the widest, and still fits its own line.
const AUDIENCES = ["church", "fellowship", "ministry", "event", "person", "country"]
const SWAP_MS = 2200
const audienceIndex = ref(0)
const audience = computed(() => AUDIENCES[audienceIndex.value])
let swapTimer = 0

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  swapTimer = window.setInterval(() => {
    audienceIndex.value = (audienceIndex.value + 1) % AUDIENCES.length
  }, SWAP_MS)
})
onBeforeUnmount(() => clearInterval(swapTimer))

// The navbar goes see-through over the purple sections. It starts that way on
// this route by itself (see Navbar.vue); this keeps it in step with the scroll.
const hero = ref(null)
const navPoster = useState("navPoster", () => null)

const updateNav = () => {
  const line = window.innerWidth >= 768 ? 76 : 60
  navPoster.value = [hero.value, initiative.value].some((el) => {
    if (!el) return false
    const rect = el.getBoundingClientRect()
    return rect.top < line && rect.bottom > line
  })
}

// The initiative headline comes into focus word by word the first time it
// scrolls into view. Words stay visible until JavaScript has armed this, so
// the text never depends on the script running.
const initiative = ref(null)
const armed = ref(false)
const shown = ref(false)
let observer = null

onMounted(() => {
  updateNav()
  window.addEventListener("scroll", updateNav, { passive: true })
  window.addEventListener("resize", updateNav, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateNav)
  window.removeEventListener("resize", updateNav)
  navPoster.value = null
})

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  if (!("IntersectionObserver" in window)) return
  armed.value = true
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      shown.value = true
      observer?.disconnect()
    },
    { threshold: 0.25 }
  )
  observer.observe(initiative.value)
})

onBeforeUnmount(() => observer?.disconnect())

const description =
  "Cloud of Worship is open source under AGPLv3. Read the code, change it and run it, free. Here is why we build in the open."

useSeoMeta({
  title: "Open source - Cloud of Worship",
  ogTitle: "Open source - Cloud of Worship",
  description,
  ogDescription: description,
  twitterDescription: description,
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/open-source",
  ogType: "website",
  ogLocale: "en_US",
})

useOgCard("openSource")
</script>

<style scoped>
/* ---- The poster sections (hero and initiative) ---- */
.os-poster {
  background: #a855f7;
  color: #0c0f19;
}
/* Each poster fills the screen under the navbar. The hero runs up under the
   see-through bar, so it is a full screen tall and its content starts below
   the bar. */
.os-frame {
  min-height: calc(100svh - 60px);
  padding-top: 28px;
  padding-bottom: 56px;
}
.os-hero .os-frame {
  min-height: 100svh;
  padding-top: 88px;
}
@media (min-width: 768px) {
  .os-frame {
    min-height: calc(100svh - 76px);
    padding-top: 40px;
    padding-bottom: 72px;
  }
  .os-hero .os-frame {
    min-height: 100svh;
    padding-top: 116px;
  }
}

/* The globe sits off the top right corner, as in the artwork. On phones it is
   larger and further out, so its lines run behind the text. */
.os-globe {
  position: absolute;
  width: 115vw;
  right: -62vw;
  top: -22vw;
  color: rgba(12, 15, 25, 0.16);
  pointer-events: none;
}
@media (min-width: 1024px) {
  .os-globe {
    width: 65vw;
    right: -21vw;
    top: -15vw;
  }
}

.os-pill {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  border: 2px solid currentColor;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
}
@media (min-width: 768px) {
  .os-pill {
    height: 50px;
    padding: 0 26px;
    font-size: 18px;
  }
}

/* The widest line ("Open to every", or "fellowship." under it) is 3.95em,
   so 21.5vw keeps it inside the side gutters at every width from 320px up. */
.os-display {
  font-size: min(21.5vw, 288px);
  line-height: 0.9;
  letter-spacing: -0.01em;
}
.os-line {
  display: block;
  white-space: nowrap;
}
.os-word {
  display: inline-block;
}
.heavy {
  font-weight: 800;
}
.thin {
  font-weight: 200;
}

/* Words come into focus one after another, like the homepage hero. */
@keyframes os-focus {
  from {
    opacity: 0;
    filter: blur(18px);
    transform: translateY(0.06em);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: none;
  }
}
.os-enter .os-word {
  animation: os-focus 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: var(--d);
}
.os-initiative.armed .os-word {
  opacity: 0;
}
.os-initiative.armed.shown .os-word {
  animation: os-focus 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: var(--d);
}
@media (prefers-reduced-motion: reduce) {
  .os-enter .os-word {
    animation: none;
  }
}

.os-swap {
  display: inline-block;
}
.os-swap-enter-active,
.os-swap-leave-active {
  transition:
    opacity 0.32s ease,
    filter 0.32s ease,
    transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.os-swap-enter-from {
  opacity: 0;
  filter: blur(14px);
  transform: translateY(0.12em);
}
.os-swap-leave-to {
  opacity: 0;
  filter: blur(14px);
  transform: translateY(-0.12em);
}

.os-lede {
  max-width: 600px;
  font-size: 20px;
  line-height: 1.3;
}
@media (min-width: 1024px) {
  .os-lede {
    font-size: 26px;
  }
}

.os-text-link {
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}
.os-text-link:hover {
  color: #fff;
}

/* "90%": scales with the screen, and sits beside its sentence from md up. */
.os-stat {
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: clamp(104px, 30vw, 150px);
  line-height: 0.8;
  letter-spacing: -0.02em;
}
@media (min-width: 1280px) {
  .os-stat {
    font-size: min(12vw, 256px);
  }
}

.os-card {
  border-radius: 28px;
  background: #0c0f19;
  color: #e6e7eb;
  padding: 28px;
  font-size: 17px;
  line-height: 1.45;
}
@media (min-width: 768px) {
  .os-card {
    padding: 40px 44px;
    font-size: 20px;
  }
}
.os-card-title {
  color: #e9d5ff;
  font-weight: 800;
  font-size: 34px;
  line-height: 1;
  letter-spacing: -0.01em;
}
@media (min-width: 768px) {
  .os-card-title {
    font-size: 44px;
  }
}
.os-card-meta {
  color: #d8b4fe;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
@media (min-width: 768px) {
  .os-card-meta {
    font-size: 16px;
  }
}

/* ---- The light sections ---- */
.os-h2 {
  font-size: 52px;
  line-height: 0.95;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .os-h2 {
    font-size: 76px;
  }
}
@media (min-width: 1024px) {
  .os-h2 {
    font-size: 96px;
  }
}
.os-intro {
  font-size: 19px;
  line-height: 1.4;
  color: #4b5263;
}
@media (min-width: 1024px) {
  .os-intro {
    font-size: 21px;
    padding-bottom: 0.4em;
  }
}
.os-num {
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: 22px;
  color: #a855f7;
}

/* The navbar is sticky, so leave room for it when jumping to #license. */
.os-license {
  scroll-margin-top: 60px;
}
@media (min-width: 768px) {
  .os-license {
    scroll-margin-top: 76px;
  }
}
/* Built like the homepage pricing section's side cards: a soft tint, a white
   disc holding the icon, and the words at the foot. */
.os-freedom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  border-radius: 20px;
  padding: 22px 26px 26px;
  color: #1a1f2e;
  font-size: 16px;
  line-height: 1.35;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.os-freedom:hover {
  transform: translateY(-4px);
}
@media (min-width: 1024px) {
  .os-freedom {
    min-height: 280px;
    font-size: 17px;
  }
}
.os-freedom-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  background: #fff;
  color: #1b1f2e;
  font-size: 22px;
}
.os-freedom-title {
  font-weight: 800;
  font-size: 30px;
  line-height: 1;
  letter-spacing: -0.01em;
}
@media (min-width: 1024px) {
  .os-freedom-title {
    font-size: 34px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .os-freedom {
    transition: none;
  }
}
.os-inline-link {
  color: #0c0f19;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.os-inline-link:hover {
  color: #9333ea;
}
</style>
