<template>
  <div :class="['callout', `callout--${type}`]" role="note">
    <span class="callout__icon"><DocIcon :name="icon" :size="22" /></span>
    <div class="callout__body">
      <p v-if="title" class="callout__title">{{ title }}</p>
      <div class="callout__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocIcon from '~/components/docs/DocIcon.vue'
/**
 * Used from markdown as:
 *   ::callout{type="tip" title="Optional title"}
 *   Body text…
 *   ::
 */
const props = withDefaults(
  defineProps<{
    type?: 'tip' | 'important' | 'warning' | 'success'
    title?: string
  }>(),
  { type: 'tip' }
)

const icon = computed(() => {
  switch (props.type) {
    case 'important':
      return 'star'
    case 'warning':
      return 'warning'
    case 'success':
      return 'check-circle'
    default:
      return 'lightbulb'
  }
})
</script>

<style scoped>
.callout {
  display: flex;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  margin: 1.5rem 0;
  border-radius: 16px;
  border: 1px solid;
}
.callout__icon {
  display: flex;
  margin-top: 0.1rem;
  flex-shrink: 0;
  color: inherit;
}
.callout__body {
  min-width: 0;
  flex: 1;
}
.callout__title {
  font-weight: 700;
  font-size: 0.9rem;
  margin: 0 0 0.25rem;
  color: inherit;
}
.callout__content :deep(p) {
  font-size: 0.95rem;
  line-height: 1.65;
  color: inherit;
  margin: 0;
  padding: 0;
}
.callout__content :deep(p + p) {
  margin-top: 0.5rem;
}
.callout__content :deep(a) {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  color: inherit;
}
.callout__content :deep(code) {
  background: rgba(255, 255, 255, 0.6);
  color: inherit;
}
.callout--tip {
  background: #faf5ff;
  border-color: #e9d5ff;
  color: #581c87;
}
.callout--important {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e3a8a;
}
.callout--warning {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #7c2d12;
}
.callout--success {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #14532d;
}
</style>
