import {
  PhBookOpenText,
  PhBrowser,
  PhMicrophone,
  PhMonitorPlay,
  PhMusicNotes,
  PhUsersThree,
  PhWifiSlash,
} from "@phosphor-icons/vue"

/**
 * One entry per /features page. The pages are all drawn by FeaturePage.vue,
 * so a new feature is a new entry here and a three-line page file.
 *
 * Copy rules: short, plain words, and only claims the product (or the Help
 * Center) already makes. In `poster` lines, a word wrapped in *stars* is set
 * thin, the rest heavy (one word per star pair).
 */

export type FeatureFaq = { question: string; answer: string }

export type Feature = {
  slug: string
  /** Key in utils/ogCards.ts */
  ogCard: string
  /** utm_medium on the sign-up link */
  utm: string
  name: string
  icon: any
  /** Pastel from the system: sky, butter, coral wash, mint. */
  tint: string
  /** Which illustration FeatureArt draws */
  art: string
  imageAlt: string
  headline: [string, string]
  lede: string
  facts: { value: string; label: string }[]
  momentsTitle: [string, string]
  moments: {
    time: string
    title: string
    body: string
    link?: { label: string; href: string }
  }[]
  poster: string[]
  faqs: FeatureFaq[]
  seoTitle: string
  description: string
}

export const features: Record<string, Feature> = {
  bibleVerses: {
    slug: "bible-verses",
    ogCard: "bibleVerses",
    utm: "bible_verses",
    name: "Bible & scripture",
    icon: PhBookOpenText,
    tint: "#E2F0FF",
    art: "bible",
    imageAlt: "Searching Genesis 1:1 and projecting it live in Cloud of Worship",
    headline: ["Put scripture on screen", "in seconds"],
    lede: "Type \"Gen 1 1\" and the verse is ready to project. Every translation works offline.",
    facts: [
      { value: "Gen 1 1", label: "Type it the way you would say it out loud" },
      { value: "Offline", label: "Full text of every translation on the device" },
      { value: "Free", label: "On the Starter plan, no card needed" },
    ],
    momentsTitle: ["Sunday morning,", "with scripture ready"],
    moments: [
      {
        time: "9:30 AM",
        title: "Line up the passages",
        body: "Add the readings to your schedule ahead of time. Long passages split into readable slides on their own.",
      },
      {
        time: "10:42 AM",
        title: "The preacher says it",
        body: 'The scripture toolbar takes a reference the way you would say it. "Gen 1 1", "john 3:16". No dropdowns, no scrolling through books.',
      },
      {
        time: "10:43 AM",
        title: "The Wi-Fi drops. Nobody notices.",
        body: "Every included translation is stored on the device, so lookup, search and projection keep working.",
        link: { label: "How offline works", href: "/features/offline-first" },
      },
    ],
    poster: ["Find the verse *before*", "he finishes."],
    faqs: [
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
    ],
    seoTitle: "Bible Verse Projection Software for Churches - Cloud of Worship",
    description:
      "Project Bible verses on screen in seconds. Type a reference, search the full text of scripture, and switch translations live. Works offline. Free to start.",
  },

  songLyrics: {
    slug: "song-lyrics",
    ogCard: "songLyrics",
    utm: "song_lyrics",
    name: "Songs & hymns",
    icon: PhMusicNotes,
    tint: "#FDEFD4",
    art: "songs",
    imageAlt: "Song lyrics on the operator screen with a verse and chorus ready to jump to",
    headline: ["Every lyric ready", "before the band is"],
    lede: "3,000+ hymns offline, 15,000+ shared songs, and your own lyrics typed once.",
    facts: [
      { value: "3,000+", label: "Hymns stored offline on the device" },
      { value: "15,000+", label: "Songs shared by other churches" },
      { value: "Free", label: "Add your own lyrics on every plan" },
    ],
    momentsTitle: ["Sunday morning,", "with every lyric ready"],
    moments: [
      {
        time: "9:15 AM",
        title: "Search once, add to the schedule",
        body: "Search the song by name and add it to your service. Most of what your team sings is already typed up.",
      },
      {
        time: "10:05 AM",
        title: "The leader goes back to the chorus",
        body: "Sunday never follows the setlist. Jump straight to any verse, the chorus or the bridge while the song is live, so nobody reads the wrong line.",
      },
      {
        time: "Any day",
        title: "Your own song, typed once",
        body: "Save your lyrics to the library and they are one search away for every future service.",
      },
    ],
    poster: ["Back *to* the", "chorus."],
    faqs: [
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
          "Yes. There is access to a growing library of more than 15,000 songs added by other churches, so most of what your team sings is already typed up.",
      },
    ],
    seoTitle: "Song Lyrics & Hymn Projection Software | Cloud of Worship",
    description:
      "Project song lyrics and hymns on screen. Over 3,000 hymns offline, 15,000+ shared songs, and jump to any verse or chorus mid song. Free to start.",
  },

  liveProjection: {
    slug: "live-projection",
    ogCard: "liveProjection",
    utm: "live_projection",
    name: "Live projection",
    icon: PhMonitorPlay,
    tint: "#E3F5E9",
    art: "projection",
    imageAlt: "The operator screen beside the projector output in Cloud of Worship",
    headline: ["What you choose is", "what they see"],
    lede: "Controls stay on your screen. Only the slide you send reaches the projector.",
    facts: [
      { value: "2", label: "Screens, one source of truth" },
      { value: "0", label: "Menus or cursors on the projector" },
      { value: "Phone", label: "As a remote, from the front row" },
    ],
    momentsTitle: ["Sunday morning,", "on two screens"],
    moments: [
      {
        time: "9:50 AM",
        title: "Drag it to the projector",
        body: "Open the live output window, drag it onto the second monitor and make it full screen.",
        link: { label: "Get the desktop app", href: "/download" },
      },
      {
        time: "10:00 AM",
        title: "Only the slide goes out",
        body: "The projection window holds nothing but the slide. The congregation never sees a menu, a cursor or a half finished edit.",
      },
      {
        time: "10:30 AM",
        title: "Run it from anywhere in the room",
        body: "Connect a phone or tablet as a remote and advance slides from the front row or the sound desk. OBS can capture the same output as a window source for your livestream.",
      },
    ],
    poster: ["Send *only* what", "they should see."],
    faqs: [
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
    ],
    seoTitle: "Dual Screen Church Projection Software | Cloud of Worship",
    description:
      "Run your service on two screens: controls stay on your laptop, only the slide you send reaches the projector, and OBS can capture the output for your livestream.",
  },

  liveTranscription: {
    slug: "live-transcription",
    ogCard: "liveTranscription",
    utm: "live_transcription",
    name: "Live transcription",
    icon: PhMicrophone,
    tint: "#FFE9E8",
    art: "transcription",
    imageAlt: "Sermon transcription detecting a Bible reference and projecting it in Cloud of Worship",
    headline: ["Every sermon, summed up", "before anyone leaves"],
    lede: "A clean summary of every sermon, with Bible references spotted along the way.",
    facts: [
      { value: "Summary", label: "Of every sermon, as nuggets you can keep" },
      { value: "Optional", label: "Bible references and voice commands" },
      { value: "You decide", label: "Nothing reaches the projector unless you send it" },
    ],
    momentsTitle: ["Sunday morning,", "while the sermon runs"],
    moments: [
      {
        time: "10:15 AM",
        title: "The preacher begins",
        body: "It listens through a microphone the software can hear the preacher through. Nothing to type.",
      },
      {
        time: "10:35 AM",
        title: "A reference is named",
        body: "It can flag the Bible references the preacher names. They show up as suggestions beside your schedule, and the operator decides what goes live.",
        link: { label: "See Bible projection", href: "/features/bible-verses" },
      },
      {
        time: "11:05 AM",
        title: "Amen. The summary is ready.",
        body: "A summary of what was actually said, gathered into nuggets your church can keep, revisit and share with people who were not in the room.",
      },
    ],
    poster: ["Sunday's *words,*", "kept."],
    faqs: [
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
    ],
    seoTitle: "Sermon Summaries & Live Transcription - Cloud of Worship",
    description:
      "Cloud of Worship transcribes the sermon and turns it into a summary of nuggets your church can keep, while spotting Bible references and taking voice commands.",
  },

  browserReady: {
    slug: "browser-ready",
    ogCard: "browserReady",
    utm: "browser_ready",
    name: "Browser-ready",
    icon: PhBrowser,
    tint: "#E2F0FF",
    art: "browser",
    imageAlt: "Cloud of Worship running in a web browser",
    headline: ["No installations.", "Just start projecting."],
    lede: "Open a browser and your worship presentation is ready. Nothing to download.",
    facts: [
      { value: "0", label: "Installs needed to start" },
      { value: "Any", label: "Windows, Mac, Linux or tablet" },
      { value: "Instant", label: "Updates, with nothing to download" },
    ],
    momentsTitle: ["Sunday morning,", "from a browser tab"],
    moments: [
      {
        time: "9:00 AM",
        title: "Open a tab",
        body: "Go to app.cloudofworship.com on any computer and sign in. Your schedules, songs and settings are already there.",
      },
      {
        time: "9:05 AM",
        title: "Install it, if you like",
        body: "In Chrome or Edge, use the install icon in the address bar. It opens in its own window, and CoW Live opens fullscreen, ideal for the projection machine.",
      },
      {
        time: "Later",
        title: "Want more? There is a Windows app",
        body: "The desktop app adds native windows, NDI output for your livestream and background updates. Same account, same schedules.",
        link: { label: "Download for Windows", href: "/download" },
      },
    ],
    poster: ["Just *one* tab,", "and you're ready."],
    faqs: [
      {
        question: "Do I need to install anything?",
        answer:
          "No. Open app.cloudofworship.com in a browser on Windows, Mac, Linux or a tablet, sign in, and start projecting.",
      },
      {
        question: "Can I install it like an app?",
        answer:
          "Yes. In Chrome or Edge use the install icon in the address bar. On Safari and iOS use Share, then Add to Home Screen. It then opens in its own window without browser chrome.",
      },
      {
        question: "How do updates work?",
        answer:
          "Because it is a web app, updating is instant. When a new version is out you get an update prompt, and there is nothing to download and reinstall.",
      },
      {
        question: "Is there a desktop app too?",
        answer:
          "Yes, for Windows. It adds native windows, NDI output and background updates. Everything else works the same in the browser.",
      },
    ],
    seoTitle: "Browser-Based Church Presentation Software | Cloud of Worship",
    description:
      "Run lyrics, scripture and slides from any web browser on Windows, Mac, Linux or a tablet. No install, no licence keys. Free to start with Cloud of Worship.",
  },

  offlineFirst: {
    slug: "offline-first",
    ogCard: "offlineFirst",
    utm: "offline_first",
    name: "Offline-first",
    icon: PhWifiSlash,
    tint: "#E3F5E9",
    art: "offline",
    imageAlt: "A You are offline notice in Cloud of Worship saying your work will be saved",
    headline: ["Keep going when", "the Wi-Fi drops"],
    lede: "Schedule, Bibles and hymns work offline, and changes sync when you're back.",
    facts: [
      { value: "Offline", label: "Schedule, Bibles, hymns and saved songs" },
      { value: "Auto", label: "Changes upload when you reconnect" },
      { value: "Nothing", label: "Is lost when the connection drops" },
    ],
    momentsTitle: ["Sunday morning,", "when the Wi-Fi goes"],
    moments: [
      {
        time: "10:08 AM",
        title: "The connection drops",
        body: 'A "You are offline" notice appears. Click Ok, got it and carry on. Nothing is lost.',
      },
      {
        time: "10:09 AM",
        title: "The service keeps running",
        body: "The slides in your schedule, the live display and the arrow keys keep working. So do Bible verses, hymns and the songs you have saved.",
      },
      {
        time: "10:40 AM",
        title: "Back online, all synced",
        body: "New slides and edits were saved on the device. They upload on their own when the connection returns.",
        link: { label: "Read the offline guide", href: "/docs/settings-and-shortcuts/offline-use" },
      },
    ],
    poster: ["Wi-Fi *drops.*", "Still, all is well."],
    faqs: [
      {
        question: "What keeps working offline?",
        answer:
          "Running the service from your schedule, the live display, Bible verses for every translation you have saved, hymn lookup, songs you have already saved, and creating or editing slides. Backgrounds and media already downloaded to the device work too.",
      },
      {
        question: "What needs a connection?",
        answer:
          "Searching the shared online song catalogue, media that has not been downloaded yet, YouTube and Vimeo embeds, sermon transcription, and seeing teammates' changes.",
      },
      {
        question: "How do I get ready before Sunday?",
        answer:
          "Save your Bible translations in Settings, and open the schedule on the media computer while you are online so videos and large images download. For the most dependable setup on Windows, use the desktop app.",
      },
      {
        question: "Will my changes be lost?",
        answer:
          "No. Changes made offline are saved on the device and uploaded automatically when you reconnect.",
      },
    ],
    seoTitle: "Offline Church Presentation Software | Cloud of Worship",
    description:
      "Keep projecting when the church Wi-Fi drops. Bibles, hymns and your schedule work offline, and changes sync when you reconnect. Free to start.",
  },

  teamWorkflow: {
    slug: "team-workflow",
    ogCard: "teamWorkflow",
    utm: "team_workflow",
    name: "Team workflow",
    icon: PhUsersThree,
    tint: "#FDEFD4",
    art: "team",
    imageAlt: "Teammates working on the same Cloud of Worship schedule at once",
    headline: ["Prepare Sunday's", "slides together"],
    lede: "Build Sunday's slides together in real time, with slide locking so nobody overwrites.",
    facts: [
      { value: "Live", label: "Changes appear on each other's screens" },
      { value: "Locked", label: "While someone edits a slide, it is theirs" },
      { value: "1 link", label: "To invite your team" },
    ],
    momentsTitle: ["The week before,", "as a team"],
    moments: [
      {
        time: "Thu",
        title: "Songs, from home",
        body: "The worship leader adds the songs to the schedule from their own computer. Everyone else sees them appear.",
      },
      {
        time: "Sat",
        title: "Announcements, without collisions",
        body: "Two people can work on the same schedule. Slide locking stops one edit overwriting another.",
      },
      {
        time: "Sun",
        title: "One person runs the screen",
        body: "Taking a slide live stays on the media computer. A teammate at home clicking a slide never changes what the congregation sees.",
        link: { label: "How teams work", href: "/docs/teams-and-collaboration/working-as-a-team" },
      },
    ],
    poster: ["Many *contributors.*", "One congregation."],
    faqs: [
      {
        question: "Can a teammate change what is on the projector?",
        answer:
          "No, except you allow it. Taking a slide live is local to the device that owns the live window, so a teammate clicking a slide from home does not move your congregation's screen. The one exception is a phone you choose to let drive that computer's output.",
      },
      {
        question: "Will I see what my team changes?",
        answer:
          "Yes. Slide changes appear on your screen as they are made, with a short notice naming who added or deleted what.",
      },
      {
        question: "How do I invite my team?",
        answer:
          "Click Invite in the top bar. Enter email addresses, or copy an invite link and share it. Inviting people to the workspace is part of the Teams plan.",
      },
      {
        question: "What if two people edit the same slide?",
        answer:
          "Slide locking stops one person overwriting another while a slide is being edited.",
      },
    ],
    seoTitle: "Church Media Team Collaboration Software | Cloud of Worship",
    description:
      "Prepare Sunday's slides together in real time from different computers: lyrics, scripture and announcements, with slide locking so nobody overwrites anyone.",
  },
}
