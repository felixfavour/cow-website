/**
 * The live church count behind the "serving … churches" line that sits under
 * every "Get started for free" button.
 *
 * Read from the browser rather than during SSR. Cloudflare fronts the API with
 * bot protection that answers datacenter traffic with a "Just a moment..."
 * managed challenge, so a fetch from a Vercel lambda gets a 403 it cannot
 * solve and the count is never available server-side in production. A real
 * visitor's browser passes that check and sends an allowed Origin of its own.
 * `usePricingPlans` works around the same block the same way.
 *
 * Several pages show the line, so the fixed key means one fetch per visit
 * rather than one per component.
 */
const CHURCH_COUNT_API = 'https://api.cloudofworship.com/api/v1/church/count'

export const useChurchCount = () => {
  const { data: churchCount } = useAsyncData<number | null>(
    'church-count',
    async () => {
      try {
        // The endpoint answers with a bare JSON number, e.g. 4382.
        const body = await $fetch<number | string>(CHURCH_COUNT_API, {
          timeout: 8000,
        })
        const count = Number(body)

        // A zero or a non-number means something is wrong upstream; the
        // fallback wording is better than "serving 0 churches".
        return Number.isFinite(count) && count > 0 ? count : null
      } catch (error) {
        // The line is decoration on a call to action, never worth an error
        // state — it just keeps the old wording.
        console.error('Could not read the church count:', error)
        return null
      }
    },
    {
      // Skipping the server run keeps the doomed upstream call out of every
      // page render, and leaves the server and client first paints identical
      // (both show the fallback), so there is nothing to mismatch. The number
      // swaps in once the fetch lands.
      server: false,
      default: () => null,
    }
  )

  /**
   * What actually goes in the copy, between "serving" and "churches". Falls
   * back to the old wording — "of" and all, so the sentence still scans —
   * before the fetch lands and whenever it fails.
   */
  const churchCountLabel = computed(() =>
    churchCount.value === null
      ? 'thousands of'
      : churchCount.value.toLocaleString('en-US')
  )

  return { churchCount, churchCountLabel }
}
