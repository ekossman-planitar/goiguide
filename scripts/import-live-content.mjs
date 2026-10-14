/**
 * Import the live goiguide.com CMS entries into Sanity:
 * blog posts, news, customer stories, white papers, eBooks, brochures, videos,
 * webinars, iGUIDE Gallery tours and Marketing Catalogue files (~500 items).
 *
 * How it works
 *  1. Reads every card from each live listing page (the same feeds the live
 *     Resource Center uses), including where the card links to and its categories.
 *  2. Reads every entry page from the live sitemap (plus entries the sitemap misses):
 *     title, date, summary, header image/video, body, SEO title and description.
 *  3. Converts the body HTML to Sanity rich text, uploads images to Sanity, and
 *     creates one document per entry with a fixed ID (<type>-<slug>), so it can be
 *     re-run safely.
 *
 * Run from the repo root (needs the Sanity CLI login, same as import-logos):
 *
 *   Preview only, nothing written to Sanity (writes JSON to scripts/.import-preview/):
 *     npx sanity exec scripts/import-live-content.mjs -- --dry-run --limit 3
 *
 *   Real import (skips documents that already exist):
 *     npx sanity exec scripts/import-live-content.mjs --with-user-token
 *
 * Options (after --):
 *   --dry-run          Don't write to Sanity or upload images; save previews instead
 *   --types a,b        Only these types (blogPost, newsArticle, customerStory, whitePaper,
 *                      ebook, brochure, video, webinar, galleryItem, catalogueItem)
 *   --limit N          At most N entries per type (for testing)
 *   --overwrite        Replace documents that already exist (loses Studio edits to them)
 *
 * Reads the public live site only. No customer data is touched.
 */
import {getCliClient} from 'sanity/cli'
import {JSDOM, VirtualConsole} from 'jsdom'

// The live pages' Tailwind CSS trips jsdom's CSS parser; we never need the styles, so keep its errors out of the log
const quietConsole = new VirtualConsole()
quietConsole.on('jsdomError', (err) => {
  if (!/Could not parse CSS stylesheet/i.test(err.message)) console.error(err.message)
})
const jsdom = (html) => new JSDOM(html, {virtualConsole: quietConsole})
import {htmlToPortableText} from '@portabletext/html'
import {compileSchema, defineSchema} from '@portabletext/schema'
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {randomBytes} from 'node:crypto'
import {basename, join} from 'node:path'

const SITE = 'https://goiguide.com'
const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const option = (name) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : undefined
}
const DRY_RUN = flag('dry-run')
const OVERWRITE = flag('overwrite')
const LIMIT = option('limit') ? Number(option('limit')) : Infinity
const ONLY = option('types')?.split(',')

const client = DRY_RUN || process.env.IMPORT_LIVE_TEST ? null : getCliClient({apiVersion: '2026-10-08'})
const PREVIEW_DIR = join(process.cwd(), 'scripts/.import-preview')
const CACHE_FILE = join(process.cwd(), 'scripts/.import-cache.json')

/* ------------------------------------------------------------------ config */

// Mirrors lib/resourceTypes.ts and lib/catalogue.ts (kept here so this plain JS script runs without a TS build)
const TYPES = [
  {type: 'blogPost', base: '/blogs', feed: '/blogs', categories: ['residential-real-estate', 'real-estate-photography', 'architecture-and-remodeling', 'insurance-and-restoration', 'facility-management', 'design-and-construction']},
  {type: 'newsArticle', base: '/news', feed: '/news', categories: ['press-releases', 'in-the-media', 'featured-stories']},
  {type: 'customerStory', base: '/customer-stories', feed: '/customer-stories', categories: ['residential-real-estate', 'real-estate-photography', 'architecture-and-remodeling', 'insurance-and-restoration', 'design-and-construction']},
  {type: 'whitePaper', base: '/white-papers-and-ebooks', feed: '/white-papers-and-ebooks', categories: []},
  {type: 'ebook', base: '/ebooks', feed: '/ebooks', categories: []},
  {type: 'brochure', base: '/brochures', feed: '/brochures', categories: ['residential-real-estate', 'real-estate-photography', 'architecture-and-remodeling', 'commercial-design', 'insurance-and-restoration', 'facility-management']},
  {type: 'video', base: '/video', feed: '/video', categories: ['residential-real-estate', 'real-estate-photography', 'architecture-and-remodeling', 'insurance-and-restoration', 'facility-management']},
  {type: 'webinar', base: '/webinars', feed: '/webinars', categories: ['iguide-solutions', 'q-and-a', 'masterclass']},
  {type: 'galleryItem', base: '/resources-and-media/iguide-gallery', feed: '/resources-and-media/iguide-gallery', categories: ['iguide-offering', 'residential', 'architecture-and-remodeling', 'insurance-and-restoration', 'commercial-and-retail', 'tourism-and-unique-spaces', 'rental', 'cad-floor-plans-and-drawing-packages', 'site-plans', 'drones']},
]
const CATALOGUES = [
  {id: 'photos', base: '/photos'},
  {id: 'videos', base: '/catalogue-videos'},
  {id: 'presentations', base: '/presentations'},
  {id: 'brochures', base: '/catalogue-brochures'},
  {id: 'one-pagers', base: '/one-pagers'},
  {id: 'checklists', base: '/checklists'},
  {id: 'drawing-package-samples', base: '/drawing-package-samples'},
]
// Entries linked on the live site but missing from its sitemap (found by crawling, 2026-10-08)
const EXTRA_URLS = [
  '/customer-stories/six-months-saved-good-carbon-co-s-path-to-faster-redevelopment-with-iguide',
  '/customer-stories/century-home-cafe-renovation-documentation',
  '/customer-stories/northern-spruce-media-from-scrappy-beginnings-to-600-clients-strong-with-help-from-iguide',
  '/customer-stories/from-3-hours-to-30-minutes-montreal-architect-wins-back-time-to-design-with-iguide',
  '/customer-stories/restaurant-remodel-planning',
  '/customer-stories/facility-management-documentation-bgis',
]

/* ------------------------------------------------------------------ helpers */

const log = (...a) => console.log(...a)
const warnings = []
const warn = (msg) => {
  warnings.push(msg)
  console.warn('  ! ' + msg)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const key = () => randomBytes(6).toString('hex')
const clean = (s) => (s ?? '').replace(/\s+/g, ' ').trim()
const normTitle = (s) => clean(s).toLowerCase().replace(/[’']/g, "'")
const abs = (url) => (url ? new URL(url, SITE).toString() : url)
/** goiguide.com links become root-relative so they work on any host */
const localise = (url) => {
  if (!url) return url
  try {
    const u = new URL(url, SITE)
    return u.origin === SITE || u.hostname === 'www.goiguide.com' ? u.pathname + u.search + u.hash : u.toString()
  } catch {
    return url
  }
}
/** The live sitemap's <lastmod> for a path (ISO), kept so our sitemap reports the same date until the entry is edited */
const lastmodOf = (sitemap, path) => (sitemap.get(path) ? new Date(sitemap.get(path)).toISOString() : undefined)
const stripVariant = (src) => (src ? src.split('?')[0] : src)

// Be gentle with the live server: during testing, ~12 parallel requests made
// its pages hang for everyone on that connection. Two at a time, with a pause.
const CONCURRENCY = 2
const PAUSE_MS = 400

async function fetchText(path, headers = {}, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      await sleep(PAUSE_MS)
      const res = await fetch(abs(path), {
        headers: {'User-Agent': 'goiguide-migration/1.0', ...headers},
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
      })
      if (res.status === 404 || res.status === 410) return {status: res.status, url: res.url, text: ''}
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return {status: res.status, url: res.url, text: await res.text()}
    } catch (e) {
      if (i === tries) throw new Error(`${path}: ${e.message}`)
      await sleep(800 * i)
    }
  }
}

const parse = (html) => jsdom(html).window.document

async function pool(items, size, fn) {
  const out = []
  let i = 0
  await Promise.all(
    Array.from({length: size}, async () => {
      while (i < items.length) {
        const idx = i++
        out[idx] = await fn(items[idx], idx)
      }
    }),
  )
  return out
}

/* ------------------------------------------------------------------ sitemap */

async function readSitemap() {
  const index = (await fetchText('/sitemap.xml')).text
  const subs = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const entries = new Map()
  for (const sub of subs) {
    const xml = (await fetchText(sub)).text
    for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]
      const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]
      if (loc) entries.set(new URL(loc).pathname.replace(/\/$/, ''), lastmod)
    }
  }
  for (const u of EXTRA_URLS) if (!entries.has(u)) entries.set(u, undefined)
  return entries
}

/* ------------------------------------------------------------------ listing cards */

function parseCards(html) {
  const doc = parse(html)
  const cards = [...doc.querySelectorAll('#blog-listing > a, #blog-listing > div > a')].map((a) => {
    const spans = [...a.querySelectorAll('span')].map((s) => clean(s.textContent)).filter(Boolean)
    return {
      href: a.getAttribute('href'),
      title: clean(a.getAttribute('title') || a.querySelector('h3, h4')?.textContent),
      thumb: stripVariant(a.querySelector('img')?.getAttribute('src')),
      label: clean(a.querySelector('button')?.textContent),
      meta: spans.join(' | '),
    }
  })
  const next = doc.querySelector('#pagination')?.getAttribute('x-intersect')?.match(/\$ajax\('([^']+)'/)?.[1]
  return {cards, next: next?.replace(/&amp;/g, '&')}
}

async function readListing(feed, category) {
  const all = []
  let url = category ? `${feed}?category=${category}` : feed
  let headers = {'X-Resource-Center-Fetch': '1'}
  for (let page = 0; url && page < 100; page++) {
    const {text} = await fetchText(url, headers)
    const {cards, next} = parseCards(text)
    if (!cards.length) break
    all.push(...cards)
    url = next
    headers = {'X-Requested-With': 'XMLHttpRequest', 'X-Resource-Center-Fetch': '1'}
  }
  return all
}

function linkTypeFor(href, base) {
  if (!href) return {linkType: 'page'}
  const u = new URL(href, SITE)
  const local = u.origin === SITE
  if (local && u.pathname.startsWith(base + '/')) return {linkType: 'page'}
  if (/youtu\.?be|vimeo\.com|vidyard\.com/.test(u.hostname)) return {linkType: 'video', externalUrl: u.toString()}
  if (/youriguide\.com|iguideradix\.com|iguide\.au/.test(u.hostname)) return {linkType: 'tour', externalUrl: u.toString()}
  if (/\.(pdf|zip|pptx?|docx?|xlsx?|mp4|mov|png|jpe?g|esx|dwg|rvt|7z)$/i.test(u.pathname) || u.pathname.startsWith('/assets/'))
    return {linkType: 'download', externalUrl: local ? u.pathname : u.toString()}
  return {linkType: 'external', externalUrl: local ? u.pathname + u.search : u.toString()}
}

/* ------------------------------------------------------------------ body conversion */

const ptSchema = compileSchema(
  defineSchema({
    decorators: [{name: 'strong'}, {name: 'em'}, {name: 'underline'}, {name: 'strike-through'}, {name: 'code'}],
    styles: [{name: 'normal'}, {name: 'h1'}, {name: 'h2'}, {name: 'h3'}, {name: 'h4'}, {name: 'h5'}, {name: 'h6'}, {name: 'blockquote'}],
    lists: [{name: 'bullet'}, {name: 'number'}],
    annotations: [{name: 'link', fields: [{name: 'href', type: 'string'}]}],
    blockObjects: [
      {name: 'image', fields: [{name: 'src', type: 'string'}, {name: 'alt', type: 'string'}]},
      {name: 'videoEmbed', fields: [{name: 'url', type: 'string'}, {name: 'title', type: 'string'}]},
    ],
    inlineObjects: [{name: 'image', fields: [{name: 'src', type: 'string'}, {name: 'alt', type: 'string'}]}],
  }),
)

function htmlToBlocks(html) {
  const blocks = htmlToPortableText(html, {
    schema: ptSchema,
    parseHtml: (h) => jsdom(h).window.document,
    whitespaceMode: 'normalize',
    rules: [
      {
        deserialize(el, _next, createBlock) {
          if (el.tagName?.toLowerCase() !== 'iframe') return undefined
          const src = el.getAttribute('src') || el.getAttribute('data-src')
          return src ? createBlock({_type: 'videoEmbed', url: abs(src), title: el.getAttribute('title') || undefined}) : undefined
        },
      },
    ],
    types: {
      image: ({context, value}) =>
        value.src ? {_key: context.keyGenerator(), _type: 'image', src: stripVariant(value.src), alt: value.alt || undefined} : undefined,
    },
  })
  // Fit the site's body styles (h2–h4) and make goiguide.com links relative
  for (const b of blocks) {
    if (b._type !== 'block') continue
    if (b.style === 'h1') b.style = 'h2'
    if (b.style === 'h5' || b.style === 'h6') b.style = 'h4'
    for (const def of b.markDefs ?? []) if (def._type === 'link') def.href = localise(def.href)
  }
  // Lift images out of paragraphs into their own blocks, then drop empty paragraphs
  const out = []
  for (const b of blocks) {
    if (b._type !== 'block') {
      out.push(b)
      continue
    }
    const images = (b.children ?? []).filter((c) => c._type === 'image')
    const spans = (b.children ?? []).filter((c) => c._type !== 'image')
    if (spans.some((c) => clean(c.text))) out.push({...b, children: spans})
    for (const img of images) out.push({_type: 'image', _key: img._key, src: img.src, alt: img.alt})
  }
  return out
}

const THEME_SCRIPTS = /<script[^>]*_resources\/themes[^>]*><\/script>/g

function parseElement(el) {
  const kind = el.className.match(/elements__(\w+)/)?.[1] ?? 'unknown'
  if (kind === 'elementcontent') {
    const inner = el.querySelector('section') ?? el
    inner.querySelectorAll('script, style, noscript').forEach((n) => n.remove())
    return {kind, blocks: htmlToBlocks(inner.innerHTML)}
  }
  if (kind === 'elementctafeaturelarge') {
    const button = el.querySelector('a[href], button')
    const scripts = [...el.querySelectorAll('script')].map((s) => s.textContent).join('\n')
    const formId = scripts.match(/formId:\s*"([^"]+)"/)?.[1]
    const bg = el.querySelector('[style*="background-image"]')?.getAttribute('style')?.match(/url\(([^)]+)\)/)?.[1]
    return {
      kind,
      blocks: [
        {
          _type: 'ctaBanner',
          _key: key(),
          heading: clean(el.querySelector('h2, h3')?.textContent) || undefined,
          text: clean([...el.querySelectorAll('p')].map((p) => p.textContent).join(' ')) || undefined,
          buttonLabel: clean(button?.textContent) || undefined,
          buttonUrl: button?.tagName === 'A' ? localise(button.getAttribute('href')) : undefined,
          hubspotFormId: formId,
          imageSrc: bg ? stripVariant(bg.replace(/["']/g, '')) : undefined,
        },
      ],
    }
  }
  // Embeds: one known pattern swaps the header image for a YouTube video
  const html = el.innerHTML.replace(THEME_SCRIPTS, '').replace(/\s+/g, ' ').trim()
  const headerVideo = /post-header/.test(html) ? html.match(/https:\/\/www\.youtube\.com\/embed\/[\w-]+/)?.[0] : undefined
  if (headerVideo) return {kind, headerVideo, blocks: []}
  return {kind, blocks: html ? [{_type: 'htmlEmbed', _key: key(), html, show: false}] : []}
}

/* ------------------------------------------------------------------ entry pages */

function parseEntry(html, path) {
  const doc = parse(html)
  const section = doc.querySelector('main > section') ?? doc.querySelector('main')
  const header = section?.querySelector('header')
  const h1 = clean((header ?? doc).querySelector('h1')?.textContent)
  const headerImg = stripVariant(header?.querySelector('img')?.getAttribute('src'))
  const headerTexts = [...(header?.querySelectorAll('p') ?? [])].map((p) => clean(p.textContent)).filter(Boolean)
  const headerLinks = [...(header?.querySelectorAll('a[href]') ?? [])].map((a) => ({label: clean(a.textContent), href: a.getAttribute('href')}))

  let ld = {}
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const j = JSON.parse(s.textContent)
      if (j['@type'] === 'Article') ld = j
    } catch {
      /* ignore */
    }
  }
  const meta = (name) => doc.querySelector(`meta[name="${name}"], meta[property="${name}"]`)?.getAttribute('content')
  const redirectTo = html.match(/window\.location\.replace\(["']([^"']+)["']\)/)?.[1]

  const parts = [...(section?.querySelectorAll('article .element') ?? [])].map(parseElement)
  return {
    path,
    title: h1 || clean(doc.title.replace(/\s*\|\s*iGUIDE\s*$/, '')),
    headerImg,
    headerTexts,
    headerLinks,
    datePublished: ld.datePublished,
    author: Array.isArray(ld.author) ? ld.author[0]?.name : ld.author?.name,
    metaTitle: clean(doc.title),
    metaDescription: meta('description'),
    ogImage: stripVariant(meta('og:image')),
    redirectTo,
    headerVideo: parts.find((p) => p.headerVideo)?.headerVideo,
    blocks: parts.flatMap((p) => p.blocks),
    kinds: parts.map((p) => p.kind),
  }
}

/* ------------------------------------------------------------------ images */

const cache = existsSync(CACHE_FILE) ? JSON.parse(readFileSync(CACHE_FILE, 'utf8')) : {assets: {}}
const saveCache = () => writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1))

async function imageRef(src) {
  if (!src) return undefined
  const url = abs(src)
  if (DRY_RUN) return {_type: 'image', _sourceUrl: url}
  if (!cache.assets[url]) {
    await sleep(PAUSE_MS)
    const res = await fetch(url, {signal: AbortSignal.timeout(60_000)})
    if (!res.ok) {
      warn(`image ${res.status}: ${url}`)
      return undefined
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    const asset = await client.assets.upload('image', buffer, {filename: basename(new URL(url).pathname), source: {name: 'goiguide.com', id: url, url}})
    cache.assets[url] = asset._id
    saveCache()
  }
  return {_type: 'image', asset: {_type: 'reference', _ref: cache.assets[url]}}
}

async function resolveImages(blocks) {
  const out = []
  for (const b of blocks) {
    if (b._type === 'image') {
      const img = await imageRef(b.src)
      if (img) out.push({...img, _key: b._key, alt: b.alt})
    } else if (b._type === 'ctaBanner' && b.imageSrc) {
      const {imageSrc, ...rest} = b
      out.push({...rest, image: await imageRef(imageSrc)})
    } else out.push(b)
  }
  return out
}

/* ------------------------------------------------------------------ documents */

const docId = (type, slug) => `${type}-${slug}`.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128)
const authorIds = new Map()

async function authorRef(name) {
  if (!name || /^iguide$/i.test(name)) return undefined
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const _id = `author-${slug}`
  if (!authorIds.has(_id)) {
    authorIds.set(_id, name)
    if (!DRY_RUN) await client.createIfNotExists({_id, _type: 'author', name})
  }
  return {_type: 'reference', _ref: _id}
}

async function write(doc) {
  if (DRY_RUN) {
    const dir = join(PREVIEW_DIR, doc._type)
    mkdirSync(dir, {recursive: true})
    writeFileSync(join(dir, `${doc._id}.json`), JSON.stringify(doc, null, 2))
    return 'previewed'
  }
  if (!OVERWRITE) {
    const exists = await client.fetch('defined(*[_id == $id][0]._id)', {id: doc._id})
    if (exists) return 'skipped (exists)'
  }
  await client.createOrReplace(doc)
  return 'written'
}

async function importType(cfg, sitemap, stats) {
  log(`\n== ${cfg.type} (${cfg.base})`)
  // 1. Cards, with categories
  const cards = await readListing(cfg.feed)
  // Cards keyed by link when it points at the entry page, otherwise by title (titles can repeat)
  const withCats = cards.map((c) => ({...c, categories: []}))
  const cardKey = (c) => {
    const u = new URL(c.href ?? '', SITE)
    return u.origin === SITE && u.pathname.startsWith(cfg.base + '/') ? `path:${u.pathname.replace(/\/$/, '')}` : `title:${normTitle(c.title)}|${c.href}`
  }
  const byKey = new Map(withCats.map((c) => [cardKey(c), c]))
  for (const cat of cfg.categories) {
    for (const c of await readListing(cfg.feed, cat)) byKey.get(cardKey(c))?.categories.push(cat)
  }
  const unmatched = [...withCats]
  const takeCard = (path, title) => {
    let i = unmatched.findIndex((c) => cardKey(c) === `path:${path}`)
    if (i < 0) i = unmatched.findIndex((c) => normTitle(c.title) === normTitle(title))
    return i >= 0 ? unmatched.splice(i, 1)[0] : undefined
  }
  log(`  ${cards.length} cards on the live listing`)

  // 2. Entry URLs: sitemap + internal card links
  const urls = new Set([...sitemap.keys()].filter((p) => p.startsWith(cfg.base + '/') && p.split('/').length === cfg.base.split('/').length + 1))
  for (const c of cards) {
    const u = new URL(c.href ?? '', SITE)
    if (u.origin === SITE && u.pathname.startsWith(cfg.base + '/')) urls.add(u.pathname.replace(/\/$/, ''))
  }
  const list = [...urls].slice(0, LIMIT)
  log(`  ${urls.size} entry pages${list.length < urls.size ? ` (importing ${list.length})` : ''}`)

  await pool(list, CONCURRENCY, async (path) => {
    try {
      const {text, status, url} = await fetchText(path)
      if (!text) return warn(`${path}: HTTP ${status}`)
      if (new URL(url).pathname.replace(/\/$/, '') !== path) warn(`${path} redirects to ${url}`)
      const e = parseEntry(text, path)
      const card = takeCard(path, e.title)
      if (!card) warn(`${path}: no listing card found (title "${e.title}")`)
      const slug = path.split('/').pop()
      const link = linkTypeFor(card?.href, cfg.base)
      const dateText = e.headerTexts.find((t) => /^Date:/i.test(t))
      const summary = e.headerTexts.find((t) => !/^Date:/i.test(t) && !/^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(t))

      const doc = {
        _id: docId(cfg.type, slug),
        _type: cfg.type,
        title: e.title,
        slug: {_type: 'slug', current: slug},
        publishedAt: e.datePublished || (sitemap.get(path) ? new Date(sitemap.get(path)).toISOString() : new Date().toISOString()),
        excerpt: summary,
        featuredImage: await imageRef(e.headerImg || card?.thumb || e.ogImage),
        categories: card?.categories?.length ? card.categories : undefined,
        ...link,
        headerVideoUrl: e.headerVideo,
        body: await resolveImages(e.blocks),
        seo: {_type: 'seo', metaTitle: e.metaTitle, metaDescription: e.metaDescription},
        legacy: {
          url: path,
          lastModified: lastmodOf(sitemap, path),
          importedAt: new Date().toISOString(),
          notes: [
            e.kinds.some((k) => !['elementcontent', 'elementctafeaturelarge', 'elementembedscript'].includes(k)) && `Other blocks: ${e.kinds.join(', ')}`,
            e.blocks.some((b) => b._type === 'htmlEmbed') && 'Has an imported HTML embed (hidden until reviewed)',
            card?.thumb && e.headerImg && card.thumb !== e.headerImg && `Card thumbnail on the old site: ${card.thumb}`,
          ]
            .filter(Boolean)
            .join('\n') || undefined,
        },
      }
      if (cfg.type === 'blogPost') doc.author = await authorRef(e.author)
      if (cfg.type === 'webinar') {
        if (dateText) doc.eventDateText = dateText.replace(/^Date:\s*/i, '')
        const reg = e.headerLinks.find((l) => !/^back$/i.test(l.label) && !/facebook|twitter|linkedin|mailto/i.test(l.href))
        // Live sometimes points the header button back at the page itself; that isn't a real registration link
        if (reg && localise(reg.href) !== path) doc.eventCta = {label: reg.label, href: localise(reg.href)}
      }
      if (cfg.type === 'newsArticle') {
        const cta = e.headerLinks.find((l) => !/^back$/i.test(l.label) && !/facebook|twitter|linkedin|mailto/i.test(l.href))
        if (cta && localise(cta.href) !== path) doc.newsCta = {label: cta.label, href: localise(cta.href)}
      }
      const result = await write(doc)
      stats[result] = (stats[result] ?? 0) + 1
    } catch (err) {
      warn(`${path}: ${err.message}`)
    }
  })
  if (list.length === urls.size) for (const c of unmatched) warn(`${cfg.type}: card "${c.title}" (${c.href}) has no entry page`)
}

async function importCatalogue(cat, sitemap, stats) {
  log(`\n== catalogue ${cat.id} (${cat.base})`)
  const cards = await readListing(cat.base)
  const urls = new Set([...sitemap.keys()].filter((p) => p.startsWith(cat.base + '/')))
  for (const c of cards) {
    const u = new URL(c.href ?? '', SITE)
    if (u.origin === SITE && u.pathname.startsWith(cat.base + '/')) urls.add(u.pathname.replace(/\/$/, ''))
  }
  const list = [...urls].slice(0, LIMIT)
  log(`  ${list.length} items`)
  await pool(list, CONCURRENCY, async (path) => {
    try {
      const {text} = await fetchText(path)
      const e = parseEntry(text, path)
      const card = cards.find((c) => normTitle(c.title) === normTitle(e.title))
      if (!e.redirectTo) warn(`${path}: no file redirect found`)
      const slug = path.split('/').pop()
      const result = await write({
        _id: docId('catalogueItem', `${cat.id}-${slug}`),
        _type: 'catalogueItem',
        title: e.title,
        catalogue: cat.id,
        slug: {_type: 'slug', current: slug},
        fileUrl: localise(e.redirectTo),
        thumbnail: await imageRef(e.headerImg || card?.thumb),
        publishedAt: e.datePublished,
        legacy: {url: path, lastModified: lastmodOf(sitemap, path), importedAt: new Date().toISOString()},
      })
      stats[result] = (stats[result] ?? 0) + 1
    } catch (err) {
      warn(`${path}: ${err.message}`)
    }
  })
}

/* ------------------------------------------------------------------ main */

async function main() {
  log(`Importing from ${SITE}${DRY_RUN ? ' (dry run: nothing is written to Sanity)' : ''}`)
  const sitemap = await readSitemap()
  log(`Sitemap: ${sitemap.size} URLs`)
  const stats = {}
  for (const cfg of TYPES) if (!ONLY || ONLY.includes(cfg.type)) await importType(cfg, sitemap, stats)
  if (!ONLY || ONLY.includes('catalogueItem')) for (const cat of CATALOGUES) await importCatalogue(cat, sitemap, stats)

  mkdirSync(PREVIEW_DIR, {recursive: true})
  const report = {finishedAt: new Date().toISOString(), dryRun: DRY_RUN, stats, authors: [...authorIds.values()], warnings}
  writeFileSync(join(PREVIEW_DIR, 'report.json'), JSON.stringify(report, null, 2))
  log(`\nDone. ${JSON.stringify(stats)}. ${warnings.length} warnings. Report: scripts/.import-preview/report.json`)
}

// Tests import the parsing helpers without running the import
export {parseCards, parseEntry, htmlToBlocks, parseElement, linkTypeFor}
if (!process.env.IMPORT_LIVE_TEST) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
