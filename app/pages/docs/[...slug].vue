<template>
  <div>
    <!-- Category page -->
    <DocLayout v-if="category" content-class="max-w-[820px]">
      <DocHeader
        :breadcrumbs="[{ label: category.title, href: category.path }]"
        :title="category.title"
        :subtitle="category.description"
        :icon="category.icon"
      />

      <p class="text-sm text-gray-400 mb-4">
        {{ category.articles.length }} {{ category.articles.length === 1 ? 'article' : 'articles' }}
      </p>

      <ul class="space-y-3">
        <li v-for="(a, i) in category.articles" :key="a.path">
          <NuxtLink
            :to="a.path"
            class="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-purple-200 transition-all"
          >
            <span class="grid place-items-center w-9 h-9 rounded-xl bg-gray-50 text-sm font-bold text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-700 shrink-0 transition-colors" aria-hidden="true">
              {{ i + 1 }}
            </span>
            <div class="min-w-0 flex-1">
              <h2 class="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors leading-snug mb-1">
                {{ a.title }}
              </h2>
              <p class="text-sm text-gray-500 leading-relaxed">{{ a.description }}</p>
            </div>
            <svg class="w-5 h-5 mt-1 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </li>
      </ul>

      <DocHelpCard class="mt-12" />
    </DocLayout>

    <!-- Article page -->
    <DocLayout v-else-if="doc" :toc="toc">
      <DocHeader
        :breadcrumbs="breadcrumbs"
        :title="doc.title"
        :subtitle="doc.description"
        :last-updated="doc.lastUpdated"
        :category="article?.category ?? doc.category"
        :category-href="parentCategory?.path"
      />

      <article class="doc-article">
        <ContentRenderer :value="doc" />
      </article>

      <DocFooter :prev="prevNext.prev" :next="prevNext.next" :related="related" />
    </DocLayout>

    <!-- 404 -->
    <div v-else class="section min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div class="grid place-items-center w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 mb-5">
        <DocIcon name="magnifying-glass" :size="34" />
      </div>
      <h1 class="text-3xl font-bold text-gray-800 mb-3">We couldn't find that article</h1>
      <p class="text-gray-500 mb-8 max-w-[420px]">
        It might have moved or not exist yet. Try searching the Help Center, or browse by topic.
      </p>
      <NuxtLink to="/docs" class="primary-btn">Back to Help Center</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocLayout from '~/components/docs/DocLayout.vue'
import DocHeader from '~/components/docs/DocHeader.vue'
import DocFooter from '~/components/docs/DocFooter.vue'
import DocHelpCard from '~/components/docs/DocHelpCard.vue'
import DocIcon from '~/components/docs/DocIcon.vue'
import { useDocsNav, getTableOfContents, toContentPath } from '~/composables/useDocumentation'

const route = useRoute()
const nav = useDocsNav()
await nav.ready

const slug = computed(() => {
  const parts = route.params.slug
  return (Array.isArray(parts) ? parts.join('/') : parts || '').replace(/\/+$/, '')
})
const routePath = computed(() => `/docs/${slug.value}`)
const parts = computed(() => slug.value.split('/').filter(Boolean))

const category = computed(() => (parts.value.length === 1 ? nav.getCategory(parts.value[0]) : undefined))
const article = computed(() => nav.getArticle(routePath.value))
const parentCategory = computed(() => (article.value ? nav.getCategory(article.value.categorySlug) : undefined))

const { data: doc } = await useAsyncData(
  `doc-${slug.value}`,
  () =>
    category.value
      ? Promise.resolve(null)
      : queryCollection('documentation').path(toContentPath(routePath.value)).first(),
  { watch: [slug] }
)

const toc = computed(() => (doc.value ? getTableOfContents(doc.value.body) : []))
const breadcrumbs = computed(() => nav.getBreadcrumbs(routePath.value))
const prevNext = computed(() => nav.getPrevNext(routePath.value))
const related = computed(() => nav.getRelated(routePath.value))

const pageTitle = computed(() => {
  if (category.value) return `${category.value.title} - Cloud of Worship Help Center`
  if (doc.value) return `${doc.value.title} - Cloud of Worship Help Center`
  return 'Article not found - Cloud of Worship Help Center'
})
const pageDescription = computed(
  () => category.value?.description || doc.value?.description || 'Cloud of Worship Help Center'
)
const canonical = computed(() => `https://cloudofworship.com${routePath.value}`)

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  ogUrl: canonical,
  ogType: 'article',
  ogImage: 'https://cloudofworship.com/images/cow-og-image.jpeg',
})
useHead({ link: [{ rel: 'canonical', href: canonical }] })

if (!category.value && !doc.value) {
  setResponseStatus(useRequestEvent(), 404)
}
</script>

<style>
/* Help Center article prose. Overrides the generic `article` styles in main.css. */
.doc-article h2 {
  font-size: 1.6rem;
  line-height: 1.25;
  font-weight: 800;
  margin: 2.75rem 0 0.85rem;
  color: #111827;
  scroll-margin-top: 7rem;
}
.doc-article h3 {
  font-size: 1.2rem;
  line-height: 1.3;
  font-weight: 700;
  margin: 2rem 0 0.6rem;
  color: #1f2937;
  scroll-margin-top: 7rem;
}
.doc-article > h2:first-child,
.doc-article > div > h2:first-child {
  margin-top: 0.5rem;
}
.doc-article p {
  color: #374151;
  line-height: 1.8;
  margin-bottom: 1.1rem;
  padding-bottom: 0;
  font-size: 1.0625rem;
}
.doc-article ul,
.doc-article ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}
.doc-article ul {
  list-style-type: disc;
}
.doc-article ol {
  list-style-type: decimal;
}
.doc-article li {
  margin-bottom: 0.45rem;
  color: #374151;
  font-size: 1.0625rem;
  line-height: 1.7;
}
.doc-article li > p {
  margin-bottom: 0.4rem;
}
.doc-article a {
  color: #7e22ce;
  text-decoration: none;
  border-bottom: 1px solid #d8b4fe;
  font-weight: 500;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.doc-article a:hover {
  color: #581c87;
  border-bottom-color: #7e22ce;
}
.doc-article strong {
  font-weight: 700;
  color: #111827;
}
.doc-article code {
  font-family: 'Fira Mono', 'Menlo', monospace;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.1em 0.4em;
  font-size: 0.875em;
  color: #6b21a8;
}
.doc-article pre {
  background: #1e1e2e;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}
.doc-article pre code {
  background: transparent;
  border: 0;
  color: #cdd6f4;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.6;
}
.doc-article blockquote {
  border-left: 3px solid #c084fc;
  background: #faf5ff;
  border-radius: 0 16px 16px 0;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.7;
}
.doc-article blockquote p {
  margin: 0;
  font-size: 1rem;
}
.doc-article blockquote p + p {
  margin-top: 0.5rem;
}
.doc-article hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2.5rem 0;
}
.doc-article table {
  display: block;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1.5rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  font-size: 0.95rem;
}
.doc-article thead {
  background: #f9fafb;
}
.doc-article th {
  font-weight: 700;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}
.doc-article td {
  padding: 0.75rem 1rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
  line-height: 1.6;
}
.doc-article tr:last-child td {
  border-bottom: 0;
}
.doc-article img {
  display: block;
  max-width: 100%;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  margin: 1.5rem 0;
  box-shadow: 0 12px 32px rgba(88, 28, 135, 0.08);
}
.doc-article p:has(> img:only-child) {
  margin-bottom: 0;
}
.doc-article em {
  font-style: italic;
}
@media (max-width: 768px) {
  .doc-article h2 {
    font-size: 1.4rem;
  }
  .doc-article p,
  .doc-article li {
    font-size: 1rem;
  }
}
</style>
