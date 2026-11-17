<template>
  <!-- The footer's big "Cloud of Worship" wordmark. Laid out on the design's
       1440px artboard in percentages, so it scales as one picture. The slide
       tile sits to the right of "Cloud" and loops "of" then eight slides. -->
  <div ref="root" class="wordmark" aria-label="Cloud of Worship" role="img">
    <img
      src="/footer/wordmark-cloud.webp"
      alt=""
      width="1625"
      height="437"
      class="absolute select-none pointer-events-none"
      style="left: 4.493%; top: 0; width: 56.428%"
      draggable="false"
    />
    <img
      src="/footer/wordmark-worship.webp"
      alt=""
      width="2421"
      height="547"
      class="absolute select-none pointer-events-none"
      style="left: 4.438%; top: 47.05%; width: 84.083%"
      draggable="false"
    />

    <div class="tile" aria-hidden="true">
      <span class="of" :class="{ on: current === 0 }">of</span>
      <template v-if="near">
        <img
          v-for="(src, i) in SLIDES"
          :key="src"
          :src="src"
          alt=""
          width="1920"
          height="1080"
          decoding="async"
          draggable="false"
          :class="{ on: i + 1 === current }"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
// Eight of the cleanest slides from the hero wall. Frame 0 is the word "of".
const SLIDES = [
  "oceans-song-slide",
  "bible-slide",
  "interlude-slide",
  "amazing-grace-song-slide",
  "announcements-interlude-slide",
  "let-us-pray-interlude-slide",
  "santo-translation-slide",
  "rahama-song-with-translation-slide",
].map((name) => `/hero/${name}.webp`)

const FRAME_MS = 220 // each slide, quick but readable as a flick through
const OF_MS = 420 // "of" holds a little longer, as the loop's first frame
const FRAMES = SLIDES.length + 1

const root = ref(null)
const near = ref(false)
const current = ref(0)

let timer = 0
let nearObserver = null
let visibleObserver = null
let motionQuery = null
let sync = () => {}

const stop = () => {
  clearTimeout(timer)
  timer = 0
}
const step = () => {
  timer = setTimeout(() => {
    current.value = (current.value + 1) % FRAMES
    step()
  }, current.value === 0 ? OF_MS : FRAME_MS)
}
const start = () => {
  if (timer || motionQuery?.matches || document.hidden) return
  step()
}

onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

  // Fetch the slides as the footer approaches, not with the page's first load.
  nearObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      near.value = true
      nearObserver.disconnect()
    },
    { rootMargin: "800px 0px" }
  )
  nearObserver.observe(root.value)

  // Only run while the footer is on screen and the tab is in front.
  let visible = false
  sync = () => (visible && !document.hidden ? start() : stop())
  visibleObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  visibleObserver.observe(root.value)
  document.addEventListener("visibilitychange", sync)
})

onBeforeUnmount(() => {
  stop()
  nearObserver?.disconnect()
  visibleObserver?.disconnect()
  document.removeEventListener("visibilitychange", sync)
})
</script>

<style scoped>
.wordmark {
  position: relative;
  width: 100%;
  aspect-ratio: 1440 / 517;
  container-type: inline-size;
  user-select: none;
}

/* x 952-1377 of 1440, y 490-705 of the 489.5-1006.4 band */
.tile {
  position: absolute;
  left: 66.111%;
  top: 0.1%;
  width: 29.514%;
  height: 41.6%;
  border-radius: 1.667cqw;
  overflow: hidden;
  background: #000;
}
.tile img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  pointer-events: none;
}
.tile img.on {
  opacity: 1;
}

/* The loop's first frame: the word "of", in the wordmark's lavender. */
.of {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 14cqw;
  line-height: 1;
  letter-spacing: -0.04em;
  color: #d8b4fe;
  background: #000;
  opacity: 0;
  pointer-events: none;
}
.of.on {
  opacity: 1;
}
</style>
