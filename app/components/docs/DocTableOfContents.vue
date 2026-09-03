<template>
  <nav class="doc-toc" aria-label="On this page">
    <p class="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">On this page</p>
    <ul class="border-l border-gray-100">
      <li v-for="heading in headings" :key="heading.id">
        <a
          :href="`#${heading.id}`"
          class="block -ml-px border-l-2 py-1 text-[13px] leading-snug transition-colors"
          :class="[
            heading.level === 'h3' ? 'pl-6' : 'pl-3',
            activeId === heading.id
              ? 'border-purple-600 text-purple-700 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300',
          ]"
          @click.prevent="scrollTo(heading.id)"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  headings: Array<{ level: string; text: string; id: string }>
}>()

const activeId = ref('')
let observer: IntersectionObserver | null = null

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

const observe = () => {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-15% 0% -70% 0%', threshold: 0 }
  )
  props.headings.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })
}

onMounted(observe)
watch(() => props.headings, () => nextTick(observe))
onBeforeUnmount(() => observer?.disconnect())
</script>
