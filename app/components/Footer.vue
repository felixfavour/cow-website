<template>
  <div class="section footer py-[5%]">
    <div class="inner">
      <div
        class="row-one flex flex-wrap lg:flex-nowrap lg:flex justify-between mb-[5%] gap-8 lg:gap-0"
      >
        <div class="col-ctn w-[100%] lg:w-[35%]">
          <a href="/" class="logo-ctn flex items-center gap-3 text-xl w-[250px]">
            <Logo />
            <h6 class="font-bold">Cloud of Worship</h6>
          </a>
        </div>
        <div class="col-ctn w-[45%] lg:w-[auto]">
          <h6 class="text-lg font-bold mb-4">UNIQUE FEATURES</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <a href="/features/browser-ready" class="font-medium"
                :class="{ active: isActive('/features/browser-ready') }"
                >Browser-ready UX
              </a>
            </li>
            <li>
              <a href="/features/offline-first" class="font-medium"
                :class="{ active: isActive('/features/offline-first') }"
                >Offline-first experience
              </a>
            </li>
            <li>
              <a href="/features/team-workflow" class="font-medium"
                :class="{ active: isActive('/features/team-workflow') }"
                >Team workflow
              </a>
            </li>
          </ul>
        </div>
        <div class="col-ctn w-[45%] lg:w-[auto]">
          <h6 class="text-lg font-bold mb-4">RESOURCES</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <a href="/blog" class="font-medium"
                :class="{ active: isActive('/blog') }">Blog & Guides </a>
            </li>
            <li>
              <a
                href="https://cloudofworshippers.featurebase.app/roadmap"
                class="font-medium"
                >Roadmap
              </a>
            </li>
            <li>
              <a href="/changelog" class="font-medium"
                :class="{ active: isActive('/changelog') }"
                >What’s new! 💜
              </a>
            </li>
          </ul>
        </div>
        <div class="col-ctn w-[45%] lg:w-[auto]">
          <h6 class="text-lg font-bold mb-4">SUPPORT</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <a href="/contact" class="font-medium"
                :class="{ active: isActive('/contact') }"
                >Contact CoW
              </a>
            </li>
            <li>
              <a href="/docs" class="font-medium"
                :class="{ active: isActive('/docs') }">Help Center </a>
            </li>
            <li>
              <a
                href="https://chat.whatsapp.com/DeQX11igCSU6YaOoTqY7GY"
                class="font-medium"
                >Join our Community
              </a>
            </li>
            <li>
              <a href="/pricing" class="font-medium"
                :class="{ active: isActive('/pricing') }">Pricing </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="row-two flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-0 lg:items-center border-t-[1px] border-gray-100 pt-[1.5rem] mt-[1.5rem] text-[0.9rem]"
      >
        <div class="col flex flex-col lg:flex-row gap-1 lg:gap-4">
          <p class="font-medium text-gray-600">
            &copy; CoW Labs, All Rights Reserved, {{ new Date().getFullYear() }}
          </p>
          <ul class="flex gap-4">
            <li>
              <a href="/privacy-policy" class="font-semibold border-b"
                :class="{ active: isActive('/privacy-policy') }"
                >Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" class="font-semibold border-b"
                :class="{ active: isActive('/terms-of-service') }"
                >Terms of Service
              </a>
            </li>
            <li>
              <button
                type="button"
                class="font-semibold border-b text-left"
                @click="reopen"
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
        <div class="col">
          <a
            href="mailto:hello@cloudofworship.com"
            class="font-semibold border-b"
          >
            hello@cloudofworship.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { reopen } = useCookieConsent()
const route = useRoute()

// Anchors don't get router-link-active, so mark the current page here.
const isActive = (path) => route.path === path || route.path.startsWith(path + "/")
</script>

<style scoped>
a.active {
  color: var(--primary-color);
  font-weight: 600;
}
</style>
