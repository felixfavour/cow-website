<template>
  <div :class="['callout', `callout--${type}`, 'flex gap-3 rounded-2xl p-4 my-6']">
    <span class="callout__icon text-xl leading-none mt-0.5 shrink-0">{{ icon }}</span>
    <div class="callout__body min-w-0">
      <p v-if="title" class="callout__title font-bold text-sm mb-1">{{ title }}</p>
      <div class="callout__content text-sm leading-relaxed">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'tip' | 'important' | 'warning' | 'success'
  title?: string
}>()

const icon = computed(() => {
  switch (props.type) {
    case 'tip': return '💡'
    case 'important': return '⭐'
    case 'warning': return '⚠️'
    case 'success': return '✅'
    default: return '💡'
  }
})
</script>

<style scoped>
.callout--tip {
  background: #f0fdf9;
  border: 1px solid #86efce;
  color: #065f46;
}
.callout--important {
  background: #eff6ff;
  border: 1px solid #93c5fd;
  color: #1e3a8a;
}
.callout--warning {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  color: #78350f;
}
.callout--success {
  background: #f0fdf4;
  border: 1px solid #86efac;
  color: #14532d;
}
.callout__title {
  color: inherit;
}
</style>

