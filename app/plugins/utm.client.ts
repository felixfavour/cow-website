import { useUtm } from '~/composables/useUtm'

/**
 * utm.client.ts
 *
 * 1. On page load — capture any UTM params that arrived via the marketing site URL
 *    (e.g. ?utm_source=meta_ads&utm_medium=social&utm_campaign=featured_slides)
 *    and store them in sessionStorage so they survive client-side navigation.
 *
 * 2. On every click — if the target anchor points to app.cloudofworship.com,
 *    inject the stored UTM params before the browser follows the link.
 *    This covers ALL links: static hrefs, dynamic ones, and links inside
 *    rendered markdown blog posts.
 */
export default defineNuxtPlugin(() => {
  const APP_DOMAIN = 'app.cloudofworship.com'
  const { captureFromUrl, mergeUtmsIntoUrl } = useUtm()

  // Step 1 – capture on initial load
  captureFromUrl()

  // Step 2 – also re-capture whenever the route changes (SPA navigation)
  const router = useRouter()
  router.afterEach(() => {
    captureFromUrl()
  })

  // Step 3 – intercept clicks on any app link
  document.addEventListener('click', (e) => {
    const anchor = (e.target as HTMLElement).closest('a')
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href || !href.includes(APP_DOMAIN)) return

    const enrichedUrl = mergeUtmsIntoUrl(href)
    if (enrichedUrl === href) return // nothing to change

    e.preventDefault()
    const target = anchor.getAttribute('target')
    if (target === '_blank') {
      window.open(enrichedUrl, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = enrichedUrl
    }
  })
})
