/**
 * The live church count behind the "serving … churches" line that sits under
 * every "Get started for free" button.
 *
 * Several pages show that line, so the fetch carries a fixed key: Nuxt resolves
 * it once per render and hands the same payload to every caller.
 */
export const useChurchCount = () => {
  const { data } = useFetch('/api/church-count', { key: 'church-count' })

  const churchCount = computed(() => data.value?.count ?? null)

  /**
   * What actually goes in the copy, between "serving" and "churches". Falls
   * back to the old wording — "of" and all, so the sentence still scans — when
   * the API is unreachable.
   */
  const churchCountLabel = computed(() =>
    churchCount.value === null
      ? 'thousands of'
      : churchCount.value.toLocaleString('en-US')
  )

  return { churchCount, churchCountLabel }
}
