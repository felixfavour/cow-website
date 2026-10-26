<template>
  <!--
    The section pins while you scroll through its tabs, one after another, and
    starts a little over half a screen early so it rises inside the white end
    of the hero's horizon rather than after it. Any earlier and its top edge
    would cut across the horizon's purple.
  -->
  <div
    ref="stage"
    class="features-stage relative z-[1] -mt-[55svh]"
    :style="{ height: `calc(${sectionHeight}px + ${TRAVEL_SVH}svh)` }"
  >
    <section
      ref="section"
      class="home-features sticky min-h-[100svh] flex flex-col justify-start pt-[60px] md:pt-0 pb-6 md:pb-[38px]"
      :style="{ top: `${stickyTop}px` }"
    >
      <!-- The panel that holds everything, cut off at the bottom. -->
      <div class="panel relative mx-2 md:mx-[39px] overflow-hidden rounded-b-[32px] md:rounded-b-[48px]">
        <SmokeGradient class="absolute inset-0" :speed="rushing ? RUSH : 1" />

        <div class="relative pt-12 md:pt-[56px]">
          <!-- Tabs -->
          <div ref="intro" class="intro flex justify-center px-3" :class="{ shown }">
            <PillTabs
              :tabs="tabs"
              :model-value="active"
              label="Key features"
              id-prefix="feature"
              controls
              @select="goTo"
            />
          </div>

          <!-- App window, in a liquid-glass frame -->
          <div
            class="window-glass intro relative mx-auto mt-7 md:mt-[29px] w-[94%] md:w-[84.7%] rounded-t-[20px] md:rounded-t-[28px] px-3 md:px-[25px] pt-9 md:pt-[52px]"
            :class="{ shown }"
          >
            <div class="absolute left-4 md:left-[25px] top-3 md:top-[16px] flex gap-[5px]" aria-hidden="true">
              <span class="h-3 w-3 rounded-full bg-[#FF5F57]"></span>
              <span class="h-3 w-3 rounded-full bg-[#3A3A3A]"></span>
              <span class="h-3 w-3 rounded-full bg-[#28C840]"></span>
            </div>
            <div
              class="screen relative z-[1] overflow-hidden rounded-t-[14px] md:rounded-t-[24px]"
              style="aspect-ratio: 1105 / 555"
            >
              <img
                v-for="(tab, i) in tabs"
                :key="tab.key"
                :id="`feature-panel-${tab.key}`"
                role="tabpanel"
                :aria-labelledby="`feature-tab-${tab.key}`"
                :aria-hidden="active !== i"
                :src="tab.image"
                :alt="tab.alt"
                width="2210"
                height="1110"
                decoding="async"
                class="shot absolute inset-x-0 top-0 w-full h-auto"
                :class="{ current: active === i }"
              />
              <!-- Sits over the "L" avatar in the screenshot's top-right corner;
                   the next section's cursors fly out of it. -->
              <span
                data-cursor-source
                class="absolute rounded-full"
                style="left: 94.48%; top: 2.07%; width: 2.44%; aspect-ratio: 1; --avatar: #1f2e50"
                aria-hidden="true"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Which tab is showing; the active one fills as you scroll through it. -->
      <div class="mt-6 md:mt-[34px] flex justify-center gap-[6px]">
        <button
          v-for="(tab, i) in tabs"
          :key="tab.key"
          type="button"
          class="dot relative h-[10px] overflow-hidden rounded-full bg-[#D9D9D9]"
          :class="active === i ? 'w-[50px]' : 'w-[10px]'"
          :aria-label="`Show ${tab.label}`"
          :aria-current="active === i ? 'true' : undefined"
          @click="goTo(i)"
        >
          <span
            v-if="active === i"
            class="absolute inset-y-0 left-0 rounded-full bg-[#B5BAC4]"
            :style="{ width: `${Math.max(20, stepProgress * 100)}%` }"
          ></span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
// The key-features section under the hero: a pill tab bar over a mock app
// window. The section pins, and scrolling steps through the tabs; each one
// fades in a screenshot of that part of the app. Clicking a tab or a dot
// scrolls to its place, so scroll position and tab always agree.

// TODO: only the Songs & Hymns screen exists so far (exported from the design).
// The other tabs show it too until their screenshots are added to
// public/features/ under the names in the comments.
const PLACEHOLDER = "/features/songs-hymns.webp"

const tabs = [
  {
    key: "bibles",
    label: "Bibles",
    image: PLACEHOLDER, // bibles.webp
    alt: "Searching the Bible in Cloud of Worship and putting a verse on screen",
  },
  {
    key: "songs",
    label: "Songs & Hymns",
    image: "/features/songs-hymns.webp",
    alt: "The hymn library in Cloud of Worship's Quick Actions pane",
  },
  {
    key: "offline",
    label: "Cloud-based (offline first)",
    image: PLACEHOLDER, // offline.webp
    alt: "Cloud of Worship running in the browser, ready to keep working offline",
  },
  {
    key: "team",
    label: "Team workflow",
    image: PLACEHOLDER, // team.webp
    alt: "Inviting team members to work on the same service in Cloud of Worship",
  },
  {
    key: "transcription",
    label: "Transcription",
    image: PLACEHOLDER, // transcription.webp
    alt: "Live transcription of the sermon in Cloud of Worship",
  },
  {
    key: "livestream",
    label: "Livestream",
    image: PLACEHOLDER, // livestream.webp
    alt: "Sharing a service as a livestream from Cloud of Worship",
  },
]

// Scrolling spent on each tab while the section is pinned.
const STEP_SVH = 40
const TRAVEL_SVH = STEP_SVH * tabs.length
// The tab bar sits this far down the section; it must stay clear of the navbar.
const TAB_BAR_OFFSET = 56
const NAV_HEIGHT = 76
// While the screens change over, the smoke behind them rushes on at this many
// times its pace, then settles back once the new screen has faded in.
const RUSH = 5
const RUSH_MS = 1200 // the old screen's fade out and the new one's in (see .shot)

const active = ref(0)
const stepProgress = ref(0)
const shown = ref(false)
const sectionHeight = ref(900)
const stickyTop = ref(0)
const stage = ref(null)
const section = ref(null)
const intro = ref(null)
const rushing = ref(false)

let rushTimer = 0
watch(active, () => {
  rushing.value = true
  clearTimeout(rushTimer)
  rushTimer = setTimeout(() => (rushing.value = false), RUSH_MS)
})

const travel = () => stage.value.offsetHeight - section.value.offsetHeight

const measure = () => {
  if (!section.value) return
  sectionHeight.value = section.value.offsetHeight
  // Pin flush with the top of the screen. On screens shorter than the section,
  // pin higher so its bottom shows, but never so high the tabs go under the bar.
  const fit = window.innerHeight - sectionHeight.value
  stickyTop.value = Math.max(Math.min(0, fit), NAV_HEIGHT + 8 - TAB_BAR_OFFSET)
  update()
}

let frame = 0

const update = () => {
  frame = 0
  if (!stage.value || !section.value) return
  const pinned = stickyTop.value - stage.value.getBoundingClientRect().top
  const p = Math.min(1, Math.max(0, pinned / travel()))
  const position = p * tabs.length
  active.value = Math.min(tabs.length - 1, Math.floor(position))
  stepProgress.value = Math.min(1, position - active.value)
}

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(update)
}

// Scroll to the start of tab i's stretch; the scroll handler then shows it.
const goTo = (i) => {
  const top =
    stage.value.getBoundingClientRect().top +
    window.scrollY -
    stickyTop.value +
    ((i + 0.02) / tabs.length) * travel()
  active.value = i
  window.scrollTo({ top: Math.ceil(top), behavior: "smooth" })
}

let observer = null
let resizeObserver = null

onMounted(() => {
  resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(section.value)
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", measure)
  measure()

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      shown.value = true
      observer.disconnect()
    },
    { rootMargin: "0px 0px -15% 0px" }
  )
  observer.observe(intro.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(rushTimer)
  observer?.disconnect()
  resizeObserver?.disconnect()
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", measure)
})
</script>

<style scoped>
/* Plain white, matching the end of the hero's horizon and the light navbar;
   the only purple here is the smoke inside the panel. */
.home-features {
  background: #ffffff;
}

.dot:focus-visible {
  outline: 2px solid #8a41c9;
  outline-offset: 2px;
}
.dot {
  transition: width 0.45s cubic-bezier(0.3, 0.7, 0.2, 1);
}
.dot span {
  transition: width 0.15s linear;
}

/* Liquid glass: a faint grey tint over a frosted, colour-boosted blur of the
   smoke behind, a bright rim that catches the light at the top left, and a
   soft sheen across the top. */
.window-glass {
  background: rgba(218, 213, 224, 0.3);
  -webkit-backdrop-filter: blur(22px) saturate(1.45);
  backdrop-filter: blur(22px) saturate(1.45);
  box-shadow: 0 30px 70px -40px rgba(76, 29, 149, 0.35);
}
.window-glass::before,
.window-glass::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}
.window-glass::before {
  z-index: 2;
  padding: 1.5px;
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.5) 18%,
    rgba(255, 255, 255, 0.14) 45%,
    rgba(255, 255, 255, 0.6) 100%
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.window-glass::after {
  z-index: 0;
  background: radial-gradient(120% 45% at 0% 0%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 60%),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 120px);
}

/* Changing tab, the old screen fades right out before the new one fades in,
   so the smoke shows through the empty glass for a moment in between. */
.shot {
  opacity: 0;
  transition: opacity 0.6s ease;
}
.shot.current {
  opacity: 1;
  transition: opacity 0.7s ease 0.5s;
}

/* The tab bar fades up first, then the window rises into place. */
.intro {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.window-glass.intro {
  transform: translateY(60px);
  transition-delay: 0.15s;
}
.intro.shown {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .shot,
  .shot.current {
    transition-duration: 0.3s;
    transition-delay: 0s;
  }
  .intro,
  .window-glass.intro {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
