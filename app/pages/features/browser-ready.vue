<template>
  <div class="section page">
    <!-- HERO SECTION -->
    <div class="inner pt-[10%] md:pt-[5%]">
      <div
        class="texts max-w-[900px] 2xl:max-w-[1000px] text-center mx-auto flex flex-col gap-4 2xl:gap-6"
      >
        <div
          class="small-text secondary-font text-center text-md lg:text-lg text-[#FF8980] font-bold"
        >
          Browser-ready UX
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          No
          installations. <br />
          Just start projecting.
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          No more cumbersome downloads and installation processes—experience
          worship presentation to your fingertips, directly through your web
          browser.
        </p>
      </div>
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          :href="mergeUtmsIntoUrl('https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=browser_ready')"
          class="primary-btn taller w-[220px] mx-auto"
        >
          Get started for free
        </a>
        <div class="helper-text text-sm text-center pt-2">
          supports Mac, Windows, Linux, Android
        </div>
      </div>
      <div
        class="hero-media h-[295px] md:h-[450px] lg:h-[650px] flex justify-center items-end relative overflow-hidden"
      >
        <div
          class="main-hero-img pt-[5%] img-ctn rounded-t-[16px] md:rounded-t-[32px] h-[220px] md:h-[400px] lg:h-[600px] w-[100%] md:w-[1050px]"
        >
          <img
            src="https://revaise.s3.us-east-2.amazonaws.com/website/browser-first.webp"
            alt="Browser-ready UX"
          />
        </div>
      </div>
    </div>

    <ChurchUsersSection />

    <!-- ABOVE FOOTER SECTION -->
    <AboveFooterSection />

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const { mergeUtmsIntoUrl } = useUtm()
const showTestimonialPopup = ref(false)
useSeoMeta({
  title:
    "Browser-Based Church Presentation Software | Cloud of Worship",
  ogTitle:
    "Browser-Based Church Presentation Software | Cloud of Worship",
  description:
    "Run lyrics, scripture and slides from any web browser on Windows, Mac, Linux or a tablet. No install, no licence keys. Free to start with Cloud of Worship.",
  ogDescription:
    "Run lyrics, scripture and slides from any web browser on Windows, Mac, Linux or a tablet. No install, no licence keys. Free to start with Cloud of Worship.",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/features/browser-ready",
  ogType: "website",
  ogLocale: "en_US",
})

useOgCard("browserReady")

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
.img-ctn {
  background: linear-gradient(
    270deg,
    rgba(255, 215, 212, 1) 0%,
    rgba(238, 219, 255, 1) 100%
  );
  background-size: 150%;
  display: grid;
  place-items: center;
}
</style>
