<template>
  <div
    v-if="!data"
    class="section min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20"
  >
    <h1 class="text-3xl font-bold text-gray-800 mb-3">We couldn't find that post</h1>
    <p class="text-gray-500 mb-8 max-w-[420px]">
      It may have moved or been renamed. Browse the latest posts, or find a step-by-step guide in the Help Center.
    </p>
    <div class="flex gap-3">
      <a href="/blog" class="primary-btn">Go to the blog</a>
      <a href="/docs" class="border-btn">Help Center</a>
    </div>
  </div>
  <div
    v-else
    class="content pt-[7.5%] flex flex-col gap-8 items-center justify-center"
  >
    <div class="inner w-[90%] max-w-[800px] mx-auto">
      <div class="flex items-center tags gap-2 cursor-default mb-4">
        <a
          href="/blog"
          class="font-semibold px-3 py-1 bg-purple-500 border-2 border-transparent hover:border-black text-white rounded-full mr-1 lg:mr-4 flex items-center gap-1 text-xs md:text-sm"
        >
          <ArrowDown class="w-5 h-5 rotate-90" whiteColor />
          Go Home</a
        >
        <div
          v-for="tag in data?.tag?.split(',')?.slice(0,2)"
          :key="tag"
          class="tag uppercase px-2 py-1 rounded-full bg-gray-100 text-xs md:text-sm"
        >
          {{ tag.trim() }}
        </div>
      </div>
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {{ data?.title }}
      </h1>
      <div class="header flex items-center gap-4">
        <div class="blog-details-left flex items-center gap-4">
          <img
            :src="data?.author_img || '/images/author/favour.jpeg'"
            class="rounded-full w-[50px] h-[50px] object-cover"
            alt=""
          />
          <div class="small_text">
            <span class="font-medium">{{ data?.author }}</span> <br />
            <span class="text-sm text-gray-500">
              <span class="smaller_text">Updated </span>
              <span class="font-medium">{{ getDate(data?.updated || data?.created) }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <img
      v-if="data?.cover"
      :src="data?.cover"
      :alt="data?.title"
      fetchpriority="high"
      decoding="async"
      class="w-[95%] max-h-[600px] object-cover max-w-[1200px] rounded-3xl group-hover:scale-110 transition-all"
    />
    <section class="w-[90%] max-w-[800px] mx-auto pb-[15%]">
      <article>
        <div class="icons" style="grid-area: icon">
          <BlogSocialMediaIcons class="inner" />
        </div>
        <div style="grid-area: content">
          <a
            v-if="docsArticle"
            :href="data.docs"
            class="docs-callout not-prose group flex items-start gap-3 p-4 md:p-5 mb-8 rounded-2xl border border-purple-100 bg-purple-50/60 hover:border-purple-300 transition-colors"
          >
            <span class="text-xl leading-none mt-0.5" aria-hidden="true">📘</span>
            <span class="min-w-0">
              <span class="block text-xs font-semibold uppercase tracking-wide text-purple-600 mb-1">Step-by-step guide in the Help Center</span>
              <span class="block font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{{ docsArticle.title }}</span>
              <span v-if="docsArticle.description" class="block text-sm text-gray-600 mt-1">{{ docsArticle.description }}</span>
            </span>
          </a>
          <ContentRenderer v-if="data" :value="data" />
        </div>
      </article>
    </section>
    <!-- <AboveFooterSection /> -->

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const { params } = useRoute()
const { data } = await useAsyncData(`blog-${params.id}`, async () => {
  // Try exact match first
  let result = await queryCollection("blog").path(`/blog/${params.id}`).first()

  // If not found, find the matching path case-insensitively without pulling
  // every post's full body, then fetch only the one we need.
  if (!result) {
    const target = `/blog/${params.id}`.toLowerCase()
    const paths = await queryCollection("blog").select("path").all()
    const match = paths.find((blog) => blog.path?.toLowerCase() === target)
    if (match?.path) {
      result = await queryCollection("blog").path(match.path).first()
    }
  }

  return result
})
const content = data.value

// Posts that overlap a Help Center article link to it, so the guide (which is
// kept current) is the page readers and search engines treat as the reference.
const { data: docsArticle } = await useAsyncData(`blog-docs-${params.id}`, () =>
  content?.docs
    ? queryCollection("documentation")
        .path(content.docs.replace(/^\/docs/, "/documentation"))
        .select("title", "description")
        .first()
    : Promise.resolve(null)
)
const showTestimonialPopup = ref(false)

const getDate = (time) => {
  if (!time) return ""
  const split = time.split(" ")
  return split.splice(0, 3).join(" ")
}

const SITE_URL = "https://cloudofworship.com"

if (!content) {
  // A missing post used to render an empty page with a 200, which Google
  // reports as a soft 404.
  if (import.meta.server) setResponseStatus(useRequestEvent(), 404)
  useSeoMeta({ title: "Post not found | Cloud of Worship Blog", robots: "noindex" })
} else {
  // The post's real URL. A request in any other letter case (or with a trailing
  // slash) is sent here with a 301, so each post has exactly one address.
  const postPath = content.path
  const postUrl = `${SITE_URL}${postPath}`
  const route = useRoute()
  if (route.path !== postPath) {
    // Keep the query (UTM tags) and hash.
    await navigateTo({ path: postPath, query: route.query, hash: route.hash }, { redirectCode: 301, replace: true })
  }

  /** Plain text cut at a word boundary, for meta descriptions. */
  const clip = (text, max = 158) => {
    const plain = (text || "").replace(/\s+/g, " ").trim()
    if (plain.length <= max) return plain
    const cut = plain.slice(0, max)
    return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.\-–—]+$/, "")}…`
  }

  // `metaDescription` is the hand-written search snippet where one exists.
  // Otherwise use the post's summary (`paragraph`, or `description`, which
  // Nuxt Content fills from the first paragraph). The template used to read
  // only `excerpt`, which Nuxt Content drops, so no post had a description.
  const description = clip(content.metaDescription || content.paragraph || content.description)

  /** "September 25, 2024 12:00 PM" → ISO 8601, or undefined if unparseable. */
  const isoDate = (value) => {
    if (!value) return undefined
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
  }
  const published = isoDate(content.created)
  const modified = isoDate(content.updated) || published

  const absolute = (src) => (src && src.startsWith("/") ? `${SITE_URL}${src}` : src)
  const coverUrl = absolute(content.cover)

  const pageTitle = content.seoTitle || content.title
  useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    twitterTitle: pageTitle,
    description,
    ogDescription: description,
    twitterDescription: description,
    ogSiteName: "Cloud of Worship",
    ogUrl: postUrl,
    ogType: "article",
    ogLocale: "en_US",
    articlePublishedTime: published,
    articleModifiedTime: modified,
    articleAuthor: content.author ? [content.author] : undefined,
  })

  if (coverUrl) {
    useSeoMeta({ ogImage: coverUrl, twitterImage: coverUrl, twitterCard: "summary_large_image" })
  } else {
    useOgCard("blog")
  }

  useHead({
    script: [
      {
        key: "blog-ld",
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: content.title,
              description,
              url: postUrl,
              mainEntityOfPage: postUrl,
              image: coverUrl || `${SITE_URL}/images/og/blog.jpg`,
              ...(published ? { datePublished: published } : {}),
              ...(modified ? { dateModified: modified } : {}),
              ...(content.author ? { author: { "@type": "Person", name: content.author } } : {}),
              publisher: {
                "@type": "Organization",
                name: "Cloud of Worship",
                url: SITE_URL,
                logo: `${SITE_URL}/cow-logo-square.jpg`,
              },
              inLanguage: "en",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
                { "@type": "ListItem", position: 2, name: content.title, item: postUrl },
              ],
            },
          ],
        }),
      },
    ],
  })
}

onMounted(() => {
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }

  // show testimonial popup on mobile
  if (
    window.innerWidth >= 768 &&
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1"
  ) {
    showTestimonialPopup.value = true
  }
  window.addEventListener("resize", () => {
    if (
      window.innerWidth >= 768 &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1"
    ) {
      showTestimonialPopup.value = true
    }
  })
})
</script>

<style>
article {
  display: grid;
  gap: 10px;
  grid-template-areas: "content";
  /* minmax(0, 1fr) rather than 1fr: a plain 1fr track grows to its widest
     child's min-content width, so one long code line or wide table would
     stretch the whole page sideways and push the text off-screen. */
  grid-template-columns: minmax(0, 1fr);
}

article > * {
  min-width: 0;
}

/* Wide content (code blocks, tables) scrolls inside its own box instead of
   widening the page. */
article pre {
  max-width: 100%;
  overflow-x: auto;
  margin: 20px 0px;
  padding: 16px 20px;
  background: #f5f3ff;
  border: 1px solid #ede9fe;
  border-radius: 12px;
  font-size: 0.85rem;
  line-height: 1.6;
  white-space: pre;
  -webkit-overflow-scrolling: touch;
}

article pre code {
  font-size: inherit;
  color: #3b0764;
  background: none;
  padding: 0;
}

article table {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  margin: 20px 0px;
  font-size: 0.95rem;
}

article th,
article td {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}

article th {
  background: #f9fafb;
  font-weight: 600;
}

article img {
  max-width: 100%;
  height: auto;
}

article a {
  color: rgba(139, 92, 246);
  /* underline comes from the border-bottom in main.css; setting
     text-decoration here too would draw a second line */
  text-decoration: none;
}

article h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 10px 0px 5px 0px;
  font-weight: 700;
}

article p {
  line-height: 1.7;
  margin: 15px 0px;
}

article ul {
  padding: revert;
  margin: revert;
}

article li {
  line-height: 1.7;
}

article hr {
  margin: 30px 0px;
}

article iframe {
  width: 100%;
  min-height: 300px;
  height: auto;
  border-radius: 10px;
}

.icons .inner {
  position: sticky;
  top: 100px;
}

@media only screen and (max-width: 1024px) {
  article {
    grid-template-areas: "content";
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
