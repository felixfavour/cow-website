<template>
  <footer class="doc-footer mt-14">
    <!-- Was this helpful? -->
    <div
      v-if="showFeedback"
      class="flex flex-col sm:flex-row sm:items-center gap-3 justify-between p-5 rounded-2xl border border-gray-100 bg-white"
    >
      <p class="text-sm font-semibold text-gray-700">
        <template v-if="feedback === null">Was this article helpful?</template>
        <template v-else-if="feedback === 'yes'">Thanks for letting us know! 💜</template>
        <template v-else>Sorry to hear that. Tell us what was missing and we'll fix it.</template>
      </p>
      <div v-if="feedback === null" class="flex items-center gap-2">
        <button type="button" class="feedback-btn" @click="feedback = 'yes'">
          <span aria-hidden="true">👍</span> Yes
        </button>
        <button type="button" class="feedback-btn" @click="feedback = 'no'">
          <span aria-hidden="true">👎</span> No
        </button>
      </div>
      <NuxtLink
        v-else-if="feedback === 'no'"
        to="/contact"
        class="text-sm font-semibold text-purple-700 hover:underline shrink-0"
      >
        Send feedback →
      </NuxtLink>
    </div>

    <!-- Prev / next -->
    <div v-if="prev || next" class="flex flex-col sm:flex-row gap-3 mt-6">
      <NuxtLink
        v-if="prev"
        :to="prev.path"
        class="group flex-1 flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/40 transition-all"
      >
        <svg class="w-5 h-5 text-gray-300 group-hover:text-purple-500 shrink-0 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <div class="min-w-0">
          <div class="text-xs text-gray-400 mb-0.5">Previous</div>
          <div class="text-sm font-semibold text-gray-700 group-hover:text-purple-700 truncate transition-colors">{{ prev.title }}</div>
        </div>
      </NuxtLink>
      <div v-else class="flex-1 hidden sm:block" />

      <NuxtLink
        v-if="next"
        :to="next.path"
        class="group flex-1 flex items-center justify-end gap-3 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/40 transition-all text-right"
      >
        <div class="min-w-0">
          <div class="text-xs text-gray-400 mb-0.5">Next up</div>
          <div class="text-sm font-semibold text-gray-700 group-hover:text-purple-700 truncate transition-colors">{{ next.title }}</div>
        </div>
        <svg class="w-5 h-5 text-gray-300 group-hover:text-purple-500 shrink-0 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Related -->
    <section v-if="related && related.length" class="mt-10">
      <h2 class="text-lg font-bold text-gray-800 mb-3">Related articles</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <li v-for="a in related" :key="a.path">
          <NuxtLink
            :to="a.path"
            class="group flex items-start gap-2.5 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <svg class="w-4 h-4 mt-0.5 text-gray-300 group-hover:text-purple-500 shrink-0 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h10v10M7 17L17 7" />
            </svg>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-700 group-hover:text-purple-700 transition-colors leading-snug">{{ a.title }}</div>
              <p v-if="a.description" class="text-xs text-gray-500 line-clamp-2 mt-0.5">{{ a.description }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- Help nudge -->
    <DocHelpCard class="mt-10" />
  </footer>
</template>

<script setup lang="ts">
import DocHelpCard from '~/components/docs/DocHelpCard.vue'
import type { DocArticle } from '~/composables/useDocumentation'

withDefaults(
  defineProps<{
    prev?: DocArticle | null
    next?: DocArticle | null
    related?: DocArticle[]
    showFeedback?: boolean
  }>(),
  { prev: null, next: null, related: () => [], showFeedback: true }
)

const feedback = ref<'yes' | 'no' | null>(null)
</script>

<style scoped>
.feedback-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 38px;
  padding: 0 1rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  background: #fff;
  transition: all 0.15s ease;
}
.feedback-btn:hover {
  border-color: #c084fc;
  color: #7e22ce;
  background: #faf5ff;
}
</style>
