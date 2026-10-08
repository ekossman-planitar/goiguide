/**
 * Copies every live-site file referenced in lib/content (any "/assets/..." path)
 * from https://goiguide.com into public/assets/, keeping the exact same path.
 * Images, videos, PDFs and ZIPs then load from this site at the same URLs as
 * today, so nothing changes for search engines or existing links.
 *
 * Safe to re-run: files that already exist are skipped.
 *
 * Run from the repo root:   node scripts/mirror-assets.mjs
 */
import {existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'

const LIVE = 'https://goiguide.com'
const CONTENT_DIR = 'lib/content'
const PUBLIC_DIR = 'public'

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : /\.(ts|tsx)$/.test(name) ? [path] : []
  })
}

// Collect "/assets/…" paths (quoted strings, with or without the goiguide.com domain)
const paths = new Set()
for (const file of walk(CONTENT_DIR)) {
  const text = readFileSync(file, 'utf8')
  for (const match of text.matchAll(/['"`](?:https:\/\/goiguide\.com)?(\/assets\/[^'"`?#\s]+)/g)) paths.add(match[1])
}

let downloaded = 0
let skipped = 0
const failed = []
for (const path of [...paths].sort()) {
  const target = join(PUBLIC_DIR, decodeURIComponent(path))
  if (existsSync(target)) {
    skipped++
    continue
  }
  try {
    const res = await fetch(LIVE + path)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const body = Buffer.from(await res.arrayBuffer())
    mkdirSync(dirname(target), {recursive: true})
    writeFileSync(target, body)
    downloaded++
    console.log(`✓ ${path} (${(body.length / 1024).toFixed(0)} KB)`)
  } catch (error) {
    failed.push(`${path}: ${error.message}`)
    console.log(`✗ ${path}: ${error.message}`)
  }
}

console.log(`\n${downloaded} downloaded, ${skipped} already present, ${failed.length} failed`)
if (failed.length) process.exitCode = 1
