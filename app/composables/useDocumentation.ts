export interface DocNavItem {
  label: string
  href: string
}

export interface DocNavSection {
  title: string
  icon: string
  items: DocNavItem[]
}

// Static nav — mirrors your content/documentation/ folder structure
export const DOC_NAV: DocNavSection[] = [
  {
    title: 'Getting Started',
    icon: '🚀',
    items: [
      { label: 'Overview', href: '/docs/getting-started' },
      { label: 'What is Cloud of Worship?', href: '/docs/getting-started/what-is-cloud-of-worship' },
      { label: 'Creating Your First Song', href: '/docs/getting-started/creating-your-first-song' },
      { label: 'Inviting Team Members', href: '/docs/getting-started/inviting-team-members' },
      { label: 'Your First Service', href: '/docs/getting-started/your-first-service' },
    ],
  },
  {
    title: 'Guides',
    icon: '📖',
    items: [
      { label: 'Overview', href: '/docs/guides' },
      { label: 'Organizing Your Songs', href: '/docs/guides/organizing-your-songs' },
      { label: 'Collaborating with Your Team', href: '/docs/guides/collaborating-with-your-team' },
      { label: 'Managing Services', href: '/docs/guides/managing-services' },
      { label: 'Using Themes & Visuals', href: '/docs/guides/using-themes-and-visuals' },
      { label: 'Best Practices', href: '/docs/guides/best-practices' },
      { label: 'Troubleshooting', href: '/docs/guides/troubleshooting-common-issues' },
    ],
  },
  {
    title: 'Examples',
    icon: '💡',
    items: [
      { label: 'Overview', href: '/docs/examples' },
      { label: 'Setting Up a Weekly Service', href: '/docs/examples/setting-up-a-weekly-service' },
      { label: 'Organizing a Large Library', href: '/docs/examples/organizing-a-large-song-library' },
      { label: 'Managing Multiple Teams', href: '/docs/examples/managing-multiple-worship-teams' },
      { label: 'Seasonal Planning', href: '/docs/examples/seasonal-planning' },
    ],
  },
  {
    title: 'Resources',
    icon: '🔖',
    items: [
      { label: 'Overview', href: '/docs/resources' },
      { label: 'Glossary', href: '/docs/resources/glossary' },
      { label: 'Keyboard Shortcuts', href: '/docs/resources/keyboard-shortcuts' },
      { label: 'FAQ', href: '/docs/resources/faq' },
    ],
  },
]

const extractText = (node: any): string => {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

export const useDocumentation = () => {
  const getTableOfContents = (body: any) => {
    if (!body?.children) return []
    return body.children
      .filter((child: any) => ['h2', 'h3'].includes(child.tag))
      .map((child: any) => ({
        level: child.tag,
        text: extractText(child),
        id: child.props?.id || '',
      }))
  }

  const getBreadcrumbs = (slug: string) => {
    if (!slug) return []
    const parts = slug.split('/')
    return parts.map((part, i) => ({
      label: part.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      href: '/docs/' + parts.slice(0, i + 1).join('/'),
    }))
  }

  const getPrevNext = (currentPath: string) => {
    const flat = DOC_NAV.flatMap((section) => section.items)
    const idx = flat.findIndex((item) => item.href === currentPath)
    return {
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx < flat.length - 1 ? flat[idx + 1] : null,
    }
  }

  return {
    nav: DOC_NAV,
    getTableOfContents,
    getBreadcrumbs,
    getPrevNext,
  }
}
