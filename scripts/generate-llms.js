#!/usr/bin/env node
/**
 * Generates /public/llms.txt and /public/llms-full.txt for AI-friendly indexing.
 * See: https://llmstxt.org
 *
 * Run with: node scripts/generate-llms.js
 * Or via npm: npm run generate-llms
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

const BASE_URL = 'https://cloudofworship.com'

/**
 * Strip HTML/Vue template tags and clean up whitespace to produce plain text.
 */
function stripHtml(html) {
  // Remove block-level tags (script/style) iteratively to handle malformed nesting
  let result = html
  let prev
  do {
    prev = result
    result = result
      .replace(/<script\b[^>]*>[\s\S]*?<\/script[^>]*>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style[^>]*>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
  } while (result !== prev)

  return result
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Extract plain text content from a Vue single-file component.
 */
function extractVuePageText(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/)
  if (!templateMatch) return ''
  return stripHtml(templateMatch[1])
}

/**
 * Parse YAML frontmatter and body from a markdown file.
 */
function parseMarkdown(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: content }

  const frontmatter = {}
  match[1].split('\n').forEach((line) => {
    const kv = line.match(/^([\w-]+):\s*(.+)$/)
    if (kv) frontmatter[kv[1]] = kv[2].replace(/^["']|["']$/g, '')
  })

  return { frontmatter, body: match[2] }
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
    const { frontmatter, body } = parseMarkdown(raw)
    const slug = file.replace('.md', '')
    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.paragraph || '',
      url: `${BASE_URL}/blog/${slug}`,
      body,
    }
  })
}

/**
 * Static definitions for Vue page routes.
 * Add a new entry here whenever you add a new public page.
 */
const PAGE_DEFINITIONS = [
  {
    url: `${BASE_URL}/`,
    title: 'Home',
    description:
      'Run your church media smoothly, without the heavy setup. Cloud of Worship is a free browser-based presentation software to display song lyrics, scriptures, videos and fully customizable slides for your growing church.',
    file: 'app/pages/index.vue',
  },
  {
    url: `${BASE_URL}/pricing`,
    title: 'Pricing',
    description:
      'Cloud of Worship is free to use. A Starter plan is available at no cost; a Teams plan is available for $24.99/month or $249.99/year for advanced collaboration features.',
    file: 'app/pages/pricing.vue',
  },
  {
    url: `${BASE_URL}/features/browser-ready`,
    title: 'Browser-Ready Feature',
    description:
      'No downloads or installations required. Cloud of Worship runs directly in your web browser on Mac, Windows, Linux, iOS, and Android.',
    file: 'app/pages/features/browser-ready.vue',
  },
  {
    url: `${BASE_URL}/features/team-workflow`,
    title: 'Team Workflow Feature',
    description:
      'Work together with your media team in real-time, no matter where you are.',
    file: 'app/pages/features/team-workflow.vue',
  },
  {
    url: `${BASE_URL}/features/offline-first`,
    title: 'Offline-First Feature',
    description:
      'Full offline functionality after initial setup, ensuring reliable services even without an internet connection.',
    file: 'app/pages/features/offline-first.vue',
  },
  {
    url: `${BASE_URL}/contact`,
    title: 'Contact',
    description:
      'Get in touch with Cloud of Worship via WhatsApp community, feature requests, feedback, or email.',
    file: 'app/pages/contact.vue',
  },
  {
    url: `${BASE_URL}/changelog`,
    title: 'Changelog',
    description:
      'Version history and release notes for the Cloud of Worship app.',
    file: 'app/pages/changelog.vue',
  },
  {
    url: `${BASE_URL}/wall-of-love`,
    title: 'Wall of Love',
    description:
      'Testimonials and success stories from churches using Cloud of Worship.',
    file: 'app/pages/wall-of-love.vue',
  },
]

/**
 * Format a single blog post as a markdown list item.
 */
function formatBlogEntry(post) {
  return `- [${post.title}](${post.url})${post.description ? ': ' + post.description : ''}`
}

/**
 * Build the content of llms.txt (index/summary file).
 */
function buildLlmsTxt(blogPosts) {
  const blogLines = blogPosts.map(formatBlogEntry).join('\n')

  return `# Cloud of Worship

> Cloud of Worship is a free, browser-based worship presentation software built for growing churches. It enables church media teams to display song lyrics, Bible scriptures, videos, and fully customizable slides without any installation. The platform works across all major operating systems and devices, and functions fully offline after initial setup.

## Main Content

- [Home](${BASE_URL}/): Overview of Cloud of Worship — a free, browser-based church media tool serving 2,000+ churches worldwide.
- [Pricing](${BASE_URL}/pricing): Free Starter plan and Teams plan ($24.99/month or $249.99/year) with a full feature comparison.
- [Browser-Ready](${BASE_URL}/features/browser-ready): Run Cloud of Worship directly in your web browser — no downloads or installations needed on any platform.
- [Team Workflow](${BASE_URL}/features/team-workflow): Real-time collaboration tools for church media teams working across multiple devices.
- [Offline-First](${BASE_URL}/features/offline-first): Full offline functionality after initial setup, ensuring reliable service even without an internet connection.

## Optional

- [Blog](${BASE_URL}/blog): Guides, tutorials, comparisons, and updates for church media teams.
- [Changelog](${BASE_URL}/changelog): Release notes and version history for the Cloud of Worship app.
- [Wall of Love](${BASE_URL}/wall-of-love): Testimonials and stories from churches using Cloud of Worship.
- [Contact](${BASE_URL}/contact): Reach the team via WhatsApp community, feature requests, feedback, or email.

## Blog Posts

${blogLines}
`
}

/**
 * Build the content of llms-full.txt (consolidated full-text file).
 */
function buildLlmsFullTxt(pageDefs, blogPosts) {
  const sections = []

  // Primary pages
  for (const page of pageDefs) {
    const filePath = join(ROOT, page.file)
    const pageText = extractVuePageText(filePath)
    sections.push(
      `# ${page.title}\n\nURL: ${page.url}\n\n${page.description}\n\n${pageText}`,
    )
  }

  // Blog index
  const blogIndex = blogPosts.map(formatBlogEntry).join('\n')
  sections.push(
    `# Blog\n\nURL: ${BASE_URL}/blog\n\nGuides, tutorials, comparisons, and updates for church media teams.\n\n${blogIndex}`,
  )

  // Individual blog post content
  for (const post of blogPosts) {
    sections.push(`## Blog: ${post.title}\n\nURL: ${post.url}\n\n${post.body.trim()}`)
  }

  return sections.join('\n\n---\n\n')
}

// ── Main ──────────────────────────────────────────────────────────────────────

const blogPosts = readBlogPosts()

const llmsTxt = buildLlmsTxt(blogPosts)
writeFileSync(join(ROOT, 'public/llms.txt'), llmsTxt, 'utf-8')
console.log('✓ Generated public/llms.txt')

const llmsFullTxt = buildLlmsFullTxt(PAGE_DEFINITIONS, blogPosts)
writeFileSync(join(ROOT, 'public/llms-full.txt'), llmsFullTxt, 'utf-8')
console.log('✓ Generated public/llms-full.txt')
