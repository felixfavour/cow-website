<template>
  <div
    class="content pt-[7.5%] flex flex-col gap-8 items-center justify-center"
  >
    <div class="inner w-[90%] max-w-[800px] mx-auto">
      <div class="flex items-center tags gap-2 cursor-default mb-4">
        <nuxt-link
          to="/blog"
          class="font-semibold px-3 py-1 bg-purple-500 border-2 border-transparent hover:border-black text-white rounded-full mr-1 lg:mr-4 flex items-center gap-1 text-xs md:text-sm"
        >
          <ArrowDown class="w-5 h-5 rotate-90" whiteColor />
          Go Home</nuxt-link
        >
        <div
          v-for="tag in data?.tag.split(',')"
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
              <span class="font-medium">{{ getDate(data?.created) }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <img
      :src="data?.cover"
      class="w-[95%] max-h-[600px] object-cover max-w-[1200px] rounded-3xl group-hover:scale-110 transition-all"
    />
    <section class="w-[90%] max-w-[800px] mx-auto pb-[15%]">
      <article>
        <div class="icons" style="grid-area: icon">
          <BlogSocialMediaIcons class="inner" />
        </div>
        <ContentRenderer v-if="data" :value="data" style="grid-area: content" />
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

  // If not found, try case-insensitive search
  if (!result) {
    const allBlogs = await queryCollection("blog").all()
    result = allBlogs.find(
      (blog) => blog.path?.toLowerCase() === `/blog/${params.id}`.toLowerCase()
    )
  }

  return result
})
const content = data.value
const showTestimonialPopup = ref(false)

const getDate = (time) => {
  if (!time) return ""
  const split = time.split(" ")
  return split.splice(0, 3).join(" ")
}

useSeoMeta({
  title: content?.title,
  ogTitle: content?.title,
  description: content?.excerpt,
  ogDescription: content?.excerpt,
  keywords:
    content?.tag +
    " cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: content?.cover,
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com",
  ogType: "website",
  ogLocale: "en_US",
  canonical: "https://cloudofworship.com",
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

<style>
article {
  display: grid;
  gap: 10px;
  grid-template-areas: "content";
  grid-template-columns: 1fr;
}

article a {
  color: rgba(139, 92, 246);
  text-decoration: underline;
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
    grid-template-columns: 1fr;
  }
}
</style>
