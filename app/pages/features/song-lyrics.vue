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
          Songs & hymns
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Every <span class="emphasis-text">lyric</span> ready <br />
          before the band is
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          Over 3,000 hymns offline, more than 13,000 songs shared by other
          churches, and your own lyrics typed once and reused every Sunday.
        </p>
      </div>
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          :href="
            mergeUtmsIntoUrl(
              'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=song_lyrics'
            )
          "
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
          class="main-hero-img p-[4%] img-ctn rounded-t-[16px] md:rounded-t-[32px] h-[220px] md:h-[400px] lg:h-[600px] w-[100%] md:w-[1050px]"
        >
          <img
            src="https://revaise.s3.us-east-2.amazonaws.com/website/feature-song-lyrics.webp"
            class="max-h-full w-auto object-contain"
            alt="Song verse list and the song and hymn search panels in Cloud of Worship"
          />
        </div>
      </div>
    </div>

    <!-- POINT MAKER ONE -->
    <PointMaker is-text-start class="mt-[3%]">
      <template #texts>
        <h2 class="text-3xl md:text-5xl font-bold">
          When the worship leader goes back to the
          <span class="emphasis-text">chorus</span>
        </h2>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          Sunday never follows the setlist. Jump straight to any verse, the
          chorus or the bridge while the song is live, so an unplanned repeat
          does not leave the congregation reading the wrong line.
        </p>
        <a
          class="primary-btn w-[220px] mt-[5%] gap-8"
          :href="
            mergeUtmsIntoUrl(
              'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=song_lyrics'
            )
          "
          >Try it free <ArrowDown class="-rotate-90" white-color
        /></a>
      </template>
      <template #img>
        <div class="img-wrapper song h-[320px] md:h-[580px]"></div>
      </template>
    </PointMaker>

    <!-- FAQ SECTION -->
    <div class="section faq-section py-[10%] lg:py-[4%]">
      <div class="inner smaller-inner">
        <h2 class="text-2xl md:text-4xl font-bold mb-6 text-center">
          Frequently asked <span class="emphasis-text">questions</span>
        </h2>
        <div class="flex flex-col gap-3">
          <details
            v-for="faq in faqs"
            :key="faq.question"
            class="faq-item border border-gray-100 rounded-xl px-5 py-4 shadow-sm bg-white"
          >
            <summary class="cursor-pointer list-none">
              <h3 class="font-bold inline">{{ faq.question }}</h3>
            </summary>
            <p class="description text-sm pt-3">{{ faq.answer }}</p>
          </details>
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

const title =
  "Song Lyrics & Hymn Projection Software for Churches - Cloud of Worship"
const description =
  "Project song lyrics and hymns on screen. Over 3,000 hymns offline, 13,000+ shared songs, and jump to any verse or chorus mid song. Free to start."

const faqs = [
  {
    question: "How do I project song lyrics in church?",
    answer:
      "Search the song by name, add it to your service schedule, and send it live. While the song is playing, the song toolbar lets you jump to any verse, the chorus or the bridge without hunting through slides.",
  },
  {
    question: "How many hymns are included?",
    answer:
      "Over 3,000 hymns are included and stored offline on the device, so they can be searched and projected with or without an internet connection.",
  },
  {
    question: "Can I add my own song lyrics?",
    answer:
      "Yes, on every plan including the free Starter plan. Type the lyrics once, save them to your library, and they are one search away for future services.",
  },
  {
    question: "Is there a shared song library?",
    answer:
      "Yes. There is access to a growing library of more than 13,000 songs added by other churches, so most of what your team sings is already typed up.",
  },
]

useHead({
  title,
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }),
    },
  ],
})
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  keywords:
    "church lyrics projection software, song lyrics on screen church, hymn projection software, worship lyrics software, church song presentation software, hymn slides, praise and worship slides, cloud of worship",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/features/song-lyrics",
  ogType: "website",
  ogLocale: "en_US",
})

useOgCard("songLyrics")

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
.img-wrapper.song {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/feature-song-lyrics.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.img-wrapper.text {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/text.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.faq-item summary::-webkit-details-marker {
  display: none;
}
</style>
