/**
 * The current desktop release, read from GitHub and cached.
 *
 * The /download page needs the exact installer URL, and that URL carries the
 * version in its filename (Cloud.of.Worship_1.1.1_x64-setup.exe), so there is
 * no stable link we could hard-code. GitHub's own /releases/latest/download/
 * shortcut has the same problem: it still wants the versioned filename.
 *
 * Doing this on the server rather than in the browser keeps every visitor off
 * GitHub's unauthenticated rate limit (60/hour per IP) and out of any CORS
 * trouble. The cache means one upstream call per 30 minutes for the whole site.
 */

const RELEASES_API =
  'https://api.github.com/repos/CoW-Labs/cloudofworship/releases/latest'

export const RELEASES_PAGE =
  'https://github.com/CoW-Labs/cloudofworship/releases/latest'

export interface DesktopRelease {
  /** e.g. "1.1.1". Null when GitHub could not be reached. */
  version: string | null
  publishedAt: string | null
  windows: {
    url: string
    filename: string
    /** Bytes. */
    size: number
  } | null
  /** Where to send someone when we have no direct link to offer. */
  fallbackUrl: string
}

const emptyRelease = (): DesktopRelease => ({
  version: null,
  publishedAt: null,
  windows: null,
  fallbackUrl: RELEASES_PAGE,
})

type GithubAsset = {
  name: string
  size: number
  browser_download_url: string
}

/** The NSIS installer, and specifically not its .sig sidecar. */
const isWindowsInstaller = (asset: GithubAsset) =>
  asset.name.toLowerCase().endsWith('.exe')

export default defineCachedEventHandler(
  async (): Promise<DesktopRelease> => {
    try {
      const release = await $fetch<{
        tag_name?: string
        published_at?: string
        assets?: GithubAsset[]
      }>(RELEASES_API, {
        headers: {
          // GitHub rejects API requests that do not identify themselves.
          'User-Agent': 'cloudofworship-website',
          Accept: 'application/vnd.github+json',
        },
        timeout: 8000,
      })

      const installer = (release.assets ?? []).find(isWindowsInstaller)

      return {
        // Tags are published as v1.1.1; the page shows the bare number.
        version: release.tag_name?.replace(/^v/, '') ?? null,
        publishedAt: release.published_at ?? null,
        windows: installer
          ? {
              url: installer.browser_download_url,
              filename: installer.name,
              size: installer.size,
            }
          : null,
        fallbackUrl: RELEASES_PAGE,
      }
    } catch (error) {
      // A download page that fails to render is worse than one that sends
      // people to the releases page, so this never throws.
      console.error('Could not read the latest desktop release:', error)
      return emptyRelease()
    }
  },
  {
    maxAge: 60 * 30,
    // Keep serving the last good answer while a new one is fetched, so a
    // GitHub blip never reaches a visitor.
    staleMaxAge: 60 * 60 * 24,
    name: 'latest-release',
    getKey: () => 'desktop',
  }
)
