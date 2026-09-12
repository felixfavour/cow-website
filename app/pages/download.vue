<template>
  <div class="section page">
    <!-- HERO -->
    <div class="inner pt-[10%] md:pt-[5%]">
      <div
        class="texts max-w-[900px] 2xl:max-w-[1000px] text-center mx-auto flex flex-col gap-4 2xl:gap-6"
      >
        <div
          class="small-text secondary-font text-center text-md lg:text-lg text-[#FF8980] font-bold"
        >
          Desktop app
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Cloud of Worship,
          <span class="emphasis-text">on your projection machine</span>.
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[70%] mx-auto"
        >
          The same app you already use, running as a native window. Real
          multi-monitor placement, NDI output for your livestream, and updates
          that install themselves between services.
        </p>
      </div>

      <!-- PRIMARY DOWNLOAD -->
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          :href="downloadUrl"
          class="primary-btn taller w-[280px] mx-auto"
          @click="trackDownload"
        >
          {{ downloadLabel }}
        </a>
        <div class="helper-text text-sm text-center pt-2">
          <template v-if="release?.version">
            Version {{ release.version }}
            <template v-if="installerSize"> · {{ installerSize }}</template>
            <template v-if="releasedOn"> · released {{ releasedOn }}</template>
          </template>
          <template v-else>
            Windows 10 and later · free on every plan
          </template>
        </div>

        <!-- Shown only once we know what the visitor is on, so the server-
             rendered page stays identical for everyone and for crawlers. -->
        <div
          v-if="platform === 'mac'"
          class="platform-note mx-auto mt-6 max-w-[560px] rounded-2xl bg-[#FFE9E8] p-5 text-left text-sm"
        >
          <p class="font-bold">It looks like you're on a Mac.</p>
          <p class="mt-1">
            The desktop app is Windows-only for now, and the Mac build is still
            in progress. Everything works today in your browser, and you can
            install that to your dock in a few seconds.
          </p>
          <a
            :href="appUrl"
            class="mt-3 inline-block font-bold underline underline-offset-4"
          >
            Open Cloud of Worship in your browser
          </a>
        </div>

        <div
          v-else-if="platform === 'other'"
          class="platform-note mx-auto mt-6 max-w-[560px] rounded-2xl bg-[#FFE9E8] p-5 text-left text-sm"
        >
          <p class="font-bold">The desktop app is Windows-only for now.</p>
          <p class="mt-1">
            On Linux, ChromeOS, or a tablet, use the browser app. It has every
            feature except NDI output, and you can install it to your desktop or
            home screen.
          </p>
          <a
            :href="appUrl"
            class="mt-3 inline-block font-bold underline underline-offset-4"
          >
            Open Cloud of Worship in your browser
          </a>
        </div>
      </div>

      <!-- WHAT THE DESKTOP APP ADDS -->
      <div class="comparison mt-[12%] md:mt-[7%]">
        <h2
          class="text-3xl md:text-4xl 2xl:text-5xl font-bold text-center max-w-[800px] mx-auto"
        >
          What you get that the
          <span class="emphasis-text">browser can't do</span>.
        </h2>

        <div class="grid md:grid-cols-3 gap-4 md:gap-6 mt-[7%] md:mt-[4%]">
          <div
            v-for="item in advantages"
            :key="item.title"
            class="p-6 md:p-8 rounded-[24px] bg-gray-50 border border-gray-100"
          >
            <h3 class="text-xl font-bold">{{ item.title }}</h3>
            <p class="mt-2 text-sm md:text-base">{{ item.body }}</p>
          </div>
        </div>

        <p class="text-center text-sm mt-6">
          Everything else, every slide type, schedule, setting and shortcut,
          works identically in both.
          <a href="/docs/settings-and-shortcuts/desktop-app" class="font-bold underline underline-offset-4">
            Read the full guide
          </a>
        </p>
      </div>

      <!-- INSTALL STEPS -->
      <div class="install mt-[12%] md:mt-[7%]">
        <h2
          class="text-3xl md:text-4xl 2xl:text-5xl font-bold text-center max-w-[800px] mx-auto"
        >
          Installing takes about <span class="emphasis-text">a minute</span>.
        </h2>

        <ol
          class="steps max-w-[700px] mx-auto mt-[7%] md:mt-[4%] flex flex-col gap-5"
        >
          <li
            v-for="(step, index) in installSteps"
            :key="step"
            class="flex gap-4 items-start"
          >
            <span
              class="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-purple-100 font-bold text-sm"
            >
              {{ index + 1 }}
            </span>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="pt-1" v-html="step" />
          </li>
        </ol>

        <p class="text-center text-sm mt-8 max-w-[640px] mx-auto">
          Your schedules, songs, library and settings live on your account, not
          on the device, so everything you already have is waiting for you as
          soon as you sign in.
        </p>
      </div>
    </div>

    <ChurchUsersSection />

    <AboveFooterSection />

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const { mergeUtmsIntoUrl } = useUtm()
const showTestimonialPopup = ref(false)

// Cached on the server for 30 minutes, so this is effectively free per visit.
const { data: release } = await useFetch("/api/latest-release")

const appUrl = computed(() =>
  mergeUtmsIntoUrl(
    "https://app.cloudofworship.com?utm_source=marketing_website&utm_medium=download_page"
  )
)

// Falls back to the releases page whenever GitHub could not be read, so the
// button is never dead.
const RELEASES_PAGE =
  "https://github.com/CoW-Labs/cloudofworship/releases/latest"

const downloadUrl = computed(
  () => release.value?.windows?.url || release.value?.fallbackUrl || RELEASES_PAGE
)

const downloadLabel = computed(() =>
  release.value?.windows ? "Download for Windows" : "Get the Windows app"
)

const installerSize = computed(() => {
  const bytes = release.value?.windows?.size
  if (!bytes) return null
  return `${Math.round(bytes / 1024 / 1024)} MB`
})

const releasedOn = computed(() => {
  const published = release.value?.publishedAt
  if (!published) return null
  return new Date(published).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
})

// Null until mounted: the server has no idea what the visitor is on, and
// guessing would either poison the cached HTML or cause a hydration mismatch.
const platform = ref(null)

const detectPlatform = () => {
  const hint = navigator.userAgentData?.platform || navigator.platform || ""
  const agent = navigator.userAgent || ""
  const haystack = `${hint} ${agent}`.toLowerCase()

  if (haystack.includes("win")) return "windows"
  // iPads report a Mac user agent, so they have to be ruled out before the
  // Mac check or they get told about a desktop build they cannot run.
  if (haystack.includes("iphone") || haystack.includes("ipad")) return "other"
  if (haystack.includes("mac")) return "mac"
  return "other"
}

const advantages = [
  {
    title: "Real projector windows",
    body: "The live and stage displays open as native windows on the monitor you pick. No popup blockers, no dragging them into place every Sunday.",
  },
  {
    title: "NDI for your livestream",
    body: "Publish the live output to OBS, vMix or a switcher over your local network, with no capture card and no second computer running a browser.",
  },
  {
    title: "Updates that wait their turn",
    body: "New versions download quietly in the background and install when you restart, so nothing ever interrupts a service.",
  },
]

const installSteps = [
  'Download the installer above. It is named <code>Cloud.of.Worship_&lt;version&gt;_x64-setup.exe</code>.',
  'Run it. Windows may say the publisher is not recognised for a newly released installer. Choose <strong>More info</strong>, then <strong>Run anyway</strong>.',
  'Sign in with the account you already use, and pick your projector under <strong>Settings → Display Settings</strong>.',
]

const trackDownload = () => {
  if (typeof window === "undefined") return
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") return
  window.gtag?.("event", "desktop_download", {
    version: release.value?.version ?? "unknown",
    platform: platform.value ?? "unknown",
  })
}

useSeoMeta({
  title: "Download Cloud of Worship for Windows - Church presentation software",
  ogTitle: "Download Cloud of Worship for Windows",
  description:
    "Download the Cloud of Worship desktop app for Windows. Native multi-monitor projection, NDI output for OBS and vMix, and background updates. Free on every plan.",
  ogDescription:
    "Download the Cloud of Worship desktop app for Windows. Native multi-monitor projection, NDI output for OBS and vMix, and background updates. Free on every plan.",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/download",
  ogType: "website",
  ogLocale: "en_US",
})

useOgCard("download")

onMounted(() => {
  platform.value = detectPlatform()

  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }

  if (
    window.innerWidth >= 768 &&
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1"
  ) {
    showTestimonialPopup.value = true
  }
})
</script>
