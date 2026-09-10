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
          Live projection
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          What you <span class="emphasis-text">choose</span> is <br />
          what they see
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          Your controls stay on the operator screen and only the slide you send
          reaches the projector. Second monitor, livestream, or a phone as a
          remote.
        </p>
      </div>
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          :href="
            mergeUtmsIntoUrl(
              'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=live_projection',
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
            src="https://revaise.s3.us-east-2.amazonaws.com/website/feature-live-projection.webp"
            class="max-h-full w-auto object-contain"
            alt="Slide schedule, live output and operator preview in Cloud of Worship"
          />
        </div>
      </div>
    </div>

    <!-- POINT MAKER ONE -->
    <PointMaker is-text-start class="mt-[3%]">
      <template #texts>
        <h2 class="text-3xl md:text-5xl font-bold">
          Two screens, one
          <span class="emphasis-text">source of truth</span>
        </h2>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          The projection window holds nothing but the slide. Drag it to the
          second monitor, make it full screen, and the congregation never sees a
          menu, a cursor or a half finished edit.
        </p>
        <a
          class="primary-btn w-[220px] mt-[5%] gap-8"
          :href="
            mergeUtmsIntoUrl(
              'https://app.cloudofworship.com/signup?utm_source=marketing_website&utm_medium=live_projection',
            )
          "
          >Try it free <ArrowDown class="-rotate-90" white-color
        /></a>
      </template>
      <template #img>
        <div class="img-wrapper live h-[320px] md:h-[580px]"></div>
      </template>
    </PointMaker>

    <!-- POINT MAKER TWO -->
    <PointMaker>
      <template #texts>
        <h2 class="text-3xl md:text-5xl font-bold">
          Control it from
          <span class="emphasis-text">anywhere</span> in the room
        </h2>
        <p class="description xl:text-md 2xl:text-lg md:font-medium">
          Connect a phone or tablet as a remote and advance slides from the
          front row or the sound desk. OBS can capture the same output as a
          window source for your
          <a class="underline font-semibold" href="/features/bible-verses"
            >livestream</a
          >.
        </p>
      </template>
      <template #img>
        <div class="img-wrapper team h-[380px] md:h-[700px]"></div>
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

const title = "Dual Screen Church Projection & Live Output - Cloud of Worship";
const description =
  "Run your service on two screens. Controls stay on the operator window, only the slide you send reaches the projector, and OBS can capture the output for livestream.";

const faqs = [
  {
    question: "How do I set up a second screen for church projection?",
    answer:
      "Open the live output window and drag it onto your projector or second monitor, then make it full screen. Your schedule, editor and preview stay on the operator screen, and only the slide you send goes out.",
  },
  {
    question: "Will the congregation see my controls or my cursor?",
    answer:
      "No. The projection window renders only the live slide. Menus, editing and the rest of the interface stay on the operator window.",
  },
  {
    question: "Can I control the slides from my phone?",
    answer:
      "Yes. Connect a phone or tablet as a remote and advance slides from the front row, the sound desk or the stage rather than being tied to the laptop.",
  },
  {
    question: "Does Cloud of Worship work with OBS for livestreaming?",
    answer:
      "Yes. The live output is a separate window, so OBS and similar tools can capture it as a window source and send the same lyrics and scripture to your online congregation.",
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
    "church projection software, dual screen presentation church, live output projector church, second monitor worship software, obs church livestream slides, church slide remote control, cloud of worship",
  ogImage: "https://cloudofworship.com/images/cow-og-image.jpeg",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/features/live-projection",
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
.img-wrapper.live {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/feature-live-projection.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.img-wrapper.team {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/team-workflow.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.faq-item summary::-webkit-details-marker {
  display: none;
}
</style>
