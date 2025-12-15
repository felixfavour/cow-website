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
          Pricing
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          Cloud of Worship is
          <span class="emphasis-text">free</span> <br />
        </h1>
        <p
          class="description xl:text-md 2xl:text-lg md:font-medium w-[95%] md:w-[65%] mx-auto"
        >
          We believe that every congregation deserves to enjoy a quality time in
          church with affordable tool that helps them to be more connected to
          God, regardless of their location.
          <br />
        </p>
      </div>
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          target="_blank"
          href="https://app.cloudofworship.com/signup"
          class="primary-btn taller w-[240px] mx-auto"
        >
          Sign up for free
        </a>
        <!-- <div class="helper-text text-sm text-center pt-2">
          We hope to never charge.
        </div> -->
      </div>
    </div>

    <!-- CHURCHES SECTION -->
    <ChurchUsersSection />

    <!-- COMPARISON TABLE SECTION -->
    <ComparisonTable />

    <!-- ABOVE FOOTER SECTION -->
    <AboveFooterSection />

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const showTestimonialPopup = ref(false)
useHead({
  title: "Pricing - Cloud of Worship is free to use",
})
useSeoMeta({
  title: "Pricing - Cloud of Worship is free to use",
  ogTitle: "Pricing - Cloud of Worship is free to use",
  description:
    "We believe every congregation deserves to enjoy a quality time in church with affordable tool that helps them to be more connected to God, regardless of their location; our free browser-based presentation software helps us achieve this goal.",
  ogDescription:
    "We believe every congregation deserves to enjoy a quality time in church with affordable tool that helps them to be more connected to God, regardless of their location; our free browser-based presentation software helps us achieve this goal.",
  keywords:
    "cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: "https://cloudofworship.com/images/cow-og-image.jpeg",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/pricing",
  ogType: "website",
  ogLocale: "en_US",
  canonical: "https://cloudofworship.com/pricing",
})

const changelogs = [
  {
    version: "Beta v0.7.7",
    title: "Version Purity",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Alert count increase, text editor fix, schedule sync, jittery layouts, refresh songs and more.",
    changes: [
      "Increased Default Alert Count",
      "Resolved various issues affecting the text slide editor for a smoother editing experience.",
      "Added a feature to allow custom titles in schedules, enhancing personalization and organization.",
      "Implemented functionality to refresh songs from local or remote databases, ensuring up-to-date content.",
      "Addressed issues with jittery layouts when adding new slides, particularly media slides, for a more stable user interface.",
      "Made visible changes to background fill types in previews to improve visual feedback.",
      "Fixed issues with missing backgrounds upon reload or refresh, ensuring consistent presentation design.",
      "Enhanced the preview feature to make previewing verses more intuitive and user-friendly.",
      "Introduced the ability to upload batch schedules when online, streamlining the scheduling process.",
      "Corrected layout shifts occurring when the “not found” banner is active, maintaining layout integrity.",
    ],
    date: "July 27, 2024",
    latest: true,
  },
  {
    version: "Beta v0.7.6",
    title: "Version Love",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Alert count increase, text editor fix, schedule sync, jittery layouts, refresh songs and more.",
    changes: [
      "Updated Cloud of Worship Branding",
      "You can now duplicate Bible slides.",
      "Section to preview verses maintain scroll position of selected verse.",
      "Added new songs for your convenience. Enjoy!",
      "Fixed plausible issue with Bible version lag—might reoccur. Please report if you see this.",
      "Fixed minor bugs and issues for improved experience",
    ],
    date: "July 19, 2024",
    latest: false,
  },
  {
    version: "Beta v0.7.5",
    title: "Version Joy",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Sync slides across devices, add new hymns and more.",
    changes: [
      "You can now access all your slides and schedules from another device",
      "Have just one computer? No problem! You can now sync your slides and schedules across other devices in your tech team. Just ensure those accounts are linked to the same church.",
      "Added new hymns for your convenience. Enjoy!",
      "Fixed plausible issue with Bible version lag—might reoccur. Please report if you see this.",
      "Fixed minor bugs and issues for improved experience",
    ],
    date: "July 13, 2024",
    latest: false,
  },
  {
    version: "Beta v0.7.4",
    title: "Version Peace",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Added schedules, teams, and some fixes.",
    changes: [
      "Schedules! You can now create and manage your own schedules, and share them with your church media/tech team.",
      "Updated teams feature; you can now invite others to join your church media team and work together.",
      "Fixed issue with songs not loading",
      "New song added",
      "Fixed minor bugs and issues for improved experience",
    ],
    date: "July 6, 2024",
    latest: false,
  },
  {
    version: "Beta v0.7.3",
    title: "Version Patience",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "App fixes, layout fixes, and new songs.",
    changes: [
      "Fixed issue with layout shift",
      "New songs added",
      "New hymns added (#1343, #1344)",
      "Fixed minor bugs and issues for improved experience",
    ],
    date: "Jun 28, 2024",
    latest: false,
  },
  {
    version: "Beta v0.7.2",
    title: "Version Faith",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Added teams workflow, slide transitions, and new songs.",
    changes: [
      "Added teams; you can invite others to join your church media team and work together.",
      "Added hymn preview when searching hymns",
      "Added fade transitions between slides",
      "Added hymn preview when searching hymns",
      "New songs added",
      "Fixed minor bugs and issues for improved experience",
    ],
    date: "Jun 22, 2024",
    latest: false,
  },
  {
    version: "Beta v0.7.1",
    title: "Version Meekness",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Added offline mode, new songs, and bug fixes.",
    changes: [
      "Added online/offline status",
      "New songs added",
      "Fixed minor bugs and issues for improved experience",
    ],
    date: "Jun 15, 2024",
    latest: false,
  },
  {
    version: "Beta v0.7.0",
    title: "Version Goodness",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Full offline and PWA support, new songs, and bug fixes.",
    changes: [
      "Full offline and PWA support",
      "New and improved Bible search with filters",
      "Fixed Disappearing slide background videos",
      "New songs added",
      "Added recently opened Bible verses in “Display Bible” action",
      "Fixed minor bugs and issues for improved experience",
    ],
    date: "Jun 8, 2024",
    latest: false,
  },
  {
    version: "Beta v0.6.5",
    title: "Version Passion",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Custom images and videos, media slide controls, countdown timers, alert schedulers and more.",
    changes: [
      "You can now add your own images and videos as backgrounds for your slides.",
      "We've added support for your audio-only files for media slides. Just go ahead and create a media slide and see the customizations you can add to your media(audio) slide.",
      "You can now play, pause and restart your media files with the Media slide controls.",
      "One alert is not enough, we added an alert scheduler so you can store alerts and take any one live as you wish.",
      "This one is exciting! We added a countdown timer for your convenience. Now you can let your congregation know what how soon an event starts or finish in an exciting manner.",
      "Sharing is caring; now other people can use the songs you upload—but only if you want.",
      'We don\'t want you to ever make a mistake taking slides LIVE. So we added a two-step feature to the "Display Bible" action on the quick actions pane.',
      "Want to edit a live slide quickly, double tap the slide in the Live Output pane and make your quick adjustments ;)",
    ],
    date: "Jun 1, 2024",
    latest: false,
  },
  {
    version: "Beta v0.6.4",
    title: "Version Honesty",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Improve song search, fixed recurring downloads and a few issues.",
    changes: [
      "Added full text search for songs: you can now search by artists, the actual song lyrics or even an album name.",
      "You can now search for songs from quick actions home.",
      "Fixed: Recurring download of assets on reload.",
    ],
    date: "May 25, 2024",
    latest: false,
  },
  {
    version: "Beta v0.6.3",
    title: "Version Integrity",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Updated song data, new backgrounds, text formatting, and more.",
    changes: [
      "Updated song data",
      "Added new background images",
      "Added text formatting for font family in text slides",
      "Updated quotes formatting option for text slides",
      "Add multiple media slides in one go",
      "New and improved song search (BE heavy)",
      "Added dark mode for auth screens",
    ],
    date: "May 18, 2024",
    latest: false,
  },
  {
    version: "Beta v0.6.2",
    title: "Version Gratitude",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Added preview for Bible verses, added timestamps for media files, and more.",
    changes: [
      "Updated hymns data",
      "Added preview component to see Bible verses in a chapter",
      "Added loop settings feature for media slides (video type)",
      "Added timestamps for media files in DB",
      "Fixed issues with adding songs",
      "Fixed few issues when saving a Slide; still on the lookout for more issues here",
      "Updated signup UI, added more churches and church abbreviations",
      "Fixed fade animation between slides",
      "Added feature to increase and decrease font size of Bible, Hymn and Song slides",
      "Updated videos to cache on the browser; videos can now play without an internet connection after initial load.",
      "Added changelog modal",
    ],
    date: "May 11, 2024",
    latest: false,
  },
  {
    version: "Beta v0.6.1",
    title: "Version Compassion",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "DB Migration, song preview UI, and bug fixes",
    changes: ["DB Migration and bug fixes", "Song and hymn verse preview"],
    date: "May 7, 2024",
    latest: false,
  },
  {
    version: "Beta v0.6.0",
    title: "Version Forgiveness",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Improve song search, fixed recurring downloads and a few issues.",
    changes: [
      "Added banners/alert.",
      "Updated authentication layout UI.",
      "Fixed: Recurring download of assets on reload.",
    ],
    date: "May 4, 2024",
    latest: false,
  },
  {
    version: "Beta v0.5.9",
    title: "Version ",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Added background fill types for media slides, fixed video issue, and more.",
    changes: [
      "Added background fill types for media slides.",
      "Fixed issue with video not playing.",
      "Fixed: Adjust songcard to allow hymns",
    ],
    date: "Apr 27, 2024",
    latest: false,
  },
  {
    version: "Beta v0.5.8",
    title: "Version ",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Preview verses for song/hymn slides, fix: issue with double audio from media video",
    changes: [
      "Preview verses for song/hymn slides",
      "Fix: issue with double audio from media video",
    ],
    date: "Apr 27, 2024",
    latest: false,
  },
  {
    version: "Beta v0.5.7",
    title: "Version ",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Personal library.",
    changes: ["Personal library", "Added search to library."],
    date: "Apr 26, 2024",
    latest: false,
  },
]

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
.main-hero-img {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/hero-main.webp");
  background-size: cover;
}
.img-wrapper.one {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/browser-first.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.img-wrapper.two {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/team-workflow.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
.img-wrapper.three {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/offline-ready.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 110%;
}
.img-wrapper.four {
  background: url("https://revaise.s3.us-east-2.amazonaws.com/website/actions.webp")
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 120%;
}
</style>
