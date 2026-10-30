<template>
  <div>
    <!-- Horizon announcement paused for now; re-add <AnnouncementBanner /> to bring it back. -->
    <Navbar />
    <NuxtPage />
    <Footer :class="{ 'footer-over': route.path === '/' }" />
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
/* On the home page the footer slides up over the pinned last section: it is
   pulled up a screen into the space the page leaves for it, and is at least a
   screen tall so it covers that section completely. */
footer.footer-over {
  z-index: 3;
  margin-top: -100svh;
  min-height: 100svh;
}

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
