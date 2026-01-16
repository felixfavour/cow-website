<template>
  <div v-if="!isDismissed" class="announcement-banner bg-[#FF6F65] text-white py-3 px-4 text-center relative">
    <div class="inner flex items-center justify-center">
      <a 
        :href="announcementUrl"
        class="flex items-center justify-center gap-2 text-sm md:text-base font-medium hover:underline hover:opacity-90 transition-opacity"
      >
        <span>📢 Cloud of Worship is evolving! Learn what's changing</span>
        <span class="text-xs md:text-sm">→</span>
      </a>
      <button
        @click="dismissBanner"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
        aria-label="Close announcement"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
const announcementUrl = 'https://www.cloudofworship.com/blog/cloud-of-worship-is-evolving-heres-whats-changing'
const isDismissed = ref(false)

onMounted(() => {
  // Check if banner was dismissed in this session
  isDismissed.value = sessionStorage.getItem('announcementDismissed') === 'true'
})

const dismissBanner = () => {
  isDismissed.value = true
  sessionStorage.setItem('announcementDismissed', 'true')
}
</script>
