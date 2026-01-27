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
          Team workflow
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Enjoy a <span class="emphasis-text">collaborative</span> <br />
          team workflow
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          Work with your team in real-time, wherever you are. Whether you’re
          adding lyrics, editing slides, or opening scripture.
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
        class="hero-media h-[295px] md:h-[450px] lg:h-[650px] flex justify-center items-end overflow-hidden"
      >
        <div
          class="main-hero-img pt-[5%] img-ctn rounded-t-[16px] md:rounded-t-[32px] h-[220px] md:h-[400px] lg:h-[600px] w-[100%] md:w-[1050px relative"
        >
          <!-- <img
            src="~/assets/images/multiplayer.png"
            class="absolute inset-0"
            alt="Browser-ready UX"
          /> -->
          <img
            src="https://revaise.s3.us-east-2.amazonaws.com/website/team-workflow.webp"
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
    "Church presentation software where you can work together - Cloud of Worship",
})
useSeoMeta({
  title:
    "Church presentation software where you can work together - Cloud of Worship",
  ogTitle:
    "Church presentation software where you can work together - Cloud of Worship",
  description:
    "Work with your team in real-time, wherever you are. Whether you’re adding lyrics, editing slides, or opening scripture.",
  ogDescription:
    "Work with your team in real-time, wherever you are. Whether you’re adding lyrics, editing slides, or opening scripture.",
  keywords:
    "cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: "https://cloudofworship.com/images/cow-og-image.jpeg",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/features/team-workflow",
  ogType: "website",
  ogLocale: "en_US",
  canonical: "https://cloudofworship.com/features/team-workflow",
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
