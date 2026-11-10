/**
 * Shared by the download page's designs: where the installer is, what to call
 * the button, what the visitor is on, and the click tracking. The caller does
 * the useFetch (it has to be awaited in the page's own setup).
 */
export const useDownloadPage = (release: Ref<any>) => {
  const { mergeUtmsIntoUrl } = useUtm()

  const appUrl = computed(() =>
    mergeUtmsIntoUrl(
      "https://app.cloudofworship.com?utm_source=marketing_website&utm_medium=download_page"
    )
  )

  // Falls back to the releases page whenever GitHub could not be read, so the
  // button is never dead.
  const RELEASES_PAGE =
    "https://github.com/CoW-Labs/cloudofworship/releases/latest"

  const downloadUrl = computed(
    () =>
      release.value?.windows?.url || release.value?.fallbackUrl || RELEASES_PAGE
  )
  const downloadLabel = computed(() =>
    release.value?.windows ? "Download for Windows" : "Get the Windows app"
  )
  const installerSize = computed(() => {
    const bytes = release.value?.windows?.size
    return bytes ? `${Math.round(bytes / 1024 / 1024)} MB` : null
  })
  const releasedOn = computed(() => {
    const published = release.value?.publishedAt
    if (!published) return null
    return new Date(published).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  })

  // Null until mounted: the server has no idea what the visitor is on, and
  // guessing would either poison the cached HTML or cause a hydration mismatch.
  const platform = ref<string | null>(null)

  const detectPlatform = () => {
    const hint =
      (navigator as any).userAgentData?.platform || navigator.platform || ""
    const haystack = `${hint} ${navigator.userAgent || ""}`.toLowerCase()
    if (haystack.includes("win")) return "windows"
    // iPads report a Mac user agent, so rule them out before the Mac check.
    if (haystack.includes("iphone") || haystack.includes("ipad")) return "other"
    if (haystack.includes("mac")) return "mac"
    return "other"
  }

  const isLocal = () =>
    location.hostname === "localhost" || location.hostname === "127.0.0.1"

  const trackDownload = () => {
    if (typeof window === "undefined" || isLocal()) return
    ;(window as any).gtag?.("event", "desktop_download", {
      version: release.value?.version ?? "unknown",
      platform: platform.value ?? "unknown",
    })
  }

  const showTestimonialPopup = ref(false)
  onMounted(() => {
    platform.value = detectPlatform()
    if (!isLocal()) {
      useGtag()
      if (window.innerWidth >= 768) showTestimonialPopup.value = true
    }
  })

  return {
    appUrl,
    downloadUrl,
    downloadLabel,
    installerSize,
    releasedOn,
    platform,
    trackDownload,
    showTestimonialPopup,
  }
}
