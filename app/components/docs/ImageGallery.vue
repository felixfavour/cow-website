<template>
  <div class="image-gallery">
    <div v-for="(img, i) in images" :key="i" class="gallery-item">
      <img :src="img.src" :alt="img.caption" class="gallery-img" loading="lazy" />
      <div class="gallery-caption">{{ img.caption }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string
  caption: string
}
const props = defineProps<{ images: GalleryImage[] }>()
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 2rem 0;
}
.gallery-item {
  flex: 1 1 220px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gallery-img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.gallery-caption {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: var(--doc-text-secondary);
  text-align: center;
}
</style>
