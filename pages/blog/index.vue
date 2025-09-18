<template>
  <div>
    <div class="section pt-[3%]">
      <!-- TOP BLOG SECTION -->
      <nuxt-link
        :to="`/blog/${topBlog?._id
          ?.replace('.md', '')
          ?.replace('content:blog:', '')}`"
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
          class="grid grid-cols-1 pb-[10%] md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-[2.5%]"
        >
          <BlogCard
            v-for="blog in blogsUncategorized"
            :key="blog.title"
            :blog="blog"
          />
        </div>
      </div>
    </div>
    <AboveFooterSection class="mt-[17.5%]" />
    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const blogsByCategory = ref([])
const blogsUncategorized = ref([])
const newBlogs = ref([])
const sliderData = ref([])
const showTestimonialPopup = ref(false)
useSeoMeta({
  title: "Blog, Resources, Guides and More - Cloud of Worship",
  ogTitle: "Blog, Resources, Guides and More - Cloud of Worship",
  description:
    "Stay up to date with the latest updates, resources, guides and more from Cloud of Worship. See how you can use our software to enhance your worship experience.",
  ogDescription:
    "Stay up to date with the latest updates, resources, guides and more from Cloud of Worship. See how you can use our software to enhance your worship experience.",
  keywords:
    "cloud of worship, guide, how to, resources, blog, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com",
  ogType: "website",
  ogLocale: "en_US",
  canonical: "https://cloudofworship.com",
})

const topBlog = computed(() => blogsUncategorized.value?.[0])

const fetchBlogs = async () => {
  const blogs = await queryContent("/blog")
    .only([
      "title",
      "cover",
      "_id",
      "read_time",
      "created",
      "updated",
      "tag",
      "author",
      "author_img",
      "user_title",
      "paragraph",
    ])
    .find()
  const category_to_article_mapping = {}
  blogs.map((blog) => {
    blog.tag
      ?.split(",")
      .forEach((tag) =>
        tag in category_to_article_mapping
          ? category_to_article_mapping[tag].push(blog)
          : (category_to_article_mapping[tag] = [blog])
      )
  })
  blogs.sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime()
  })
  blogsUncategorized.value = blogs

  const allBlogs = Object.keys(category_to_article_mapping).reduce(
    (acc, curr) => {
      const obj = {
        title: curr,
        articles: category_to_article_mapping[curr],
        see: "See All",
      }
      acc.push(obj)
      return acc
    },
    []
  )
  const divisor = Math.ceil(allBlogs.length / 2)
  blogsByCategory.value = allBlogs
  newBlogs.value = allBlogs.slice(divisor)

  let recentBlogPosts = blogs.slice(0, 3)
  recentBlogPosts.map((x) => (x.time = 0))
  sliderData.value = recentBlogPosts
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

fetchBlogs()
</script>

<style scoped></style>
