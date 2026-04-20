#!/usr/bin/env node
/**
 * Generates /public/sitemap.xml from static page routes and blog posts.
 * Blog post lastmod dates are read from their frontmatter `updated` or `created` fields.
 *
 * Run with: node scripts/generate-sitemap.js
 * Or via npm: npm run generate-sitemap
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

const BASE_URL = 'https://www.cloudofworship.com'

/**
 * Parse YAML frontmatter fields from a markdown file.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const frontmatter = {}
  match[1].split('\n').forEach((line) => {
    const kv = line.match(/^([\w-]+):\s*(.+)$/)
    if (kv) frontmatter[kv[1]] = kv[2].replace(/^["']|["']$/g, '')
  })
  return frontmatter
}

/**
 * Convert a human-readable date string (e.g. "December 26, 2025 12:00 PM")
 * to a YYYY-MM-DD string. Falls back to today's date if parsing fails.
 */
function toISODate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0]
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0]
  return d.toISOString().split('T')[0]
}

/**
 * Read and parse all blog posts from content/blog/.
 */
function readBlogPosts() {
  const blogDir = join(ROOT, 'content/blog')
  const files = readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .sort()

  return files.map((file) => {
    const raw = readFileSync(join(blogDir, file), 'utf-8')
    const frontmatter = parseFrontmatter(raw)
    const slug = file.replace('.md', '')
    const lastmod = toISODate(frontmatter.updated || frontmatter.created)
    return { slug, lastmod }
  })
}

/**
 * Static page route definitions.
 * Add a new entry here whenever you add a new public page.
 */
const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly' },
  { path: '/pricing', changefreq: 'weekly' },
  { path: '/changelog', changefreq: 'weekly' },
  { path: '/wall-of-love', changefreq: 'weekly' },
  { path: '/contact', changefreq: 'weekly' },
  { path: '/privacy-policy', changefreq: 'monthly' },
  { path: '/terms-of-service', changefreq: 'monthly' },
  { path: '/features/browser-ready', changefreq: 'weekly' },
  { path: '/features/offline-first', changefreq: 'weekly' },
  { path: '/features/team-workflow', changefreq: 'weekly' },
]

/**
 * Escape special XML characters in a URL string.
 */
function xmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Build the sitemap XML string.
 */
function buildSitemap(blogPosts) {
  const today = new Date().toISOString().split('T')[0]

  const staticEntries = STATIC_PAGES.map(
    ({ path, changefreq }) =>
      `  <url>\n    <loc>${xmlEscape(BASE_URL + path)}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <lastmod>${today}</lastmod>\n  </url>`,
  ).join('\n')

  const blogIndexEntry = `  <url>\n    <loc>${xmlEscape(BASE_URL + '/blog')}</loc>\n    <changefreq>weekly</changefreq>\n    <lastmod>${today}</lastmod>\n  </url>`

  const blogEntries = blogPosts
    .map(
      ({ slug, lastmod }) =>
        `  <url>\n    <loc>${xmlEscape(BASE_URL + '/blog/' + slug)}</loc>\n    <changefreq>weekly</changefreq>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    )
    .join('\n')

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n` +
    `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n` +
    staticEntries +
    '\n' +
    blogIndexEntry +
    '\n' +
    blogEntries +
    '\n</urlset>\n'
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

const blogPosts = readBlogPosts()
const sitemap = buildSitemap(blogPosts)
writeFileSync(join(ROOT, 'public/sitemap.xml'), sitemap, 'utf-8')
console.log(`✓ Generated public/sitemap.xml (${blogPosts.length} blog posts)`)
