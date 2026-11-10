<template>
  <div class="page download">
    <!--
      HERO: the desktop app's whole point is a second screen. So the hero is a
      small working scene: pick a slide on the operator's laptop and it lands
      on the projector, then the signal leaves for the livestream.
    -->
    <section class="b-hero relative overflow-hidden bg-white text-[#0C0F19]">

      <div
        class="relative mx-auto max-w-[1600px] px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20 lg:px-16"
      >
        <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end lg:gap-16">
          <div>
            <RevealText
              as="h1"
              :lines="['Send it to the', 'big screen.']"
              by="words"
              effect="focus"
              immediate
              :stagger="0.1"
              :delay="0.1"
              class="b-h1 font-bold"
            />
            <!-- DOWNLOAD -->
            <div class="mt-8 flex flex-col items-start gap-5 md:mt-10">
              <!-- On a Mac there is nothing to download yet, so the browser
                   becomes the main action. -->
              <template v-if="platform === 'mac'">
                <p class="b-mac">You're on a Mac. Use Cloud of Worship in your browser instead.</p>
                <a :href="appUrl" class="pill-btn b-cta">Open in your browser</a>
              </template>
              <template v-else>
                <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a :href="downloadUrl" class="pill-btn b-cta" @click="trackDownload">
                    {{ downloadLabel }}
                  </a>
                  <a :href="appUrl" class="b-link">Or use it in your browser</a>
                </div>
                <p class="b-meta">
                  <template v-if="release?.version">
                    Version {{ release.version }}
                    <template v-if="installerSize"> · {{ installerSize }}</template>
                    <template v-if="releasedOn"> · released {{ releasedOn }}</template>
                  </template>
                  <template v-else>Windows 10 and later · free on every plan</template>
                </p>
              </template>
            </div>

            <!-- Shown only once we know what the visitor is on, so the server-
                 rendered page stays identical for everyone and for crawlers.
                 Phones and tablets get the "other" note from the server via CSS
                 (.until-detected), so it doesn't shift the page later. -->
            <div
              v-if="platform === 'other' || platform === null"
              class="b-note"
              :class="{ 'until-detected': platform === null }"
            >
              <p><strong>Windows-only for now.</strong> On Linux, ChromeOS or a tablet, use the browser app. It has every feature except NDI, and you can install it to your desktop or home screen.</p>
              <a :href="appUrl">Open Cloud of Worship in your browser</a>
            </div>
          </div>
          <p class="b-intro">
            Your projection machine, handled. Real multi-monitor placement,
            NDI out to your livestream, and updates that install themselves
            between services.
          </p>
        </div>

        <!-- THE SCENE -->
        <div class="b-scene mt-12 md:mt-16" @pointerdown="stopAuto">
          <!-- Operator laptop -->
          <div class="b-laptop">
            <div class="b-laptop-screen">
              <p class="b-label">Operator</p>
              <ul class="b-chips" role="listbox" aria-label="Slides in today's schedule">
                <li v-for="(s, i) in scene" :key="s.src">
                  <button
                    type="button"
                    role="option"
                    :aria-selected="active === i"
                    class="b-chip"
                    :class="{ on: active === i }"
                    @click="pick(i)"
                  >
                    <img :src="s.src" alt="" width="1280" height="720" decoding="async" />
                    <span>{{ s.name }}</span>
                  </button>
                </li>
              </ul>
              <p class="b-hint">Click a slide</p>
            </div>
            <div class="b-laptop-base" aria-hidden="true"></div>
          </div>

          <!-- The cable between them -->
          <div class="b-cable" aria-hidden="true">
            <span :key="active" class="b-pulse"></span>
          </div>

          <!-- Projector screen -->
          <div class="b-projector">
            <p class="b-label b-label-dark">Projector</p>
            <div class="b-screen">
              <Transition name="b-swap" mode="out-in">
                <img
                  :key="scene[active].src"
                  :src="scene[active].src"
                  :alt="`${scene[active].name} slide on the projector`"
                  width="1280"
                  height="720"
                  class="b-screen-img"
                />
              </Transition>
              <span class="b-live">Live</span>
            </div>

            <!-- NDI out -->
            <div class="b-out">
              <span class="b-out-line" aria-hidden="true"></span>
              <span class="b-ndi">NDI</span>
              <span class="b-dest">OBS</span>
              <span class="b-dest">vMix</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- THREE STEPS: one path, left to right -->
    <section class="bg-white text-[#0C0F19]">
      <div
        class="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32"
      >
        <RevealText
          as="h2"
          :lines="['Installing takes', 'about a minute.']"
          class="b-h2 font-bold"
        />

        <ol class="b-path mt-14 md:mt-20">
          <li v-for="(step, i) in steps" :key="step.title" class="b-step">
            <span class="b-step-disc" aria-hidden="true">
              <component :is="step.icon" weight="fill" />
            </span>
            <h3 class="b-step-title">{{ step.title }}</h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="b-step-body" v-html="step.body" />
          </li>
        </ol>

        <p class="mt-12 max-w-[640px] text-[17px] leading-[1.45] text-[#4B5263]">
          Your schedules, songs, library and settings live on your account, not
          on the device, so everything you already have is waiting the moment
          you sign in.
          <a href="/docs/settings-and-shortcuts/desktop-app" class="b-inline">Read the desktop guide</a>.
        </p>
      </div>
    </section>

    <!-- NIGHT: the browser is enough for most -->
    <section class="b-night text-[#E6E7EB]">
      <div
        class="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-16 lg:px-16"
      >
        <h2 class="b-h2 font-bold text-white">
          Your browser<br />already does it all.
        </h2>
        <div>
          <p class="text-[19px] leading-[1.4] text-[#B7B7B7]">
            Every slide type, schedule, setting and shortcut works on any
            computer with nothing to install. The desktop app adds one thing:
            NDI for your livestream.
          </p>
          <a :href="appUrl" class="pill-btn mt-8">Open Cloud of Worship</a>
        </div>
      </div>
    </section>

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
import { PhDownloadSimple, PhPlayCircle, PhUserCircle } from "@phosphor-icons/vue"

const { data: release } = await useFetch("/api/latest-release")

const {
  appUrl,
  downloadUrl,
  downloadLabel,
  installerSize,
  releasedOn,
  platform,
  trackDownload,
  showTestimonialPopup,
} = useDownloadPage(release)

const scene = [
  { name: "Romans 5:8", src: "/hero/bible-slide.webp" },
  { name: "Oceans", src: "/hero/oceans-song-slide.webp" },
  { name: "Let us pray", src: "/hero/let-us-pray-interlude-slide.webp" },
]
const active = ref(0)

// It plays on its own until someone touches it.
let timer = 0
const stopAuto = () => clearInterval(timer)
const pick = (i) => {
  stopAuto()
  active.value = i
}
onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  timer = window.setInterval(() => {
    active.value = (active.value + 1) % scene.length
  }, 3600)
})
onBeforeUnmount(stopAuto)

const steps = [
  {
    title: "Download it",
    icon: PhDownloadSimple,
    body: "Get the installer above. It is named <code>Cloud.of.Worship_&lt;version&gt;_x64-setup.exe</code>.",
  },
  {
    title: "Run it",
    icon: PhPlayCircle,
    body: "Windows may not recognise a newly released publisher. Choose <strong>More info</strong>, then <strong>Run anyway</strong>.",
  },
  {
    title: "Sign in",
    icon: PhUserCircle,
    body: "Use the account you already have, then pick your projector under <strong>Settings → Display Settings</strong>.",
  },
]

const description =
  "Download the Cloud of Worship desktop app for Windows. Native multi-monitor projection, NDI output for OBS and vMix, and background updates. Free on every plan."

useSeoMeta({
  title: "Download Cloud of Worship for Windows (Free)",
  ogTitle: "Download Cloud of Worship for Windows",
  description,
  ogDescription: description,
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/download",
  ogType: "website",
  ogLocale: "en_US",
})

useOgCard("download")
</script>

<style scoped>
.b-wash {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 50% 60% at 100% 0%, rgba(216, 180, 254, 0.6), transparent 70%),
    radial-gradient(ellipse 45% 50% at 0% 100%, rgba(226, 240, 255, 0.9), transparent 70%);
}
.b-eyebrow {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b17a9;
}
.b-h1 {
  font-size: 60px;
  line-height: 0.92;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .b-h1 {
    font-size: 96px;
  }
}
@media (min-width: 1280px) {
  .b-h1 {
    font-size: 128px;
  }
}
.b-intro {
  font-size: 19px;
  line-height: 1.4;
  color: #4b5263;
}
@media (min-width: 1024px) {
  .b-intro {
    font-size: 21px;
    padding-bottom: 0.5em;
  }
}

/* ---- Scene ---- */
.b-scene {
  /* An animation, not content: no text or image selection, no I-beam. */
  user-select: none;
  -webkit-user-select: none;
  cursor: default;
  display: grid;
  gap: 18px;
  align-items: center;
}
@media (min-width: 900px) {
  .b-scene {
    grid-template-columns: minmax(0, 0.8fr) 90px minmax(0, 1.2fr);
    gap: 0;
  }
}
.b-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8f8f98;
}
.b-label-dark {
  color: #4b5263;
  margin-bottom: 10px;
}

.b-laptop {
  width: 100%;
  max-width: 470px;
  justify-self: end;
}
.b-laptop-screen {
  padding: 22px 22px 20px;
  border-radius: 20px 20px 6px 6px;
  background: #0c0f19;
  box-shadow: 0 30px 50px -28px rgba(12, 15, 25, 0.6);
}
.b-laptop-base {
  height: 12px;
  margin: 0 -14px;
  border-radius: 0 0 20px 20px;
  background: linear-gradient(180deg, #d9dbe2, #aeb1bd);
}
.b-chips {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.b-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 7px 16px 7px 7px;
  border-radius: 9999px;
  background: #1b1f2e;
  color: #d4d4d8;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  box-shadow: inset 0 0 0 2px transparent;
  transition: background 0.2s, box-shadow 0.2s, color 0.2s;
}
.b-scene img {
  -webkit-user-drag: none;
  user-drag: none;
}
.b-chip {
  cursor: pointer;
}
.b-chip img {
  width: 68px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 9999px;
}
.b-chip:hover {
  background: #262b3d;
}
.b-chip.on {
  background: #8a41c9;
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 4px 0 #6b17a9;
}
.b-chip:focus-visible {
  outline: 2px solid #c084fc;
  outline-offset: 3px;
}
.b-hint {
  margin-top: 14px;
  font-size: 13px;
  color: #8f8f98;
}

/* The cable: a dashed line, and a light that runs along it on each pick. */
.b-cable {
  position: relative;
  height: 44px;
  width: 2px;
  margin: 0 auto;
  background: repeating-linear-gradient(
    to bottom,
    rgba(138, 65, 201, 0.5) 0 6px,
    transparent 6px 12px
  );
}
@media (min-width: 900px) {
  .b-cable {
    height: 2px;
    width: 100%;
    background: repeating-linear-gradient(
      to right,
      rgba(138, 65, 201, 0.5) 0 6px,
      transparent 6px 12px
    );
  }
}
.b-pulse {
  position: absolute;
  top: 0;
  left: 50%;
  width: 12px;
  height: 12px;
  margin: -5px 0 0 -5px;
  border-radius: 9999px;
  background: #a855f7;
  box-shadow: 0 0 14px 4px rgba(168, 85, 247, 0.7);
  animation: b-run-y 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
@media (min-width: 900px) {
  .b-pulse {
    top: 50%;
    left: 0;
    margin: -6px 0 0 -6px;
    animation-name: b-run-x;
  }
}
@keyframes b-run-x {
  from { left: 0; opacity: 1; }
  to { left: 100%; opacity: 0; }
}
@keyframes b-run-y {
  from { top: 0; opacity: 1; }
  to { top: 100%; opacity: 0; }
}

.b-screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  background: #101010;
  box-shadow:
    0 0 0 8px #1b1f2e,
    0 40px 80px -30px rgba(107, 23, 169, 0.55);
}
.b-screen-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.b-live {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 5px 12px;
  border-radius: 9999px;
  background: #ff8980;
  color: #0c0f19;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.b-swap-enter-active,
.b-swap-leave-active {
  transition: opacity 0.35s ease, filter 0.35s ease;
}
.b-swap-enter-from,
.b-swap-leave-to {
  opacity: 0;
  filter: blur(14px);
}

/* Signal out: NDI to the livestream tools. */
.b-out {
  position: relative;
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.b-out-line {
  position: absolute;
  left: 40px;
  right: 0;
  top: 50%;
  height: 2px;
  background: repeating-linear-gradient(to right, rgba(12, 15, 25, 0.25) 0 6px, transparent 6px 12px);
  z-index: 0;
}
.b-ndi,
.b-dest {
  position: relative;
  z-index: 1;
  padding: 7px 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
}
.b-ndi {
  background: #fdefd4;
  color: #1a1f2e;
  margin-right: auto;
}
.b-dest {
  background: #e2f0ff;
  color: #1a1f2e;
  animation: b-glow 2.4s ease-in-out infinite;
}
.b-dest:last-child {
  animation-delay: 1.2s;
}
@keyframes b-glow {
  50% { box-shadow: 0 0 0 5px rgba(168, 85, 247, 0.22); }
}
@media (prefers-reduced-motion: reduce) {
  .b-pulse, .b-dest { animation: none; }
  .b-swap-enter-active, .b-swap-leave-active { transition: none; }
}

/* ---- Download row ---- */
.b-cta {
  height: 52px;
  padding: 0 30px;
  font-size: 17px;
}
.b-link {
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}
.b-link:hover {
  color: #6b17a9;
}
.b-meta {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6b7280;
}
.b-note {
  max-width: 560px;
  margin-top: 28px;
  padding: 20px 22px;
  border-radius: 20px;
  background: #ffe9e8;
  color: #1a1f2e;
  font-size: 15px;
  line-height: 1.4;
}
.b-mac {
  max-width: 440px;
  font-size: 19px;
  line-height: 1.35;
  font-weight: 500;
}
.b-note.b-note-mac {
  display: inline-block;
  margin-top: 20px;
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 600;
}
.b-note a {
  display: inline-block;
  margin-top: 10px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.b-note.until-detected {
  display: none;
}
@media (hover: none) and (pointer: coarse) {
  .b-note.until-detected {
    display: block;
  }
}

/* ---- Steps ---- */
.b-h2 {
  font-size: 52px;
  line-height: 0.95;
  letter-spacing: -0.02em;
}
@media (min-width: 768px) {
  .b-h2 {
    font-size: 76px;
  }
}
@media (min-width: 1024px) {
  .b-h2 {
    font-size: 96px;
  }
}
.b-path {
  position: relative;
  display: grid;
  gap: 40px;
}
@media (min-width: 768px) {
  .b-path {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
  }
  /* One dashed path running through the three discs. */
  .b-path::before {
    content: "";
    position: absolute;
    top: 23px;
    left: 23px;
    right: 23px;
    height: 2px;
    background: repeating-linear-gradient(to right, rgba(138, 65, 201, 0.5) 0 6px, transparent 6px 12px);
  }
}
.b-step {
  position: relative;
}
.b-step-disc {
  position: relative;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  background: #f6e8ff;
  color: #1b1f2e;
  font-size: 22px;
}
.b-step-title {
  margin-top: 22px;
  font-weight: 800;
  font-size: 38px;
  line-height: 1;
  letter-spacing: -0.01em;
}
.b-step-body {
  margin-top: 10px;
  max-width: 340px;
  font-size: 17px;
  line-height: 1.45;
  color: #4b5263;
}
.b-step-body :deep(code) {
  font-size: 0.85em;
  padding: 2px 6px;
  border-radius: 6px;
  background: #f3e8ff;
  color: #3b0764;
  word-break: break-all;
}
.b-step-body :deep(strong) {
  color: #0c0f19;
  font-weight: 600;
}
.b-inline {
  color: #0c0f19;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.b-inline:hover {
  color: #9333ea;
}

.b-night {
  background:
    radial-gradient(ellipse 50% 80% at 90% 100%, rgba(138, 65, 201, 0.35), transparent 70%),
    #0c0f19;
}
</style>
