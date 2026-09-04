// Shrinks every .mp4 in public/videos by re-encoding it at a sane
// bitrate/resolution, overwriting the file in place — same filename,
// so nothing else in your code needs to change.
//
// Run with: node scripts/optimize-videos.mjs
//
// Uses a bundled ffmpeg binary (via ffmpeg-static) — no separate
// install needed, works the same on Windows/Mac/Linux.

import ffmpeg from 'fluent-ffmpeg'
import { readdir, stat, rename, unlink } from 'fs/promises'
import path from 'path'

ffmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe')

const ROOT = path.join(process.cwd(), 'public', 'videos')

const MAX_WIDTH = 960
const TARGET_BITRATE = '1200k'

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(full)
      continue
    }
    if (path.extname(entry.name).toLowerCase() !== '.mp4') continue

    const before = (await stat(full)).size
    const tmp = full + '.optimized.mp4'

    await new Promise((resolve, reject) => {
      ffmpeg(full)
        .videoCodec('libx264')
        .noAudio()
        .videoBitrate(TARGET_BITRATE)
        .size(`${MAX_WIDTH}x?`)
        .outputOptions(['-crf 28', '-preset veryslow', '-movflags +faststart'])
        .on('end', resolve)
        .on('error', reject)
        .save(tmp)
    })

    const after = (await stat(tmp)).size
    if (after < before) {
      await unlink(full)
      await rename(tmp, full)
      const pct = Math.round((1 - after / before) * 100)
      console.log(`${path.relative(ROOT, full)}: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB (-${pct}%)`)
    } else {
      await unlink(tmp)
      console.log(`${path.relative(ROOT, full)}: already optimized, skipped`)
    }
  }
}

walk(ROOT).then(() => console.log('Done.'))
