<template>
  <div class="announcement-banner bg-[#FF6F65] text-white py-3 px-4 text-center sticky top-0 z-20">
    <div class="inner">
      <a 
        :href="announcementUrl"
        class="flex items-center justify-center gap-2 text-sm md:text-base font-medium hover:underline hover:opacity-90 transition-opacity"
      >
        <span>📢 Cloud of Worship is evolving! Learn what's changing</span>
        <span class="text-xs md:text-sm">→</span>
      </a>
    </div>
  </div>
</template>

<script setup>
const announcementUrl = 'https://www.cloudofworship.com/blog/cloud-of-worship-is-evolving-heres-whats-changing'
</script>
