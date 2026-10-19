/**
 * Brings live goiguide.com pages that aren't in the sitemap (thank-you, showcase
 * and ad pages) into Sanity as landing pages at the same URLs, using the same
 * section types as the other landing pages. Content, images, logos, testimonials
 * and tours come from the live page (scripts/landing-pages/convert-live.mjs).
 * The list of pages is in scripts/landing-pages/live-pages.mjs.
 *
 * Run from the repo root while logged in to the Sanity CLI:
 *   Preview only (writes JSON to scripts/.import-preview/landing-pages/, nothing to Sanity):
 *     npx sanity exec scripts/import-live-landing-pages.mjs -- --dry-run
 *   Import (skips pages that already exist):
 *     npx sanity exec scripts/import-live-landing-pages.mjs --with-user-token
 *   Options: --overwrite (replace existing pages), --only /get-iguide/rep/thank-you,/…
 *
 * Images are uploaded from public/ when the file is there, otherwise from the live site.
 * Logos are matched to existing client logos by file (new ones are added to the library);
 * testimonials are matched to existing ones by their quote, otherwise created.
 * Reads the public live site only. No customer data is touched.
 */
import {createHash} from 'node:crypto'
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {basename, join} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {convertPage} from './landing-pages/convert-live.mjs'
import {folders, livePages} from './landing-pages/live-pages.mjs'

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const OVERWRITE = args.includes('--overwrite')
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null
const client = DRY_RUN ? null : getCliClient({apiVersion: '2026-10-06'})
const PREVIEW = join(process.cwd(), 'scripts/.import-preview/landing-pages')
const SITE = 'https://goiguide.com'
const log = (...a) => console.log(...a)
const norm = (s) =>
  (s ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
const key = (s) => createHash('sha1').update(s).digest('hex').slice(0, 10)

async function fetchPage(path) {
  const res = await fetch(`${SITE}${path}`, {headers: {'User-Agent': 'goiguide-migration/1.0'}})
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`)
  return res.text()
}

/* ---------------------------------------------------------------- images */
const uploads = new Map()
async function uploadImage(src) {
  if (!src) return null
  if (uploads.has(src)) return uploads.get(src)
  if (DRY_RUN) return `dry:${src}`
  const local = join(process.cwd(), 'public', src.split('?')[0])
  let buffer
  if (src.startsWith('/') && existsSync(local)) buffer = readFileSync(local)
  else {
    const res = await fetch(new URL(src, SITE))
    if (!res.ok) {
      console.warn(`  ! image ${res.status}: ${src}`)
      uploads.set(src, null)
      return null
    }
    buffer = Buffer.from(await res.arrayBuffer())
  }
  const asset = await client.assets.upload('image', buffer, {filename: basename(src.split('?')[0])})
  uploads.set(src, asset._id)
  return asset._id
}

/* ---------------------------------------------------------------- logos & testimonials */
const logoIds = new Map()
async function clientLogo({src, alt}) {
  if (!src) return null
  if (logoIds.has(src)) return logoIds.get(src)
  const assetId = await uploadImage(src)
  if (!assetId) return null
  const name = (alt || basename(src).replace(/\.[a-z]+$/i, '')).replace(/^logo\s*-\s*/i, '').trim()
  let _id = DRY_RUN ? `clientLogo-${slugify(name)}` : await client.fetch('*[_type == "clientLogo" && logo.asset._ref == $assetId][0]._id', {assetId})
  if (!_id) {
    _id = `clientLogo-${slugify(name)}-${key(src).slice(0, 6)}`
    await client.createIfNotExists({_id, _type: 'clientLogo', name, logo: {_type: 'image', asset: {_type: 'reference', _ref: assetId}}})
    log(`  + logo ${name}`)
  }
  logoIds.set(src, _id)
  return _id
}

let existingTestimonials = null
async function testimonial(t) {
  if (!existingTestimonials) existingTestimonials = DRY_RUN ? [] : await client.fetch('*[_type == "testimonial"]{_id, quote}')
  const match = existingTestimonials.find((x) => norm(x.quote) === norm(t.quote))
  if (match) return match._id
  const {logo, photo, ...rest} = t
  const companyLogo = logo ? await clientLogo(logo) : null
  const photoId = photo?.src ? await uploadImage(photo.src) : null
  const doc = {
    ...rest,
    hidden: false,
    ...(companyLogo ? {companyLogo: {_type: 'reference', _ref: companyLogo}} : {}),
    ...(photoId ? {photo: {_type: 'image', alt: photo.alt || rest.name || '', asset: {_type: 'reference', _ref: photoId}}} : {}),
  }
  if (DRY_RUN) return doc._id
  await client.createIfNotExists(doc)
  existingTestimonials.push({_id: doc._id, quote: doc.quote})
  log(`  + testimonial ${doc.name ?? doc.company ?? doc._id}`)
  return doc._id
}

/* ---------------------------------------------------------------- resources */
// Live featured-post cards link to a resource page (/blogs/<slug>) or straight to a file (brochures)
const resourceBases = {
  '/blogs': 'blogPost',
  '/white-papers-and-ebooks': 'whitePaper',
  '/customer-stories': 'customerStory',
  '/brochures': 'brochure',
  '/videos': 'video',
  '/webinars': 'webinar',
  '/news': 'newsArticle',
}
let fileResources = null
async function resourceId(href) {
  const u = new URL(href, 'https://goiguide.com')
  const path = decodeURI(u.pathname).replace(/\/$/, '')
  if (DRY_RUN) return `resource:${path}`
  const base = Object.keys(resourceBases).find((b) => path.startsWith(`${b}/`))
  let id
  if (base) {
    id = await client.fetch('*[_type == $type && slug.current == $slug][0]._id', {type: resourceBases[base], slug: path.slice(base.length + 1)})
  } else {
    fileResources ??= await client.fetch(
      '*[_type in ["blogPost", "whitePaper", "customerStory", "brochure", "video", "webinar", "newsArticle", "galleryItem"] && defined(coalesce(externalUrl, tourUrl))]{_id, "url": coalesce(externalUrl, tourUrl)}',
    )
    const file = basename(path).toLowerCase()
    id = fileResources.find((r) => decodeURI(new URL(r.url, 'https://goiguide.com').pathname).toLowerCase().endsWith(`/${file}`))?._id
  }
  if (!id) log(`  ! no resource found for ${href} (card left out)`)
  return id ?? undefined
}

/* ---------------------------------------------------------------- markers → Sanity values */
async function resolve(value) {
  if (Array.isArray(value)) {
    const items = []
    for (const [i, v] of value.entries()) {
      const r = await resolve(v)
      if (r === undefined) continue
      items.push(r && typeof r === 'object' && !Array.isArray(r) && !r._key ? {...r, _key: `k${i}${key(JSON.stringify(r)).slice(0, 6)}`} : r)
    }
    return items
  }
  if (value && typeof value === 'object') {
    if ('img' in value) {
      const id = await uploadImage(value.img)
      return id ? {_type: 'image', alt: value.alt || undefined, asset: {_type: 'reference', _ref: id}} : undefined
    }
    if ('ref' in value) return {_type: 'reference', _ref: value.ref}
    if ('resource' in value) {
      const id = await resourceId(value.resource)
      return id ? {_type: 'reference', _ref: id} : undefined
    }
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (k === 'logoImages') {
        const refs = []
        for (const l of v) {
          const id = await clientLogo(l)
          if (id && !refs.some((r) => r._ref === id)) refs.push({_type: 'reference', _ref: id, _key: key(id)})
        }
        out.logos = refs
        continue
      }
      const r = await resolve(v)
      if (r !== undefined) out[k] = r
    }
    return out
  }
  return value
}

/* ---------------------------------------------------------------- main */
async function main() {
  if (!DRY_RUN) for (const f of folders) await client.createIfNotExists({...f, _type: 'landingPageFolder'})
  const stats = {}
  const report = []
  for (const page of livePages.filter((p) => !ONLY || ONLY.includes(p.path))) {
    const _id = `landingPage-${slugify(page.path)}`
    try {
      if (!DRY_RUN && !OVERWRITE && (await client.getDocument(_id))) {
        log(`= ${page.path} already exists, kept`)
        stats.kept = (stats.kept ?? 0) + 1
        continue
      }
      const html = await fetchPage(page.path)
      const {doc, testimonials, unsupported} = convertPage(html, page.path, {chrome: page.chrome})
      // Testimonials first (sections reference them)
      const ids = new Map()
      for (const t of testimonials) ids.set(t._id, await testimonial(t))
      for (const s of doc.sections) if (s._type === 'lpTestimonials') s.items = s.items.map((r) => ({ref: ids.get(r.ref) ?? r.ref}))
      const full = await resolve({
        ...doc,
        _id,
        layout: page.layout ?? 'lead-form',
        folder: {ref: page.folder},
        notes: `Imported from the live page ${SITE}${page.path} on ${new Date().toISOString().slice(0, 10)}.${unsupported.length ? ` Not imported (review): ${unsupported.map((u) => `${u.kind} "${u.text.slice(0, 60)}"`).join('; ')}` : ''}`,
      })
      if (DRY_RUN) {
        mkdirSync(PREVIEW, {recursive: true})
        writeFileSync(join(PREVIEW, `${_id}.json`), JSON.stringify({doc: full, testimonials, unsupported}, null, 2))
      } else await client.createOrReplace(full)
      log(`${DRY_RUN ? '·' : '+'} ${page.path} (${doc.sections.length} sections${unsupported.length ? `, ${unsupported.length} to review` : ''})`)
      stats.written = (stats.written ?? 0) + 1
      report.push({path: page.path, sections: doc.sections.map((s) => s._type), unsupported})
    } catch (error) {
      console.warn(`! ${page.path}: ${error.message}`)
      stats.failed = (stats.failed ?? 0) + 1
    }
  }
  mkdirSync(PREVIEW, {recursive: true})
  writeFileSync(join(PREVIEW, 'report.json'), JSON.stringify({finishedAt: new Date().toISOString(), dryRun: DRY_RUN, stats, report}, null, 2))
  log(`\nDone. ${JSON.stringify(stats)}. Report: scripts/.import-preview/landing-pages/report.json`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
