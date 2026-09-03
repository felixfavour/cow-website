<template>
  <div class="docs-layout section bg-white min-h-screen">
    <div class="inner !max-w-[1400px]">
      <!-- Mobile: open the topic drawer -->
      <div class="flex items-center gap-3 py-3 border-b border-gray-100 md:hidden">
        <button
          type="button"
          class="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-800 transition-colors"
          aria-label="Browse help topics"
          @click="mobileSidebarOpen = true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Browse help topics
        </button>
      </div>

      <Teleport to="body">
        <Transition name="drawer-fade">
          <div v-if="mobileSidebarOpen" class="fixed inset-0 z-50 flex md:hidden">
            <div class="absolute inset-0 bg-black/40" @click="mobileSidebarOpen = false" />
            <div class="relative z-10 w-[320px] max-w-[88vw] bg-white h-full shadow-2xl overflow-y-auto p-5">
              <div class="flex items-center justify-between mb-4">
                <span class="font-bold text-gray-800">Help topics</span>
                <button
                  type="button"
                  class="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                  aria-label="Close"
                  @click="mobileSidebarOpen = false"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <DocSidebar :hotkeys="false" @navigate="mobileSidebarOpen = false" />
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Three-column layout -->
      <div class="flex gap-8 xl:gap-14 pt-5 md:pt-10 pb-16 md:pb-24">
        <aside class="hidden md:block w-[250px] lg:w-[270px] shrink-0">
          <div class="sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pr-2 -mr-2 doc-scroll">
            <DocSidebar hotkeys />
          </div>
        </aside>

        <main class="flex-1 min-w-0" :class="contentClass">
          <slot />
        </main>

        <aside v-if="toc && toc.length > 0" class="hidden xl:block w-[220px] shrink-0">
          <div class="sticky top-[100px]">
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

withDefaults(
  defineProps<{
    toc?: Array<{ level: string; text: string; id: string }>
    contentClass?: string
  }>(),
  { toc: () => [], contentClass: 'max-w-[760px]' }
)

const mobileSidebarOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (mobileSidebarOpen.value = false))
</script>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.2s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}
.doc-scroll {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}
</style>
