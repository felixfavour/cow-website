<template>
  <div class="announcement-banner bg-[#FF6F65] text-white py-3 px-4 text-center relative">
    <div class="inner flex items-center justify-center">
      <p class="text-sm md:text-base font-medium">
        After 2 years we know, we can tell what the future of church projection looks like.
        <a
          :href="announcementUrl"
          target="_blank"
          rel="noopener"
          class="underline underline-offset-2 whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Register for Horizon →
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
const announcementUrl = 'https://luma.com/yerxbo0d'
</script>
