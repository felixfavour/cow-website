<script setup lang="ts">
/**
 * Local-only renderer used by scripts/generate-og.mjs to produce the committed
 * social cards. It is stripped from the route table unless OG_GENERATE is set,
 * so it never ships to production — see the pages:extend hook in nuxt.config.ts.
 */
const route = useRoute()
const props = computed(() => ({
  eyebrow: (route.query.eyebrow as string) || "",
  accent: (route.query.accent as string) || "",
  title: (route.query.title as string) || "",
  subtitle: (route.query.subtitle as string) || "",
}))

defineOgImage("Default", props.value)
</script>

<template>
  <div>og card preview: {{ props.title }}</div>
</template>
