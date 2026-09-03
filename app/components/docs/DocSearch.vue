<template>
  <div ref="rootEl" class="doc-search relative" :class="variant === 'hero' ? 'text-base' : 'text-sm'">
    <div class="relative">
      <svg
        class="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        :class="variant === 'hero' ? 'left-5 w-5 h-5 md:w-6 md:h-6' : 'left-3 w-4 h-4'"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path stroke-linecap="round" d="M20 20l-3.5-3.5" />
      </svg>

      <input
        ref="inputEl"
        v-model="query"
        type="text"
        autocomplete="off"
        spellcheck="false"
        role="combobox"
        aria-label="Search the Help Center"
        :aria-expanded="showPanel"
        aria-controls="doc-search-results"
        :placeholder="placeholder"
        :class="[
          'w-full bg-white border outline-none transition-all placeholder:text-gray-400 text-gray-900',
          variant === 'hero'
            ? 'h-[60px] md:h-[68px] pl-[52px] md:pl-[60px] pr-[60px] rounded-2xl border-gray-200 shadow-lg shadow-purple-100/60 text-base md:text-lg focus:border-purple-400 focus:ring-4 focus:ring-purple-100'
            : 'h-[42px] pl-9 pr-10 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100',
        ]"
        @focus="onFocus"
        @input="onInput"
        @keydown="onKeydown"
      />

      <button
        v-if="query"
        type="button"
        class="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
        :class="variant === 'hero' ? 'right-5' : 'right-3'"
        aria-label="Clear search"
        @click="clear"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <kbd
        v-else-if="hotkeys"
        class="hidden md:flex absolute top-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-400 font-medium font-sans"
        :class="variant === 'hero' ? 'right-5 h-7 min-w-[28px] px-1.5 text-xs' : 'right-2.5 h-5 min-w-[20px] px-1 text-[10px]'"
        aria-hidden="true"
      >
        /
      </kbd>
    </div>

    <Transition name="doc-search-fade">
      <div
        v-if="showPanel"
        id="doc-search-results"
        class="absolute left-0 right-0 z-40 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/80 overflow-hidden text-left"
        role="listbox"
      >
        <div v-if="loading" class="px-5 py-4 text-sm text-gray-400 flex items-center gap-2">
          <span class="w-3.5 h-3.5 rounded-full border-2 border-purple-200 border-t-purple-600 animate-spin" />
          Searching…
        </div>

        <ul v-else-if="results.length" class="max-h-[420px] overflow-y-auto py-1.5">
          <li v-for="(r, i) in results" :key="r.href" role="option" :aria-selected="i === active">
            <NuxtLink
              :to="r.href"
              class="block px-5 py-3 transition-colors"
              :class="i === active ? 'bg-purple-50' : 'hover:bg-gray-50'"
              @mouseenter="active = i"
              @click="close"
            >
              <div class="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                <span>{{ r.category }}</span>
                <template v-if="r.section">
                  <span aria-hidden="true">›</span>
                  <span class="text-purple-600 normal-case tracking-normal font-medium">{{ r.section }}</span>
                </template>
              </div>
              <div class="text-sm font-semibold text-gray-800 leading-snug">{{ r.title }}</div>
              <p v-if="r.snippet" class="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-0.5">{{ r.snippet }}</p>
            </NuxtLink>
          </li>
        </ul>

        <div v-else class="px-5 py-5 text-sm text-gray-500">
          No results for <span class="font-semibold text-gray-700">“{{ query }}”</span>.
          <NuxtLink to="/contact" class="text-purple-600 font-semibold hover:underline" @click="close">Contact support</NuxtLink>
          and we'll help.
        </div>

        <div class="hidden md:flex items-center gap-4 px-5 py-2 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400">
          <span><kbd class="font-sans">↑↓</kbd> navigate</span>
          <span><kbd class="font-sans">↵</kbd> open</span>
          <span><kbd class="font-sans">esc</kbd> close</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useDocsNav, toDocsRoute } from '~/composables/useDocumentation'

const props = withDefaults(
  defineProps<{
    variant?: 'hero' | 'compact'
    placeholder?: string
    /** Bind "/" and Cmd/Ctrl+K to focus this input. Only one instance per page should do this. */
    hotkeys?: boolean
  }>(),
  {
    variant: 'compact',
    placeholder: 'Search help articles…',
    hotkeys: false,
  }
)

interface SearchSection {
  id: string
  title: string
  titles: string[]
  content: string
  level: number
}

interface SearchResult {
  href: string
  title: string
  section: string
  category: string
  snippet: string
  score: number
}

const rootEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const query = ref('')
const open = ref(false)
const active = ref(0)
const route = useRoute()
const { getArticle, getCategory } = useDocsNav()

// Search index is fetched lazily on first focus so the landing page stays light.
const {
  data: sections,
  execute: loadIndex,
  status,
} = useLazyAsyncData<SearchSection[]>(
  'docs-search-sections',
  () => queryCollectionSearchSections('documentation', { ignoredTags: ['code'] }) as Promise<SearchSection[]>,
  { immediate: false, default: () => [] }
)

const loading = computed(() => status.value === 'pending')
const trimmed = computed(() => query.value.trim())
const showPanel = computed(() => open.value && trimmed.value.length >= 2)

const MAX_RESULTS = 8

const describe = (id: string) => {
  const [contentPath] = id.split('#')
  const href = toDocsRoute(id)
  const article = getArticle(toDocsRoute(contentPath))
  const slug = contentPath.replace('/documentation/', '').split('/')[0]
  const category = article?.category ?? getCategory(slug)?.title ?? 'Help Center'
  return { href, article, category }
}

const snippetFor = (content: string, words: string[]) => {
  if (!content) return ''
  const lower = content.toLowerCase()
  const idx = Math.min(...words.map((w) => lower.indexOf(w)).filter((i) => i >= 0), Number.POSITIVE_INFINITY)
  if (!Number.isFinite(idx)) return content.slice(0, 140)
  const start = Math.max(0, idx - 50)
  return (start > 0 ? '…' : '') + content.slice(start, start + 150).trim()
}

const results = computed<SearchResult[]>(() => {
  const q = trimmed.value.toLowerCase()
  if (q.length < 2) return []
  const words = q.split(/\s+/).filter(Boolean)
  const seen = new Set<string>()
  const out: SearchResult[] = []

  for (const s of sections.value ?? []) {
    const title = (s.title || '').toLowerCase()
    const parents = (s.titles || []).join(' ').toLowerCase()
    const content = (s.content || '').toLowerCase()
    if (!words.every((w) => title.includes(w) || parents.includes(w) || content.includes(w))) continue

    let score = 0
    for (const w of words) {
      if (title.includes(w)) score += 10
      else if (parents.includes(w)) score += 5
      else score += 1
    }
    if (title.startsWith(q)) score += 8
    if (title === q) score += 12
    if (s.level <= 1) score += 2 // whole-article hits rank above deep sections

    const { href, article, category } = describe(s.id)
    if (seen.has(href)) continue
    seen.add(href)

    const pageTitle = s.titles?.[0] || article?.title || s.title
    const section = s.titles?.length ? s.title : ''
    out.push({
      href,
      title: pageTitle,
      section,
      category,
      snippet: snippetFor(s.content, words),
      score,
    })
  }

  return out.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS)
})

watch(results, () => {
  active.value = 0
})

const onFocus = () => {
  open.value = true
  if (!sections.value?.length && status.value !== 'pending') loadIndex()
}
const onInput = () => {
  open.value = true
  if (!sections.value?.length && status.value !== 'pending') loadIndex()
}
const close = () => {
  open.value = false
}
const clear = () => {
  query.value = ''
  inputEl.value?.focus()
}

const onKeydown = (e: KeyboardEvent) => {
  if (!showPanel.value) {
    if (e.key === 'Escape') inputEl.value?.blur()
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = (active.value + 1) % Math.max(results.value.length, 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = (active.value - 1 + Math.max(results.value.length, 1)) % Math.max(results.value.length, 1)
  } else if (e.key === 'Enter') {
    const r = results.value[active.value]
    if (r) {
      e.preventDefault()
      close()
      navigateTo(r.href)
    }
  } else if (e.key === 'Escape') {
    close()
    inputEl.value?.blur()
  }
}

const onDocumentClick = (e: MouseEvent) => {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) close()
}

const onHotkey = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement | null
  const typing =
    !!target &&
    (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)
  const isSlash = e.key === '/' && !typing && !e.metaKey && !e.ctrlKey
  const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
  if (isSlash || isCmdK) {
    e.preventDefault()
    inputEl.value?.focus()
    inputEl.value?.select()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  if (props.hotkeys) document.addEventListener('keydown', onHotkey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  if (props.hotkeys) document.removeEventListener('keydown', onHotkey)
})

watch(
  () => route.fullPath,
  () => {
    close()
    query.value = ''
  }
)
</script>

<style scoped>
.doc-search-fade-enter-active,
.doc-search-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.doc-search-fade-enter-from,
.doc-search-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
.doc-search kbd {
  font-family: 'Inter', sans-serif;
}
</style>
