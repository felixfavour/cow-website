/**
 * How many churches are on Cloud of Worship right now.
 *
 * The marketing copy used to say "thousands", which ages badly in both
 * directions: it undersells the number once it grows and it has to be edited by
 * hand every time someone notices. The API already publishes the real figure at
 * an unauthenticated endpoint, so the site reads it instead.
 *
 * Doing it here rather than in the browser keeps the API out of every visitor's
 * critical path (one upstream call per 30 minutes for the whole site) and
 * sidesteps CORS. The count is in the HTML by the time the page is served.
 */

const CHURCH_COUNT_API = 'https://api.cloudofworship.com/api/v1/church/count'

export interface ChurchCount {
  /** Null when the API could not be reached — callers fall back to copy. */
  count: number | null
}

export default defineCachedEventHandler(
  async (): Promise<ChurchCount> => {
    try {
      // The endpoint answers with a bare JSON number, e.g. 4382.
      const body = await $fetch<number | string>(CHURCH_COUNT_API, {
        timeout: 8000,
      })
      const count = Number(body)

      // A zero or a non-number means something is wrong upstream; the fallback
      // wording is better than "serving 0 churches".
      return Number.isFinite(count) && count > 0 ? { count } : { count: null }
    } catch (error) {
      // A homepage that fails to render is far worse than one that says
      // "thousands", so this never throws.
      console.error('Could not read the church count:', error)
      return { count: null }
    }
  },
  {
    maxAge: 60 * 30,
    // Keep serving the last good answer while a new one is fetched, so an API
    // blip never reaches a visitor.
    staleMaxAge: 60 * 60 * 24,
    name: 'church-count',
    getKey: () => 'churches',
  }
)
