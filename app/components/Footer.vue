<template>
  <footer
    class="footer relative overflow-hidden bg-black min-h-[max(720px,62.5vw)] md:min-h-[min(900px,62.5vw)]"
  >
    <FooterIllustration class="absolute inset-0" />
    <div
      class="relative mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16 pt-14 lg:pt-16 pb-16 flex flex-col lg:flex-row gap-12 lg:gap-0 pointer-events-none"
    >
      <div class="grid grid-cols-2 gap-x-6 gap-y-12 lg:gap-y-[42px] lg:grid-cols-[222px_222px] pointer-events-auto">
        <div v-for="group in groups" :key="group.title">
          <h6 class="footer-heading">{{ group.title }}</h6>
          <ul class="mt-[13px] flex flex-col gap-[10px]">
            <li v-for="link in group.links" :key="link.label">
              <button
                v-if="link.action === 'cookies'"
                type="button"
                class="footer-link text-left"
                @click="reopen"
              >
                {{ link.label }}
              </button>
              <a
                v-else
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener' : undefined"
                class="footer-link"
                :class="{ active: isActive(link.href) }"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="lg:w-[340px] pointer-events-auto">
        <p class="text-[14px] leading-[22px] text-[#9BA3B2] max-w-[330px]">
          Cloud of Worship is a browser-based worship support system built for
          growing churches that want simple, reliable media setup
        </p>
        <ul class="mt-[14px] flex items-center gap-3">
          <li v-for="social in socials" :key="social.label">
            <a
              :href="social.href"
              target="_blank"
              rel="noopener"
              :aria-label="social.label"
              class="block text-[#9BA3B2] hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path :d="social.icon" />
              </svg>
            </a>
          </li>
        </ul>
        <p class="mt-[18px] text-[14px] text-[#9BA3B2]">
          &copy; CoW Labs, All Rights Reserved, {{ new Date().getFullYear() }}
        </p>
      </div>

      <a href="/" class="lg:ml-auto self-start pointer-events-auto">
        <img
          src="/logo/cow-logo-purple-and-white.png"
          alt="Cloud of Worship"
          width="197"
          height="42"
          class="h-[34px] lg:h-[42px] w-auto"
        />
      </a>
    </div>
  </footer>
</template>

<script setup>
const { reopen } = useCookieConsent()
const route = useRoute()

const groups = [
  {
    title: "Support",
    links: [
      { label: "Contact COW", href: "/contact" },
      { label: "Help Center", href: "/docs" },
      {
        label: "Join Our Community",
        href: "https://chat.whatsapp.com/DeQX11igCSU6YaOoTqY7GY",
        external: true,
      },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs & Guides", href: "/blog" },
      {
        label: "Roadmap",
        href: "https://cloudofworshippers.featurebase.app/roadmap",
        external: true,
      },
      { label: "What’s New!", href: "/changelog" },
    ],
  },
  {
    title: "Unique Features",
    links: [
      { label: "Browser-ready UX", href: "/features/browser-ready" },
      { label: "Offline-first Experience", href: "/features/offline-first" },
      { label: "Team Workflow", href: "/features/team-workflow" },
      { label: "Bible & Scripture", href: "/features/bible-verses" },
      { label: "Songs & Hymns", href: "/features/song-lyrics" },
      { label: "Live Projection", href: "/features/live-projection" },
      { label: "Live Transcription", href: "/features/live-transcription" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Notice", action: "cookies" },
    ],
  },
]

// TODO: swap in the real profile URLs.
const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: "M24 12.25C24 5.623 18.627.25 12 .25S0 5.623 0 12.25c0 5.628 3.875 10.35 9.101 11.647v-7.979H6.627V12.25h2.474v-1.58c0-4.084 1.849-5.977 5.859-5.977.76 0 2.072.149 2.608.298v3.324c-.283-.03-.775-.045-1.386-.045-1.967 0-2.728.746-2.728 2.684v1.296h3.92l-.673 3.668h-3.247v8.245C19.395 23.445 24 18.386 24 12.25Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: "M12 0C8.741 0 8.333.014 7.053.073 5.776.131 4.904.333 4.141.63a5.88 5.88 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.139C.332 4.903.13 5.775.072 7.052.015 8.332 0 8.741 0 12s.015 3.667.073 4.947c.058 1.277.261 2.149.557 2.912.307.79.717 1.459 1.384 2.126.667.668 1.336 1.079 2.125 1.385.764.297 1.636.499 2.913.558C8.332 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.059 2.15-.261 2.914-.558a5.9 5.9 0 0 0 2.124-1.385 5.9 5.9 0 0 0 1.385-2.125c.295-.764.497-1.636.557-2.913.058-1.28.073-1.688.073-4.947s-.015-3.668-.073-4.948c-.06-1.277-.262-2.149-.557-2.912a5.9 5.9 0 0 0-1.385-2.126A5.9 5.9 0 0 0 19.86.63C19.095.333 18.222.131 16.945.073 15.665.014 15.257 0 11.997 0H12Zm-1.076 2.163h1.077c3.204 0 3.584.011 4.849.069 1.17.053 1.805.249 2.228.413.56.217.959.477 1.379.897s.68.82.898 1.38c.164.423.36 1.058.413 2.228.058 1.265.07 1.645.07 4.847s-.012 3.583-.07 4.848c-.053 1.17-.249 1.805-.413 2.227a3.7 3.7 0 0 1-.898 1.379c-.42.42-.819.68-1.379.897-.422.165-1.058.36-2.228.414-1.265.057-1.645.07-4.849.07s-3.584-.013-4.849-.07c-1.17-.054-1.805-.25-2.228-.414a3.7 3.7 0 0 1-1.38-.897 3.7 3.7 0 0 1-.898-1.38c-.164-.422-.36-1.057-.413-2.227-.058-1.265-.069-1.645-.069-4.85s.011-3.582.069-4.847c.053-1.17.249-1.805.413-2.228.217-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.423-.165 1.058-.36 2.228-.414 1.107-.05 1.536-.065 3.773-.067v.003Zm7.482 1.992a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88ZM12 5.838a6.162 6.162 0 1 0 0 12.323 6.162 6.162 0 0 0 0-12.323ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: "M18.9 1h3.682l-8.04 9.19L24 22.694h-7.406l-5.801-7.584-6.637 7.584H.474l8.6-9.83L0 1h7.594l5.243 6.932L18.9 1Zm-1.291 19.492h2.039L6.486 3.088H4.298l13.312 17.404Z",
  },
]

// Anchors don't get router-link-active, so mark the current page here.
const isActive = (path) =>
  !!path && (route.path === path || route.path.startsWith(path + "/"))
</script>

<style scoped>
.footer-heading {
  font-family: "Geist", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
}
.footer-link {
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: #9ba3b2;
  transition: color 0.15s ease;
}
.footer-link:hover,
.footer-link.active {
  color: #fff;
}
</style>
