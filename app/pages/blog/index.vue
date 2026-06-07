<template>
  <div>
    <div class="section pt-[3%]">
      <!-- TOP BLOG SECTION (page 1 only) -->
      <nuxt-link
        v-if="topBlog"
        :to="`${topBlog?.path}`"
        class="inner blog-hero bg-[#EEDCFF] md:bg-[#FFE9E8] flex flex-col md:flex-row items-center relative gap-6 group overflow-hidden rounded-3xl"
      >
        <img
          :src="topBlog?.cover"
          class="h-auto xl:h-[600px] 2xl:h-[630px] group-hover:scale-110 transition-all object-contain"
        />
        <div
          class="blog-info md:absolute bg-white shadow-md w-[95%] mb-2 md:mb-auto md:w-[50%] xl:w-[47.5%] 2xl:w-[31.5%] min-w-[300px] rounded-3xl p-[5%] md:p-[2%] right-[auto] md:right-[2.5%] xl:right-[5%] top-0 md:top-[4%] lg:top-[10%] xl:top-[17.5%] flex flex-col gap-4"
        >
          <div class="flex tags gap-2 cursor-default">
            <div
              v-for="tag in topBlog?.tag?.split(',')"
              :key="tag"
              class="tag uppercase px-2 py-1 rounded-full bg-gray-100 text-xs lg:text-sm"
            >
              {{ tag.trim() }}
            </div>
          </div>
          <h1 class="text-3xl lg:text-4xl font-bold group-hover:underline">
            {{ topBlog?.title }}
          </h1>
          <p class="text-sm lg:text-md">
            {{ topBlog?.paragraph?.slice(0, 200) }}...
          </p>
          <div class="flex items-center justify-between mt-4">
            <div class="author flex items-center gap-4">
              <img
                :src="topBlog?.author_img || '/images/author/favour.jpeg'"
                alt=""
                class="rounded-full w-[40px] h-[40px] object-cover"
              />
              <span class="text-md font-semibold">{{ topBlog?.author }}</span>
            </div>
            <ArrowDown class="w-5 h-5 md:w-6 md:h-6 -rotate-90" />
          </div>
        </div>
      </nuxt-link>

      <!-- ALL BLOGS -->
      <div class="inner py-[10%] md:py-[5%]">
        <div class="flex mb-[2%]">
          <h2 class="text-2xl lg:text-3xl font-bold group-hover:underline">
            All resources, guides and more
          </h2>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-[8] xl:gap-y-12"
        >
          <BlogCard v-for="blog in posts" :key="blog.path" :blog="blog" />
        </div>

        <!-- PAGINATION -->
        <!-- `custom` so we control aria-current ourselves: vue-router ignores the
             query string when matching, so it would otherwise mark every ?page link active. -->
        <nav
          v-if="totalPages > 1"
          class="flex items-center justify-center flex-wrap gap-2 mt-12"
          aria-label="Blog pagination"
        >
          <nuxt-link
            v-if="currentPage > 1"
            :to="pageLink(currentPage - 1)"
            custom
            v-slot="{ href, navigate }"
          >
            <a
              :href="href"
              rel="prev"
              class="px-3 py-2 rounded-full border-2 border-gray-200 hover:border-black text-sm font-semibold"
              @click="navigate"
              >Prev</a
            >
          </nuxt-link>
          <nuxt-link
            v-for="n in totalPages"
            :key="n"
            :to="pageLink(n)"
            custom
            v-slot="{ href, navigate }"
          >
            <a
              :href="href"
              :aria-current="n === currentPage ? 'page' : undefined"
              :class="[
                'w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold border-2',
                n === currentPage
                  ? 'bg-purple-500 text-white border-purple-500'
                  : 'border-gray-200 hover:border-black',
              ]"
              @click="navigate"
              >{{ n }}</a
            >
          </nuxt-link>
          <nuxt-link
            v-if="currentPage < totalPages"
            :to="pageLink(currentPage + 1)"
            custom
            v-slot="{ href, navigate }"
          >
            <a
              :href="href"
              rel="next"
              class="px-3 py-2 rounded-full border-2 border-gray-200 hover:border-black text-sm font-semibold"
              @click="navigate"
              >Next</a
            >
          </nuxt-link>
        </nav>
      </div>
    </div>
    <AboveFooterSection class="mt-[17.5%]" />
    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const showTestimonialPopup = ref(false)
const route = useRoute()
const PAGE_SIZE = 12

const requestedPage = computed(() => {
  const p = parseInt(route.query.page)
  return Number.isFinite(p) && p > 0 ? p : 1
})

// Fetch blogs on the server during SSR so data is ready on first paint.
// Select only the fields the cards need — excluding the heavy `body` AST —
// then slice to the current page so only those cards are rendered/serialized.
const { data: blogData } = await useAsyncData(
  "blogs",
  async () => {
    const blogs = await queryCollection("blog")
      .select(
        "path",
        "title",
        "cover",
        "tag",
        "paragraph",
        "author",
        "author_img",
        "created"
      )
      .all()

    // `created` is a non-ISO human string (e.g. "may 8, 2026"), so sort via Date.
    blogs.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    )

    const total = blogs.length
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
    const page = Math.min(requestedPage.value, totalPages)
    const start = (page - 1) * PAGE_SIZE

    // Cards show ≤150 chars, the hero ≤200 — only ship what's displayed.
    const trunc = (b) => ({ ...b, paragraph: b.paragraph?.slice(0, 200) ?? null })

    return {
      posts: blogs.slice(start, start + PAGE_SIZE).map(trunc),
      total,
      totalPages,
      page,
      top: page === 1 && blogs[0] ? trunc(blogs[0]) : null,
    }
  },
  {
    watch: [requestedPage],
    default: () => ({ posts: [], total: 0, totalPages: 1, page: 1, top: null }),
  }
)

const posts = computed(() => blogData.value?.posts ?? [])
const topBlog = computed(() => blogData.value?.top)
const totalPages = computed(() => blogData.value?.totalPages ?? 1)
const currentPage = computed(() => blogData.value?.page ?? 1)

// page 1 has the clean /blog URL (no ?page=1) so it stays the canonical entry.
const pageLink = (n) =>
  n <= 1 ? { path: "/blog", query: {} } : { path: "/blog", query: { page: n } }

const canonicalUrl = computed(() =>
  currentPage.value <= 1
    ? "https://cloudofworship.com/blog"
    : `https://cloudofworship.com/blog?page=${currentPage.value}`
)
const pageSuffix = computed(() =>
  currentPage.value > 1 ? ` - Page ${currentPage.value}` : ""
)

useSeoMeta({
  title: () => `Blog, Resources, Guides and More - Cloud of Worship${pageSuffix.value}`,
  ogTitle: () =>
    `Blog, Resources, Guides and More - Cloud of Worship${pageSuffix.value}`,
  description:
    "Stay up to date with the latest updates, resources, guides and more from Cloud of Worship. See how you can use our software to enhance your worship experience.",
  ogDescription:
    "Stay up to date with the latest updates, resources, guides and more from Cloud of Worship. See how you can use our software to enhance your worship experience.",
  keywords:
    "cloud of worship, guide, how to, resources, blog, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: "https://cloudofworship.com/images/cow-og-image.jpeg",
  ogSiteName: "Cloud of Worship",
  ogUrl: () => canonicalUrl.value,
  ogType: "website",
  ogLocale: "en_US",
})
useHead({
  link: [{ rel: "canonical", href: () => canonicalUrl.value }],
})

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

<style scoped></style>
