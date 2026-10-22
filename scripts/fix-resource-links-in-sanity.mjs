/**
 * Fixes the broken in-content links found in the Resource Center audit
 * (resource-broken-links.csv). Links live in rich text (markDefs of type "link"),
 * anywhere in any document.
 *
 *   1. Old pages that no longer exist → their current page:
 *        /insurance-and-restoration-old → /insurance-restoration
 *        /facility-management-old       → /facility-management
 *        /cad-deliverables-old          → /iguide/cad-deliverables
 *        /tech-videos-2                 → /video
 *   2. Links to deleted blog posts (/blog/<slug>) → link removed, text kept
 *   3. Malformed links:
 *        chrome-extension:// prefix     → stripped (the real URL after it is kept)
 *        article text pasted as a URL   → link removed, text kept
 *        URL with the link title appended (…/%20The%20high%20cost…) → title cut off
 *
 *   4. Old pages with no matching page: /virtual-showing → /iguide/3d-virtual-tours,
 *      /support_downloads/… (old file) → home (/)
 *   5. Dead external links (404, or the site is down / unreachable; DEAD_EXTERNAL,
 *      from the audit, minus the ones Evan confirmed are fine: nar.realtor, pwc.com, ion.goiguide.com) → link removed, text kept
 *
 * Dry run (lists every change, writes nothing):
 *   npx sanity exec scripts/fix-resource-links-in-sanity.mjs --with-user-token
 * Apply:
 *   npx sanity exec scripts/fix-resource-links-in-sanity.mjs --with-user-token -- --apply
 *
 * Each document is patched only if it hasn't changed since it was read
 * (ifRevisionId), so edits made in the Studio meanwhile are never overwritten.
 */
const APPLY = process.argv.includes('--apply')

const REMAP = new Map([
  ['/insurance-and-restoration-old', '/insurance-restoration'],
  ['/facility-management-old', '/facility-management'],
  ['/cad-deliverables-old', '/iguide/cad-deliverables'],
  ['/tech-videos-2', '/video'],
  ['/virtual-showing', '/iguide/3d-virtual-tours'],
])

// Blog posts that were deleted (the link goes, the text stays)
const DELETED_BLOGS = new Set([
  'proptech-what-does-it-mean-for-real-estate-agents',
  'stop-killing-your-listings-with-inaccurate-measurements',
  'iguide-advantages',
  'real-estate-agent-mistakes',
  'photography-tips-beginners',
  'grow-your-real-estate-photography-business-coronavirus',
  '3d-tour-virtual-showing',
  '3d-tour-virtual-tour-technology',
  'virtual-tour-speed-capture',
])

// Dead external links from the audit (resource-broken-links.csv): 27 return 404, 13 are unreachable; nar.realtor, pwc.com and ion.goiguide.com kept
const DEAD_EXTERNAL = new Set(
  [
    'http://bomacanada.ca/resources/standards/',
    'http://loftlandcreative.com/',
    'http://www.lidar-uk.com/how-lidar-works/',
    'https://cembs.com/impact-of-effective-data-sharing-and-communication-in-construction/',
    'https://iguide-website.zfactorprojects.ca/blog/',
    'https://iguide-website.zfactorprojects.ca/contact/',
    'https://iguide-website.zfactorprojects.ca/planix-camera/',
    'https://seek-now.com/seeker-360-technology/',
    'https://showcasephototours.com/',
    'https://socialmediaweek.org/blog/2019/10/2020-video-marketing-and-statistics-what-brands-need-to-know/',
    'https://www.corelogic.com/intelligence/the-top-four-challenges-facing-the-property-and-casualty-insurance-industry-in-2020/',
    'https://www.digitaljournal.com/pr/iguide-2022-year-in-review-highlights',
    'https://www.digitaljournal.com/pr/iguide-and-houselens-announce-partnership',
    'https://www.digitaljournal.com/pr/iguide-revitalizes-the-3d-experience',
    'https://www.examplelink.com/',
    'https://www.gaitech.net/index.aspx',
    'https://www.goflymediallc.com/',
    'https://www.goiguide.cn/',
    'https://www.houselens.com/iguide/',
    'https://www.insurancejournal.tv/videos/23720/',
    'https://www.likere.com/blog/proptechs-iguide-houselens-enter-into-software-collaboration',
    'https://www.modsy.com/',
    'https://www.nimamohammadi.com/',
    'https://www.realestatetechnews.com/',
    'https://www.realmls.com/what-is-reso/',
    'https://www.realtor.com/advice/buy/how-long-does-it-take-to-buy-a-house/',
    'https://www.reca.ca/licensees-learners/tools-resources/residential-measurement-standard/',
    'https://www.reca.ca/professionals-learners/tools-resources/residential-measurement-standard/',
    'https://www.reca.ca/wp-content/uploads/2018/07/Guide-to-the-Residential-Measurement-Standard-Alberta.pdf',
    'https://www.vectorworks.net/architect',
  ].map((u) => u.toLowerCase().replace(/\/$/, '')),
)

const seenDead = new Set()
const OWN_SITE = /^(?:https?:\/\/(?:www\.)?goiguide\.com|https:\/\/goiguide\.vercel\.app)?(\/[^?#]*)([?#].*)?$/i
const CHROME_EXT = /^(?:https?:\/\/)?chrome-extension:?\/\/[^/]+\/(https?:\/\/.+)$/i
const PASTED_TEXT = /^https?:\/\/Claims%20are pouring/
const TITLE_APPENDED = /^(https?:\/\/[^\s%]+\/)%20.*$/

/** What to do with one link: {action: 'set', href, why} | {action: 'remove', why} | null */
export function classify(href) {
  if (typeof href !== 'string') return null
  const chrome = CHROME_EXT.exec(href)
  if (chrome) return {action: 'set', href: chrome[1], why: 'chrome-extension:// prefix removed'}
  if (PASTED_TEXT.test(href)) return {action: 'remove', why: 'article text pasted as a link'}
  const titled = TITLE_APPENDED.exec(href)
  if (titled) return {action: 'set', href: titled[1], why: 'link title cut off the URL'}
  const key = href.trim().toLowerCase().replace(/\/$/, '')
  if (DEAD_EXTERNAL.has(key)) {
    seenDead.add(key)
    return {action: 'remove', why: 'dead external link'}
  }
  const own = OWN_SITE.exec(href)
  if (!own) return null
  const path = own[1].replace(/\/$/, '')
  const suffix = own[2] ?? ''
  if (REMAP.has(path)) return {action: 'set', href: REMAP.get(path) + suffix, why: 'old page → current page'}
  const blog = /^\/blog\/([^/]+)$/.exec(path)
  if (blog && DELETED_BLOGS.has(blog[1])) return {action: 'remove', why: 'deleted blog post'}
  if (path.startsWith('/support_downloads/')) return {action: 'set', href: '/', why: 'old file → home'}
  return null
}

/** Removes the link annotations in `keys` from a block, keeps the text, and merges spans that now match */
function removeLinks(block, keys) {
  const children = []
  for (const child of block.children) {
    const marks = (child.marks ?? []).filter((m) => !keys.has(m))
    const next = {...child, marks}
    const prev = children[children.length - 1]
    if (prev && prev._type === 'span' && next._type === 'span' && JSON.stringify(prev.marks ?? []) === JSON.stringify(marks)) {
      prev.text += next.text
    } else {
      children.push(next)
    }
  }
  return {...block, markDefs: block.markDefs.filter((d) => !keys.has(d._key)), children}
}

function fixBlock(block, log) {
  const remove = new Set()
  const markDefs = block.markDefs.map((def) => {
    if (def._type !== 'link') return def
    const c = classify(def.href)
    if (!c) return def
    const text = block.children
      .filter((s) => (s.marks ?? []).includes(def._key))
      .map((s) => s.text)
      .join('')
    if (c.action === 'remove') {
      remove.add(def._key)
      log.changes.push(`"${text.slice(0, 60)}": ${def.href.slice(0, 90)} → (link removed, ${c.why})`)
      return def
    }
    log.changes.push(`"${text.slice(0, 60)}": ${def.href} → ${c.href} (${c.why})`)
    return {...def, href: c.href}
  })
  const next = {...block, markDefs}
  return remove.size ? removeLinks(next, remove) : next
}

function walk(node, log) {
  if (Array.isArray(node)) return node.map((n) => walk(n, log))
  if (!node || typeof node !== 'object') return node
  const out = {}
  for (const [k, v] of Object.entries(node)) out[k] = walk(v, log)
  return Array.isArray(out.markDefs) && Array.isArray(out.children) ? fixBlock(out, log) : out
}

/** Changes for one document: {set, changes} (set is empty when nothing changes) */
export function planDoc(doc) {
  const log = {changes: []}
  const set = {}
  for (const [k, v] of Object.entries(doc)) {
    if (k.startsWith('_')) continue
    const next = walk(v, log)
    if (JSON.stringify(next) !== JSON.stringify(v)) set[k] = next
  }
  return {set, ...log}
}

// Run only via `sanity exec` (the module is also imported by a test with sample data)
if (process.argv.some((a) => a.endsWith('fix-resource-links-in-sanity.mjs'))) {
  const {getCliClient} = await import('sanity/cli')
  const client = getCliClient({apiVersion: '2026-10-06'})
  const docs = await client.fetch('*[!(_type match "sanity.*") && !(_type match "system.*")]')
  const tx = client.transaction()
  let links = 0
  let patched = 0
  for (const doc of docs) {
    const plan = planDoc(doc)
    if (!Object.keys(plan.set).length) continue
    console.log(`\n${doc._id} (${doc.title ?? doc._type})`)
    for (const c of plan.changes) console.log(`  ${c}`)
    links += plan.changes.length
    patched++
    tx.patch(doc._id, (p) => p.ifRevisionId(doc._rev).set(plan.set))
  }
  const notFound = [...DEAD_EXTERNAL].filter((u) => !seenDead.has(u))
  if (notFound.length) console.log(`\nDead external links from the audit not found as links in Sanity (${notFound.length}):\n  ${notFound.join('\n  ')}`)
  console.log(`\n${patched} document(s), ${links} link(s) ${APPLY ? 'updated' : 'would change'}.`)
  if (!APPLY) console.log('Dry run: nothing written. Add -- --apply to save.')
  else if (patched) {
    await tx.commit()
    console.log('Saved.')
  }
}
