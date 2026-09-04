/**
 * Cookie consent state for the marketing site.
 *
 * Non-essential storage (Google Analytics) stays off until the visitor
 * explicitly accepts. The decision is kept in localStorage and stamped with
 * POLICY_VERSION, so bumping that version re-asks everyone after a material
 * change to the privacy policy.
 */

export type ConsentStatus = "granted" | "denied"

interface StoredConsent {
  status: ConsentStatus
  version: string
  decidedAt: string
}

const STORAGE_KEY = "cow:cookie-consent"

/** Bump when the policy changes materially enough to warrant re-asking. */
const POLICY_VERSION = "2026-09-04"

/** Analytics is pointless locally, and it kept the old per-page gtag guards honest. */
const isLocalHost = () =>
  location.hostname === "localhost" || location.hostname === "127.0.0.1"

/** Reads survive private windows and blocked-storage settings by failing quiet. */
const readStored = (): StoredConsent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed?.version !== POLICY_VERSION) return null
    if (parsed?.status !== "granted" && parsed?.status !== "denied") return null
    return parsed
  } catch {
    return null
  }
}

const writeStored = (status: ConsentStatus) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        status,
        version: POLICY_VERSION,
        decidedAt: new Date().toISOString(),
      } satisfies StoredConsent)
    )
  } catch {
    // Storage unavailable, so the choice holds for this page view only and the
    // banner will ask again next visit. Better than breaking the page.
  }
}

export const useCookieConsent = () => {
  // null = no decision on record yet, so the banner should ask.
  const status = useState<ConsentStatus | null>("cookie-consent", () => null)
  // Guards against rendering the banner during SSR/hydration, before we know.
  const resolved = useState<boolean>("cookie-consent-resolved", () => false)
  // Lets the footer re-open the banner after a decision has been made.
  const reopened = useState<boolean>("cookie-consent-reopened", () => false)

  const gtagStarted = useState<boolean>("cookie-consent-gtag", () => false)

  const startAnalytics = () => {
    if (import.meta.server || gtagStarted.value || isLocalHost()) return

    const { gtag, initialize } = useGtag()
    initialize()
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    })
    gtagStarted.value = true
  }

  /** Called once on app start to apply whatever the visitor decided before. */
  const restore = () => {
    if (import.meta.server) return
    const stored = readStored()
    status.value = stored?.status ?? null
    resolved.value = true
    if (stored?.status === "granted") startAnalytics()
  }

  const accept = () => {
    status.value = "granted"
    reopened.value = false
    writeStored("granted")
    startAnalytics()
  }

  const reject = () => {
    status.value = "denied"
    reopened.value = false
    writeStored("denied")
    // Nothing to tear down: with `gtag.enabled: false` the script is never
    // loaded until startAnalytics() runs, so declining simply leaves it unloaded.
  }

  /** Footer entry point, so a decision is never final. */
  const reopen = () => {
    reopened.value = true
  }

  const shouldAsk = computed(
    () => resolved.value && (status.value === null || reopened.value)
  )

  return {
    status,
    shouldAsk,
    hasDecided: computed(() => status.value !== null),
    accept,
    reject,
    reopen,
    restore,
  }
}
