/**
 * Removes em dashes (—) from the site's page content in Sanity: landing pages,
 * the homepage, testimonials, logo bands, announcements and pop-ups. Blog posts
 * and other Resource Center entries, events, authors and catalogue items are
 * left as they are.
 *
 * Rule (same as the code clean-up): "a — b" / "a—b" becomes "a, b", except a
 * few phrasings where a colon or semicolon reads better (COLON_AFTER, SEMI_BEFORE). The dry run prints
 * every change in context so it can be checked first; fix any odd ones in the
 * Studio afterwards.
 *
 * Dry run (shows what would change, writes nothing):
 *   npx sanity exec scripts/remove-em-dashes-in-sanity.mjs --with-user-token
 * Apply:
 *   npx sanity exec scripts/remove-em-dashes-in-sanity.mjs --with-user-token -- --apply
 *
 * Each document is patched only if it hasn't changed since it was read
 * (ifRevisionId), so edits made in the Studio meanwhile are never overwritten.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-06'})
const APPLY = process.argv.includes('--apply')
const TYPES = ['landingPage', 'homePage', 'testimonial', 'logoBand', 'announcement', 'sitePopup']

// Fields that hold links, IDs or machine values, never visible copy
const SKIP_KEYS = new Set([
  '_id', '_type', '_ref', '_key', '_rev', 'current', 'href', 'url', 'src', 'fileUrl', 'hubspotFormId', 'formId', 'path', 'style',
  'listItem', 'marks', 'youtubeId', 'videoUrl', 'embedUrl',
])
// "…process — it gives…": a new clause after the dash takes a semicolon, not a comma
const SEMI_BEFORE = /\s*—\s*(?=(?:it|it’s|it's|they|we|you|this) )/g
// "Label — rest" where the dash introduces what follows: use a colon
const COLON_AFTER = /(learn more|Don’t miss out|Don't miss out|Fast delivery|Everything you need|integration|certified)\s*—\s*/gi

const changes = []
function clean(value, key) {
  if (typeof value === 'string') {
    if (SKIP_KEYS.has(key) || !value.includes('—')) return value
    // A lone dash used as an empty value becomes an en dash
    if (value.trim() === '—') return value.replace('—', '–')
    const next = value
      .replace(COLON_AFTER, (_, w) => `${w}: `)
      .replace(SEMI_BEFORE, '; ')
      .replaceAll(/\s*—\s*/g, ', ')
      .replaceAll(/,\s*,/g, ',')
      .replace(/^,\s*/, '')
    changes.push([value, next])
    return next
  }
  if (Array.isArray(value)) return value.map((v) => clean(v, key))
  // Camera agreement headings are legal copy: kept word for word, as on live
  if (value && typeof value === 'object' && value._type === 'lpAgreement') return value
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = clean(v, k)
    return out
  }
  return value
}

const docs = await client.fetch(`*[_type in $types]`, {types: TYPES})
const tx = []
for (const doc of docs) {
  const before = changes.length
  const set = {}
  for (const [k, v] of Object.entries(doc)) {
    if (k.startsWith('_')) continue
    const next = clean(v, k)
    if (JSON.stringify(next) !== JSON.stringify(v)) set[k] = next
  }
  if (!Object.keys(set).length) continue
  const title = doc.title ? ` (${doc.title})` : ''
  console.log(`\n${doc._type} ${doc._id}${title}`)
  for (const [a, b] of changes.slice(before)) {
    const i = a.indexOf('—')
    const from = Math.max(0, i - 50)
    console.log(`  - ${a.slice(from, i + 50)}\n  + ${b.slice(from, i + 49)}`)
  }
  tx.push(client.patch(doc._id).ifRevisionId(doc._rev).set(set))
}

console.log(`\n${tx.length} of ${docs.length} documents ${APPLY ? 'updated' : 'would change'} (${changes.length} text fields).`)
if (APPLY) {
  for (let i = 0; i < tx.length; i += 50) {
    const batch = client.transaction()
    for (const p of tx.slice(i, i + 50)) batch.patch(p)
    await batch.commit({visibility: 'async'})
  }
  console.log('Done.')
} else {
  console.log('Dry run only. Add -- --apply to write the changes.')
}
