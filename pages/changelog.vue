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
          Changelog
        </div>
        <h1 class="text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
          New updates
          <span class="emphasis-text">every week</span> <br />
          just for your church.
        </h1>
      </div>
      <div class="actions mt-[10%] md:mt-[5%] text-center">
        <a
          href="https://app.cloudofworship.com/signup"
          class="primary-btn taller w-[220px] mx-auto"
        >
          Get started for free
        </a>
        <div class="helper-text text-sm text-center pt-2">
          serving <span class="font-semibold">350+</span> churches, and
          thousands in congregation
        </div>
      </div>
    </div>

    <!-- CHANGELOG SECTION -->
    <ChangelogCard
      v-for="(changelog, index) in changelogs"
      :key="changelog.version"
      :version="changelog.version"
      :title="changelog.title"
      :description="changelog.description"
      :changes="changelog.changes"
      :date="changelog.date"
      :latest="index === 0"
      :image="changelog.image"
    />

    <!-- ABOVE FOOTER SECTION -->
    <AboveFooterSection />

    <TestimonialPopup v-if="showTestimonialPopup" />
  </div>
</template>

<script setup>
const showTestimonialPopup = ref(false)
useHead({
  title: "Changelog - updates every week - Cloud of Worship",
})
useSeoMeta({
  title: "Changelog - updates every week - Cloud of Worship",
  ogTitle: "Changelog - updates every week - Cloud of Worship",
  description:
    "Get updates every week for your church with Cloud of Worship; free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides.",
  ogDescription:
    "Get updates every week for your church with Cloud of Worship; free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides.",
  keywords:
    "cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
  ogImage: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
  ogSiteName: "Cloud of Worship",
  ogUrl: "https://cloudofworship.com/changelog",
  ogType: "website",
  ogLocale: "en_US",
  canonical: "https://cloudofworship.com/changelog",
})

const changelogs = [
  {
    version: "Beta v0.17.0",
    title: "Version Harmony",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Added text formatting improvements with new line spacing options and enhanced content editing capabilities for better presentation.",
    changes: [
      "Added line spacing/height option for slides.",
      "Updated Edit Content pane to reflect line spacing changes in real-time.",
      "Added shortcut to open settings.",
    ],
    date: "March 22, 2025",
  },
  {
    version: "Beta v0.16.0",
    title: "Version Acceleration",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Added improved Bible slide navigation, optimized live streaming performance, and enhanced system settings with new keyboard shortcuts.",
    changes: [
      "Added shortcut to open settings.",
      "Enabled opening Bible slides with book abbreviation and chapter number in Preview Content Pane.",
      "Improved Bible slide navigation with support for opening slides without adding chapter or by adding only chapter.",
      "Optimized WebSocket connections to open only when previous connection is closed.",
      "Enhanced livestream performance with refresh capability when last sync button is clicked.",
      "Fixed livestream lag and reconnection issues.",
    ],
    date: "March 16, 2025",
  },
  {
    version: "Beta v0.15.0",
    title: "Version Revelation",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Expanded Bible navigation capabilities, improved live streaming stability, and added new text size controls for better presentation flexibility.",
    changes: [
      "Added support for opening Bible slides with book abbreviation and chapter number in Preview Content Pane.",
      "Enabled opening Bible slides without adding chapter or by adding only chapter.",
      "Optimized WebSocket connection management to open only when previous connection is closed.",
      "Added refresh capability for livestream connection when last sync button is clicked.",
      "Fixed livestream lag and reconnection issues.",
      "Introduced new minimum and maximum slide text size options.",
    ],
    date: "March 2, 2025",
  },
  {
    version: "Beta v0.14.0",
    title: "Version Amplification",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Enhanced Bible navigation functionality, improved user interface stability, and added extended countdown timer capabilities.",
    changes: [
      "Fixed Bible slides next/previous navigation quirks.",
      "Added new minimum and maximum slide text size options.",
      "Fixed jumpy sidebar behavior when selecting actions.",
      "Introduced extended countdown timer for specific times.",
    ],
    date: "February 23, 2025",
  },
  {
    version: "Beta v0.13.0",
    title: "Version Ascension",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Improved user interface stability and added extended timer functionality for greater flexibility in service timing.",
    changes: [
      "Fixed jumpy sidebar when selecting actions.",
      "Added extended countdown timer for specific times.",
      "Used Broadcast Channel API to improve live output responsiveness.",
    ],
    date: "January 26, 2025",
  },
  {
    version: "Beta v0.12.1",
    title: "Version Refinement",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Performance improvements for live output response time and minor UI enhancements.",
    changes: [
      "Used Broadcast Channel API to improve live output responsiveness.",
      "Fixed application version rendering style.",
    ],
    date: "January 11, 2025",
  },
  {
    version: "Beta v0.12.0",
    title: "Version Refueling",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Updated changelog modal, added new hymns, set lettercase for slide text content, fixed slides reorder state change on reload, improved live output speed for slower computers, enhanced live output responsiveness during changes, and made general performance improvements.",
    changes: [
      "Set lettercase for slide text content.",
      "Fixed slides reorder state change on reload.",
      "Improved live output speed for slower computers.",
      "Enhanced live output responsiveness during changes.",
      "Made general performance improvements.",
      "Updated changelog modal.",
      "Added new hymns.",
      "Introduced Semantic Versioning.",
    ],
    date: "January 11, 2025",
  },
  {
    version: "Beta v0.9.7",
    title: "Version Joyful Tidings",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Slide overlays, backgrounds, and christmas updates!",
    changes: [
      "Increased the maximum number of alerts configurable in settings.",
      "Added slide overlays with a maiden type featuring falling snow.",
      "Introduced new backgrounds for Christmas and updated the background image component.",
      "Added new songs",
    ],
    date: "December 14, 2024",
  },
  {
    version: "Beta v0.9.6",
    title: "Version Communion",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Slide settings for footnotes and fix ESV version issue.",
    changes: [
      "Added slide settings to add or remove footnotes.",
      "Fixed the non-selectable default ESV version issue.",
      "Added new songs",
    ],
    date: "December 7, 2024",
  },
  {
    version: "Beta v0.9.5",
    title: "Version Victory",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Slide edge padding, window settings, and more!",
    changes: [
      "Added a feature to increase space around slide edges.",
      "Introduced elaborate and interactive window settings",
      "Minor fixes and improvements",
    ],
    date: "December 1, 2024",
  },
  {
    version: "Beta v0.9.4",
    title: "Version PUSH",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Linked default Bible version to the whole Bible search, and minor fixes.",
    changes: [
      "Linked default Bible version to the whole Bible search.",
      "Removed the login requirement from the church invite screen.",
      "Fixed a minor issue in the invite user flow.",
    ],
    date: "November 23, 2024",
  },
  {
    version: "Beta v0.9.3",
    title: "Version Tenacity",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Multiple verses per Bible slide, livestream banners, fixes, and more!",
    changes: [
      "Enabled multiple verses per Bible slide.",
      "Increased timeout and retries for WebSocket connections.",
      "Added support for uploading slide background images.",
      "Implemented alerts and banners in livestream mode.",
      "Fixed livestream to recognize new slides by default.",
    ],
    date: "November 16, 2024",
  },
  {
    version: "Beta v0.9.2",
    title: "Version Omnipresence",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Enhanced WebSocket functionality, new shortcuts, and more!",
    changes: [
      "Added & Improved WebSocket functionality to reconnect on failure and upgraded to secure WebSocket (WSS).",
      "Enhanced shortcuts to support full-screen mode.",
      "Resolved display settings issues, including support for monitors without labels.",
      "Integrated PostHog for improved user feedback and product experience.",
      "Added keyboard shortcut to switch live display slides.",
      'Introduced a new "Go Live" button with livestreaming options.',
      "Updated livestream pages to support WebSocket integration.",
    ],
    date: "November 9, 2024",
  },
  {
    version: "Beta v0.9.1",
    title: "Version Solidarity",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "One account per user, flickering backdrop, improved app-wide settings, and more!",
    changes: [
      "Enforced one church account per user",
      "Fixed flickering backdrop issue on slide change",
      "Added animation settings for slides",
      "Added app-wide setting for number of lines per slide",
      "Added storage settings, indicator including local data deletion",
      "Fixed an issue affecting offline access functionality",
      "Refined display and screen settings, including media slide background and content background fill type on Edit Content Pane",
      "Resolved an issue with a wrong error message on the /verify page",
      "Fixed a bug causing perpetual slide retrieval on schedule change",
      "Updated Bible versions download process and improved sensitive information handling",
      "Implemented auto-redirect to home page upon app update",
      "Switched to NuxtHub for better uptime in Nigeria region",
    ],
    date: "November 2, 2024",
  },
  {
    version: "Beta v0.9.0",
    title: "Version Velocity",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Introduced a live alert indicator on the control screen, shortcuts panel, undo/redo, new Bible versions, and more!",
    changes: [
      "Introduced a live alert indicator on the control screen.",
      "Added a shortcuts panel with new hotkeys for next, previous, search, and more actions.",
      "Implemented undo/redo for slides with initial issues now resolved through refinements.",
      "Resolved unnecessary redirects during church registration.",
      "Fixed issues affecting the live page functionality.",
      "Addressed a bug when saving slides with uploaded images.",
      "Enhanced the search shortcut and resolved related issues.",
      "Removed loggers and performed additional clean-up tasks.",
      "Connected the app info endpoint and fixed breaking changes.",
      "Expanded the app with new Bible versions.",
      "Made improvements to force an update page when needed.",
      "Refreshed and modified the Cloud of Worship page content.",
    ],
    date: "October 26, 2024",
  },
  {
    version: "Beta v0.8.9",
    title: "Version Forbearance",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Added new durations for countdown slides - 1 min & 2 mins, fixed issues and more!",
    changes: [
      "Added new durations for countdown slides - 1 min & 2 mins.",
      "Fixed issue when deleting multiple slides with delete all functionality.",
      "Fix issue where alert/banner restarts when slide changes.",
      "Made minor fixes and improvements",
    ],
    date: "October 19, 2024",
  },
  {
    version: "Beta v0.8.8",
    title: "Version Adoration",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Added profile settings, email verification and more!",
    changes: [
      "Added profile settings.",
      "You can now change your email address.",
      "Added compulsory email verification for new users.",
      "Fixed slides automatically being deleted when they are synced on occasions.",
      "You can now display your profile avatar!",
      "Made minor fixes and improvements",
    ],
    date: "October 12, 2024",
  },
  {
    version: "Beta v0.8.7",
    title: "Version Purpose",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Added image uploads, profile avatar, google auth and more",
    changes: [
      "You can now upload media slide images to the cloud!",
      "Enjoy improved image compression and file upload limits!",
      "You can now display your profile avatar!",
      "Sign in effortlessly with Google Authentication!",
      "Made minor fixes and changes to enhance user experience.",
    ],
    date: "October 5, 2024",
  },
  {
    version: "Beta v0.8.6",
    title: "Version Reach",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Added more native yoruba hymns, issue with duplicate background videos and more fixes.",
    changes: [
      "Fix issue with duplicate images/videos on background media selection modal.",
      "Fixed issue with slide backgrounds not loading after selecting schedule.",
      "Added 600+ native yoruba hymns",
      "Added multiple text content to help and support users on cloudofworship.com/blog",
      "Made minor fixes and changes to enhance user experience.",
    ],
    date: "September 28, 2024",
  },
  {
    version: "Beta v0.8.5",
    title: "Version Renewal",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Added more Bible versions, improved navigation, and better performance.",
    changes: [
      "Added public domain Bible versions and other improvements. (log out to enable)",
      "Added more quick actions for easier navigation.",
      "Improved access to scriptures for better performance.",
      "Convert hymn slides to song slides for song slide benefits.",
      "Implemented clear labeling and structure for app-wide actions.",
      "The schedule modal now opens on load, with various fixes.",
    ],
    date: "September 21, 2024",
  },
  {
    version: "Beta v0.8.4",
    title: "Version Moderation",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "New app settings for enhanced control, improved navigation, and updated visual elements.",
    changes: [
      "Added more app settings to give users greater control and customization options.",
      "Fixed issues with scrollable slide toolbars for smoother navigation.",
      "Added a file dropzone feature to background selection, simplifying media uploads.",
      "Resolved layout and playback issues for a more stable user experience.",
      "Updated app icons to enhance the visual appearance and branding.",
    ],
    date: "September 14, 2024",
  },
  {
    version: "Beta v0.8.3",
    title: "Version Generosity",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Better LIVE control and window management, save remote songs offline, and more.",
    changes: [
      "Better and more intuitive LIVE sessions.",
      "Added the first stage of media stream recording via NDI, introducing new streaming capabilities.",
      "Fixed various issues and made UI changes for a better user experience.",
      "Updated the schedule modal to improve its design and functionality.",
      "Added pagination for saved songs, making it easier to navigate large song lists.",
      "Enabled saving a user’s songs from other devices for seamless access across platforms.",
      "Updated the copy and style of the fullscreen prompt for improved clarity and aesthetics.",
    ],
    date: "September 7, 2024",
  },
  {
    version: "Beta v0.8.2",
    title: "Version Blessing",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Enhancements in bible search, signup improvements, and more.",
    changes: [
      "Fixed issues related to signup, improving the registration experience.",
      "Optimized asset loading for faster performance by leveraging CloudFront.",
      "Improved the Bible search functionality for more accurate and efficient results.",
      "Improved signup experience for new users.",
      "Added new songs to library.",
      "Made minor fixes and improvements.",
    ],
    date: "August 31, 2024",
  },
  {
    version: "Beta v0.8.1",
    title: "Version Promise",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Enhancements in hymns loading, Bible version settings, and media stability improvements.",
    changes: [
      "Updated the hymns loading structure to now load via API, improving data management and performance.",
      "Added a Bible version settings feature and removed versions from the initial load to streamline the startup process.",
      "Added Yoruba hymns to the hymns library.",
      "Updated the hymns to include recent changes and improvements.",
      "Fixed an issue where the user prompt schedule modal was not closing, ensuring proper functionality.",
      "Resolved an issue with reloading background videos, enhancing media stability.",
      "Added a 1-hour limit to the timer feature, providing better control over timed events.",
    ],
    date: "August 23, 2024",
  },
  {
    version: "Beta v0.8.0",
    title: "Version Defiance",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description:
      "Customizable lines per song slide, made major fixes and more.",
    changes: [
      "Added a feature to adjust the number of lines per slide for song slides, enhancing customization options.",
      "Fixed an issue with the navbar affecting the sign out process, ensuring smoother user sign outs.",
      "Resolved an issue with church signup to improve the registration flow.",
      "Fixed the problem of inactive videos playing and cleared video slide tools for better video control.",
      "Added the ability to delete media files, giving users more control over their media library.",
      "Introduced a drag-and-copy feature to simplify adding media to slides.",
    ],
    date: "August 17, 2024",
  },
  {
    version: "Beta v0.7.9",
    title: "Version Hope",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Changelog link, schedules list truncated, fixes and more.",
    changes: [
      "Added new UI features for performance benefits.",
      "Increased alert count to 5 items (copy/content).",
      "Added changelog link to modal.",
      "Fixed minor bugs and issues.",
      "Modified remote songs library.",
    ],
    date: "August 10, 2024",
  },
  {
    version: "Beta v0.7.8",
    title: "Version Perseverance",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Download progress, keyboard navigation, and more.",
    changes: [
      "Added a feature to display download percentages during the initial setup, providing users with progress feedback.",
      "Fixed issues with keyboard arrow actions in QuickActions for smoother navigation and control.",
      "Resolved problems where users remained on saved slides unintentionally.",
      "Fixed the clearing of saved slides after they have been added, ensuring they remain accessible.",
      "Fixed an issue preventing the upload of batch media slides, improving the media management workflow.",
      "Introduced the New Living Translation (NLT) Bible version, expanding scripture options for users.",
      "Fixed an issue where banner links incorrectly opened in new tabs, ensuring proper link behavior.",
      "Resolved slight issues related to banner notifications, enhancing overall user experience and reliability.",
    ],
    date: "August 3, 2024",
  },
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
  },
  {
    version: "Beta v0.6.1",
    title: "Version Compassion",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "DB Migration, song preview UI, and bug fixes",
    changes: ["DB Migration and bug fixes", "Song and hymn verse preview"],
    date: "May 7, 2024",
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
  },
  {
    version: "Beta v0.5.7",
    title: "Version ",
    image: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
    description: "Personal library.",
    changes: ["Personal library", "Added search to library."],
    date: "Apr 26, 2024",
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
