<template>
  <nav class="doc-sidebar" aria-label="Help Center navigation">
    <DocSearch v-if="showSearch" variant="compact" :hotkeys="hotkeys" class="mb-5" />

    <NuxtLink
      to="/docs"
      class="flex items-center gap-2 px-2 py-1.5 mb-4 text-sm font-semibold rounded-lg transition-colors group"
      :class="route.path === '/docs' ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'"
      @click="$emit('navigate')"
    >
      <DocIcon name="house" :size="18" weight="regular" />
      Help Center home
    </NuxtLink>

    <ul class="space-y-1">
      <li v-for="cat in categories" :key="cat.slug">
        <button
          type="button"
          class="w-full flex items-center justify-between gap-2 px-2 py-2 rounded-lg text-left text-sm font-semibold transition-colors"
          :class="isCategoryActive(cat) ? 'text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'"
          :aria-expanded="isOpen(cat.slug)"
          @click="toggle(cat.slug)"
        >
          <span class="flex items-center gap-2 min-w-0">
            <DocIcon :name="cat.icon" :size="18" class="shrink-0" :class="isCategoryActive(cat) ? 'text-purple-600' : 'text-gray-500'" />
            <span class="truncate">{{ cat.title }}</span>
          </span>
          <svg
            class="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200"
            :class="isOpen(cat.slug) ? 'rotate-90' : ''"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <ul v-show="isOpen(cat.slug)" class="ml-[13px] pl-3 border-l border-gray-100 mt-0.5 mb-2 space-y-0.5">
          <li>
            <NuxtLink
              :to="cat.path"
              class="block rounded-lg px-2.5 py-1.5 text-[13px] leading-snug transition-colors"
              :class="route.path === cat.path ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'"
              @click="$emit('navigate')"
            >
              Overview
            </NuxtLink>
          </li>
          <li v-for="a in cat.articles" :key="a.path">
            <NuxtLink
              :to="a.path"
              class="block rounded-lg px-2.5 py-1.5 text-[13px] leading-snug transition-colors"
              :class="route.path === a.path ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
              @click="$emit('navigate')"
            >
              {{ a.title }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import DocSearch from '~/components/docs/DocSearch.vue'
import DocIcon from '~/components/docs/DocIcon.vue'
import { useDocsNav, type DocCategory } from '~/composables/useDocumentation'

withDefaults(
  defineProps<{
    showSearch?: boolean
    hotkeys?: boolean
  }>(),
  { showSearch: true, hotkeys: false }
)

defineEmits(['navigate'])

const route = useRoute()
const { categories } = useDocsNav()

const currentSlug = computed(() => route.path.replace(/^\/docs\/?/, '').split('/')[0] || '')
const openSlugs = ref<Set<string>>(new Set(currentSlug.value ? [currentSlug.value] : []))

watch(currentSlug, (slug) => {
  if (slug) openSlugs.value = new Set([...openSlugs.value, slug])
})

const isOpen = (slug: string) => openSlugs.value.has(slug)
const toggle = (slug: string) => {
  const next = new Set(openSlugs.value)
  next.has(slug) ? next.delete(slug) : next.add(slug)
  openSlugs.value = next
}
const isCategoryActive = (cat: DocCategory) => currentSlug.value === cat.slug
</script>
