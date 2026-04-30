<template>
  <nav class="doc-sidebar" aria-label="Documentation navigation">
    <!-- Help Center home link -->
    <NuxtLink
      to="/docs"
      class="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-purple-600 mb-6 group transition-colors"
    >
      <svg class="w-4 h-4 group-hover:text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75L12 3l9 6.75V21H3V9.75z" />
      </svg>
      Help Center Home
    </NuxtLink>

    <div v-for="section in nav" :key="section.title" class="mb-6">
      <!-- Section heading -->
      <div class="flex items-center gap-1.5 mb-2 px-2">
        <span class="text-base leading-none">{{ section.icon }}</span>
        <span class="text-xs font-bold uppercase tracking-widest text-gray-400">{{ section.title }}</span>
      </div>

      <!-- Section items -->
      <ul class="space-y-0.5">
        <li v-for="item in section.items" :key="item.href">
          <NuxtLink
            :to="item.href"
            class="sidebar-link block rounded-lg px-3 py-2 text-sm transition-colors leading-snug"
            :class="isActive(item.href)
              ? 'bg-purple-50 text-purple-700 font-semibold'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            @click="$emit('navigate')"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { DOC_NAV } from '~/composables/useDocumentation'

defineEmits(['navigate'])

const route = useRoute()
const nav = DOC_NAV

const isActive = (href: string) => {
  return route.path === href || route.path.startsWith(href + '/')
}
</script>

