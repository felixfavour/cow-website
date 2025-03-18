<template>
  <div class="section page">
    <!-- HERO SECTION -->
    <div class="inner pt-[10%] md:pt-[3%]">
      <div
        class="texts max-w-[900px] 2xl:max-w-[1000px] text-center mx-auto flex flex-col gap-4 2xl:gap-6"
      >
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your growing
          church.
        </p>
      </div>
      <div class="actions mt-[7.5%] md:mt-[2%] text-center">
        <a
          href="https://app.cloudofworship.com/signup"
          class="primary-btn taller w-[220px] mx-auto"
        >
          Get started for free
        </a>
        <div class="helper-text text-sm text-center pt-2">
          serving <span class="font-semibold">350+</span> churches, and
          thousands in congregation
        </div>
      </div>
      <div
        class="hero-media h-[295px] md:h-[450px] lg:h-[650px] flex justify-center items-end relative overflow-hidden"
      >
        <div
          class="main-hero-img pt-[5%] border-4 md:border-8 border-b-0 md:border-b-0 border-gray-100 rounded-t-[16px] md:rounded-t-[32px] h-[220px] md:h-[400px] lg:h-[600px] w-[100%] md:w-[1050px]"
        ></div>
        <div class="live-slide absolute right-[1%] md:right-[4%] -bottom-[0%]">
          <video
            class="border-4 md:border-8 border-b-0 bg-gray-300 border-gray-300 rounded-t-[16px] md:rounded-t-[24px] w-[200px] md:w-[400px]"
            src="https://revaise.s3.us-east-2.amazonaws.com/website/live-slide.mp4"
            autoplay
            muted
            loop
            playsinline
            poster="https://revaise.s3.us-east-2.amazonaws.com/website/live-poster.webp"
          />
          <LiveSlideIndicator visible class="top-3 right-4 scale-75" />
        </div>
      </div>
    </div>

    <!-- CHURCHES SECTION -->
    <ChurchUsersSection />

    <!-- TESTIMONIAL SECTION -->
    <TestimonialSection />

    <!-- POINT MAKER SECTION ONE -->
    <PointMaker is-text-start class="mt-[3%]">
      <template #texts>
        <h3 class="text-3xl md:text-5xl font-bold">
          No
          <span class="emphasis-text">installations</span>. <br />Just log on
          and start projecting.
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          Say goodbye to cumbersome downloads and installation processes—our
          innovative platform brings worship presentation to your fingertips,
          directly through your web browser. With support for all platforms
          (Mac, Windows, Linux, iOS, Android).
        </p>
        <nuxt-link
          class="primary-btn w-[220px] mt-[5%] gap-8"
          to="/features/browser-ready"
          >See more info <ArrowDown class="-rotate-90" white-color
        /></nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper one h-[320px] md:h-[580px]"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION TWO -->
    <PointMaker>
      <template #texts>
        <h3 class="text-3xl md:text-5xl font-bold">
          Empower your media team with a
          <span class="emphasis-text">collaborative</span> team workflow
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          Work together with your team in real-time, no matter where you are.
          Whether you’re selecting songs, editing slides, or opening a
          scripture, everyone can contribute simultaneously.
        </p>
        <nuxt-link
          class="primary-btn w-[220px] mt-[5%] gap-8"
          to="/features/team-workflow"
          >See more info <ArrowDown class="-rotate-90" white-color
        /></nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper two h-[380px] md:h-[700px]"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION Three -->
    <PointMaker is-text-start>
      <template #texts>
        <h3 class="text-3xl md:text-5xl font-bold">
          100% Reliable with
          <span class="emphasis-text">offline-ready</span> technology
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          Empower your team to deliver exceptional experiences to your
          congregation without being tethered to an internet connection. Bring
          confidence and consistency to your services with our offline-ready
          capability.
        </p>
        <nuxt-link
          class="primary-btn w-[220px] mt-[5%] gap-8"
          to="/features/offline-first"
          >See more info <ArrowDown class="-rotate-90" white-color
        /></nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper three h-[320px] md:h-[580px]"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION FOUR -->
    <PointMaker class="mb-[3%]">
      <template #texts>
        <h3 class="text-3xl md:text-5xl font-bold">
          There's
          <span class="emphasis-text">more</span> to do with Cloud of Worship.
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          Whether it's searching for a scripture, editing templated slides,
          searching songs and hymns in our global songs database—there's plenty
          of things to try out and more are added every week.
        </p>
        <a
          class="primary-btn w-[220px] mt-[5%]"
          href="https://app.cloudofworship.com/signup"
          >Get started for free</a
        >
      </template>
      <template #img>
        <div class="img-wrapper four h-[320px] md:h-[640px]"></div>
      </template>
    </PointMaker>

    <!-- WALL OF LOVE SECTION -->
    <WallOfLove />

    <!-- ABOVE FOOTER SECTION -->
    <AboveFooterSection />

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const showTestimonialPopup = ref(false)
useHead({
  title: "Cloud of Worship - Presentation software for your growing church",
})
useSeoMeta({
  title: "Cloud of Worship - Presentation software for your growing church",
  ogTitle: "Cloud of Worship - Presentation software for your growing church",
  description:
    "Free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides for your growing church.",
  ogDescription:
    "Free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides for your growing church.",
  keywords:
    "cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
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

<style scoped>
.main-hero-img {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/hero-main.webp");
  background-size: cover;
}
.img-wrapper.one {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/browser-first.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.img-wrapper.two {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/team-workflow.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.img-wrapper.three {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/offline-ready.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 110%;
}
.img-wrapper.four {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/actions.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
</style>
