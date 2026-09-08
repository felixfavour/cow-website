/**
 * Redirects www.cloudofworship.com to the apex domain with a 301.
 *
 * The apex is the canonical host: every page sets <link rel="canonical"> to it
 * and the sitemap lists apex URLs. Serving both hosts with a 200 gives search
 * engines two crawlable copies of the whole site.
 */
export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true })
  if (!host?.startsWith('www.')) return

  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true })
  url.host = host.slice(4)

  return sendRedirect(event, url.toString(), 301)
})
