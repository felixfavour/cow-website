<template>
  <!-- Plain anchor instead of the default NuxtLink so links inside markdown
       (docs cross-links, blog posts) do a full page load. -->
  <a :href="href" :target="target"><slot /></a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: undefined,
  },
})
</script>
