<template>
  <div class="pt-[80px] md:pt-[96px] min-h-screen bg-white">
    <!-- Hero -->
    <div class="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-b border-gray-100">
      <div class="w-[90%] max-w-[900px] mx-auto py-14 md:py-20 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-5">
          Help Center
        </div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
          style="font-family: 'Bricolage Grotesque', sans-serif;"
        >
          Welcome to Cloud of Worship! 👋
        </h1>
        <p class="text-lg md:text-xl text-gray-500 mb-8 max-w-[600px] mx-auto leading-relaxed">
          We're so glad you're here. Whether you're just getting started or looking to unlock new
          features, we're here to help you lead amazing worship experiences.
        </p>
      </div>
    </div>

    <!-- Quick-start cards -->
    <div class="w-[90%] max-w-[1100px] mx-auto py-14">
      <h2
        class="text-2xl font-bold text-gray-800 mb-8 text-center"
        style="font-family: 'Bricolage Grotesque', sans-serif;"
      >
        Where would you like to start?
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        <NuxtLink
          v-for="card in quickStartCards"
          :key="card.href"
          :to="card.href"
          class="group flex flex-col gap-3 p-6 rounded-2xl border border-gray-100 bg-white hover:border-purple-200 hover:shadow-lg hover:shadow-purple-50 transition-all"
        >
          <span class="text-3xl">{{ card.icon }}</span>
          <h3
            class="font-bold text-gray-800 group-hover:text-purple-700 transition-colors"
            style="font-family: 'Bricolage Grotesque', sans-serif;"
          >
            {{ card.title }}
          </h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ card.description }}</p>
          <span class="mt-auto text-xs font-semibold text-purple-600 flex items-center gap-1">
            Explore
            <svg
              class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </NuxtLink>
      </div>

      <!-- Quick links -->
      <div class="bg-gray-50 rounded-3xl p-8 md:p-10">
        <h2
          class="text-xl font-bold text-gray-800 mb-6"
          style="font-family: 'Bricolage Grotesque', sans-serif;"
        >
          🔗 Quick Links
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.href"
            :to="link.href"
            class="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 hover:bg-white px-3 py-2 rounded-xl transition-all group"
          >
            <svg
              class="w-4 h-4 text-gray-300 group-hover:text-purple-500 shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Help Center — Cloud of Worship',
  description:
    'Find answers and learn how to make the most of Cloud of Worship. Step-by-step guides, examples, and resources for worship teams.',
})

const quickStartCards = [
  {
    icon: '🚀',
    title: 'Getting Started',
    description: 'New here? Start with the basics and be up and running in 10 minutes.',
    href: '/documentation/getting-started',
  },
  {
    icon: '📖',
    title: 'Guides',
    description: 'Step-by-step help for organizing songs, working with your team, and more.',
    href: '/documentation/guides',
  },
  {
    icon: '💡',
    title: 'Examples',
    description: 'Real-world scenarios from worship teams just like yours.',
    href: '/documentation/examples',
  },
  {
    icon: '🔖',
    title: 'Resources',
    description: 'Glossary, FAQ, keyboard shortcuts, and more helpful extras.',
    href: '/documentation/resources',
  },
]

const quickLinks = [
  {
    label: 'Creating Your First Song',
    href: '/documentation/getting-started/creating-your-first-song',
  },
  {
    label: 'Inviting Team Members',
    href: '/documentation/getting-started/inviting-team-members',
  },
  {
    label: 'Your First Service Walkthrough',
    href: '/documentation/getting-started/your-first-service',
  },
  { label: 'Organizing Your Songs', href: '/documentation/guides/organizing-your-songs' },
  {
    label: 'Collaborating with Your Team',
    href: '/documentation/guides/collaborating-with-your-team',
  },
  { label: 'Frequently Asked Questions', href: '/documentation/resources/faq' },
]
</script>
