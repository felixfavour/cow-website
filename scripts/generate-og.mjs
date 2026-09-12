/**
 * Generates the committed social cards in public/images/og/.
 *
 * Boots a local Nuxt dev server with OG_GENERATE=1 (which is the only time the
 * nuxt-og-image module is registered at all), renders every card in the
 * app/utils/ogCards.ts manifest, writes the results as JPEGs, and shuts down.
 *
 * Nothing here runs on the server — production serves plain static files.
 *
 *   yarn og:generate
 */
import { spawn } from 'node:child_process'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/images/og')

// The manifest is TS; pull the object out without a build step.
async function loadCards() {
  const src = await readFile(join(root, 'app/utils/ogCards.ts'), 'utf8')
  const body = src.slice(src.indexOf('export const OG_CARDS = {') + 'export const OG_CARDS = '.length)
  const obj = body.slice(0, body.indexOf('\n} as const') + 2)
  return Object.values(eval(`(${obj})`))
}

function waitForServer(child) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('dev server did not start within 120s')), 120_000)
    const onData = (buf) => {
      const line = buf.toString()
      process.stdout.write(line.includes('➜') ? line : '')
      const m = line.match(/http:\/\/localhost:(\d+)/)
      if (m) { clearTimeout(timer); resolve(Number(m[1])) }
    }
    child.stdout.on('data', onData)
    child.stderr.on('data', onData)
  })
}

const cards = await loadCards()
await mkdir(outDir, { recursive: true })

console.log(`Starting dev server for ${cards.length} cards…`)
const dev = spawn('npx', ['nuxt', 'dev', '--port', '3099'], {
  cwd: root,
  env: { ...process.env, OG_GENERATE: '1' },
})
const port = await waitForServer(dev)

let failed = 0
try {
  for (const card of cards) {
    const qs = new URLSearchParams({
      eyebrow: card.eyebrow ?? '',
      accent: card.accent ?? '',
      title: card.title,
    })
    const html = await fetch(`http://localhost:${port}/__og?${qs}`).then(r => r.text())
    const m = html.match(/<meta property="og:image" content="([^"]+)"/)
    if (!m) { console.error(`  ✗ ${card.file}: no og:image tag`); failed++; continue }

    // The tag may be relative in dev; resolve it against the local origin.
    const imgUrl = new URL(m[1].replace(/&amp;/g, '&'), `http://localhost:${port}`)
    const res = await fetch(imgUrl)
    if (!res.ok) { console.error(`  ✗ ${card.file}: render returned ${res.status}`); failed++; continue }

    const png = Buffer.from(await res.arrayBuffer())
    await writeFile(join(outDir, `${card.file}.png`), png)
    console.log(`  ✓ ${card.file}.png (${(png.length / 1024).toFixed(0)} KB)`)
  }
} finally {
  dev.kill('SIGTERM')
}

if (failed) {
  console.error(`\n${failed} card(s) failed.`)
  process.exit(1)
}
console.log('\nRendered. Converting to JPEG…')
