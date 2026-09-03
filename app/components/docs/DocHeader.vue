<template>
  <header class="doc-header mb-8">
    <nav v-if="breadcrumbs && breadcrumbs.length" class="flex items-center gap-1.5 flex-wrap mb-5" aria-label="Breadcrumb">
      <NuxtLink to="/docs" class="text-sm text-gray-400 hover:text-purple-600 transition-colors">Help Center</NuxtLink>
      <template v-for="(crumb, i) in breadcrumbs" :key="crumb.href || crumb.label">
        <svg class="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <NuxtLink
          v-if="i < breadcrumbs.length - 1 && crumb.href"
          :to="crumb.href"
          class="text-sm text-gray-400 hover:text-purple-600 transition-colors"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="text-sm text-gray-700 font-medium" aria-current="page">{{ crumb.label }}</span>
      </template>
    </nav>

    <div class="flex items-start gap-4">
      <div v-if="icon" class="hidden sm:grid place-items-center w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 shrink-0">
        <DocIcon :name="icon" :size="30" />
      </div>
      <div class="min-w-0">
        <h1 v-if="title" class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="text-lg text-gray-500 leading-relaxed">{{ subtitle }}</p>

        <div v-if="lastUpdated || category" class="flex items-center gap-3 flex-wrap mt-4">
          <NuxtLink
            v-if="category"
            :to="categoryHref || '/docs'"
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
          >
            {{ category }}
          </NuxtLink>
          <span v-if="lastUpdated" class="text-xs text-gray-400">Updated {{ formattedDate }}</span>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-100 mt-7" />
  </header>
</template>

<script setup lang="ts">
import DocIcon from '~/components/docs/DocIcon.vue'

const props = defineProps<{
  breadcrumbs?: Array<{ label: string; href?: string }>
  title?: string
  subtitle?: string
  lastUpdated?: string
  category?: string
  categoryHref?: string
  icon?: string
}>()

const formattedDate = computed(() => {
  if (!props.lastUpdated) return ''
  const d = new Date(props.lastUpdated)
  if (Number.isNaN(d.getTime())) return props.lastUpdated
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})
</script>
