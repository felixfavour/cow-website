<template>
  <!--
    The section pins while you scroll through its screens, one after another,
    and starts nearly two thirds of a screen early so it rises inside the white
    end of the hero's horizon rather than after it. Any earlier and its top edge
    would cut across the horizon's purple (see horizonY in pages/index.vue).
  -->
  <div
    ref="stage"
    class="features-stage relative z-[1] -mt-[80svh]"
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

        <div class="relative pt-10 md:pt-[44px]">
          <!-- One headline per screen, stacked so the heading keeps its height
               while they cross-fade. -->
          <h2
            ref="intro"
            class="intro headlines grid px-5 text-center text-[#16161D] font-bold text-[36px] md:text-[48px] leading-[0.95] tracking-[-0.01em]"
            :class="{ shown }"
          >
            <span
              v-for="(tab, i) in tabs"
              :key="tab.key"
              class="headline col-start-1 row-start-1"
              :class="{ current: active === i }"
              :aria-hidden="active !== i"
            >
              {{ tab.title[0] }}<br />{{ tab.title[1] }}
            </span>
          </h2>

          <!-- App window, in a liquid-glass frame -->
          <div
            class="window-glass intro relative mx-auto mt-7 md:mt-[38px] w-[94%] rounded-t-[20px] md:rounded-t-[28px] px-3 md:px-[25px] pt-9 md:pt-[52px]"
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
              <template v-for="(tab, i) in tabs" :key="tab.key">
                <video
                  v-if="tab.video"
                  :ref="(el) => (videos[i] = el)"
                  :id="`feature-panel-${tab.key}`"
                  role="tabpanel"
                  :aria-labelledby="`feature-dot-${tab.key}`"
                  :aria-hidden="active !== i"
                  :aria-label="tab.alt"
                  :src="tab.video"
                  :poster="tab.poster"
                  muted
                  loop
                  playsinline
                  :preload="shown && Math.abs(i - active) <= 1 ? 'auto' : 'none'"
                  disablepictureinpicture
                  class="shot absolute inset-0 h-full w-full object-cover object-top"
                  :class="{ current: active === i }"
                ></video>
                <img
                  v-else
                  :id="`feature-panel-${tab.key}`"
                  role="tabpanel"
                  :aria-labelledby="`feature-dot-${tab.key}`"
                  :aria-hidden="active !== i"
                  :src="tab.image"
                  :alt="tab.alt"
                  width="2210"
                  height="1110"
                  decoding="async"
                  class="shot absolute inset-x-0 top-0 w-full h-auto"
                  :class="{ current: active === i }"
                />
              </template>
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

      <!-- Which screen is showing (the active one fills as you scroll through
           it), and a button to pause or resume its video. -->
      <div class="mt-6 md:mt-[34px] flex items-center justify-center gap-[10px]">
        <div
          class="flex h-[42px] items-center gap-[8px] rounded-full bg-[#EFEFF1] px-[18px]"
          role="tablist"
          aria-label="Key features"
        >
          <button
            v-for="(tab, i) in tabs"
            :key="tab.key"
            :id="`feature-dot-${tab.key}`"
            type="button"
            role="tab"
            class="dot relative h-[10px] overflow-hidden rounded-full bg-[#D6D6DA]"
            :class="active === i ? 'w-[50px]' : 'w-[10px]'"
            :aria-label="tab.label"
            :aria-selected="active === i"
            :aria-controls="`feature-panel-${tab.key}`"
            :tabindex="active === i ? 0 : -1"
            @click="select(i)"
            @keydown.right.prevent="focusDot(i + 1)"
            @keydown.left.prevent="focusDot(i - 1)"
          >
            <span
              v-if="active === i"
              class="absolute inset-y-0 left-0 rounded-full bg-[#A9AEB8]"
              :style="{ width: `${Math.max(20, stepProgress * 100)}%` }"
            ></span>
          </button>
        </div>

        <button
          type="button"
          class="play grid h-[42px] w-[42px] place-items-center rounded-full bg-[#EFEFF1] text-[#101010]"
          :aria-label="playing ? 'Pause video' : 'Play video'"
          @click="toggle"
        >
          <svg v-if="playing" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
            <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
          </svg>
          <svg v-else width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3.5 2.2v9.6a.9.9 0 0 0 1.37.77l7.7-4.8a.9.9 0 0 0 0-1.54l-7.7-4.8A.9.9 0 0 0 3.5 2.2Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
// The key-features section under the hero: a headline over a mock app window,
// one screen per feature. The section pins, and scrolling steps through the
// screens; each one fades in a muted, looping screen recording of that part of
// the app (or a screenshot where there is no recording yet). Only the showing
// screen's video plays, and only while the section is on screen. Clicking a
// dot scrolls to its place, so scroll position and screen always agree; the
// button beside the dots pauses and resumes the video.

// Recordings stream from the media bucket (R2 `cow-media`, under
// open/website/features/) as <key>.mp4: 1600px wide, 30fps, no audio, cached
// for a year. Re-uploading one under the same name needs VIDEO_VERSION bumped
// so browsers and the edge fetch it again. Each has a <key>.webp poster from
// its first frame in public/features/posters/, so it shows before the video
// loads.
const VIDEO_VERSION = 1
const videoUrl = (key) => `https://media.cloudofworship.com/open/website/features/${key}.mp4?v=${VIDEO_VERSION}`
const posterUrl = (key) => `/features/posters/${key}.webp`

const tabs = [
  {
    key: "bibles",
    label: "Bibles",
    title: ["Put scripture on", "screen in seconds"],
    video: videoUrl("bibles"),
    poster: posterUrl("bibles"),
    alt: "Searching the Bible in Cloud of Worship and putting a verse on screen",
  },
  {
    key: "songs",
    label: "Songs & Hymns",
    title: ["Find any song or hymn,", "typos and all"],
    video: videoUrl("songs-hymns"),
    poster: posterUrl("songs-hymns"),
    alt: "Searching for a song with a typo in Cloud of Worship and adding it to the service",
  },
  {
    key: "offline",
    label: "Browser-first (offline)",
    title: ["Keeps going when", "the Wi-Fi doesn't"],
    video: videoUrl("offline"),
    poster: posterUrl("offline"),
    alt: "Cloud of Worship staying live after the Wi-Fi is turned off, saving work until it returns",
  },
  {
    key: "team",
    label: "Team workflow",
    title: ["Plan Sunday's", "service together"],
    // TODO: no recording yet; shows the Songs & Hymns screenshot until team.mp4 exists.
    image: "/features/songs-hymns.webp",
    alt: "Inviting team members to work on the same service in Cloud of Worship",
  },
  {
    key: "transcription",
    label: "Transcription",
    title: ["Say the verse,", "see it on screen"],
    video: videoUrl("transcription"),
    poster: posterUrl("transcription"),
    alt: "Cloud of Worship hearing a Bible reference in the sermon and putting the verse on screen",
  },
  {
    key: "livestream",
    label: "Livestream",
    title: ["Your camera and slides,", "in one stream"],
    video: videoUrl("livestream"),
    poster: posterUrl("livestream"),
    alt: "Pairing a camera with scripture slides for the livestream in Cloud of Worship",
  },
]

// Scrolling spent on each screen while the section is pinned.
const STEP_SVH = 40
const TRAVEL_SVH = STEP_SVH * tabs.length
// The headline sits this far down the section; it must stay clear of the navbar.
const HEADLINE_OFFSET = 44
const NAV_HEIGHT = 76
// While the screens change over, the smoke behind them rushes on at this many
// times its pace, then settles back once the new screen has faded in.
const RUSH = 5
const RUSH_MS = 1200 // the old screen's fade out and the new one's in (see .shot)

const active = ref(0)
const stepProgress = ref(0)
const playing = ref(true)
const onScreen = ref(false)
const shown = ref(false)
const sectionHeight = ref(900)
const stickyTop = ref(0)
const stage = ref(null)
const section = ref(null)
const intro = ref(null)
const rushing = ref(false)
const videos = []

// Play the showing screen's video and pause the rest, but only while the
// section is on screen and the visitor hasn't paused it.
const syncVideos = () => {
  videos.forEach((video, i) => {
    if (!video) return
    if (i === active.value && onScreen.value && playing.value) video.play().catch(() => {})
    else if (!video.paused) video.pause()
  })
}

// Each screen's video starts from the top when you arrive at it.
watch(active, (now, before) => {
  const video = videos[now]
  if (video && now !== before) video.currentTime = 0
  syncVideos()
})
watch(onScreen, syncVideos)

let rushTimer = 0
watch(active, () => {
  rushing.value = true
  clearTimeout(rushTimer)
  rushTimer = setTimeout(() => (rushing.value = false), RUSH_MS)
})

const toggle = () => {
  playing.value = !playing.value
  syncVideos()
}

const travel = () => stage.value.offsetHeight - section.value.offsetHeight

const measure = () => {
  if (!section.value) return
  sectionHeight.value = section.value.offsetHeight
  // Pin flush with the top of the screen. On screens shorter than the section,
  // pin higher so its bottom shows, but never so high the headline goes under
  // the bar.
  const fit = window.innerHeight - sectionHeight.value
  stickyTop.value = Math.max(Math.min(0, fit), NAV_HEIGHT + 8 - HEADLINE_OFFSET)
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

// Scroll to the start of screen i's stretch; the scroll handler then shows it.
const select = (i) => {
  const top =
    stage.value.getBoundingClientRect().top +
    window.scrollY -
    stickyTop.value +
    ((i + 0.02) / tabs.length) * travel()
  active.value = i
  window.scrollTo({ top: Math.ceil(top), behavior: "smooth" })
}

const dots = () => section.value.querySelectorAll('[role="tab"]')
const focusDot = (i) => {
  const n = (i + tabs.length) % tabs.length
  select(n)
  dots()[n]?.focus()
}

let observer = null
let visibility = null
let resizeObserver = null

onMounted(() => {
  // Visitors who ask for reduced motion see each screen's poster until they
  // press play.
  playing.value = !window.matchMedia("(prefers-reduced-motion: reduce)").matches

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

  // Counts as on screen once a third of the section shows, so the first video
  // starts as the window comes into view rather than at its first pixel.
  visibility = new IntersectionObserver(([entry]) => (onScreen.value = entry.isIntersecting), {
    threshold: 0.35,
  })
  visibility.observe(section.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(rushTimer)
  observer?.disconnect()
  visibility?.disconnect()
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

.dot:focus-visible,
.play:focus-visible {
  outline: 2px solid #8a41c9;
  outline-offset: 2px;
}
.dot {
  transition: width 0.45s cubic-bezier(0.3, 0.7, 0.2, 1);
}
.dot span {
  transition: width 0.15s linear;
}
.play {
  transition: background-color 0.2s ease;
}
.play:hover {
  background: #e4e4e8;
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
/* From tablets up the window takes 80% of the panel, but on short screens it
   narrows (and so shortens; its screen is about twice as wide as it is tall)
   so the headline, window and controls all fit while the section is pinned.
   380px is roughly everything but the screen itself. */
@media (min-width: 768px) {
  .window-glass {
    width: max(56%, min(80%, calc((100svh - 380px) * 2)));
  }
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

/* Changing screen, the old one fades right out before the new one fades in,
   so the smoke shows through the empty glass for a moment in between. The
   headline changes over on the same beat, coming into focus as it rises. */
.shot,
.headline {
  opacity: 0;
  transition: opacity 0.6s ease;
}
.shot.current,
.headline.current {
  opacity: 1;
  transition: opacity 0.7s ease 0.5s;
}
.headline {
  filter: blur(6px);
  transform: translateY(-8px);
  transition-property: opacity, filter, transform;
}
.headline.current {
  filter: none;
  transform: none;
  transition-property: opacity, filter, transform;
}

/* The headline fades up first, then the window rises into place. */
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
  .shot.current,
  .headline,
  .headline.current {
    filter: none;
    transform: none;
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
