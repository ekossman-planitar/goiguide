/**
 * Brand rename in Sanity content: "iGUIDE" → "iGuide" in visible text
 * (titles, body copy, excerpts, alt text, SEO fields, testimonials, pop-ups,
 * events, landing pages…). URLs, file paths, slugs, IDs and form IDs are left
 * alone, as is any "iGUIDE" that's part of a file name or link.
 *
 * Dry run (shows what would change, writes nothing):
 *   npx sanity exec scripts/rename-iguide-in-sanity.mjs --with-user-token
 * Apply:
 *   npx sanity exec scripts/rename-iguide-in-sanity.mjs --with-user-token -- --apply
 *
 * Each document is patched only if it hasn't changed since it was read
 * (ifRevisionId), so edits made in the Studio meanwhile are never overwritten.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-06'})
const APPLY = process.argv.includes('--apply')

// Same rule as the code rename: not when glued to a path, file name or handle
const BRAND = /(?<![/\-_%0-9@A-Za-z])iGUIDE/g
// Fields that hold links, IDs or machine values, never visible copy
const SKIP_KEYS = new Set([
  '_id', '_type', '_ref', '_key', '_rev', 'current', 'href', 'url', 'src', 'fileUrl', 'eventUrl', 'registrationUrl', 'imageLink',
  'hubspotFormId', 'formId', 'path', 'style', 'listItem', 'marks', 'youtubeId', 'videoUrl', 'headerVideoUrl', 'embedUrl', 'link',
])
const looksLikeLink = (s) => /^(https?:|mailto:|tel:|\/|#)/.test(s)

function rename(value, key) {
  if (typeof value === 'string') {
    if (SKIP_KEYS.has(key) || looksLikeLink(value)) return value
    return value.replace(BRAND, 'iGuide')
  }
  if (Array.isArray(value)) return value.map((v) => rename(v, key))
  // Camera agreement headings are legal copy: kept word for word, as on live
  if (value && typeof value === 'object' && value._type === 'lpAgreement') return value
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = SKIP_KEYS.has(k) && k !== 'link' ? v : rename(v, k)
    return out
  }
  return value
}

const docs = await client.fetch(`*[!(_type match "sanity.*") && !(_type match "system.*")]`)
const byType = {}
let changed = 0
const tx = []
for (const doc of docs) {
  const set = {}
  for (const [k, v] of Object.entries(doc)) {
    if (k.startsWith('_')) continue
    const next = rename(v, k)
    if (JSON.stringify(next) !== JSON.stringify(v)) set[k] = next
  }
  const fields = Object.keys(set)
  if (!fields.length) continue
  changed++
  byType[doc._type] = (byType[doc._type] ?? 0) + 1
  console.log(`${APPLY ? '↻' : '·'} ${doc._type} ${doc._id} (${fields.join(', ')})`)
  tx.push(client.patch(doc._id).ifRevisionId(doc._rev).set(set))
}

console.log(`\n${changed} of ${docs.length} documents ${APPLY ? 'updated' : 'would change'}:`, byType)
if (APPLY) {
  for (let i = 0; i < tx.length; i += 50) {
    const batch = client.transaction()
    for (const p of tx.slice(i, i + 50)) batch.patch(p)
    await batch.commit({visibility: 'async'})
  }
  console.log('Done.')
} else {
  console.log('\nDry run only. Add -- --apply to write the changes.')
}
