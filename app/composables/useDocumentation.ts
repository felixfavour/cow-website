/**
 * Help Center navigation, derived entirely from the `documentation` content
 * collection so new categories and articles show up without code changes.
 *
 * Content layout (content/documentation/):
 *   <category>/index.md        → category (title, description, icon, order)
 *   <category>/<article>.md    → article  (title, description, order, featured…)
 *
 * Content paths live under /documentation/… and are served at /docs/….
 */

export interface DocArticle {
  title: string
  description: string
  /** Route path, e.g. /docs/getting-started/creating-your-account */
  path: string
  categorySlug: string
  /** Human category label */
  category: string
  order: number
  lastUpdated?: string
  featured?: boolean
}

export interface DocCategory {
  slug: string
  title: string
  description: string
  icon: string
  order: number
  /** Route path, e.g. /docs/getting-started */
  path: string
  articles: DocArticle[]
}

export const DOCS_CONTENT_PREFIX = '/documentation'
export const DOCS_ROUTE_PREFIX = '/docs'

export const toDocsRoute = (contentPath: string) =>
  contentPath.replace(new RegExp(`^${DOCS_CONTENT_PREFIX}`), DOCS_ROUTE_PREFIX)

export const toContentPath = (routePath: string) =>
  routePath.replace(new RegExp(`^${DOCS_ROUTE_PREFIX}`), DOCS_CONTENT_PREFIX)

const humanize = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

const byOrder = <T extends { order: number; title: string }>(a: T, b: T) =>
  a.order - b.order || a.title.localeCompare(b.title)

type RawDoc = {
  path: string
  title: string
  description?: string
  icon?: string
  order?: number
  category?: string
  lastUpdated?: string
  featured?: boolean
  draft?: boolean
}

const buildCategories = (docs: RawDoc[]): DocCategory[] => {
  const map = new Map<string, DocCategory>()

  const ensure = (slug: string) => {
    if (!map.has(slug)) {
      map.set(slug, {
        slug,
        title: humanize(slug),
        description: '',
        icon: 'file-text',
        order: 999,
        path: `${DOCS_ROUTE_PREFIX}/${slug}`,
        articles: [],
      })
    }
    return map.get(slug)!
  }

  const rel = (doc: RawDoc) =>
    doc.path.replace(DOCS_CONTENT_PREFIX, '').replace(/^\//, '').split('/').filter(Boolean)

  // Category index files first so article labels can fall back to the category title.
  for (const doc of docs) {
    const parts = rel(doc)
    if (parts.length !== 1 || doc.draft) continue
    const cat = ensure(parts[0])
    cat.title = doc.title || cat.title
    cat.description = doc.description ?? ''
    cat.icon = doc.icon ?? cat.icon
    cat.order = doc.order ?? cat.order
  }

  for (const doc of docs) {
    const parts = rel(doc)
    if (parts.length !== 2 || doc.draft) continue
    const cat = ensure(parts[0])
    cat.articles.push({
      title: doc.title,
      description: doc.description ?? '',
      path: toDocsRoute(doc.path),
      categorySlug: cat.slug,
      category: doc.category || cat.title,
      order: doc.order ?? 999,
      lastUpdated: doc.lastUpdated,
      featured: doc.featured ?? false,
    })
  }

  return [...map.values()]
    .map((c) => ({ ...c, articles: c.articles.sort(byOrder) }))
    .sort(byOrder)
}

/**
 * Shared, cached Help Center tree. Call it anywhere; `await nav.ready` in
 * pages so the tree is available during SSR.
 */
export const useDocsNav = () => {
  const ready = useAsyncData(
    'docs-nav',
    () =>
      queryCollection('documentation')
        .select(
          'path',
          'title',
          'description',
          'icon',
          'order',
          'category',
          'lastUpdated',
          'featured',
          'draft'
        )
        .all() as Promise<RawDoc[]>,
    { default: () => [] as RawDoc[] }
  )

  const categories = computed(() => buildCategories(ready.data.value ?? []))
  const articles = computed(() => categories.value.flatMap((c) => c.articles))
  const featured = computed(() => articles.value.filter((a) => a.featured))

  const getCategory = (slug: string) => categories.value.find((c) => c.slug === slug)
  const getArticle = (path: string) => articles.value.find((a) => a.path === path)

  const getPrevNext = (path: string) => {
    const article = getArticle(path)
    const list = article ? getCategory(article.categorySlug)?.articles ?? [] : []
    const idx = list.findIndex((a) => a.path === path)
    return {
      prev: idx > 0 ? list[idx - 1] : null,
      next: idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null,
    }
  }

  const getRelated = (path: string, limit = 4) => {
    const article = getArticle(path)
    if (!article) return []
    return (getCategory(article.categorySlug)?.articles ?? [])
      .filter((a) => a.path !== path)
      .slice(0, limit)
  }

  const getBreadcrumbs = (path: string) => {
    const article = getArticle(path)
    if (article) {
      const cat = getCategory(article.categorySlug)
      return [
        { label: cat?.title ?? article.category, href: cat?.path ?? '' },
        { label: article.title, href: article.path },
      ]
    }
    const cat = categories.value.find((c) => c.path === path)
    return cat ? [{ label: cat.title, href: cat.path }] : []
  }

  return {
    ready,
    categories,
    articles,
    featured,
    getCategory,
    getArticle,
    getPrevNext,
    getRelated,
    getBreadcrumbs,
  }
}

const extractText = (node: any): string => {
  if (!node) return ''
  if (typeof node === 'string') return node
  // minimark node: [tag, props, ...children]
  if (Array.isArray(node)) return node.slice(2).map(extractText).join('')
  if (node.type === 'text') return node.value || ''
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

export interface TocHeading {
  level: 'h2' | 'h3'
  text: string
  id: string
}

/** Headings (h2/h3) from a rendered content body, for the "On this page" list. */
export const getTableOfContents = (body: any): TocHeading[] => {
  if (!body) return []

  // Nuxt Content v3 ships a ready-made TOC alongside the minimark body.
  if (Array.isArray(body.toc?.links)) {
    const out: TocHeading[] = []
    for (const link of body.toc.links) {
      out.push({ level: 'h2', text: link.text, id: link.id })
      for (const child of link.children ?? []) {
        out.push({ level: 'h3', text: child.text, id: child.id })
      }
    }
    return out
  }

  // minimark body: { type: 'minimark', value: [[tag, props, ...children], …] }
  if (Array.isArray(body.value)) {
    return body.value
      .filter((n: any) => Array.isArray(n) && ['h2', 'h3'].includes(n[0]))
      .map((n: any) => ({ level: n[0], text: extractText(n), id: n[1]?.id || '' }))
  }

  // Legacy AST: { children: [{ tag, props, children }] }
  if (Array.isArray(body.children)) {
    return body.children
      .filter((child: any) => ['h2', 'h3'].includes(child.tag))
      .map((child: any) => ({
        level: child.tag,
        text: extractText(child),
        id: child.props?.id || '',
      }))
  }
  return []
}
