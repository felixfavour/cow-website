<template>
  <Transition name="consent">
    <div
      v-if="shouldAsk"
      class="cookie-consent fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div
        class="mx-auto max-w-[880px] bg-white border border-gray-200 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
      >
        <div class="texts flex-1">
          <h6 id="cookie-consent-title" class="font-bold text-base mb-1">
            Cookies on Cloud of Worship
          </h6>
          <p
            id="cookie-consent-description"
            class="text-sm text-gray-600 leading-relaxed"
          >
            We use cookies to run this site. With your permission, we also use
            analytics cookies to see how it is used. You can change this anytime
            from the footer.
          </p>
        </div>
        <div
          class="actions flex flex-col-reverse sm:flex-row gap-3 md:shrink-0 w-full md:w-auto"
        >
          <button
            type="button"
            class="btn-reject font-semibold text-sm px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors w-full sm:w-auto"
            @click="reject"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            class="btn-accept font-semibold text-sm px-5 py-3 rounded-lg text-white transition-opacity hover:opacity-90 w-full sm:w-auto"
            @click="accept"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { shouldAsk, accept, reject } = useCookieConsent()
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
