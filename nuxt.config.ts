// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-gtag",
    '@nuxt/content',
  ],
  head: {
    charset: "utf-8",
    htmlAttrs: {
      lang: "en",
    },
    lang: "en",
    viewport: "initial-scale=1",
    title: "Cloud of Worship - Presentation software for your growing church",
    meta: [
      {
        name: "description",
        content:
          "Display song lyrics, scriptures, videos and fully customizable slides for your growing church all on the web.",
      },
      {
        name: "keywords",
        content:
          "cloud of worship, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, cloud of worship app, cloud of worship website, cloud of worship software, cloud of worship online, cloud of worship free, cloud of worship download, cloud of worship chrome extension, cloud of worship extension, cloud of worship chrome, easy worship, propresenter, presenter, freeshow, powerpoint, google slides, CoW",
      },
      {
        name: 'og:image',
        content: 'https://cloudofworship.com/images/cow-og-image.jpeg'
      },
      { name: "format-detection", content: "telephone=no" },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og-url",
        name: "og:url",
        content: "https://cloudofworship.com",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://cloudofworship.com/images/cow-og-image.jpeg",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://cloudofworship.com/images/cow-og-image.jpeg",
      },
      {
        hid: "twitter:domain",
        name: "twitter:domain",
        content: "cloudofworship.com",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "Display song lyrics, scriptures, videos and fully customizable slides for your growing church all on the web.",
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: "https://cloudofworship.com",
      },
    ]
  },
  css: ["@/assets/main.css"],
  gtag: {
    id: 'G-SPPLWBL283'
  },
  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',

    // Git repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'cloudofworship', // your GitHub/GitLab username or organization
      repo: 'cow-website', // your repository name
      branch: 'main', // the branch to commit to (default: main)
    }
  },
  // nitro: {
  //   prerender: {
  //     // Pre-render the homepage
  //     routes: ['/'],
  //     // Then crawl all the links on the page
  //     crawlLinks: true
  //   }
  // },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
