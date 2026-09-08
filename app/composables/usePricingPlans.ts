// Shared loader for the billing API's plan list, used by PricingSection and
// PricingTable (both render on /pricing, so the shared key fetches once).
//
// The API authorises by Origin. Browsers always send an allowed one, but the
// SSR request is rejected in production even though it sets Origin explicitly,
// which used to render "Unable to load pricing" on every first page load. A
// server-side failure is therefore treated as "not loaded yet" and retried from
// the browser; only a failed browser fetch surfaces as an error.
export const usePricingPlans = () => {
  const {
    data: plans,
    pending,
    error,
    refresh,
  } = useAsyncData<any[] | null>(
    "billing-plans",
    async () => {
      const apiUrl =
        process.env.NUXT_PUBLIC_API_URL || "https://api.cloudofworship.com"

      try {
        const response = await fetch(`${apiUrl}/api/v1/billing/plans`, {
          // Browsers ignore this and send their own Origin.
          headers: import.meta.server
            ? { Origin: "https://cloudofworship.com" }
            : undefined,
        })

        if (!response.ok) {
          throw new Error("Failed to fetch pricing plans")
        }

        const { data } = await response.json()
        return data || []
      } catch (err) {
        if (import.meta.server) {
          console.error("Error fetching plans on the server:", err)
          return null
        }
        console.error("Error fetching plans:", err)
        throw err
      }
    },
    {
      default: () => null,
      server: true,
      lazy: false,
    }
  )

  // null means the server fetch was skipped or refused, so the browser retries.
  const awaitingClientFetch = computed(
    () => plans.value === null && !error.value
  )
  const loading = computed(() => pending.value || awaitingClientFetch.value)

  // The retry has to wait for hydration to finish: while Nuxt is hydrating,
  // refresh() resolves straight from the server payload without re-running the
  // handler. onNuxtReady fires after that and is client-only.
  onNuxtReady(() => {
    if (awaitingClientFetch.value && !pending.value) {
      refresh()
    }
  })

  return { plans, loading, error, refresh }
}
