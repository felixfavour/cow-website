<template>
  <Transition name="consent">
    <div
      v-if="shouldAsk"
      class="cookie-consent fixed bottom-0 right-0 z-[60] p-4 md:p-6 w-full md:w-auto"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div
        class="ml-auto w-full md:w-[380px] bg-white border border-gray-200 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-5 flex items-center gap-4"
      >
        <div class="texts flex-1">
          <h6 id="cookie-consent-title" class="font-bold text-base mb-1">
            Cookies on Cloud of Worship
          </h6>
          <p
            id="cookie-consent-description"
            class="text-sm text-gray-600 leading-relaxed"
          >
            We use cookies for attribution, so we know what's working. By
            continuing to use this site, you accept that.
          </p>
        </div>
        <button
          type="button"
          class="btn-accept font-semibold text-sm px-5 py-3 rounded-lg text-white transition-opacity hover:opacity-90 shrink-0"
          @click="dismiss"
        >
          Got it
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { shouldAsk, dismiss } = useCookieConsent()
</script>

<style scoped>
.btn-accept {
  background-color: var(--primary-color);
}

.policy-link {
  color: var(--primary-color);
  font-weight: 600;
  border-bottom: 1px solid var(--primary-color);
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
