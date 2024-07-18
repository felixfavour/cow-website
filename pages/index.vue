<template>
  <div class="section page">
    <!-- HERO SECTION -->
    <div class="inner pt-[3%]">
      <div class="texts max-w-[1000px] text-center mx-auto flex flex-col gap-6">
        <h1 class="text-7xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h1>
        <p class="description text-lg font-medium w-[65%] mx-auto">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your growing
          church.
        </p>
      </div>
      <div class="actions mt-[3%] text-center">
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
        class="hero-media h-[650px] flex justify-center items-end relative overflow-hidden"
      >
        <div
          class="main-hero-img pt-[5%] border-8 border-b-0 border-gray-100 rounded-t-[32px] h-[600px] w-[1050px]"
        ></div>
        <div class="live-slide absolute right-[4%] -bottom-[0%]">
          <video
            class="border-8 border-b-0 border-gray-300 rounded-t-[24px] w-[400px]"
            src="~/assets/videos/live-slide.mp4"
            autoplay
            muted
            loop
          />
          <LiveSlideIndicator visible class="top-6 right-8" />
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
        <h3 class="text-5xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h3>
        <p class="description text-lg font-medium">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your church.
        </p>
        <nuxt-link to="/app" class="primary-btn w-[200px] mt-[5%]">
          Get started for free
        </nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper one"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION TWO -->
    <PointMaker>
      <template #texts>
        <h3 class="text-5xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h3>
        <p class="description text-lg font-medium">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your church.
        </p>
        <nuxt-link to="/app" class="primary-btn w-[200px] mt-[5%]">
          Get started for free
        </nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper two"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION Three -->
    <PointMaker is-text-start>
      <template #texts>
        <h3 class="text-5xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h3>
        <p class="description text-lg font-medium">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your church.
        </p>
        <nuxt-link to="/app" class="primary-btn w-[200px] mt-[5%]">
          Get started for free
        </nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper three"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER SECTION FOUR -->
    <PointMaker class="mb-[3%]">
      <template #texts>
        <h3 class="text-5xl font-bold">
          Craft
          <span class="emphasis-text">the best</span>
          on-screen experience for your church.
        </h3>
        <p class="description text-lg font-medium w-[70%]">
          A free browser-based presentation software to display song lyrics,
          scriptures, videos and fully customizable slides for your church.
        </p>
        <nuxt-link to="/app" class="primary-btn w-[200px] mt-[5%]">
          Get started for free
        </nuxt-link>
      </template>
      <template #img>
        <div class="img-wrapper four"></div>
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
      content:
        "https://firebasestorage.googleapis.com/v0/b/favour-portfolio.appspot.com/o/cow-og.webp?alt=media&token=73072d61-418e-4eb2-8739-5f45ca9273a0",
    },
  ],
})
</script>

<style scoped>
.main-hero-img {
  background: url("~/assets/images/hero-main.jpg");
  background-size: cover;
  background-position: top;
}
.img-wrapper.one {
  background: url("~/assets/images/browser-first.png") no-repeat;
  background-size: contain;
  background-position: center;
  height: 580px;
  width: 120%;
}
.img-wrapper.two {
  background: url("~/assets/images/team-workflow.png") no-repeat;
  background-size: contain;
  background-position: center;
  height: 700px;
  width: 120%;
}
.img-wrapper.three {
  background: url("~/assets/images/offline-ready.png") no-repeat;
  background-size: contain;
  background-position: center;
  height: 580px;
  width: 120%;
}
.img-wrapper.four {
  background: url("~/assets/images/actions.png") no-repeat;
  background-size: contain;
  background-position: center;
  height: 640px;
  width: 130%;
}
</style>
