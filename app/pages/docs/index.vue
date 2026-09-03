<template>
  <div class="docs-home section bg-white">
    <!-- HERO -->
    <div class="inner !max-w-[1400px] pt-4 md:pt-8">
      <div
        class="relative overflow-hidden rounded-[28px] md:rounded-[32px] bg-gradient-to-br from-purple-50 via-white to-[#FFE9E8] border border-purple-100/60 px-5 py-12 md:py-20 text-center"
      >
        <div class="pointer-events-none absolute -top-24 -left-16 w-72 h-72 rounded-full bg-purple-200/40 blur-3xl" aria-hidden="true" />
        <div class="pointer-events-none absolute -bottom-28 -right-10 w-80 h-80 rounded-full bg-[#FF8980]/20 blur-3xl" aria-hidden="true" />

        <div class="relative max-w-[760px] mx-auto">
          <div class="secondary-font text-md lg:text-lg text-[#FF8980] font-bold mb-3">Help Center</div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.05] mb-4">
            How can we <span class="emphasis-text">help</span>?
          </h1>
          <p class="text-base md:text-lg text-gray-500 max-w-[560px] mx-auto leading-relaxed mb-8">
            Guides and answers for running Cloud of Worship at your church, from your first slide to
            multi-screen setups and livestreams.
          </p>

          <DocSearch variant="hero" hotkeys placeholder="Search for guides, features or error messages…" />

          <div class="flex flex-wrap items-center justify-center gap-2 mt-5 text-sm">
            <span class="text-gray-400">Popular:</span>
            <NuxtLink
              v-for="link in popularLinks"
              :key="link.href"
              :to="link.href"
              class="px-3 py-1 rounded-full bg-white/80 border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- BROWSE BY TOPIC -->
    <div class="inner !max-w-[1400px] pt-14 md:pt-20">
      <div class="flex items-end justify-between gap-4 mb-7">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Browse by topic</h2>
          <p class="text-gray-500 mt-1">Everything in the Help Center, grouped by what you're trying to do.</p>
        </div>
        <span class="hidden sm:block text-sm text-gray-400 shrink-0">{{ articles.length }} articles</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div
          v-for="cat in categories"
          :key="cat.slug"
          class="group relative flex flex-col p-6 rounded-3xl border border-gray-100 bg-white hover:border-purple-200 transition-all"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="grid place-items-center w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 shrink-0 group-hover:bg-purple-100 transition-colors">
              <DocIcon :name="cat.icon" :size="26" />
            </div>
            <div class="min-w-0">
              <h3 class="text-lg font-bold text-gray-900 leading-tight">
                <NuxtLink :to="cat.path" class="hover:text-purple-700 transition-colors">
                  <span class="absolute inset-0 rounded-3xl" aria-hidden="true" />
                  {{ cat.title }}
                </NuxtLink>
              </h3>
              <p class="text-sm text-gray-500 leading-relaxed mt-1">{{ cat.description }}</p>
            </div>
          </div>

          <ul class="relative z-10 space-y-1 mb-4">
            <li v-for="a in cat.articles.slice(0, 4)" :key="a.path">
              <NuxtLink
                :to="a.path"
                class="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-700 py-1 transition-colors"
              >
                <svg class="w-3.5 h-3.5 text-gray-300 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span class="truncate">{{ a.title }}</span>
              </NuxtLink>
            </li>
          </ul>

          <NuxtLink
            :to="cat.path"
            class="relative z-10 mt-auto inline-flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
          >
            See all {{ cat.articles.length }} {{ cat.articles.length === 1 ? 'article' : 'articles' }}
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- POPULAR ARTICLES + QUICK REFERENCE -->
    <div class="inner !max-w-[1400px] pt-14 md:pt-20 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14">
      <section>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Popular articles</h2>
        <p class="text-gray-500 mb-6">The guides worship teams open most often.</p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <li v-for="a in featured" :key="a.path" class="border-b border-gray-100">
            <NuxtLink :to="a.path" class="group flex items-start gap-3 py-3.5">
              <svg class="w-4 h-4 mt-1 text-gray-300 group-hover:text-purple-500 shrink-0 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h10M4 18h7" />
              </svg>
              <div class="min-w-0">
                <div class="text-[15px] font-semibold text-gray-800 group-hover:text-purple-700 transition-colors leading-snug">{{ a.title }}</div>
                <div class="text-xs text-gray-400 mt-0.5">{{ a.category }}</div>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Quick reference</h2>
        <p class="text-gray-500 mb-6">Handy pages to keep open on a Sunday.</p>
        <ul class="space-y-3">
          <li v-for="q in quickReference" :key="q.href">
            <NuxtLink
              :to="q.href"
              class="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-purple-200 transition-all"
            >
              <span class="grid place-items-center w-11 h-11 rounded-xl bg-white border border-gray-100 text-purple-600 shrink-0">
                <DocIcon :name="q.icon" :size="22" />
              </span>
              <div class="min-w-0 flex-1">
                <div class="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">{{ q.title }}</div>
                <div class="text-xs text-gray-500">{{ q.description }}</div>
              </div>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>

    <!-- STILL NEED HELP -->
    <div class="inner !max-w-[1400px] pt-14 md:pt-20 pb-6 md:pb-10">
      <div class="rounded-[28px] md:rounded-[32px] bg-[#FFE9E8] p-8 md:p-12 flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
        <div class="max-w-[560px]">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Still need <span class="emphasis-text">help</span>?
          </h2>
          <p class="text-gray-600 leading-relaxed">
            Can't find what you're looking for? Reach the team directly, or ask thousands of other
            operators in the community. We usually reply within the day.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 shrink-0">
          <NuxtLink to="/contact" class="primary-btn taller sm:w-[200px]">Contact support</NuxtLink>
          <a
            href="https://chat.whatsapp.com/DeQX11igCSU6YaOoTqY7GY"
            target="_blank"
            rel="noopener"
            class="border-btn taller sm:w-[200px] !border-gray-800 !text-gray-800 hover:!bg-gray-800 hover:!text-white"
          >
            Join the community
          </a>
        </div>
      </div>
      <p class="text-center text-sm text-gray-400 mt-6">
        Looking for tips and stories instead?
        <NuxtLink to="/blog" class="text-purple-600 font-semibold hover:underline">Read the blog</NuxtLink>
        ·
        <NuxtLink to="/changelog" class="text-purple-600 font-semibold hover:underline">See what's new</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocSearch from '~/components/docs/DocSearch.vue'
import DocIcon from '~/components/docs/DocIcon.vue'
import { useDocsNav } from '~/composables/useDocumentation'

const nav = useDocsNav()
await nav.ready
const { categories, articles, featured } = nav

const popularLinks = [
  { label: 'Go Live', href: '/docs/going-live/opening-the-live-display' },
  { label: 'Second screen', href: '/docs/going-live/multi-screen-setup' },
  { label: 'Add a song', href: '/docs/building-your-service/adding-songs-and-hymns' },
  { label: 'Shortcuts', href: '/docs/settings-and-shortcuts/keyboard-shortcuts' },
  { label: 'OBS / vMix', href: '/docs/going-live/livestream-output-obs-vmix' },
]

const quickReference = [
  {
    icon: 'keyboard',
    title: 'Keyboard shortcuts',
    description: 'Run a whole service from the arrow keys.',
    href: '/docs/settings-and-shortcuts/keyboard-shortcuts',
  },
  {
    icon: 'credit-card',
    title: 'Free vs Teams',
    description: 'What each plan includes, side by side.',
    href: '/docs/teams-and-collaboration/plans-free-vs-teams',
  },
  {
    icon: 'wrench',
    title: 'Troubleshooting',
    description: 'Quick fixes for the live display, sign-in and sync.',
    href: '/docs/troubleshooting',
  },
  {
    icon: 'lightning',
    title: 'Quick Actions reference',
    description: 'Every action in the app and the plan it needs.',
    href: '/docs/control-center/quick-actions-reference',
  },
]

const title = 'Help Center - Cloud of Worship'
const description =
  'Guides and answers for running Cloud of Worship at your church: getting started, the Control Center, building your service, going live, teams, settings and troubleshooting.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://cloudofworship.com/images/cow-og-image.jpeg',
  ogUrl: 'https://cloudofworship.com/docs',
  ogType: 'website',
})
useHead({ link: [{ rel: 'canonical', href: 'https://cloudofworship.com/docs' }] })
</script>
