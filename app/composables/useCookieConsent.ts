/**
 * Analytics notice state for the marketing site.
 *
 * Google Analytics and PostHog always run, for attribution — this is not a
 * consent gate. The banner (components/CookieConsent.vue) just lets a
 * visitor know once. The acknowledgement is kept in localStorage and
 * stamped with NOTICE_VERSION, so bumping that version shows it again after
 * a material change to what it says.
 */

interface StoredNotice {
  seenAt: string
  version: string
}

const STORAGE_KEY = "cow:cookie-notice"

/** Bump when the notice's wording changes materially enough to re-show it. */
const NOTICE_VERSION = "2026-09-23"

/** Analytics is pointless locally, and it kept the old per-page gtag guards honest. */
const isLocalHost = () =>
  location.hostname === "localhost" || location.hostname === "127.0.0.1"

/** Reads survive private windows and blocked-storage settings by failing quiet. */
const readSeen = (): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw) as StoredNotice
    return parsed?.version === NOTICE_VERSION
  } catch {
    return false
  }
}

const writeSeen = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        seenAt: new Date().toISOString(),
        version: NOTICE_VERSION,
      } satisfies StoredNotice)
    )
  } catch {
    // Storage unavailable, so the notice will just show again next visit.
  }
}

export const useCookieConsent = () => {
  // Guards against rendering the banner during SSR/hydration, before we know.
  const resolved = useState<boolean>("cookie-notice-resolved", () => false)
  const seen = useState<boolean>("cookie-notice-seen", () => false)
  // Lets the footer re-open the banner after it's been dismissed.
  const reopened = useState<boolean>("cookie-notice-reopened", () => false)

  const analyticsStarted = useState<boolean>("cookie-notice-analytics", () => false)

  const startAnalytics = () => {
    if (import.meta.server || analyticsStarted.value || isLocalHost()) return

    const { gtag, initialize } = useGtag()
    initialize()
    gtag("consent", "update", { analytics_storage: "granted" })

    const config = useRuntimeConfig().public
    // Loaded dynamically to keep it out of the main bundle, not to gate it.
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(config.posthogPublicKey, {
        api_host: config.posthogHost,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
        // Session recording is opted in at the project level, so it must be
        // switched off explicitly here or it starts by default.
        disable_session_recording: true,
      })
    })

    analyticsStarted.value = true
  }

  /** Called once on app start: always starts analytics, and shows the notice if unseen. */
  const restore = () => {
    if (import.meta.server) return
    seen.value = readSeen()
    resolved.value = true
    startAnalytics()
  }

  const dismiss = () => {
    seen.value = true
    reopened.value = false
    writeSeen()
  }

  /** Footer entry point, so a visitor can re-read the notice any time. */
  const reopen = () => {
    reopened.value = true
  }

  const shouldAsk = computed(
    () => resolved.value && (!seen.value || reopened.value)
  )

  return {
    shouldAsk,
    dismiss,
    reopen,
    restore,
  }
}
