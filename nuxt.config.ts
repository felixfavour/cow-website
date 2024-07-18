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
        content: 'https://firebasestorage.googleapis.com/v0/b/favour-portfolio.appspot.com/o/cow-og.webp?alt=media&token=73072d61-418e-4eb2-8739-5f45ca9273a0'
      }
    ]
  },
  css: ["@/assets/main.css"],
})