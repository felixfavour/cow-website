const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
const SESSION_KEY = 'cow_utm_params'

type UtmParams = Partial<Record<typeof UTM_KEYS[number], string>>

/**
 * Reads UTM params from the current URL, persists them to sessionStorage,
 * and exposes a helper to build app.cloudofworship.com URLs with those params merged in.
 *
 * Priority: incoming page UTMs > hardcoded link UTMs (fallback defaults).
 */
export const useUtm = () => {
  const getStoredUtms = (): UtmParams => {
    if (import.meta.server) return {}
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}')
    } catch {
      return {}
    }
  }

  const captureFromUrl = () => {
    if (import.meta.server) return
    const params = new URLSearchParams(window.location.search)
    const found: UtmParams = {}
    UTM_KEYS.forEach((key) => {
      const val = params.get(key)
      if (val) found[key] = val
    })
    if (Object.keys(found).length > 0) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(found))
    }
  }

  /**
   * Merges session UTM params into a destination URL.
   * Session params (from ad campaigns) always win over any hardcoded defaults already
   * baked into the URL.
   */
  const mergeUtmsIntoUrl = (url: string): string => {
    const stored = getStoredUtms()
    if (Object.keys(stored).length === 0) return url
    try {
      const parsed = new URL(url)
      UTM_KEYS.forEach((key) => {
        if (stored[key]) {
          // Session/ad UTMs fully override any hardcoded defaults on the link
          parsed.searchParams.set(key, stored[key])
        }
      })
      return parsed.toString()
    } catch {
      return url
    }
  }

  return { captureFromUrl, getStoredUtms, mergeUtmsIntoUrl }
}
