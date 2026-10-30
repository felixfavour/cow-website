<template>
  <Transition name="consent">
    <div
      v-if="mounted && shouldAsk"
      class="cookie-consent fixed bottom-0 right-0 z-[60] p-4 md:p-6 w-full md:w-auto"
      role="dialog"
      aria-modal="false"
      aria-label="Cookies"
      aria-describedby="cookie-consent-description"
    >
      <div class="consent-card ml-auto w-full md:w-[384px] rounded-[20px] px-6 pt-5 pb-6">
        <p
          id="cookie-consent-description"
          class="text-[16px] leading-[1.35] text-[#1A1F2E]"
        >
          We keep a few cookies around. They help us see what’s working, so this
          site runs as smoothly as your Sunday service should.
        </p>
        <button type="button" class="pill-btn mt-5" @click="dismiss">
          That’s Okay
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { shouldAsk, dismiss } = useCookieConsent()

// The prerendered page can't know whether this visitor has answered, so it
// leaves the banner out. Asking only once mounted keeps hydration matching the
// server's HTML, and lets the banner slide in rather than appear already there.
const mounted = ref(false)
onMounted(() => (mounted.value = true))
</script>

<style scoped>
/* Soft lavender, lighter at the top left, as in the design. */
.consent-card {
  background: linear-gradient(135deg, #fbf8ff 0%, #f1e6fd 55%, #e6d2fa 100%);
  box-shadow:
    inset 0 0 0 1px rgba(138, 65, 201, 0.08),
    0 12px 40px rgba(76, 29, 149, 0.14);
}

.consent-enter-active,
.consent-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.consent-enter-from,
.consent-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  .consent-enter-active,
  .consent-leave-active {
    transition: none;
  }
}
</style>
