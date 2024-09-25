<template>
  <div>
    <div class="section pt-[3%]">
      <nuxt-link
        :to="`/blog/${topBlog?._id
          ?.replace('.md', '')
          ?.replace('content:blog:', '')}`"
        class="inner blog-hero flex items-center relative gap-6 group overflow-hidden rounded-3xl"
      >
        <img
          :src="topBlog?.cover"
          class="h-[600px] 2xl:h-[630px] group-hover:scale-110 transition-all"
        />
        <div
          class="blog-info absolute bg-white shadow-md w-[27.5%] 2xl:w-[31.5%] min-w-[300px] rounded-3xl p-[2.5%] right-0 top-[10%] flex flex-col gap-4"
        >
          <div class="flex tags gap-2 cursor-default">
            <div
              v-for="tag in topBlog?.tag.split(',')"
              :key="tag"
              class="tag uppercase px-2 py-1 rounded-full bg-gray-100 text-sm"
            >
              {{ tag.trim() }}
            </div>
          </div>
          <h1 class="text-4xl font-bold group-hover:underline">
            {{ topBlog?.title }}
          </h1>
          <p class="text-md">{{ topBlog?.paragraph?.slice(0, 150) }}...</p>
          <div class="author flex items-center gap-4 mt-4">
            <img
              src="~/assets/images/favour.jpeg"
              alt=""
              class="rounded-full w-[40px] h-[40px] object-cover"
            />
            <span class="text-md font-semibold">{{ topBlog?.author }}</span>
          </div>
        </div>
      </nuxt-link>
      <div class="inner py-[5%]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5%]">
          <BlogCard
            v-for="blog in blogsUncategorized"
            :key="blog.title"
            :blog="blog"
          />
        </div>
      </div>
    </div>
    <AboveFooterSection />
  </div>
</template>

<script setup>
const blogsByCategory = ref([])
const blogsUncategorized = ref([])
const newBlogs = ref([])
const sliderData = ref([])
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

const topBlog = computed(() => blogsUncategorized.value?.[2])

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
      "user_title",
      "paragraph",
    ])
    .find()
  const category_to_article_mapping = {}
  blogs.map((blog) => {
    blog.tag
      .split(",")
      .forEach((tag) =>
        tag in category_to_article_mapping
          ? category_to_article_mapping[tag].push(blog)
          : (category_to_article_mapping[tag] = [blog])
      )
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
  if (location.hostname !== "localhost") {
    useGtag()
  }

  // show testimonial popup on mobile
  if (window.innerWidth >= 768 && location.hostname !== "localhost") {
    showTestimonialPopup.value = true
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && location.hostname !== "localhost") {
      showTestimonialPopup.value = true
    }
  })
})

fetchBlogs()
</script>

<style scoped></style>
