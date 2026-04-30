<template>
  <aside class="doc-toc" aria-label="On this page">
    <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">On this page</p>
    <ul class="space-y-1">
      <li
        v-for="heading in headings"
        :key="heading.id"
        :class="heading.level === 'h3' ? 'pl-3' : ''"
      >
        <a
          :href="`#${heading.id}`"
          class="block text-sm py-1 transition-colors leading-snug"
          :class="activeId === heading.id
            ? 'text-purple-600 font-semibold'
            : 'text-gray-500 hover:text-gray-900'"
          @click.prevent="scrollTo(heading.id)"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  headings: Array<{ level: string; text: string; id: string }>
}>()

const activeId = ref('')

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
  )

  const watchHeadings = () => {
    props.headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  }

  watchHeadings()
  onUnmounted(() => observer.disconnect())
})
</script>

