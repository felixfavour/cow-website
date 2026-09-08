<template>
  <div>
    <!-- <AnnouncementBanner /> -->
    <Navbar />
    <NuxtPage />
    <Footer />
    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
/**
 * Site-wide canonical URL, derived from the current route.
 *
 * Pages needing something other than the plain path (blog pagination, for
 * example) register their own link with `key: "canonical"`, which wins because
 * page setup runs after app.vue's.
 */
const SITE_URL = "https://cloudofworship.com"
const route = useRoute()

const canonical = computed(() => `${SITE_URL}${route.path.replace(/(.)\/+$/, "$1")}`)

useHead({
  link: [{ rel: "canonical", href: canonical, key: "canonical" }],
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
