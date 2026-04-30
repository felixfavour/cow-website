<template>
  <div class="docs-layout pt-[80px] md:pt-[96px] min-h-screen bg-white">
    <div class="docs-layout__inner w-[95%] max-w-[1400px] mx-auto px-2 md:px-4">
      <!-- Mobile sidebar toggle -->
      <div class="flex items-center gap-3 py-3 border-b border-gray-100 md:hidden mb-4">
        <button
          class="flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
          @click="mobileSidebarOpen = !mobileSidebarOpen"
          aria-label="Open navigation menu"
        >
          <svg v-if="!mobileSidebarOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Browse Help Topics
        </button>
      </div>

      <!-- Mobile sidebar overlay -->
      <Transition name="sidebar-fade">
        <div v-if="mobileSidebarOpen" class="fixed inset-0 z-50 flex md:hidden">
          <div class="absolute inset-0 bg-black/40" @click="mobileSidebarOpen = false" />
          <div class="relative z-10 w-[300px] bg-white h-full shadow-2xl overflow-y-auto p-4">
            <div class="flex items-center justify-between mb-4">
              <span class="font-bold text-gray-800 text-base">Help Topics</span>
              <button @click="mobileSidebarOpen = false" class="p-1 text-gray-400 hover:text-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DocSidebar @navigate="mobileSidebarOpen = false" />
          </div>
        </div>
      </Transition>

      <!-- Three-column layout -->
      <div class="docs-columns flex gap-0 lg:gap-8 xl:gap-12">
        <!-- Left Sidebar — hidden on mobile -->
        <aside class="docs-sidebar-col hidden md:block w-[240px] lg:w-[260px] shrink-0 pt-8">
          <div class="sticky top-24">
            <DocSidebar />
          </div>
        </aside>

        <!-- Main content -->
        <main class="docs-main flex-1 min-w-0 py-8 md:py-10 max-w-[740px]">
          <slot />
        </main>

        <!-- Right TOC — only on wide screens -->
        <aside v-if="toc && toc.length > 0" class="docs-toc-col hidden xl:block w-[200px] shrink-0 pt-8">
          <div class="sticky top-24">
            <DocTableOfContents :headings="toc" />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocSidebar from '~/components/docs/DocSidebar.vue'
import DocTableOfContents from '~/components/docs/DocTableOfContents.vue'

defineProps<{
  toc?: Array<{ level: string; text: string; id: string }>
}>()

const mobileSidebarOpen = ref(false)
</script>

<style scoped>
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.2s ease;
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}
</style>

