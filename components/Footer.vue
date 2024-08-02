<template>
  <div class="section footer py-[5%]">
    <div class="inner">
      <div
        class="row-one flex flex-wrap lg:flex-nowrap lg:flex justify-between mb-[5%] gap-8 lg:gap-0"
      >
        <div class="col-ctn w-[100%] lg:w-[35%]">
          <nuxt-link
            to="/"
            class="logo-ctn flex items-center gap-3 text-xl w-[250px]"
          >
            <Logo />
            <h6 class="font-bold">Cloud of Worship</h6>
          </nuxt-link>
        </div>
        <div class="col-ctn w-[45%] lg:w-[auto]">
          <h6 class="text-lg font-bold mb-4">UNIQUE FEATURES</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <nuxt-link to="/features/browser-ready" class="font-medium"
                >Browser-ready UX
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/features/offline-first" class="font-medium"
                >Offline-first experience
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/features/team-workflow" class="font-medium"
                >Team workflow
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-ctn w-[45%] lg:w-[auto]">
          <h6 class="text-lg font-bold mb-4">RESOURCES</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <a
                href="https://cloudofworshippers.featurebase.app/roadmap"
                class="font-medium"
                >Roadmap
              </a>
            </li>
            <li>
              <nuxt-link to="/changelog" class="font-medium"
                >What’s new! 💜
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-ctn w-[45%] lg:w-[auto]">
          <h6 class="text-lg font-bold mb-4">SUPPORT</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <nuxt-link to="/contact" class="font-medium"
                >Contact CoW
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="font-medium"
                >Help Center (FAQs)
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/pricing" class="font-medium">Pricing </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="row-two flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-0 lg:items-center border-t-[1px] border-gray-100 pt-[1.5rem] mt-[1.5rem] text-[0.9rem]"
      >
        <div class="col flex flex-col lg:flex-row gap-1 lg:gap-4">
          <p class="font-medium text-gray-600">
            Cloud of Worship, All Rights Reserved, 2024
          </p>
          <ul class="flex gap-4">
            <li>
              <nuxt-link to="/privacy-policy" class="font-semibold border-b"
                >Privacy Policy
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/terms-of-service" class="font-semibold border-b"
                >Terms of Service
              </nuxt-link>
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

<script setup></script>

<style scoped></style>
