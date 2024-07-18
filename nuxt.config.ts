// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-18',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/seo"],
  site: {
    url: "https://cloudofworship.com",
    name: "Cloud of Worship",
    description: "A free browser-based presentation software to craft the best on-screen experience for your church.",
    defaultLocale: "en",
  },
  css: ["@/assets/main.css"],
})