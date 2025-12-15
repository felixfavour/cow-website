<template>
  <div class="section page">
    <!-- HERO SECTION -->
    <div class="inner py-[10%] md:py-[5%]">
      <div
        class="texts max-w-[900px] 2xl:max-w-[1000px] text-center mx-auto flex flex-col gap-4 2xl:gap-6"
      >
        <div
          class="small-text secondary-font text-center text-md lg:text-lg text-[#FF8980] font-bold"
        >
          Legal
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Terms of Service
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          Last updated: July 25, 2024
        </p>
      </div>
    </div>

    <main class="inner smaller-inner">
      <h2>1. Introduction</h2>
      <p>
        Welcome to Cloud of Worship ("Service"). By accessing or using our
        Service, you agree to comply with and be bound by these Terms of Use
        ("Terms"). If you do not agree to these Terms, please do not use our
        Service.
      </p>

      <h2>2. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. We will provide
        notice of changes by posting the revised Terms on our website. Your
        continued use of the Service after any changes constitutes your
        acceptance of the new Terms.
      </p>

      <h2>3. Description of Service</h2>
      <p>
        Cloud of Worship provides browser-based presentation software for
        churches to display song lyrics, scriptures, videos, and customizable
        slides. Key features include offline readiness, browser readiness, and
        support for a team workflow (multiplayer mode).
      </p>

      <h2>4. User Accounts</h2>
      <p>
        To use certain features of the Service, you may need to create an
        account. You agree to provide accurate, current, and complete
        information during the registration process and to update such
        information to keep it accurate, current, and complete. You are
        responsible for maintaining the confidentiality of your account password
        and for all activities that occur under your account.
      </p>

      <h2>5. User Conduct</h2>
      <p>
        You agree to use the Service only for lawful purposes and in a way that
        does not infringe the rights of, restrict, or inhibit anyone else's use
        and enjoyment of the Service. Prohibited behavior includes but is not
        limited to:
      </p>
      <ul>
        <li>
          Using the Service in any way that breaches any applicable local,
          national, or international law or regulation.
        </li>
        <li>
          Transmitting, or procuring the sending of, any unsolicited or
          unauthorized advertising or promotional material.
        </li>
        <li>
          Engaging in conduct that is fraudulent, threatening, harassing, or
          abusive.
        </li>
      </ul>

      <h2>6. Content</h2>
      <p>
        You retain ownership of all content you upload, submit, or otherwise
        make available through the Service ("User Content"). By providing User
        Content, you grant us a worldwide, non-exclusive, royalty-free license
        to use, store, reproduce, modify, create derivative works from, and
        display your User Content for the purpose of operating and providing the
        Service.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All content and materials on the Service, including but not limited to
        software, text, graphics, logos, and images, are the property of Cloud
        of Worship or its licensors and are protected by intellectual property
        laws. You may not use any content from the Service without our express
        written permission.
      </p>

      <h2>8. Termination</h2>
      <p>
        We may terminate or suspend your access to the Service at any time,
        without prior notice or liability, for any reason, including if you
        breach these Terms. Upon termination, your right to use the Service will
        immediately cease.
      </p>

      <h2>9. Disclaimers and Limitation of Liability</h2>
      <p>
        The Service is provided on an "as is" and "as available" basis. We make
        no warranties or representations about the accuracy or completeness of
        the Service or the content. To the fullest extent permitted by law, we
        disclaim all warranties, whether express or implied.
      </p>
      <p>
        In no event shall Cloud of Worship be liable for any indirect,
        incidental, special, consequential, or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from your use of the Service.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of Nigeria, without regard to its conflict of law principles.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at
        <a
          href="mailto:hello@cloudofworship.com"
          rel="external nofollow noopener"
          target="_blank"
          >hello@cloudofworship.com</a
        >
      </p>
    </main>

    <!-- ABOVE FOOTER SECTION -->
    <AboveFooterSection />

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const showTestimonialPopup = ref(false)
useHead({
  title: "Terms of Service - Cloud of Worship",
})
useSeoMeta({
  title: "Terms of Service - Cloud of Worship",
  ogTitle: "Terms of Service - Cloud of Worship",
  description:
    "Get updates every week for your church with Cloud of Worship; free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides.",
  ogDescription:
    "Get updates every week for your church with Cloud of Worship; free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides.",
  keywords:
    "cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: "https://cloudofworship.com/images/cow-og-image.jpeg",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/terms-of-service",
  ogType: "website",
  ogLocale: "en_US",
  canonical: "https://cloudofworship.com/terms-of-service",
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
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bolder;
}

main h2 {
  font-size: 160%;
  line-height: 250%;
  margin-top: 3%;
}

main h3 {
  font-size: 135%;
  margin-bottom: 2%;
  /* margin-top: 3.5%; */
}

main p {
  margin-bottom: 2%;
}

main ul {
  list-style-type: disc;
  margin-left: 2%;
  margin-bottom: 2%;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid var(--primary-color);
  font-weight: bold;
}
</style>
