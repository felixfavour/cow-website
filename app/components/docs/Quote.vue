<template>
  <blockquote class="quote">
    <p class="quote-text">{{ text }}</p>
    <footer v-if="author" class="quote-author">— {{ author }}</footer>
  </blockquote>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  author?: string
}>()
</script>

<style scoped>
.quote {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--doc-accent-color);
  text-align: center;
  margin: 2.5rem 0 1.5rem 0;
  padding: 1.5rem 2rem;
  background: var(--doc-bg-secondary);
  border-radius: 12px;
}
.quote-author {
  margin-top: 1rem;
  font-size: 1rem;
  color: var(--doc-text-secondary);
  font-style: normal;
}
</style>
