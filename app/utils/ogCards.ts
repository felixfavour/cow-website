/**
 * Social card manifest — the single source of truth for every generated OG image.
 *
 * The PNGs are generated LOCALLY and committed to public/images/og/. Nothing is
 * rendered on the server at request time. After editing this file (or the card
 * template at app/components/OgImage/Default.takumi.vue), regenerate with:
 *
 *   yarn og:generate
 *
 * ...and commit the changed images alongside the code change.
 */
export interface OgCard {
  /** Output filename, without extension, under public/images/og/. */
  file: string
  eyebrow?: string
  accent?: string
  title: string
  subtitle?: string
}

export const OG_CARDS = {
  home: { file: "home", accent: "Your church's", title: "presentation software, right in the browser." },
  pricing: { file: "pricing", eyebrow: "Pricing", accent: "Free forever", title: "for one operator. Teams when you grow." },
  contact: { file: "contact", eyebrow: "Contact", accent: "Talk to us.", title: "We reply to every church that writes in." },
  wallOfLove: { file: "wall-of-love", eyebrow: "Wall of Love", accent: "What churches say", title: "after moving their Sunday to Cloud of Worship." },
  changelog: { file: "changelog", eyebrow: "Changelog", accent: "Every release,", title: "every fix, shipped in the open." },
  privacy: { file: "privacy-policy", eyebrow: "Legal", accent: "Privacy Policy.", title: "How we handle your church's data." },
  terms: { file: "terms-of-service", eyebrow: "Legal", accent: "Terms of Service.", title: "The agreement behind your account." },

  // Section cards. Docs articles and cover-less blog posts share these rather
  // than getting one image each, to keep the repo small.
  docs: { file: "docs", eyebrow: "Help Center", accent: "Guides, shortcuts", title: "and answers for your tech team." },
  blog: { file: "blog", eyebrow: "Blog", accent: "Guides and stories", title: "for the people who run church services." },

  // Served from app.cloudofworship.com (the operator app repo), not this site.
  // Regenerated here so the card template stays in one place; copy the output
  // to that repo's public/images/og/ after running yarn og:generate.
  app: {
    file: "app",
    title: "Prepare once, use everywhere",
    subtitle: "Scriptures. Songs. Slides. Sermons - everything",
  },

  download: { file: "download", eyebrow: "Desktop app", accent: "Download for Windows.", title: "Native projection, NDI output, automatic updates." },

  browserReady: { file: "features-browser-ready", eyebrow: "Feature", accent: "No install.", title: "Run your whole service from the browser." },
  offlineFirst: { file: "features-offline-first", eyebrow: "Feature", accent: "Works offline.", title: "Keep presenting when the wifi drops." },
  teamWorkflow: { file: "features-team-workflow", eyebrow: "Feature", accent: "Build the service together,", title: "long before Sunday morning." },
  bibleVerses: { file: "features-bible-verses", eyebrow: "Feature", accent: "Every verse,", title: "on screen in seconds." },
  liveProjection: { file: "features-live-projection", eyebrow: "Feature", accent: "One click to the screen.", title: "Live projection your team can trust." },
  liveTranscription: { file: "features-live-transcription", eyebrow: "Feature", accent: "Live captions,", title: "generated as your pastor speaks." },
  songLyrics: { file: "features-song-lyrics", eyebrow: "Feature", accent: "Song lyrics", title: "cued up before the band starts." },
} as const satisfies Record<string, OgCard>

export type OgCardKey = keyof typeof OG_CARDS
