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
          scriptures, videos and fully customizable slides for your church.
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
      <div class="hero-media h-[600px]"></div>
    </div>

    <!-- CHURCHES SECTION -->
    <ChurchUsersSection />

    <!-- TESTIMONIAL SECTION -->
    <TestimonialSection />

    <!-- POINT MAKER SECTION ONE -->
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
        <!-- <img src="~/assets/images/point-maker.png" alt="Point Maker" /> -->
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
        <!-- <img src="~/assets/images/point-maker.png" alt="Point Maker" /> -->
      </template>
    </PointMaker>

    <!-- WALL OF LOVE SECTION -->
    <WallOfLove />

    <!-- ABOVE FOOTER SECTION -->
    <AboveFooterSection />
  </div>
</template>

<script setup></script>

<style scoped></style>
