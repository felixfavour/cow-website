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
          Offline-first experience
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          100% Reliable with <br />
          <span class="emphasis-text">offline-ready</span> technology
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          Empower your media team to deliver exceptional experiences to your
          congregation without being tethered to an internet connection.
        </p>
      </div>
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          href="https://app.cloudofworship.com/signup"
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
            src="https://revaise.s3.us-east-2.amazonaws.com/website/offline-ready.webp"
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
const showTestimonialPopup = ref(false)
useHead({
  title:
    "Church presentation software that works without an internet connection - Cloud of Worship",
})
useSeoMeta({
  title:
    "Church presentation software that works without an internet connection - Cloud of Worship",
  ogTitle:
    "Church presentation software that works without an internet connection - Cloud of Worship",
  description:
    "Empower your media team to deliver exceptional experiences to your congregation without being tethered to an internet connection.",
  ogDescription:
    "Empower your media team to deliver exceptional experiences to your congregation without being tethered to an internet connection.",
  keywords:
    "cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/features/offline-first",
  ogType: "website",
  ogLocale: "en_US",
  canonical: "https://cloudofworship.com/features/offline-first",
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
