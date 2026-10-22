/**
 * Turns the live goiguide.com legal pages (captured in scripts/.import-samples/)
 * into clean, first-party HTML for lib/content/legal/<name>.ts.
 *
 * Keeps only semantic tags (h2–h5, p, ul, ol, li, strong, em, a[href], table parts, br),
 * drops scripts, styles, classes, ids and inline styles, unwraps spans/divs, and makes
 * https://goiguide.com links relative. Prints a word-count check (live vs cleaned).
 *
 * Run from the repo root:  node scripts/clean-legal-html.mjs
 * One page only:            node scripts/clean-legal-html.mjs --only ionTerms
 */
import {readFileSync, writeFileSync} from 'node:fs'
import {JSDOM, VirtualConsole} from 'jsdom'

const quiet = new VirtualConsole()
const SAMPLES = 'scripts/.import-samples'
const OUT = 'lib/content/legal'

/** page: capture file, CSS selector of the main content, where the title is, output name */
const PAGES = [
  {name: 'privacyPolicy', file: 'pg-privacy-policy.html', body: '#e3551 .prose', title: '#e3551 .prose > h1', path: '/privacy-policy'},
  {name: 'termsOfUse', file: 'pg-terms-of-use.html', body: '#content .prose', title: '#content h2.mb-8', path: '/terms-of-use', lastUpdated: true},
  {name: 'pmreRules', file: 'pg-pmre-rules-regulations.html', body: '#e2001 .prose', title: '#e2001 h2.mb-8', path: '/pmre-rules-regulations'},
  {name: 'ionTerms', file: 'unlisted/ion-terms-and-conditions.html', body: '#e593 .prose', title: 'h1', path: '/ion-terms-and-conditions'},
]

const onlyIndex = process.argv.indexOf('--only')
const only = onlyIndex === -1 ? null : process.argv[onlyIndex + 1]

const KEEP = new Set(['h2', 'h3', 'h4', 'h5', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br'])
const RENAME = {b: 'strong', i: 'em', h1: 'h2', h6: 'h5'}
const DROP = new Set(['script', 'style', 'noscript', 'iframe', 'button', 'svg', 'img', 'form', 'input'])
const BLOCK = new Set(['h2', 'h3', 'h4', 'h5', 'p', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr'])

const esc = (s) => s.replaceAll(/&/g, '&amp;').replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;')
const escAttr = (s) => esc(s).replaceAll(/"/g, '&quot;')
const text = (s) => s.replaceAll(/[ \s]+/g, ' ')
const words = (s) => s.replaceAll(/[ \s]+/g, ' ').trim().split(' ').filter(Boolean).length

function href(raw) {
  let h = raw.trim()
  h = h.replace(/^https?:\/\/(www\.)?goiguide\.com(?=\/|$)/i, '')
  if (h === '') h = '/'
  return h
}

function linkAttrs(node) {
  const h = node.getAttribute('href')
  if (!h) return null
  const link = href(h)
  let attrs = ` href="${escAttr(link)}"`
  if (/^https?:\/\//i.test(link)) attrs += ' target="_blank" rel="noopener noreferrer"'
  return attrs
}

function cellAttrs(node) {
  let attrs = ''
  for (const a of ['colspan', 'rowspan']) if (node.getAttribute(a)) attrs += ` ${a}="${escAttr(node.getAttribute(a))}"`
  return attrs
}

const isCell = (tag) => tag === 'td' || tag === 'th'

/** Attributes kept for a tag; null = drop the element but keep its content (a link without href) */
function tagAttrs(node, tag) {
  if (tag === 'a') return linkAttrs(node)
  if (isCell(tag)) return cellAttrs(node)
  return ''
}

function wrapElement(tag, attrs, inner) {
  const body = BLOCK.has(tag) && !['li', 'p'].includes(tag) ? inner.trim() : inner.replaceAll(/^ +| +$/g, (m) => (m ? ' ' : ''))
  const trimBody = tag === 'p' || tag === 'li' || /^h\d$/.test(tag) || isCell(tag)
  const out = `<${tag}${attrs}>${trimBody ? body.trim() : body}</${tag}>`
  return BLOCK.has(tag) ? `\n${out}\n` : out
}

function serialize(node) {
  if (node.nodeType === 3) return esc(text(node.nodeValue))
  if (node.nodeType !== 1) return ''
  const raw = node.tagName.toLowerCase()
  if (DROP.has(raw)) return ''
  const tag = RENAME[raw] ?? raw
  const inner = [...node.childNodes].map(serialize).join('')
  if (!KEEP.has(tag)) return inner // span, div, font…: keep the text, lose the wrapper
  if (tag === 'br') return '<br>'
  // Empty paragraphs / headings / inline tags (e.g. <p>&nbsp;</p>) carry no content
  if (!isCell(tag) && !inner.replaceAll(/<br>/g, '').trim()) return ''
  const attrs = tagAttrs(node, tag)
  if (attrs === null) return inner
  return wrapElement(tag, attrs, inner)
}

const tidy = (html) =>
  html
    .replaceAll(/\n\s*\n+/g, '\n')
    .replaceAll(/ +\n/g, '\n')
    .replaceAll(/\n +/g, '\n')
    .trim()

const forTemplate = (s) => s.replaceAll(/\\/g, '\\\\').replaceAll(/`/g, '\\`').replaceAll(/\$\{/g, '\\${')

for (const page of PAGES.filter((p) => !only || p.name === only)) {
  const dom = new JSDOM(readFileSync(`${SAMPLES}/${page.file}`, 'utf8'), {virtualConsole: quiet})
  const doc = dom.window.document
  const root = doc.querySelector(page.body)
  const titleEl = doc.querySelector(page.title)
  if (!root || !titleEl) throw new Error(`${page.name}: content not found`)
  const liveWords = words(root.textContent) + (root.contains(titleEl) ? 0 : words(titleEl.textContent))
  const title = text(titleEl.textContent).trim()
  if (root.contains(titleEl)) titleEl.remove()

  let lastUpdated
  if (page.lastUpdated) {
    const first = [...root.children].find((el) => el.textContent.trim())
    if (first && /^last updated/i.test(first.textContent.trim())) {
      lastUpdated = text(first.textContent).trim()
      first.remove()
    }
  }

  const html = tidy([...root.childNodes].map(serialize).join(''))
  const cleanText = new JSDOM(`<body>${html}</body>`).window.document.body.textContent
  const cleanWords = words(cleanText) + words(title) + (lastUpdated ? words(lastUpdated) : 0)

  const file = `/** ${page.path} — body copied from the live page (scripts/.import-samples/${page.file}) by scripts/clean-legal-html.mjs. Legal text: do not edit by hand without sign-off. */
export const title = ${JSON.stringify(title)}
${lastUpdated ? `export const lastUpdated = ${JSON.stringify(lastUpdated)}\n` : ''}
export const html = \`
${forTemplate(html)}
\`
`
  writeFileSync(`${OUT}/${page.name}.ts`, file)
  console.log(`${page.name}: live ${liveWords} words, cleaned ${cleanWords} words ${liveWords === cleanWords ? 'OK' : 'MISMATCH'}`)
}
