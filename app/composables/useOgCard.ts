import { OG_CARDS, type OgCardKey } from "~/utils/ogCards"

/**
 * Point a page at its pre-generated social card.
 *
 * The image is a static file committed under public/images/og/, so this emits
 * plain meta tags and costs the server nothing. See app/utils/ogCards.ts for
 * the manifest and the regeneration command.
 */
export function useOgCard(key: OgCardKey) {
  const siteUrl = "https://cloudofworship.com"
  const url = `${siteUrl}/images/og/${OG_CARDS[key].file}.jpg`

  useSeoMeta({
    ogImage: url,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: "image/jpeg",
    twitterImage: url,
    twitterCard: "summary_large_image",
  })
}
