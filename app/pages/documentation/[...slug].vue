<template>
  <div>
    <!-- 404 state -->
    <div
      v-if="!doc"
      class="pt-[96px] min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <div class="text-6xl mb-4">🔍</div>
      <h1
        class="text-3xl font-bold text-gray-800 mb-3"
        style="font-family: &quot;Bricolage Grotesque&quot;, sans-serif"
      >
        Page not found
      </h1>
      <p class="text-gray-500 mb-6">
        We couldn't find this help article. It might have moved or not exist
        yet.
      </p>
      <NuxtLink to="/documentation" class="primary-btn"
        >Back to Help Center</NuxtLink
      >
    </div>

    <!-- Doc page -->
    <DocLayout v-else :toc="toc">
      <DocHeader
        :breadcrumbs="breadcrumbs"
        :title="doc.title"
        :subtitle="doc.description"
        :last-updated="doc.lastUpdated"
        :category="doc.category"
      />

      <article class="doc-article">
        <ContentRenderer :value="doc" />
      </article>

      <DocFooter :prev="prevNext.prev" :next="prevNext.next" />
    </DocLayout>
  </div>
</template>

<script setup lang="ts">
import DocLayout from "~/components/docs/DocLayout.vue"
import DocHeader from "~/components/docs/DocHeader.vue"
import DocFooter from "~/components/docs/DocFooter.vue"
import { useDocumentation } from "~/composables/useDocumentation"

const route = useRoute()
const { getTableOfContents, getBreadcrumbs, getPrevNext } = useDocumentation()

const slug = computed(() => {
  const parts = route.params.slug
  return Array.isArray(parts) ? parts.join("/") : parts || ""
})

const { data: doc } = await useAsyncData(`doc-${slug.value}`, () =>
  queryCollection("documentation").path(`/documentation/${slug.value}`).first()
)

const toc = computed(() =>
  doc.value ? getTableOfContents(doc.value.body) : []
)
const breadcrumbs = computed(() => getBreadcrumbs(slug.value))
const prevNext = computed(() => getPrevNext(`/documentation/${slug.value}`))

useSeoMeta({
  title: computed(() =>
    doc.value ? `${doc.value.title} — Cloud of Worship Help` : "Help Center"
  ),
  description: computed(
    () => doc.value?.description || "Cloud of Worship Help Center"
  ),
})
</script>

<style>
/* Documentation article prose styles — inherits blog article base styles */
.doc-article h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  color: #111827;
  font-family: "Bricolage Grotesque", sans-serif;
  scroll-margin-top: 6rem;
}
.doc-article h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #374151;
  font-family: "Bricolage Grotesque", sans-serif;
  scroll-margin-top: 6rem;
}
.doc-article p {
  color: #374151;
  line-height: 1.8;
  margin-bottom: 1rem;
  font-size: 1.0625rem;
}
.doc-article ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.doc-article ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.doc-article li {
  margin-bottom: 0.4rem;
  color: #374151;
  font-size: 1.0625rem;
  line-height: 1.7;
}
.doc-article a {
  color: #9333ea;
  text-decoration: none;
  text-underline-offset: 2px;
  font-weight: 500;
}
.doc-article a:hover {
  color: #7e22ce;
}
.doc-article strong {
  font-weight: 700;
  color: #111827;
}
.doc-article code {
  font-family: "Fira Mono", "Menlo", monospace;
  background: #f3f4f6;
  border-radius: 5px;
  padding: 0.15em 0.4em;
  font-size: 0.9em;
  color: #9333ea;
}
.doc-article pre {
  background: #1e1e2e;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}
.doc-article pre code {
  background: transparent;
  color: #cdd6f4;
  padding: 0;
  font-size: 0.95rem;
}
.doc-article blockquote {
  border-left: 4px solid #9333ea;
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  color: #6b7280;
  font-style: italic;
}
.doc-article hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2.5rem 0;
}
.doc-article table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.doc-article th {
  background: #f9fafb;
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}
.doc-article td {
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}
.doc-article img {
  max-width: 100%;
  border-radius: 12px;
  margin: 1rem 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
</style>
