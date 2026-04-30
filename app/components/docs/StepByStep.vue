<template>
  <ol class="step-list">
    <li v-for="(step, i) in steps" :key="i" class="step-item">
      <div class="step-number">{{ i + 1 }}</div>
      <div class="step-content">
        <strong class="step-title">{{ step.title }}</strong>
        <p class="step-desc">{{ step.description }}</p>
        <img v-if="step.image" :src="step.image" :alt="step.title" class="step-image" loading="lazy" />
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
interface Step {
  title: string
  description: string
  image?: string
}
const props = defineProps<{ steps: Step[] }>()
</script>

<style scoped>
.step-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}
.step-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
}
.step-number {
  min-width: 2.5rem;
  height: 2.5rem;
  background: var(--doc-accent-color);
  color: #fff;
  border-radius: 50%;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}
.step-desc {
  margin-bottom: 0.5rem;
  color: var(--doc-text-secondary);
}
.step-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
</style>
