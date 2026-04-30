<template>
  <footer class="doc-footer mt-12 pt-8 border-t border-gray-100">
    <div class="flex flex-col sm:flex-row gap-4 justify-between">
      <!-- Previous -->
      <NuxtLink
        v-if="prev"
        :to="prev.href"
        class="doc-nav-card group flex-1 flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all text-left"
      >
        <svg class="w-5 h-5 text-gray-300 group-hover:text-purple-500 shrink-0 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <div class="min-w-0">
          <div class="text-xs text-gray-400 mb-0.5">Previous</div>
          <div class="text-sm font-semibold text-gray-700 group-hover:text-purple-700 truncate transition-colors">{{ prev.label }}</div>
        </div>
      </NuxtLink>
      <div v-else class="flex-1" />

      <!-- Next -->
      <NuxtLink
        v-if="next"
        :to="next.href"
        class="doc-nav-card group flex-1 flex items-center justify-end gap-3 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all text-right"
      >
        <div class="min-w-0">
          <div class="text-xs text-gray-400 mb-0.5">Next up</div>
          <div class="text-sm font-semibold text-gray-700 group-hover:text-purple-700 truncate transition-colors">{{ next.label }}</div>
        </div>
        <svg class="w-5 h-5 text-gray-300 group-hover:text-purple-500 shrink-0 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Help nudge -->
    <div class="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
      <div>
        <p class="text-sm font-semibold text-gray-700 mb-0.5">Still need help?</p>
        <p class="text-sm text-gray-500">Our team is happy to answer your questions.</p>
      </div>
      <NuxtLink to="/contact" class="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors">
        Contact Support
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  prev?: { label: string; href: string } | null
  next?: { label: string; href: string } | null
}>()
</script>

