// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-18',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  head: {
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
        content: 'https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp'
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
        content: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://revaise.s3.us-east-2.amazonaws.com/cow-og.webp",
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
})