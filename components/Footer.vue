<template>
  <div class="section footer py-[5%]">
    <div class="inner">
      <div class="row-one flex justify-between mb-[5%]">
        <div class="col-ctn w-[35%]">
          <div class="logo-ctn flex items-center gap-3 text-xl w-[250px]">
            <Logo />
            <h6 class="font-bold">Cloud of Worship</h6>
          </div>
        </div>
        <div class="col-ctn">
          <h6 class="text-lg font-bold mb-4">UNIQUE FEATURES</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <nuxt-link to="/" class="font-medium"
                >Browser-ready UX
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="font-medium"
                >Offline-first experience
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="font-medium">Team workflow </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-ctn">
          <h6 class="text-lg font-bold mb-4">RESOURCES</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <nuxt-link to="/" class="font-medium">Roadmap </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="font-medium">What’s new! 💜 </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-ctn">
          <h6 class="text-lg font-bold mb-4">SUPPORT</h6>
          <ul class="flex gap-3 flex-col">
            <li>
              <nuxt-link to="/" class="font-medium">Contact CoW </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="font-medium"
                >Help Center (FAQs)
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="font-medium">Partner </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="row-two flex justify-between items-center border-t-[1px] border-gray-100 pt-[1.5rem] mt-[1.5rem] text-[0.9rem]"
      >
        <div class="col flex gap-4">
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
