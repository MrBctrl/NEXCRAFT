// One-off / repeatable script: shrinks every image in public/images to a
// sane max width and re-compresses it, overwriting the original file in
// place. Filenames don't change, so no code/data references need updating.
//
// Run with: node scripts/optimize-images.mjs
//
// Safe to re-run any time you add new images — already-optimized files
// just get processed again with no meaningful size change.

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import path from 'path'

const ROOT = path.join(process.cwd(), 'public', 'images')


const MAX_WIDTH = 1600
const JPEG_QUALITY = 78
const PNG_QUALITY = 78

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(full)
      continue
    }
    const ext = path.extname(entry.name).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

    const before = (await stat(full)).size
    const buffer = await sharp(full)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .toBuffer()

    const optimized = ext === '.png'
      ? await sharp(buffer).png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer()
      : await sharp(buffer).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()

    // Only overwrite if we actually made it smaller.
    if (optimized.length < before) {
      await sharp(optimized).toFile(full + '.tmp')
      await import('fs/promises').then((fs) => fs.rename(full + '.tmp', full))
      const after = optimized.length
      const pct = Math.round((1 - after / before) * 100)
      console.log(`${path.relative(ROOT, full)}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${pct}%)`)
    }
  }
}

walk(ROOT).then(() => console.log('Done.'))
