/**
 * Copies the logo bands and testimonials written in code (lib/content) into
 * Sanity, so they can be edited in the Studio (Logos, Testimonials).
 *
 *  - Uploads each logo / headshot from public/ (Sanity skips duplicate uploads)
 *  - Reuses an existing Client logo that already has the same image
 *  - Creates one Logo band per band ID and one Testimonial per quote
 *  - Never overwrites a band or testimonial that already exists, so Studio
 *    edits are safe. Only the read-only "Shown on" list is refreshed.
 *
 * Reads scripts/cms-library-manifest.json: a one-time snapshot (2026-10-14) of
 * every logo band and testimonial written in lib/content. After this seed,
 * edit logos and testimonials in the Studio, not in code.
 * Run from the repo root while logged in to the Sanity CLI:
 *
 *   npx sanity exec scripts/seed-cms-library.mjs --with-user-token
 *   npx sanity exec scripts/seed-cms-library.mjs --with-user-token -- --dry-run
 */
import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {basename, extname, join} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {slugify} from '../lib/cmsKeys.mjs'

const client = getCliClient({apiVersion: '2026-10-06'})
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const MANIFEST = join(process.cwd(), 'scripts', 'cms-library-manifest.json')

const log = (...a) => console.log(...a)
const warnings = []
const warn = (msg) => {
  warnings.push(msg)
  console.warn(`! ${msg}`)
}

/** "logo - RE/MAX" → "RE/MAX", "Snap Photo logo" → "Snap Photo" */
const logoName = (alt) => alt.replace(/^logo\s*-\s*/i, '').replace(/\s+logo$/i, '').trim() || alt

const uploads = new Map()
async function upload(src) {
  if (uploads.has(src)) return uploads.get(src)
  const path = join('public', decodeURIComponent(src))
  if (!existsSync(path)) {
    warn(`File not found, skipped: ${path}`)
    uploads.set(src, null)
    return null
  }
  const asset = DRY_RUN ? {_id: `dry-${src}`} : await client.assets.upload('image', createReadStream(path), {filename: basename(path)})
  uploads.set(src, asset._id)
  return asset._id
}

const logoRefs = new Map()
/** Client logo document for this image: existing one with the same image, or a new one. */
async function clientLogo({src, alt}) {
  if (logoRefs.has(src)) return logoRefs.get(src)
  const assetId = await upload(src)
  if (!assetId) return null
  const name = logoName(alt)
  let _id = DRY_RUN ? null : await client.fetch('*[_type == "clientLogo" && logo.asset._ref == $assetId][0]._id', {assetId})
  if (!_id) {
    _id = `clientLogo-${slugify(name)}`
    const taken = DRY_RUN ? null : await client.getDocument(_id)
    if (taken) _id = `clientLogo-${slugify(name)}-${slugify(basename(src, extname(src)))}`
    if (!DRY_RUN) await client.createIfNotExists({_id, _type: 'clientLogo', name, logo: {_type: 'image', asset: {_type: 'reference', _ref: assetId}}})
    log(`  + logo ${name} (${_id})`)
  }
  logoRefs.set(src, _id)
  return _id
}

const exists = async (_id) => !DRY_RUN && !!(await client.getDocument(_id))

async function main() {
  const {bands, testimonials, conflicts} = JSON.parse(readFileSync(MANIFEST, 'utf8'))
  if (conflicts.length) throw new Error(`Fix these in lib/content first:\n${conflicts.join('\n')}`)
  log(`${bands.length} logo bands, ${testimonials.length} testimonials${DRY_RUN ? ' (dry run, nothing written)' : ''}\n`)

  const stats = {bandsCreated: 0, bandsKept: 0, testimonialsCreated: 0, testimonialsKept: 0}

  for (const band of bands) {
    if (await exists(band._id)) {
      await client.patch(band._id).set({usedOn: band.usedOn}).commit()
      stats.bandsKept++
      log(`= band ${band.band} (already in Sanity, kept)`)
      continue
    }
    const refs = []
    for (const logo of band.logos) {
      const ref = await clientLogo(logo)
      if (ref && !refs.some((r) => r._ref === ref)) refs.push({_key: slugify(ref).slice(-40), _type: 'reference', _ref: ref})
    }
    if (!DRY_RUN) await client.createIfNotExists({_id: band._id, _type: 'logoBand', title: `${band.title} (${band.usedOn.join(', ')})`, logos: refs, usedOn: band.usedOn})
    stats.bandsCreated++
    log(`+ band ${band.band}: ${refs.length} logos`)
  }

  for (const t of testimonials) {
    if (await exists(t._id)) {
      await client.patch(t._id).set({usedOn: t.usedOn}).commit()
      stats.testimonialsKept++
      log(`= testimonial ${t._id} (already in Sanity, kept)`)
      continue
    }
    const photoAsset = t.photo ? await upload(t.photo.src) : null
    const logoRef = t.logo ? await clientLogo(t.logo) : null
    const doc = {
      _id: t._id,
      _type: 'testimonial',
      hidden: false,
      quote: t.quote,
      detail: t.detail,
      name: t.name,
      role: t.role,
      company: t.company,
      link: t.link?.href ? {_type: 'link', label: t.link.label, href: t.link.href} : undefined,
      photo: photoAsset ? {_type: 'image', alt: t.photo.alt, asset: {_type: 'reference', _ref: photoAsset}} : undefined,
      companyLogo: logoRef ? {_type: 'reference', _ref: logoRef} : undefined,
      usedOn: t.usedOn,
    }
    if (!DRY_RUN) await client.createIfNotExists(doc)
    stats.testimonialsCreated++
    log(`+ testimonial ${[t.name, t.company].filter(Boolean).join(', ') || t._id}${t.hasVideo ? ' (video stays in code)' : ''}`)
  }

  log(`\nDone. ${JSON.stringify(stats)}. ${warnings.length} warnings.`)
}

main().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
