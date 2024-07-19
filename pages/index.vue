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
          href="https://app.cloudofworship.com"
          class="primary-btn taller w-[200px] mx-auto"
        >
          Get started for free
        </a>
        <div class="helper-text text-sm text-center pt-2">
          serving <span class="font-semibold">1000+</span> in congregation
        </div>
      </div>
      <div
        class="hero-media h-[295px] md:h-[40px] lg:h-[650px] flex justify-center items-end relative overflow-hidden"
      >
        <div
          class="main-hero-img pt-[5%] border-4 md:border-8 border-b-0 border-gray-100 rounded-t-[16px] md:rounded-t-[32px] h-[220px] md:h-[400px] lg:h-[600px] w-[100%] md:w-[1050px]"
        ></div>
        <div class="live-slide absolute right-[1%] -bottom-[0%]">
          <video
            class="border-4 border-b-0 bg-gray-300 border-gray-300 rounded-t-[16px] w-[200px]"
            src="~/assets/videos/live-slide.mp4"
            autoplay
            muted
            loop
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
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your church.
        </p>
        <nuxt-link to="/app" class="primary-btn w-[200px] mt-[5%]">
          Get started for free
        </nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper one h-[320px] md:h-[580px]"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION TWO -->
    <PointMaker>
      <template #texts>
        <h3 class="text-3xl md:text-5xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your church.
        </p>
        <nuxt-link to="/app" class="primary-btn w-[200px] mt-[5%]">
          Get started for free
        </nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper two h-[380px] md:h-[700px]"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION Three -->
    <PointMaker is-text-start>
      <template #texts>
        <h3 class="text-3xl md:text-5xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your church.
        </p>
        <nuxt-link to="/app" class="primary-btn w-[200px] mt-[5%]">
          Get started for free
        </nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper three h-[320px] md:h-[580px]"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION FOUR -->
    <PointMaker class="mb-[3%]">
      <template #texts>
        <h3 class="text-3xl md:text-5xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h3>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your church.
        </p>
        <nuxt-link to="/app" class="primary-btn w-[200px] mt-[5%]">
          Get started for free
        </nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper four h-[320px] md:h-[640px]"></div>
      </template>
    </PointMaker>

    <!-- WALL OF LOVE SECTION -->
    <WallOfLove />

    <!-- ABOVE FOOTER SECTION -->
    <AboveFooterSection />
  </div>
</template>

<script setup>
useHead({
  title: "Cloud of Worship - Presentation software for your growing church",
  meta: [
    {
      name: "description",
      content:
        "Display song lyrics, scriptures, videos and fully customizable slides for your growing church all on the web.",
    },
    {
      name: "keywords",
      content:
        "cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
    },
    {
      name: "og:image",
      content: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    },
  ],
})
</script>

<style scoped>
.main-hero-img {
  background: url("~/assets/images/hero-main.jpg");
  background-size: cover;
}
.img-wrapper.one {
  background: url("~/assets/images/browser-first.png") no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.img-wrapper.two {
  background: url("~/assets/images/team-workflow.png") no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.img-wrapper.three {
  background: url("~/assets/images/offline-ready.png") no-repeat;
  background-size: contain;
  background-position: center;
  width: 110%;
}
.img-wrapper.four {
  background: url("~/assets/images/actions.png") no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
</style>
