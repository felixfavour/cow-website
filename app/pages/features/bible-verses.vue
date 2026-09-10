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
          Bible & scripture
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Put <span class="emphasis-text">scripture</span> on screen <br />
          in seconds
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          Type a reference like "Gen 1 1" and the verse is ready to project.
          Multiple translations, full-text Bible search, all stored offline.
        </p>
      </div>
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          :href="
            mergeUtmsIntoUrl(
              'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=bible_verses'
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
            src="https://revaise.s3.us-east-2.amazonaws.com/website/feature-bible-verses.webp"
            class="max-h-full w-auto object-contain"
            alt="Searching a Bible reference and projecting Genesis 1:1 live in Cloud of Worship"
          />
        </div>
      </div>
    </div>

    <!-- POINT MAKER ONE -->
    <PointMaker is-text-start class="mt-[3%]">
      <template #texts>
        <h2 class="text-3xl md:text-5xl font-bold">
          Find the verse before the
          <span class="emphasis-text">preacher</span> finishes saying it
        </h2>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          The scripture toolbar takes a reference the way you would say it out
          loud. "Gen 1 1", "john 3:16". No dropdowns, no scrolling through
          books.
        </p>
        <a
          class="primary-btn w-[220px] mt-[5%] gap-8"
          :href="
            mergeUtmsIntoUrl(
              'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=bible_verses'
            )
          "
          >Try it free <ArrowDown class="-rotate-90" white-color
        /></a>
      </template>
      <template #img>
        <div class="img-wrapper bible h-[320px] md:h-[580px]"></div>
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

const title = "Bible Verse Projection Software for Churches - Cloud of Worship"
const description =
  "Project Bible verses on screen in seconds. Type a reference, search the full text of scripture, and switch translations live. Works offline. Free to start."

const faqs = [
  {
    question: "How do I project Bible verses during a church service?",
    answer:
      "Open the scripture toolbar, type the reference the way you would say it (for example 'Gen 1 1' or 'john 3:16'), and the passage appears on the operator screen. Press go live and it is on the projector. Long passages are split into readable slides automatically.",
  },
  {
    question: "Can I display scripture without an internet connection?",
    answer:
      "Yes. The full text of every included translation is stored on the device, so verse lookup, full-text search and projection all keep working if the church internet drops mid service.",
  },
  {
    question: "Is Bible projection free?",
    answer:
      "Yes. Displaying Bible passages, full-text Bible search, multiple translations and quick scripture lookup are all included on the free Starter plan, with no card required.",
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
    "bible verse projection software, project bible verses on screen, church scripture presentation software, bible presentation software for church, display bible verses church, scripture slides, church projection software, cloud of worship",
  ogImage: "https://cloudofworship.com/images/cow-og-image.jpeg",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/features/bible-verses",
  ogType: "website",
  ogLocale: "en_US",
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
.img-wrapper.bible {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/feature-bible-verses.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.faq-item summary::-webkit-details-marker {
  display: none;
}
</style>
