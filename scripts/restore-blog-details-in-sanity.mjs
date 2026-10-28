/**
 * Puts back two things the first blog import lost (2026-10-27):
 *  1. Testimonial headshots: 7 quotes on 5 blog posts and 5 quotes on 4 customer stories came
 *     across without their photo.
 *  2. Step lists in "importing-iguide-dwg-files-into-chief-architect": 10 of the 11 checklist
 *     steps became plain paragraphs instead of bullets.
 *
 * Reads the live pages, finds the matching blocks in each Sanity post and sets just those fields
 * (the photo on a testimonial, the list style on a paragraph). Nothing else in the posts is touched,
 * so later clean-ups (links, renames, em dashes) stay as they are. A testimonial or list item is only
 * changed when it matches exactly one block; otherwise it is skipped and reported. Safe to run again.
 *
 * Run from the repo root:
 *   Preview:  npx sanity exec scripts/restore-blog-details-in-sanity.mjs -- --dry-run
 *   Apply:    npx sanity exec scripts/restore-blog-details-in-sanity.mjs --with-user-token
 */
import {getCliClient} from 'sanity/cli'
import {JSDOM, VirtualConsole} from 'jsdom'
import {basename} from 'node:path'

const SITE = 'https://goiguide.com'
const TESTIMONIAL_TARGETS = [
  {type: 'blogPost', path: '/blogs', slug: 'iguide-mediatask-integration'},
  {type: 'blogPost', path: '/blogs', slug: 'keep-your-photographer-immersive-listings-realestate-com-au'},
  {type: 'blogPost', path: '/blogs', slug: 'real-estate-photography-earn-more-per-shoot-australia'},
  {type: 'blogPost', path: '/blogs', slug: 'real-estate-photography-jobs'},
  {type: 'blogPost', path: '/blogs', slug: 'what-makes-a-modern-real-estate-listing'},
  {type: 'customerStory', path: '/customer-stories', slug: 'calgary-real-estate-photos-scales-from-solo-shoots-to-10-million-sq-ft-and-2000-properties-shot-annually-with-iguide'},
  {type: 'customerStory', path: '/customer-stories', slug: 'cutting-delays-boosting-design-pizza-pizzas-path-to-faster-openings'},
  {type: 'customerStory', path: '/customer-stories', slug: 'flood-out-restoration-sets-a-new-standard-for-documentation'},
  {type: 'customerStory', path: '/customer-stories', slug: 'northern-spruce-media-from-scrappy-beginnings-to-600-clients-strong-with-help-from-iguide'},
]
const LIST_TARGET = {type: 'blogPost', path: '/blogs', slug: 'importing-iguide-dwg-files-into-chief-architect'}

const clean = (s) => (s ?? '').replaceAll(/\s+/g, ' ').trim()
const norm = (s) => (s ?? '').toLowerCase().normalize('NFKD').replaceAll(/[^a-z0-9]/g, '')
const stripVariant = (src) => (src ? src.split('?')[0] : src)
const blockPreview = (s) => clean(s).slice(0, 30)
const blockText = (b) => (b.children ?? []).map((c) => c.text ?? '').join('')

const DRY_RUN = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2026-10-06'})
const quiet = new VirtualConsole()
let problems = 0

async function loadPost({type, path, slug}) {
  console.log(`\n${type}: ${slug}`)
  const res = await fetch(`${SITE}${path}/${slug}`, {signal: AbortSignal.timeout(60_000)})
  if (!res.ok) {
    console.log(`  live page ${res.status}, skipped`)
    problems++
    return undefined
  }
  const live = new JSDOM(await res.text(), {virtualConsole: quiet}).window.document
  const docs = await client.fetch(`*[_type == $type && slug.current == $slug]{_id, _rev, body}`, {type, slug})
  if (docs.length !== 1) {
    console.log(`  expected 1 post in Sanity, found ${docs.length}, skipped`)
    problems++
    return undefined
  }
  if ((await client.fetch(`count(*[_id == "drafts." + $id])`, {id: docs[0]._id})) > 0) {
    console.log('  has an unpublished draft: publish or discard it in the Studio first, skipped')
    problems++
    return undefined
  }
  return {live, doc: docs[0]}
}

async function save(doc, set) {
  if (DRY_RUN || !Object.keys(set).length) return
  await client.patch(doc._id).ifRevisionId(doc._rev).set(set).commit()
  console.log(`  saved (${Object.keys(set).length} change${Object.keys(set).length > 1 ? 's' : ''})`)
}

/* ------------------------------------------------------------------ 1. testimonial photos */

async function uploadImage(src) {
  const url = new URL(src, SITE).href
  const res = await fetch(url, {signal: AbortSignal.timeout(60_000)})
  if (!res.ok) throw new Error(`image ${res.status}: ${url}`)
  const asset = await client.assets.upload('image', Buffer.from(await res.arrayBuffer()), {
    filename: basename(new URL(url).pathname),
    source: {name: 'goiguide.com', id: url, url},
  })
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function restoreTestimonialPhotos(target) {
  const post = await loadPost(target)
  if (!post) return
  const {live, doc} = post
  const liveBoxes = [...live.querySelectorAll('main .testimonial-block, main .testimonial-content')].map((box) => ({
    quote: norm(box.querySelector('h3, h4, blockquote')?.textContent),
    photo: [...box.querySelectorAll('img')].map((i) => i.getAttribute('src')).find((src) => src && !/quote\.svg/i.test(src)),
  }))
  const set = {}
  for (const t of (doc.body ?? []).filter((b) => b._type === 'testimonial')) {
    const label = `${t.name ?? '(no name)'}: "${blockPreview(t.quote)}"`
    if (t.image?.asset) {
      console.log(`  ${label}: already has a photo`)
      continue
    }
    // The same person can have several quotes in one story, so match on the quote itself
    const head = norm(t.quote).slice(0, 30)
    const matches = head ? liveBoxes.filter((b) => b.quote.startsWith(head)) : []
    if (matches.length === 1 && !matches[0].photo) {
      console.log(`  ${label}: no photo on the live page either`)
      continue
    }
    if (matches.length !== 1) {
      console.log(`  ${label}: matches ${matches.length} live quotes, skipped`)
      problems++
      continue
    }
    const src = stripVariant(matches[0].photo)
    console.log(`  ${label}: + ${basename(src)}`)
    if (!DRY_RUN) set[`body[_key=="${t._key}"].image`] = await uploadImage(src)
    else set[t._key] = true
  }
  await save(doc, DRY_RUN ? {} : set)
}

/* ------------------------------------------------------------------ 2. step lists */

async function restoreLists(target) {
  const post = await loadPost(target)
  if (!post) return
  const {live, doc} = post
  const body = doc.body ?? []
  const items = [...live.querySelectorAll('main ul.fusion-checklist > li')].map((li) => clean(li.textContent).replace(/^expand_circle_right\s*/, ''))
  const set = {}
  let already = 0
  // Steps repeat ("Click Next or Continue." x4), so walk the post in order: each live item is the
  // next paragraph after the previous one with the same text
  let from = 0
  for (const text of items) {
    const at = body.findIndex((b, i) => i >= from && b._type === 'block' && norm(blockText(b)) === norm(text))
    if (at === -1) {
      console.log(`  "${text.slice(0, 50)}": not found after the previous step, skipped`)
      problems++
      continue
    }
    from = at + 1
    const b = body[at]
    if (b.listItem) {
      already++
      continue
    }
    console.log(`  + bullet: ${blockText(b).slice(0, 60)}`)
    set[`body[_key=="${b._key}"].listItem`] = 'bullet'
    set[`body[_key=="${b._key}"].level`] = 1
  }
  if (already) console.log(`  ${already} item(s) already bullets`)
  await save(doc, set)
}

for (const target of TESTIMONIAL_TARGETS) await restoreTestimonialPhotos(target)
await restoreLists(LIST_TARGET)

console.log(DRY_RUN ? '\nDry run: nothing written.' : '\nDone.')
if (problems) console.log(`${problems} item(s) need a look (see above).`)
