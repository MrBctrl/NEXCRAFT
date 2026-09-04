// Compresses ONE video file you specify — for a single new video you're
// about to upload through the admin panel (unlike optimize-videos.mjs,
// which batch-processes everything already in public/videos).
//
// Usage:
//   node scripts/compress-video.mjs "C:\path\to\your-video.mp4"
//
// Output is saved next to the original, with "-compressed" added to the
// filename — your original file is never touched or deleted.

import ffmpeg from 'fluent-ffmpeg'
import { stat } from 'fs/promises'
import path from 'path'

// Same path we set up for optimize-videos.mjs. If you installed ffmpeg
// somewhere else, update this line to match.
ffmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe')

const MAX_WIDTH = 960
const TARGET_BITRATE = '1200k'

const inputPath = process.argv[2]
if (!inputPath) {
  console.error('Usage: node scripts/compress-video.mjs "C:\\path\\to\\video.mp4"')
  process.exit(1)
}

const ext = path.extname(inputPath)
const base = inputPath.slice(0, -ext.length)
const outputPath = `${base}-compressed${ext}`

const before = (await stat(inputPath)).size

console.log(`Compressing ${path.basename(inputPath)}...`)

await new Promise((resolve, reject) => {
  ffmpeg(inputPath)
    .videoCodec('libx264')
    .noAudio()
    .videoBitrate(TARGET_BITRATE)
    .size(`${MAX_WIDTH}x?`)
    .outputOptions(['-crf 28', '-preset veryslow', '-movflags +faststart'])
    .on('end', resolve)
    .on('error', reject)
    .save(outputPath)
})

const after = (await stat(outputPath)).size
const pct = Math.round((1 - after / before) * 100)
console.log(`Done: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB (-${pct}%)`)
console.log(`Saved to: ${outputPath}`)
console.log('Upload THIS file through the admin panel, not the original.')
