<template>
  <!--
    The home page's pill tab group: a thin grey outline holding a row of tabs,
    with a dark pill that slides behind the active one. On narrow screens the
    row scrolls sideways and keeps the active tab in view.
  -->
  <div
    ref="bar"
    class="pill-tabs relative max-w-full overflow-x-auto rounded-full border border-[#9BA3B2] p-1"
    role="tablist"
    :aria-label="label"
  >
    <span class="pill-tabs-indicator absolute bottom-1 top-1 rounded-full bg-[#1A1F2E]" :style="indicator" aria-hidden="true"></span>
    <div class="relative flex">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.key"
        ref="buttons"
        type="button"
        role="tab"
        :id="`${idPrefix}-tab-${tab.key}`"
        :aria-selected="modelValue === i"
        :aria-controls="controls ? `${idPrefix}-panel-${tab.key}` : undefined"
        :tabindex="modelValue === i ? 0 : -1"
        class="pill-tab flex h-[43px] items-center whitespace-nowrap rounded-full px-3 text-[15px] transition-colors duration-300 md:px-[13px] md:text-[17px]"
        :class="modelValue === i ? 'text-white' : 'text-[#5A6170] hover:text-[#1A1F2E]'"
        @click="choose(i)"
        @keydown.right.prevent="choose((i + 1) % tabs.length, true)"
        @keydown.left.prevent="choose((i - 1 + tabs.length) % tabs.length, true)"
      >
        {{ tab.label }}
        <span
          v-if="tab.badge"
          class="ml-2 rounded-full bg-[#F4EAFE] px-[6px] py-[3px] text-[11px] font-semibold uppercase leading-none tracking-[0.02em] text-[#8A41C9]"
        >{{ tab.badge }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
// Tabs are { key, label, badge? }. The active index comes in as v-model.
// `select` fires on every pick (click or arrow key) for pages that do more
// than switch, like the features section scrolling to the tab's stretch.

const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
  label: { type: String, default: undefined },
  // Prefix for the tab ids, and for the panel ids they point at with `controls`.
  idPrefix: { type: String, default: "tabs" },
  controls: { type: Boolean, default: false },
})

const emit = defineEmits(["update:modelValue", "select"])

const bar = ref(null)
const buttons = ref([])
const indicator = ref({ opacity: 0 })

const choose = (i, focus = false) => {
  emit("update:modelValue", i)
  emit("select", i)
  if (focus) buttons.value[i]?.focus({ preventScroll: true })
}

// The dark pill slides to sit behind the active tab.
const placeIndicator = () => {
  const button = buttons.value[props.modelValue]
  if (!button) return
  indicator.value = {
    left: `${button.offsetLeft + 4}px`,
    width: `${button.offsetWidth}px`,
    opacity: 1,
  }
}

watch(
  () => props.modelValue,
  (i) => {
    nextTick(placeIndicator)
    // On narrow screens the row scrolls sideways; keep the active tab in view.
    const button = buttons.value[i]
    if (button && bar.value && bar.value.scrollWidth > bar.value.clientWidth) {
      bar.value.scrollTo({
        left: button.offsetLeft - (bar.value.clientWidth - button.offsetWidth) / 2,
        behavior: "smooth",
      })
    }
  }
)

let resizeObserver = null

onMounted(() => {
  placeIndicator()
  document.fonts?.ready.then(placeIndicator)
  resizeObserver = new ResizeObserver(placeIndicator)
  resizeObserver.observe(bar.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<style scoped>
.pill-tabs {
  scrollbar-width: none;
}
.pill-tabs::-webkit-scrollbar {
  display: none;
}
.pill-tabs-indicator {
  transition: left 0.45s cubic-bezier(0.3, 0.7, 0.2, 1), width 0.45s cubic-bezier(0.3, 0.7, 0.2, 1),
    opacity 0.2s ease;
}
.pill-tab:focus-visible {
  outline: 2px solid #8a41c9;
  outline-offset: 2px;
}
</style>
