/**
 * Creates the five live paid-media landing pages (/get-iguide/rep/learn-more,
 * -b, /get-iguide/aec/learn-more, -b, /get-iguide/rep/iguide-for-real-estate-photographers-au) as Landing page documents,
 * plus the testimonials they use. Images are uploaded from public/.
 *
 * Never overwrites a page or testimonial that already exists (so Studio edits
 * are safe), unless you pass --overwrite.
 *
 * Needs the logo bands from scripts/seed-cms-library.mjs (run that first): each page gets its
 * own copy of a band's logo list, so editing a landing page never changes the site's bands.
 * Run from the repo root while logged in to the Sanity CLI:
 *   npx sanity exec scripts/seed-landing-pages.mjs --with-user-token
 */
import {createReadStream, existsSync} from 'node:fs'
import {basename, join} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {pages, testimonials} from './landing-pages/content.mjs'

const client = getCliClient({apiVersion: '2026-10-06'})
const OVERWRITE = process.argv.includes('--overwrite')

const uploads = new Map()
async function upload(path) {
  if (uploads.has(path)) return uploads.get(path)
  const file = join('public', decodeURIComponent(path))
  if (!existsSync(file)) {
    console.warn(`! Missing ${file}: image left empty`)
    uploads.set(path, null)
    return null
  }
  const asset = await client.assets.upload('image', createReadStream(file), {filename: basename(file)})
  uploads.set(path, asset._id)
  return asset._id
}

/** Turn {img} and {ref} markers into Sanity values */
async function resolve(value) {
  if (Array.isArray(value)) return Promise.all(value.map(resolve))
  if (value && typeof value === 'object') {
    if ('img' in value) {
      const id = await upload(value.img)
      return id ? {_type: 'image', alt: value.alt, asset: {_type: 'reference', _ref: id}} : undefined
    }
    // {logosFrom: '<band id>'}: copy that band's logo list into this section
    if ('logosFrom' in value) {
      const {logosFrom, ...rest} = value
      const band = await client.getDocument(logosFrom)
      const logos = (band?.logos ?? []).map((r, i) => ({_type: 'reference', _ref: r._ref, _key: `l${i}`}))
      return {...(await resolve(rest)), logos}
    }
    if ('ref' in value) return {_type: 'reference', _ref: value.ref, ...('_key' in value ? {_key: value._key} : {})}
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      const r = await resolve(v)
      if (r !== undefined) out[k] = r
    }
    return out
  }
  return value
}

// References inside arrays need a _key
function keyRefs(value) {
  if (Array.isArray(value)) return value.map((v, i) => (v && typeof v === 'object' && v._type === 'reference' && !v._key ? {...v, _key: `r${i}`} : keyRefs(v)))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, keyRefs(v)]))
  return value
}

async function save(doc) {
  const exists = await client.getDocument(doc._id)
  if (exists && !OVERWRITE) {
    console.log(`= ${doc._id} already exists, kept`)
    return
  }
  await client.createOrReplace(keyRefs(await resolve(doc)))
  console.log(`${exists ? '↻' : '+'} ${doc._id}`)
}

async function main() {
  for (const band of ['logoBand-real-estate', 'logoBand-aec-customers', 'logoBand-cad-software']) {
    if (!(await client.getDocument(band))) console.warn(`! ${band} not found: run scripts/seed-cms-library.mjs first, or pick a band in the Studio`)
  }
  for (const t of testimonials) await save({_type: 'testimonial', hidden: false, ...t})
  for (const p of pages) await save({_type: 'landingPage', ...p})
  console.log('\nDone. Open the Studio → Landing pages (paid media) to review.')
}

main().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
