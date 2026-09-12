/**
 * Converts the rendered PNG cards to JPEG and removes the PNGs.
 *
 * The cards are a full-bleed photographic gradient with large text, so JPEG at
 * q90 is visually indistinguishable at roughly a tenth of the size — which
 * matters because these files are committed. Run via `yarn og:generate`.
 */
import { readdir, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../public/images/og')
const pngs = (await readdir(outDir)).filter(f => f.endsWith('.png') && f !== 'backdrop.png')

let total = 0
for (const png of pngs) {
  const src = join(outDir, png)
  const dest = src.replace(/\.png$/, '.jpg')
  const { size } = await sharp(src).jpeg({ quality: 90, chromaSubsampling: '4:4:4' }).toFile(dest)
  await unlink(src)
  total += size
  console.log(`  ✓ ${png.replace(/\.png$/, '.jpg')} (${(size / 1024).toFixed(0)} KB)`)
}
console.log(`\n${pngs.length} cards, ${(total / 1024 / 1024).toFixed(1)} MB total.`)
