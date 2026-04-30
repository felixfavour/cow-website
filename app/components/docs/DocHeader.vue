<template>
  <header class="doc-header mb-8">
    <!-- Breadcrumbs -->
    <nav v-if="breadcrumbs && breadcrumbs.length" class="flex items-center gap-1 flex-wrap mb-4" aria-label="Breadcrumb">
      <NuxtLink to="/docs" class="text-sm text-gray-400 hover:text-purple-600 transition-colors">Help Center</NuxtLink>
      <template v-for="(crumb, i) in breadcrumbs" :key="crumb.href">
        <span class="text-gray-300 text-sm">/</span>
        <NuxtLink
          :to="crumb.href"
          class="text-sm transition-colors"
          :class="i === breadcrumbs.length - 1
            ? 'text-gray-700 font-medium pointer-events-none'
            : 'text-gray-400 hover:text-purple-600'"
        >
          {{ crumb.label }}
        </NuxtLink>
      </template>
    </nav>

    <!-- Title -->
    <h1 v-if="title" class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3" style="font-family: 'Bricolage Grotesque', sans-serif;">
      {{ title }}
    </h1>

    <!-- Subtitle / description -->
    <p v-if="subtitle" class="text-lg text-gray-500 mb-3 leading-relaxed">{{ subtitle }}</p>

    <!-- Meta row -->
    <div v-if="lastUpdated || category" class="flex items-center gap-4 flex-wrap">
      <span v-if="category" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
        {{ category }}
      </span>
      <span v-if="lastUpdated" class="text-xs text-gray-400">
        Updated {{ lastUpdated }}
      </span>
    </div>

    <div class="border-b border-gray-100 mt-6" />
  </header>
</template>

<script setup lang="ts">
defineProps<{
  breadcrumbs?: Array<{ label: string; href: string }>
  title?: string
  subtitle?: string
  lastUpdated?: string
  category?: string
}>()
</script>

