/**
 * Applies a previously stored cookie decision as early as possible, so a
 * returning visitor who accepted gets analytics without seeing the banner
 * again, and one who declined never loads it.
 */
export default defineNuxtPlugin(() => {
  useCookieConsent().restore()
})
