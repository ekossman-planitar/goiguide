/**
 * Turns the flattened tables in five imported pages (3 blog posts, 1 ebook, 1 white paper) back into real "table" blocks (2026-10-27).
 *
 * The first import had no table support, so every <table> on the live pages became a run of
 * paragraphs (and tick / cross icon cells became full-width images). This reads the tables from
 * the live pages, finds the matching run of paragraphs and images in each Sanity post, and swaps
 * that run for one table block, re-using the images already uploaded. Nothing else in the posts is
 * touched, so later clean-ups (links, renames, em dashes) stay as they are.
 *
 * A table is only converted when its whole text matches one run of blocks exactly once;
 * otherwise it is skipped and reported. Safe to run again: converted tables are left alone.
 *
 * Run from the repo root:
 *   Preview:  npx sanity exec scripts/convert-tables-in-sanity.mjs -- --dry-run
 *   Apply:    npx sanity exec scripts/convert-tables-in-sanity.mjs --with-user-token
 */
import {getCliClient} from 'sanity/cli'
import {JSDOM, VirtualConsole} from 'jsdom'
import {randomBytes} from 'node:crypto'

const SITE = 'https://goiguide.com'
const TARGETS = [
  {type: 'blogPost', path: '/blogs', slug: 'why-subscription-fees-suck-and-why-iguides-pay-per-project-model-respects-your-business'},
  {type: 'blogPost', path: '/blogs', slug: 'comparing-iguide-camera-systems-is-the-new-r1-your-perfect-fit'},
  {type: 'blogPost', path: '/blogs', slug: 'iguide-cad-deliverables-guide'},
  {type: 'ebook', path: '/ebooks', slug: 'a-new-definition-of-professionalism'},
  {type: 'whitePaper', path: '/white-papers-and-ebooks', slug: 'the-ultimate-guide-to-capturing-and-measuring-xl-interior-spaces'},
]

const key = () => randomBytes(6).toString('hex')
const clean = (s) => (s ?? '').replaceAll(/\s+/g, ' ').trim()
const norm = (s) => (s ?? '').toLowerCase().normalize('NFKD').replaceAll(/[^a-z0-9]/g, '')
const stripVariant = (src) => (src ? src.split('?')[0] : src)

/* ------------------------------------------------------------------ live tables */

/** Alt text for the tick / cross icons used in comparison tables (live has none) */
function iconAlt(src) {
  const name = (src ?? '').split('/').pop().toLowerCase()
  if (/^(check|tick)/.test(name)) return 'Advantage'
  if (/^(x|cross)\d*\./.test(name)) return 'Drawback'
  return ''
}

function readCell(td) {
  const img = td.querySelector('img')
  const copy = td.cloneNode(true)
  copy.querySelectorAll('img, script, style').forEach((n) => n.remove())
  // One line per paragraph or list item
  const paras = [...copy.querySelectorAll('li, p')].filter((n) => !n.querySelector('li, p'))
  const text = paras.length ? paras.map((p) => clean(p.textContent)).filter(Boolean).join('\n') : clean(copy.textContent)
  const squash = (t) => t.replaceAll(/\s+/g, '')
  const strong = [...copy.querySelectorAll('strong, b')].map((n) => n.textContent).join('')
  return {text, bold: Boolean(text) && squash(strong) === squash(text), hasImage: Boolean(img), alt: clean(img?.getAttribute('alt')) || iconAlt(img?.getAttribute('src'))}
}

/** Every table inside the page's main content, as rows of cells */
export function readTables(doc) {
  return [...doc.querySelectorAll('main table')]
    .map((table) => [...table.rows].map((tr) => [...tr.cells].map(readCell)).filter((r) => r.length))
    .filter((rows) => rows.length)
}

/* ------------------------------------------------------------------ matching */

const blockKey = (b) => (b._type === 'image' ? 'IMG' : b._type === 'block' ? norm((b.children ?? []).map((c) => c.text ?? '').join('')) : `#${b._type}`)

/** Match one cell's text lines and image at body[p...]. Returns {p, image} or undefined. */
function matchCell(body, p, cell) {
  const lines = cell.text ? cell.text.split('\n').map(norm).filter(Boolean) : []
  const skipEmpty = (i) => {
    while (i < body.length && body[i]._type === 'block' && blockKey(body[i]) === '') i++
    return i
  }
  const tryOrder = (imageFirst) => {
    let i = p
    let image
    const takeImage = () => {
      i = skipEmpty(i)
      if (body[i]?._type !== 'image' || !body[i].asset) return false
      image = body[i]
      i++
      return true
    }
    if (cell.hasImage && imageFirst && !takeImage()) return undefined
    for (const line of lines) {
      i = skipEmpty(i)
      if (!body[i] || blockKey(body[i]) !== line) return undefined
      i++
    }
    if (cell.hasImage && !imageFirst && !takeImage()) return undefined
    return {p: i, image}
  }
  return tryOrder(false) ?? (cell.hasImage && lines.length ? tryOrder(true) : undefined)
}

/** Find the one run of blocks that is this table, flattened. Returns {start, end, block} or {error}. */
export function planTable(body, rows) {
  const cells = rows.flat()
  if (!cells.some((c) => c.text || c.hasImage)) return {error: 'table has no content'}
  const found = []
  for (let start = 0; start < body.length; start++) {
    if (body[start]._type === 'block' && blockKey(body[start]) === '') continue
    let p = start
    const placed = []
    let ok = true
    for (const cell of cells) {
      if (!cell.text && !cell.hasImage) {
        placed.push(undefined)
        continue
      }
      const m = matchCell(body, p, cell)
      if (!m) {
        ok = false
        break
      }
      p = m.p
      placed.push(m.image)
    }
    if (ok && p > start) found.push({start, end: p, placed})
  }
  if (found.length === 0) return {error: 'no matching run of paragraphs found (already converted, or the text was edited)'}
  if (found.length > 1) return {error: `matches ${found.length} places, not converting`}
  const {start, end, placed} = found[0]
  let n = 0
  const block = {
    _type: 'table',
    _key: key(),
    headerRow: true,
    firstColumnHeader: true,
    rows: rows.map((r) => ({
      _type: 'tableRow',
      _key: key(),
      cells: r.map((c) => {
        const img = placed[n++]
        return {
          _type: 'tableCell',
          _key: key(),
          ...(c.text ? {text: c.text} : {}),
          ...(c.bold ? {bold: true} : {}),
          ...(img ? {image: {_type: 'image', asset: img.asset}} : {}),
          ...(img && c.alt ? {alt: c.alt} : {}),
        }
      }),
    })),
  }
  return {start, end, block}
}

/** Swap each planned run for its table block (last first so indexes stay valid) */
export function applyPlans(body, plans) {
  const out = [...body]
  for (const p of [...plans].sort((a, b) => b.start - a.start)) out.splice(p.start, p.end - p.start, p.block)
  return out
}

/* ------------------------------------------------------------------ run */

async function main() {
  const DRY_RUN = process.argv.includes('--dry-run')
  const client = getCliClient({apiVersion: '2026-10-06'})
  const quiet = new VirtualConsole()
  let problems = 0

  for (const {type, path, slug} of TARGETS) {
    console.log(`\n${type}: ${slug}`)
    const res = await fetch(`${SITE}${path}/${slug}`, {signal: AbortSignal.timeout(60_000)})
    if (!res.ok) {
      console.log(`  live page ${res.status}, skipped`)
      problems++
      continue
    }
    const tables = readTables(new JSDOM(await res.text(), {virtualConsole: quiet}).window.document)
    const docs = await client.fetch(`*[_type == $type && slug.current == $slug]{_id, _rev, body}`, {type, slug})
    if (docs.length !== 1) {
      console.log(`  expected 1 post in Sanity, found ${docs.length}, skipped`)
      problems++
      continue
    }
    const [doc] = docs
    if ((await client.fetch(`count(*[_id == "drafts." + $id])`, {id: doc._id})) > 0) {
      console.log('  has an unpublished draft: publish or discard it in the Studio first, skipped')
      problems++
      continue
    }
    const body = doc.body ?? []
    const plans = []
    tables.forEach((rows, i) => {
      const plan = planTable(body, rows)
      const label = `table ${i + 1} (${rows.length} rows x ${Math.max(...rows.map((r) => r.length))} columns)`
      if (plan.error) {
        console.log(`  ${label}: ${plan.error}`)
        if (!/already converted/.test(plan.error)) problems++
      } else {
        console.log(`  ${label}: replaces ${plan.end - plan.start} blocks (${body.slice(plan.start, plan.end).filter((b) => b._type === 'image').length} images re-used)`)
        plans.push(plan)
      }
    })
    if (!plans.length) continue
    if (DRY_RUN) continue
    await client.patch(doc._id).ifRevisionId(doc._rev).set({body: applyPlans(body, plans)}).commit()
    console.log(`  saved (${plans.length} table${plans.length > 1 ? 's' : ''})`)
  }
  console.log(DRY_RUN ? '\nDry run: nothing written.' : '\nDone.')
  if (problems) console.log(`${problems} table(s)/post(s) need a look (see above).`)
}

await main()
