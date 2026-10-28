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
 *  3. Takes the page furniture out of the body: the author box becomes the post's
 *     author (name, job title, bio, photo), the customer details box on customer stories
 *     becomes "Customer details", and date / read-time lines are dropped. The old
 *     elements stay separate sections (side-by-side, cards, key wins, quotes).
 *  4. Converts the body HTML to Sanity rich text, uploads images to Sanity, and
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
const clean = (s) => (s ?? '').replaceAll(/\s+/g, ' ').trim()
const normTitle = (s) => clean(s).toLowerCase().replaceAll(/[’']/g, "'")
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
      const loc = /<loc>([^<]+)<\/loc>/.exec(m[1])?.[1]
      const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(m[1])?.[1]
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
  return {cards, next: next?.replaceAll(/&amp;/g, '&')}
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
      {name: 'videoEmbed', fields: [{name: 'url', type: 'string'}, {name: 'title', type: 'string'}, {name: 'height', type: 'number'}]},
      {name: 'socialEmbed', fields: [{name: 'url', type: 'string'}]},
      {name: 'hubspotForm', fields: [{name: 'formId', type: 'string'}]},
      {name: 'faqPlaceholder', fields: [{name: 'index', type: 'number'}]},
      {name: 'quotePlaceholder', fields: [{name: 'index', type: 'number'}]},
      {name: 'tablePlaceholder', fields: [{name: 'index', type: 'number'}]},
    ],
    inlineObjects: [{name: 'image', fields: [{name: 'src', type: 'string'}, {name: 'alt', type: 'string'}]}],
  }),
)

const SUPERSCRIPT_DIGITS = {0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹'}

/** Whitespace-only text node */
const isBlankText = (n) => n?.nodeType === 3 && !n.textContent.replaceAll(/\u00a0/g, ' ').trim()

/** Footnote markers: the converter loses the word before a <sup>, so use superscript characters instead */
function replaceSupSub(body) {
  for (const sup of body.querySelectorAll('sup, sub')) {
    const t = sup.textContent.trim()
    sup.replaceWith(sup.tagName === 'SUP' && /^\d+$/.test(t) ? [...t].map((d) => SUPERSCRIPT_DIGITS[d]).join('') : sup.textContent)
  }
}

/** Index just past a run of <br>s and blank text starting at `j` */
function skipBreaks(nodes, j) {
  while (nodes[j]?.nodeName === 'BR' || isBlankText(nodes[j])) j++
  return j
}

/** Splits a paragraph's child nodes at double line breaks (or trailing breaks) into groups */
function splitAtDoubleBreaks(nodes) {
  const parts = [[]]
  let i = 0
  while (i < nodes.length) {
    const n = nodes[i]
    if (n.nodeName === 'BR') {
      let j = i + 1
      while (isBlankText(nodes[j])) j++
      if (nodes[j]?.nodeName === 'BR' || j >= nodes.length) {
        // paragraph break (or trailing breaks): start a new paragraph, skip the run of breaks
        parts.push([])
        i = skipBreaks(nodes, j)
        continue
      }
    }
    parts.at(-1).push(n)
    i++
  }
  return parts
}

function splitParagraph(doc, p) {
  if (!p.querySelector('br')) return
  const filled = splitAtDoubleBreaks([...p.childNodes]).filter((ns) => ns.some((n) => !isBlankText(n) && n.nodeName !== 'BR'))
  if (filled.length < 2) return
  for (const ns of filled) {
    const np = doc.createElement('p')
    np.append(...ns)
    p.before(np)
  }
  p.remove()
}

/**
 * Clean pasted-from-Word markup before converting: unwrap the plain <span>s
 * (the converter drops text after some nested span/<br> patterns) and turn
 * double line breaks inside a paragraph into separate paragraphs.
 */
function tidyHtml(html) {
  const doc = jsdom(`<body>${html}</body>`).window.document
  for (const span of [...doc.body.querySelectorAll('span')].reverse()) span.replaceWith(...span.childNodes)
  replaceSupSub(doc.body)
  // <li><div class="fusion-li-item-content"><p>…</p></div></li>: the converter only keeps a list
  // item when the paragraph sits straight inside the <li>, so lift it out of the wrapper
  for (const wrap of doc.body.querySelectorAll('li > div')) {
    if (wrap.parentElement.children.length === 1) wrap.replaceWith(...wrap.childNodes)
  }
  for (const p of doc.body.querySelectorAll('p')) splitParagraph(doc, p)
  return doc.body.innerHTML
}

/** Converter rules for embeds and the markers left by parseElement */
const PT_RULES = [
  {
    deserialize(el, _next, createBlock) {
      if (el.tagName?.toLowerCase() !== 'iframe') return undefined
      // Self-hosted videos were wrapped in an iframe srcdoc page: use the video file itself
      const srcdocVideo = el.getAttribute('srcdoc')?.match(/<(?:video|source)[^>]+src=["']([^"']+)["']/)?.[1]
      const src = srcdocVideo ? localise(srcdocVideo) : el.getAttribute('src') || el.dataset.src
      // Short players (Spotify, audio) keep their fixed height; everything else is 16:9
      const h = Number(el.getAttribute('height'))
      const height = h > 0 && h <= 400 && /%/.test(el.getAttribute('width') ?? '100%') ? h : undefined
      return src ? createBlock({_type: 'videoEmbed', url: srcdocVideo ? src : abs(src), title: el.getAttribute('title') || undefined, height}) : undefined
    },
  },
  {
    deserialize(el, _next, createBlock) {
      const permalink = el.getAttribute?.('data-instgrm-permalink')
      if (!permalink) return undefined
      return createBlock({_type: 'socialEmbed', url: permalink.split('?')[0]})
    },
  },
  {
    deserialize(el, _next, createBlock) {
      const formId = el.getAttribute?.('data-hubspot-form')
      return formId ? createBlock({_type: 'hubspotForm', formId}) : undefined
    },
  },
  {
    deserialize(el, _next, createBlock) {
      const index = el.getAttribute?.('data-faq')
      return index == null ? undefined : createBlock({_type: 'faqPlaceholder', index: Number(index)})
    },
  },
  {
    deserialize(el, _next, createBlock) {
      const index = el.getAttribute?.('data-quote')
      return index == null ? undefined : createBlock({_type: 'quotePlaceholder', index: Number(index)})
    },
  },
  {
    deserialize(el, _next, createBlock) {
      const index = el.getAttribute?.('data-table')
      return index == null ? undefined : createBlock({_type: 'tablePlaceholder', index: Number(index)})
    },
  },
]

const PT_TYPES = {
  // "#icon" is added below to small icons so they stay icon-sized
  image: ({context, value}) =>
    value.src
      ? {_key: context.keyGenerator(), _type: 'image', src: stripVariant(value.src.replace(/#icon$/, '')), alt: value.alt || undefined, icon: value.src.endsWith('#icon') || undefined}
      : undefined,
}

function htmlToBlocks(html, faqs = [], quotes = [], tables = []) {
  const blocks = htmlToPortableText(tidyHtml(html), {
    schema: ptSchema,
    parseHtml: (h) => jsdom(h).window.document,
    whitespaceMode: 'normalize',
    rules: PT_RULES,
    types: PT_TYPES,
  })
  for (const b of blocks) if (b._type === 'block') fitBlockStyles(b)
  const placeholders = {faqPlaceholder: faqs, quotePlaceholder: quotes, tablePlaceholder: tables}
  return blocks
    .flatMap(liftImages)
    .map((b) => (placeholders[b._type] ? placeholders[b._type][b.index] : b))
    .filter(Boolean)
}

/** Fit the site's body styles (h2–h4) and make goiguide.com links relative */
function fitBlockStyles(b) {
  if (b.style === 'h1') b.style = 'h2'
  if (b.style === 'h5' || b.style === 'h6') b.style = 'h4'
  for (const def of b.markDefs ?? []) if (def._type === 'link') def.href = localise(def.href)
}

/** Lift images out of a paragraph into their own blocks, and drop it if it's then empty */
function liftImages(b) {
  if (b._type !== 'block') return [b]
  const images = (b.children ?? []).filter((c) => c._type === 'image')
  const spans = (b.children ?? []).filter((c) => c._type !== 'image')
  const out = spans.some((c) => clean(c.text)) ? [{...b, children: spans}] : []
  for (const img of images) out.push({_type: 'image', _key: img._key, src: img.src, alt: img.alt, size: img.icon ? 'icon' : undefined})
  return out
}

/* ------------------------------------------------------------------ page furniture */

/** Text of a node with its whitespace collapsed */
const textOf = (n) => clean(n?.textContent)

/**
 * The author box at the end of posts (two live variants: .bio-info-container
 * and .author-container). Returns the author's name, job title, photo and bio,
 * or undefined if the element isn't an author box.
 */
function readAuthorBox(el) {
  const box = el.querySelector('.bio-info-container, .author-container')
  if (!box) return undefined
  const photo = el.querySelector('img.author-image')?.getAttribute('src')
  let name = textOf(el.querySelector('.author-name'))
  let role = textOf(el.querySelector('.author-title'))
  if (!name) {
    const strong = box.querySelector('.bio-info-inner strong')
    name = textOf(strong)
    role = textOf(strong?.closest('p')?.nextElementSibling)
  }
  // Bio: the paragraphs that aren't the name or job title
  const bio = [...el.querySelectorAll('p')]
    .filter((p) => !p.closest('.bio-info-inner, .author-details') && !p.matches('.author-name, .author-title'))
    .map(textOf)
    .filter(Boolean)
    .join('\n\n')
  // One post writes the job title as "By <name>, <title>"
  role = role.replace(new RegExp(String.raw`^By\s+${name.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)},?\s*`, 'i'), '')
  return name ? {name, role: role || undefined, bio: bio || undefined, photo: photo ? stripVariant(photo) : undefined} : undefined
}

/**
 * The customer details box on customer stories (.article-meta-info with emoji
 * labels, or the inline .company-info): [{label, value}] plus its button.
 */
function readFactsBox(el) {
  const box = el.querySelector('.article-meta-info, .company-info')
  if (!box) return undefined
  const facts = [...box.querySelectorAll('p, span')]
    .filter((n) => n.querySelector(':scope > strong'))
    .map((n) => {
      const label = textOf(n.querySelector(':scope > strong'))
      return {
        label: label.replace(/^[^\p{L}]+/u, '').replace(/:\s*$/, ''),
        value: clean(textOf(n).slice(label.length)),
      }
    })
    .filter((f) => f.label && f.value)
  const a = box.querySelector('a[href]')
  return {facts, cta: a ? {label: textOf(a), href: localise(a.getAttribute('href'))} : undefined}
}

/**
 * Customer quotes in their live variants: testimonial slider cards (<figure>),
 * .testimonial-block / .testimonial-content (quote in an <h3>, name in a <p>)
 * and .custom-quote (photo, quote, name and title). Each is replaced by a
 * marker so it lands in the same place in the body as a "testimonial" block.
 */
function extractQuotes(root) {
  const quotes = []
  const add = (node, q) => {
    if (!q.quote) return
    const marker = root.ownerDocument.createElement('div')
    marker.dataset.quote = String(quotes.length)
    quotes.push({_type: 'testimonial', _key: key(), ...q})
    node.replaceWith(marker)
  }
  // "Name, Role" or "Name / Role"
  const splitName = (s) => {
    const m = s.replace(/[,\s]+$/, '').match(/^(.+?)(?:,\s+|\s+[/–—-]\s+)(.+)$/)
    return m ? {name: clean(m[1]), role: clean(m[2])} : {name: s || undefined}
  }
  for (const fig of root.querySelectorAll('figure')) {
    const bq = fig.querySelector('blockquote')
    if (!bq) continue
    const lines = [...fig.querySelectorAll('figcaption > div')].map(textOf).filter(Boolean)
    const who = splitName(lines[0] ?? '')
    const role = [who.role, ...lines.slice(1)].filter(Boolean).join(', ')
    const img = fig.querySelector('img')?.getAttribute('src')
    add(fig, {quote: [...bq.querySelectorAll('p')].map(textOf).filter(Boolean).join('\n\n') || textOf(bq), name: who.name, role: role || undefined, imageSrc: img ? stripVariant(img) : undefined})
  }
  for (const box of root.querySelectorAll('.custom-quote')) {
    const img = box.querySelector('img')?.getAttribute('src')
    add(box, {
      quote: textOf(box.querySelector('.quote-text')),
      name: textOf(box.querySelector('.author-name')) || undefined,
      role: textOf(box.querySelector('.author-title')) || undefined,
      imageSrc: img ? stripVariant(img) : undefined,
    })
  }
  for (const box of root.querySelectorAll('.testimonial-block, .testimonial-content')) {
    const outer = box.closest('.white-block, .testimonial-container') ?? box
    // Name and company can be split over several paragraphs
    const by = [...box.querySelectorAll('p')].map((p) => textOf(p).replace(/,$/, '')).filter(Boolean).join(', ')
    // Headshot: the first image that isn't the decorative quote-mark graphic
    const photo = [...box.querySelectorAll('img')].map((i) => i.getAttribute('src')).find((src) => src && !/quote\.svg/i.test(src))
    add(outer, {quote: textOf(box.querySelector('h3, h4, blockquote')), ...splitName(by), imageSrc: photo ? stripVariant(photo) : undefined})
  }
  return quotes
}

/**
 * Tables: each <table> is replaced by a marker so it lands in the same place in the body as a
 * "table" block (the converter would otherwise flatten it into paragraphs, and turn icon cells
 * into full-width images). The first row is the header row, the first column the row labels.
 */
function extractTables(root) {
  const tables = []
  for (const table of root.querySelectorAll('table')) {
    const rows = [...table.rows]
      .map((tr) => ({_type: 'tableRow', _key: key(), cells: [...tr.cells].map(readTableCell)}))
      .filter((r) => r.cells.length)
    if (!rows.length) continue
    const marker = root.ownerDocument.createElement('div')
    marker.dataset.table = String(tables.length)
    tables.push({_type: 'table', _key: key(), headerRow: true, firstColumnHeader: true, rows})
    table.replaceWith(marker)
  }
  return tables
}

/** Alt text for the tick / cross icons used in comparison tables (live has none) */
function iconAlt(src) {
  const name = (src ?? '').split('/').pop().toLowerCase()
  if (/^(check|tick)/.test(name)) return 'Advantage'
  if (/^(x|cross)\d*\./.test(name)) return 'Drawback'
  return undefined
}

function readTableCell(td) {
  const img = td.querySelector('img')
  const copy = td.cloneNode(true)
  copy.querySelectorAll('img, script, style').forEach((n) => n.remove())
  // One line per paragraph or list item
  const paras = [...copy.querySelectorAll('li, p')].filter((n) => !n.querySelector('li, p'))
  const text = paras.length ? paras.map(textOf).filter(Boolean).join('\n') : textOf(copy)
  const squash = (t) => t.replaceAll(/\s+/g, '')
  const strong = [...copy.querySelectorAll('strong, b')].map((n) => n.textContent).join('')
  return {
    _type: 'tableCell',
    _key: key(),
    text: text || undefined,
    bold: text && squash(strong) === squash(text) ? true : undefined,
    imageSrc: img?.getAttribute('src') ? stripVariant(img.getAttribute('src')) : undefined,
    alt: clean(img?.getAttribute('alt')) || iconAlt(img?.getAttribute('src')),
  }
}

/** Element kinds that get their own section layout on the new site */
const LAYOUT_BY_KIND = {elementtextandimage: 'split', elementtestimonials: 'split', elementtextandicons: 'cards'}

/** Live "CTA feature" banner element → one ctaBanner block */
function parseCtaFeature(el, kind) {
  const button = el.querySelector('a[href], button')
  const scripts = [...el.querySelectorAll('script')].map((s) => s.textContent).join('\n')
  const formId = /formId:\s*"([^"]+)"/.exec(scripts)?.[1]
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
        imageSrc: bg ? stripVariant(bg.replaceAll(/["']/g, '')) : undefined,
      },
    ],
  }
}

/** "Key wins" lists (icon + text rows) become a bullet list shown as highlight tiles. Returns true if any were found. */
function convertKeyWins(root) {
  const all = [...root.querySelectorAll('.key-wins-inline, .key-wins-stacked')]
  for (const wins of all) {
    const ul = root.ownerDocument.createElement('ul')
    for (const win of wins.querySelectorAll('.win')) {
      win.querySelectorAll('img, .material-symbols-outlined').forEach((n) => n.remove())
      const li = root.ownerDocument.createElement('li')
      li.textContent = textOf(win)
      if (li.textContent) ul.append(li)
    }
    wins.replaceWith(ul)
  }
  return all.length > 0
}

/** Team member grid: photo, name, role, description per person; the name becomes a heading so each is a card */
function convertTeamGrids(root) {
  const grids = [...root.querySelectorAll('.team-grid')]
  for (const grid of grids) {
    for (const person of grid.children) {
      const name = person.querySelector('p')
      if (!name) continue
      const h = root.ownerDocument.createElement('h4')
      h.textContent = textOf(name)
      name.replaceWith(h)
    }
  }
  return grids.length > 0
}

/** Icon + title + text rows: mark the icons so they stay icon-sized */
function markIconRows(root) {
  if (!root.querySelector('.info-container')) return false
  root.querySelectorAll('.info-container img').forEach((img) => img.setAttribute('src', img.getAttribute('src') + '#icon'))
  return true
}

/**
 * "Compare iGUIDE vs …" pop-open comparisons: the toggle button becomes the heading, each
 * feature row a card (the tick / cross columns and header row are decoration)
 */
function convertCompareToggle(root) {
  const toggle = root.querySelector('button.compare-btn, button.expand-btn')
  if (!toggle) return false
  const h = root.ownerDocument.createElement('h3')
  h.textContent = textOf(toggle).replace(/\s*[▼▾]\s*$/, '')
  toggle.replaceWith(h)
  root.querySelectorAll('.comparison-head, .comparison-grid > .cell').forEach((n) => n.remove())
  return true
}

/** Inline HubSpot forms: leave a marker where the form was */
function markInlineForms(root) {
  for (const script of root.querySelectorAll('script')) {
    const text = script.textContent
    const formId = text.match(/formId:\s*["']([^"']+)["']/)?.[1]
    if (formId && /hbspt\.forms\.create/.test(text) && !/isHubspotForm/.test(text)) {
      const marker = root.ownerDocument.createElement('div')
      marker.dataset.hubspotForm = formId
      script.replaceWith(marker)
    }
  }
}

/**
 * FAQ accordions (Alpine x-data "open" items): question button + answer panel.
 * Each group is replaced by a marker; returns the faq blocks in marker order.
 */
function extractFaqs(root, headings) {
  const faqs = []
  const items = [...root.querySelectorAll('[x-data*="open"]')].filter((item) => item.querySelector(':scope > button'))
  const groups = [...new Set(items.map((item) => item.parentElement))]
  for (const group of groups) {
    const groupItems = items.filter((item) => item.parentElement === group)
    // Heading: nearest h2/h3 above the group inside this element
    const heading = headings.findLast((h) => h.compareDocumentPosition(group) & 4 /* group follows heading */ && !group.contains(h) && /faq|frequently asked|questions/i.test(h.textContent))
    const faq = {
      _type: 'faq',
      _key: key(),
      heading: heading ? clean(heading.textContent) : undefined,
      items: groupItems.map((item) => {
        const button = item.querySelector(':scope > button')
        const answer = button.nextElementSibling
        return {
          _key: key(),
          question: clean(button.textContent),
          answer: answer ? htmlToBlocks(answer.innerHTML).filter((b) => b._type === 'block') : [],
        }
      }),
    }
    if (heading) heading.remove()
    const marker = root.ownerDocument.createElement('div')
    marker.dataset.faq = String(faqs.length)
    faqs.push(faq)
    // Replace the outermost wrapper that holds only this FAQ
    let target = group
    while (target.parentElement && target.parentElement !== root && target.parentElement.children.length === 1) target = target.parentElement
    target.replaceWith(marker)
  }
  return faqs
}

/** Buttons that open a HubSpot form in a pop-up become a call-to-action banner */
function addPopupFormBanner(blocks, root, popupForm) {
  const label = clean(root.querySelector('button')?.textContent) || 'Book a demo'
  // The pop-up button's own text came through as a paragraph; the banner replaces it
  const out = blocks.filter((b) => !(b._type === 'block' && clean((b.children ?? []).map((c) => c.text).join('')) === label))
  out.push({_type: 'ctaBanner', _key: key(), buttonLabel: label, hubspotFormId: popupForm})
  return out
}

/** Page furniture the new template shows itself: author box, customer details box, date / read-time line */
function readFurniture(el, root, kind) {
  const author = readAuthorBox(root)
  if (author) return {kind, blocks: [], author}
  const factsBox = readFactsBox(root)
  if (factsBox) return {kind, blocks: [], ...factsBox}
  if (root.querySelector('.profile-container') || el.id === 'meta-wrapper') return {kind, blocks: []}
  return undefined
}

/** Applies the layout-changing conversions in order; the last one that applies sets the layout */
function convertLayouts(root, kind) {
  let layout = LAYOUT_BY_KIND[kind] ?? 'plain'
  if (convertKeyWins(root)) layout = 'highlights'
  if (convertTeamGrids(root)) layout = 'cards'
  if (markIconRows(root)) layout = 'cards'
  if (convertCompareToggle(root)) layout = 'cards'
  return layout
}

/**
 * Turns one live content element into Sanity blocks. Text, headings, lists,
 * images and links become rich text; iframes (iGUIDE tours, YouTube, Spotify,
 * Facebook) become embeds; Instagram posts, inline HubSpot forms and FAQ
 * accordions get their own block types. Only the old theme's helper scripts,
 * styles and the "Check out more from iGUIDE" post lists are dropped (the new
 * template shows related posts itself).
 */
function parseElement(el) {
  const kind = el.className.match(/elements__(\w+)/)?.[1] ?? 'unknown'
  if (kind === 'elementctafeaturelarge') return parseCtaFeature(el, kind)

  const root = el.querySelector('section') ?? el
  const raw = root.innerHTML

  const furniture = readFurniture(el, root, kind)
  if (furniture) return furniture

  const quotes = extractQuotes(root)
  const tables = extractTables(root)
  const layout = convertLayouts(root, kind)

  // One known pattern swaps the post's header image for a YouTube video
  const headerVideo = /post-header/.test(raw) ? raw.match(/https:\/\/www\.youtube\.com\/embed\/[\w-]+/)?.[0] : undefined
  if (headerVideo) return {kind, headerVideo, blocks: []}

  // "Check out more from iGUIDE" lists of other posts: the new template has related posts
  const headings = [...root.querySelectorAll('h2, h3')]
  if (kind === 'elementfeaturedposts' || headings.some((h) => /check out more from iguide/i.test(h.textContent))) return {kind, blocks: [], dropped: true}

  markInlineForms(root)
  const popupScript = [...root.querySelectorAll('script')].map((s) => s.textContent).find((t) => /isHubspotForm/.test(t))
  const popupForm = popupScript?.match(/formId:\s*["']([^"']+)["']/)?.[1]
  // Old theme helpers and Material icon ligatures ("expand_circle_right", "check") that would show as words
  root.querySelectorAll('script, style, noscript, link, #meta-info, .material-symbols-outlined, .material-icons').forEach((n) => n.remove())

  const faqs = extractFaqs(root, headings)
  const blocks = htmlToBlocks(root.innerHTML, faqs, quotes, tables)
  return {kind, blocks: popupForm ? addPopupFormBanner(blocks, root, popupForm) : blocks, layout, id: el.id}
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

  // Customer stories with a side menu: its section ids and labels live in an inline script
  // (read before the elements are parsed, which strips their scripts)
  const menu = new Map()
  for (const s of doc.querySelectorAll('script')) {
    for (const m of s.textContent.matchAll(/\{\s*id:\s*['"]([\w-]+)['"],\s*label:\s*['"]([^'"]+)['"]\s*\}/g)) menu.set(m[1], m[2])
  }
  const parts = [...(section?.querySelectorAll('article .element') ?? [])].map(parseElement)
  // Keep the live elements as separate sections when the page had a menu or any laid-out element
  // (side-by-side, cards, quotes, key wins); plain posts stay one flowing body
  const content = parts.filter((p) => p.blocks.length)
  const sectioned = menu.size > 0 || content.some((p) => p.layout && p.layout !== 'plain')
  const anchors = new Set()
  const blocks = sectioned
    ? content.flatMap((p) => {
        // Live ids become section anchors (a few pages reuse an id: only the first keeps it)
        let anchor = p.id && !/^e\d+$/.test(p.id) ? p.id : undefined
        if (anchors.has(anchor)) anchor = undefined
        anchors.add(anchor)
        return [{_type: 'sectionBreak', _key: key(), title: (anchor && menu.get(anchor)) || undefined, anchor, layout: p.layout ?? 'plain'}, ...p.blocks]
      })
    : content.flatMap((p) => p.blocks)
  const authorBox = parts.find((p) => p.author)?.author
  const factsPart = parts.find((p) => p.facts)

  return {
    path,
    title: h1 || clean(doc.title.replace(/\s*\|\s*iGUIDE\s*$/, '')),
    headerImg,
    headerTexts,
    headerLinks,
    datePublished: ld.datePublished,
    author: authorBox?.name ?? (Array.isArray(ld.author) ? ld.author[0]?.name : ld.author?.name),
    authorBox,
    facts: factsPart?.facts,
    factsCta: factsPart?.cta,
    metaTitle: clean(doc.title),
    metaDescription: meta('description'),
    ogImage: stripVariant(meta('og:image')),
    redirectTo,
    headerVideo: parts.find((p) => p.headerVideo)?.headerVideo,
    blocks,
    kinds: parts.map((p) => p.kind),
    dropped: parts.some((p) => p.dropped),
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
      if (img) out.push({...img, _key: b._key, alt: b.alt, size: b.size})
    } else if (b._type === 'testimonial') {
      const {imageSrc, ...rest} = b
      out.push(imageSrc ? {...rest, image: await imageRef(imageSrc)} : rest)
    } else if (b._type === 'table') {
      const rows = []
      for (const r of b.rows) {
        const cells = []
        for (const c of r.cells) {
          const {imageSrc, ...rest} = c
          cells.push(imageSrc ? {...rest, image: await imageRef(imageSrc)} : rest)
        }
        rows.push({...r, cells})
      }
      out.push({...b, rows})
    } else if (b._type === 'ctaBanner' && b.imageSrc) {
      const {imageSrc, ...rest} = b
      out.push({...rest, image: await imageRef(imageSrc)})
    } else out.push(b)
  }
  return out
}

/* ------------------------------------------------------------------ documents */

const docId = (type, slug) => `${type}-${slug}`.replaceAll(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128)
const authorIds = new Map()
// Best details seen for each author (from their most recent post), written once the import finishes
const authorDetails = new Map()

async function authorRef(name, box, date) {
  if (!name || /^iguide$/i.test(name)) return undefined
  // The live JSON-LD writes some names "Last, First"; the author box writes "First Last"
  const m = name.match(/^([^,]+),\s*([^,]+)$/)
  if (m) name = `${m[2]} ${m[1]}`
  const slug = name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replaceAll(/^-|-$/g, '')
  const _id = `author-${slug}`
  if (!authorIds.has(_id)) {
    authorIds.set(_id, name)
    if (!DRY_RUN) await client.createIfNotExists({_id, _type: 'author', name})
  }
  if (box) {
    const seen = authorDetails.get(_id)
    if (!seen || (date ?? '') > (seen.date ?? '')) authorDetails.set(_id, {...box, date})
  }
  return {_type: 'reference', _ref: _id}
}

/** Fills in each author's job title, bio and photo. Never overwrites what's already set in the Studio. */
async function writeAuthorDetails() {
  for (const [_id, a] of authorDetails) {
    const fields = {role: a.role, bio: a.bio, photo: a.photo ? await imageRef(a.photo) : undefined}
    for (const k of Object.keys(fields)) if (!fields[k]) delete fields[k]
    log(`  author ${a.name}: ${Object.keys(fields).join(', ') || 'name only'}`)
    if (DRY_RUN) {
      mkdirSync(join(PREVIEW_DIR, 'author'), {recursive: true})
      writeFileSync(join(PREVIEW_DIR, 'author', `${_id}.json`), JSON.stringify({_id, name: a.name, ...fields}, null, 2))
    } else if (Object.keys(fields).length) await client.patch(_id).setIfMissing(fields).commit()
  }
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

/** Sanity document for one live entry page (Resource Center types) */
async function buildEntryDoc(cfg, path, e, card, sitemap) {
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
        e.kinds.includes('unknown') && `Unrecognised blocks on the old page: ${e.kinds.join(', ')}`,
        e.dropped && 'Old "Check out more from iGUIDE" post list not imported (the page shows related posts)',
        card?.thumb && e.headerImg && card.thumb !== e.headerImg && `Card thumbnail on the old site: ${card.thumb}`,
      ]
        .filter(Boolean)
        .join('\n') || undefined,
    },
  }
  await addTypeFields(doc, cfg, e, path, dateText)
  return doc
}

const isHeaderCta = (l) => !/^back$/i.test(l.label) && !/facebook|twitter|linkedin|mailto/i.test(l.href)

/** First header link that isn't "Back" or a share link, unless it points back at the page itself */
function headerCta(e, path) {
  const cta = e.headerLinks.find(isHeaderCta)
  return cta && localise(cta.href) !== path ? {label: cta.label, href: localise(cta.href)} : undefined
}

async function addAuthor(doc, cfg, e, path) {
  if (cfg.type === 'blogPost' || cfg.type === 'customerStory') doc.author = await authorRef(e.author, e.authorBox, doc.publishedAt)
  else if (e.authorBox) warn(`${path}: author box for ${e.authorBox.name} not imported (${cfg.type} has no author field)`)
}

function addCustomerFacts(doc, cfg, e, path) {
  if (!e.facts?.length) return
  if (cfg.type !== 'customerStory') return warn(`${path}: customer details box not imported (${cfg.type})`)
  doc.customerFacts = e.facts.map((f) => ({_type: 'fact', _key: key(), ...f}))
  if (e.factsCta) doc.customerCta = e.factsCta
}

/** Fields only some types have: author, customer details, webinar date/registration, news link */
async function addTypeFields(doc, cfg, e, path, dateText) {
  await addAuthor(doc, cfg, e, path)
  addCustomerFacts(doc, cfg, e, path)
  if (cfg.type === 'webinar') {
    if (dateText) doc.eventDateText = dateText.replace(/^Date:\s*/i, '')
    // Live sometimes points the header button back at the page itself; that isn't a real registration link
    const reg = headerCta(e, path)
    if (reg) doc.eventCta = reg
  }
  if (cfg.type === 'newsArticle') {
    const cta = headerCta(e, path)
    if (cta) doc.newsCta = cta
  }
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
  const importing = list.length < urls.size ? ` (importing ${list.length})` : ''
  log(`  ${urls.size} entry pages${importing}`)

  await pool(list, CONCURRENCY, async (path) => {
    try {
      const {text, status, url} = await fetchText(path)
      if (!text) return warn(`${path}: HTTP ${status}`)
      if (new URL(url).pathname.replace(/\/$/, '') !== path) warn(`${path} redirects to ${url}`)
      const e = parseEntry(text, path)
      const card = takeCard(path, e.title)
      if (!card) warn(`${path}: no listing card found (title "${e.title}")`)
      const doc = await buildEntryDoc(cfg, path, e, card, sitemap)
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
  if (authorDetails.size) {
    log('\n== authors')
    await writeAuthorDetails()
  }

  mkdirSync(PREVIEW_DIR, {recursive: true})
  const report = {finishedAt: new Date().toISOString(), dryRun: DRY_RUN, stats, authors: [...authorIds.values()], warnings}
  writeFileSync(join(PREVIEW_DIR, 'report.json'), JSON.stringify(report, null, 2))
  log(`\nDone. ${JSON.stringify(stats)}. ${warnings.length} warnings. Report: scripts/.import-preview/report.json`)
}

// Tests import the parsing helpers without running the import
export {parseCards, parseEntry, htmlToBlocks, parseElement, linkTypeFor, readAuthorBox, readFactsBox}
if (!process.env.IMPORT_LIVE_TEST) {
  try {
    await main()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
