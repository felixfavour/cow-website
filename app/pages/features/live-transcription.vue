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
          Live transcription
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Every sermon, <span class="emphasis-text">summed up</span> <br />
          before anyone leaves
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          Cloud of Worship listens through the sermon and hands your church a
          clean summary of the nuggets at the end of it. Along the way it spots
          Bible references and takes voice commands, if you want it to.
        </p>
      </div>
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          :href="
            mergeUtmsIntoUrl(
              'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=live_transcription',
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
            src="https://revaise.s3.us-east-2.amazonaws.com/website/feature-live-transcription.webp"
            class="max-h-full w-auto object-contain"
            alt="Sermon transcription detecting a Bible reference and projecting it in Cloud of Worship"
          />
        </div>
      </div>
    </div>

    <!-- POINT MAKER ONE -->
    <PointMaker is-text-start class="mt-[3%]">
      <template #texts>
        <h2 class="text-3xl md:text-5xl font-bold">
          The sermon does not end when the
          <span class="emphasis-text">preacher</span> sits down
        </h2>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          At the end of every sermon you get a summary of what was actually
          said, gathered into nuggets your church can keep, revisit and share
          with the people who were not in the room.
        </p>
        <a
          class="primary-btn w-[220px] mt-[5%] gap-8"
          :href="
            mergeUtmsIntoUrl(
              'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=live_transcription',
            )
          "
          >Try it free <ArrowDown class="-rotate-90" white-color
        /></a>
      </template>
      <template #img>
        <div class="img-wrapper text h-[320px] md:h-[580px]"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER TWO -->
    <PointMaker>
      <template #texts>
        <h2 class="text-3xl md:text-5xl font-bold">
          It is listening anyway, so it
          <span class="emphasis-text">helps out</span>
        </h2>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          While it transcribes, it can flag the
          <a class="underline font-semibold" href="/features/bible-verses"
            >Bible references</a
          >
          the preacher names and respond to voice commands. Both are down to
          your preference, and nothing reaches the projector unless you send it.
        </p>
      </template>
      <template #img>
        <div class="img-wrapper bible h-[380px] md:h-[700px]"></div>
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
const { mergeUtmsIntoUrl } = useUtm();
const showTestimonialPopup = ref(false);

const title = "Sermon Summaries & Live Transcription - Cloud of Worship";
const description =
  "Cloud of Worship transcribes the sermon and turns it into a summary of nuggets your church can keep, while spotting Bible references and taking voice commands.";

const faqs = [
  {
    question: "What do I get at the end of a sermon?",
    answer:
      "A summary of the sermon, gathered into nuggets your church can keep, revisit and share with people who were not in the room. It is built from the live transcript, so nothing has to be typed up afterwards.",
  },
  {
    question: "What else does live transcription do during the service?",
    answer:
      "While it is listening it can flag the Bible references the preacher names and respond to voice commands. Both are optional and follow your preferences.",
  },
  {
    question: "Does it put verses on screen automatically?",
    answer:
      "No. Detected references appear as suggestions beside your schedule. The operator decides what goes live, so a passing mention never interrupts what the congregation is looking at.",
  },
  {
    question: "What do I need to use it?",
    answer:
      "A microphone the software can hear the preacher through, and an internet connection. The rest of Cloud of Worship, including Bible and lyrics projection, works offline.",
  },
];

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
});
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  keywords:
    "sermon summary software, sermon notes for church, church sermon transcription, live sermon transcription, sermon nuggets, automatic scripture detection, voice commands church presentation, cloud of worship",
  ogImage: "https://cloudofworship.com/images/cow-og-image.jpeg",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/features/live-transcription",
  ogType: "website",
  ogLocale: "en_US",
});

onMounted(() => {
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag();
  }

  // show testimonial popup on mobile
  if (
    window.innerWidth >= 768 &&
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1"
  ) {
    showTestimonialPopup.value = true;
  }
  window.addEventListener("resize", () => {
    if (
      window.innerWidth >= 768 &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1"
    ) {
      showTestimonialPopup.value = true;
    }
  });
});
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
.img-wrapper.text {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/feature-live-transcription.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.faq-item summary::-webkit-details-marker {
  display: none;
}
</style>
