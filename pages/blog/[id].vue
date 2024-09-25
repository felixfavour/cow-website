<template>
  <div
    class="content pt-[7.5%] flex flex-col gap-8 items-center justify-center"
  >
    <div class="inner max-w-[800px] mx-auto">
      <div class="flex items-center tags gap-2 cursor-default mb-4">
        <nuxt-link
          to="/blog"
          class="font-semibold px-3 py-1 hover:underline bg-purple-500 text-white rounded-full mr-4"
          >Go Home</nuxt-link
        >
        <div
          v-for="tag in data?.tag.split(',')"
          :key="tag"
          class="tag uppercase px-2 py-1 rounded-full bg-gray-100 text-sm"
        >
          {{ tag.trim() }}
        </div>
      </div>
      <h1 class="text-6xl font-bold mb-4">
        {{ data?.title }}
      </h1>
      <div class="header flex items-center gap-4">
        <div class="blog-details-left flex items-center gap-4">
          <img
            src="~/assets/images/favour.jpeg"
            class="rounded-full w-[50px] h-[50px] object-cover"
            alt=""
          />
          <div class="small_text">
            <span class="font-medium">{{ data?.author }}</span> <br />
            <span class="text-sm text-gray-500">
              <span class="smaller_text">Updated </span>
              <span class="font-medium">{{ getDate(data?.created) }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <img
      :src="data?.cover"
      class="min-h-[500px] h-[70vh] rounded-3xl group-hover:scale-110 transition-all object-contain"
    />
    <section class="max-w-[800px] mx-auto">
      <article>
        <div class="icons" style="grid-area: icon">
          <BlogSocialMediaIcons class="inner" />
        </div>
        <ContentDoc :path="data?._path" style="grid-area: content" />
      </article>
    </section>
    <AboveFooterSection />
  </div>
</template>

<script setup>
const { params } = await useRoute()
const { data } = await useAsyncData(`blog-${params.id}`, () =>
  queryContent("/blog")
    .where({ _id: "content:blog:" + params.id + ".md" })
    .findOne()
)
const content = await data._rawValue

useSeoMeta({
  title: content.title,
  ogTitle: content.title,
  description: content.excerpt,
  ogDescription: content.excerpt,
  keywords:
    content.tag +
    " cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: content.cover,
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com",
  ogType: "website",
  ogLocale: "en_US",
  canonical: "https://cloudofworship.com",
})

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
</script>

<script>
export default {
  data() {
    return {
      likes: 0,
      claps: 0,
      blogs: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.blogs = await queryContent("/blog")
        .only(["title", "cover", "_id", "created", "updated", "author"])
        .find()
    },
    getDate(time) {
      if (!time) return ""
      const split = time.split(" ")
      return split.splice(0, 3).join(" ")
    },
    capitalize(str) {
      if (!str) return "--"
      const words = str.split(" ")
      const capitalizedWords = words.map((word) => {
        const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
        return capitalized
      })
      const capitalizedString = capitalizedWords.join(" ")
      return capitalizedString
    },
    getTags(str) {
      const tags = new Set()
      str?.split(",").forEach((tag) => {
        tags.add(tag)
      })
      return tags
    },
  },
}
</script>
