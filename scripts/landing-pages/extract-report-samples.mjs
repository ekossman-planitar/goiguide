/**
 * Copies the sample iGuide emails (Report / Analytics) from the live showcase
 * page captures into lib/landingPages/reportSamples/<id>.ts, for the landing
 * page "Sample report" section. Keeps the email's own inline-styled markup;
 * drops scripts, styles, comments and Alpine (x-*) attributes, and moves its
 * headings down two levels so the page keeps a single h1.
 *
 * Run from the repo root:  node scripts/landing-pages/extract-report-samples.mjs
 */
import {readFileSync, writeFileSync} from 'node:fs'
import {JSDOM, VirtualConsole} from 'jsdom'

const SAMPLES = 'scripts/.import-samples/unlisted'
const OUT = 'lib/landingPages/reportSamples'

const REPORTS = [
  {
    id: 'reportCommercial',
    file: 'get-iguide_aec_showcase.html',
    selector: '#report .aspect-video',
    note: 'AEC and FM showcases: 525 New Dundee Road, Kitchener',
  },
  {
    id: 'reportIrc',
    file: 'get-iguide_irc_showcase.html',
    selector: '#reports .aspect-video',
    note: 'IRC and IRC Forensic showcases: 1121 Sample Road, Kitchener',
  },
  {
    id: 'reportResidential',
    file: 'get-iguide_rep_showcase.html',
    selector: '#section-5 [data-tab-group="reports"]',
    note: 'REP showcase: 2002 Summey Ave, Charlotte',
  },
  {
    id: 'analyticsResidential',
    file: 'get-iguide_rep_showcase.html',
    selector: '#section-5 [data-tab-group="analytics"]',
    note: 'REP showcase: iGuide Analytics, 2002 Summey Ave',
  },
]

const words = (s) => s.replaceAll(/\s+/g, ' ').trim()

for (const r of REPORTS) {
  const doc = new JSDOM(readFileSync(`${SAMPLES}/${r.file}`, 'utf8'), {virtualConsole: new VirtualConsole()}).window.document
  const root = doc.querySelector(r.selector)
  if (!root) throw new Error(`${r.id}: ${r.selector} not found`)
  const liveText = words(root.textContent)
  root.querySelectorAll('script, style, noscript').forEach((el) => el.remove())
  const walker = doc.createTreeWalker(root, 128) // comments
  const comments = []
  while (walker.nextNode()) comments.push(walker.currentNode)
  comments.forEach((c) => c.remove())
  root.querySelectorAll('*').forEach((el) => {
    for (const a of [...el.attributes]) if (/^(x-|@|:)/.test(a.name)) el.removeAttribute(a.name)
  })
  // The email's own headings start at h1; on the page they sit under the section's h2, so they move down
  // two levels (h1 → h3 …). Looks unchanged: the email styles every heading inline.
  for (const h of [...root.querySelectorAll('h1, h2, h3, h4, h5, h6')].reverse()) {
    const level = Math.min(Number(h.tagName[1]) + 2, 6)
    const next = h.ownerDocument.createElement(`h${level}`)
    for (const at of [...h.attributes]) next.setAttribute(at.name, at.value)
    while (h.firstChild) next.appendChild(h.firstChild)
    h.replaceWith(next)
  }
  const html = root.innerHTML.replaceAll(/\n\s*\n+/g, '\n').trim()
  const cleanText = words(new JSDOM(`<body>${html}</body>`).window.document.body.textContent)
  writeFileSync(
    `${OUT}/${r.id}.ts`,
    `/**\n * ${r.note}. Sample iGuide email copied from the live page capture (scripts/.import-samples/unlisted/${r.file})\n * by scripts/landing-pages/extract-report-samples.mjs. Do not hand-edit.\n */\nexport const html: string = ${JSON.stringify(html)}\n`,
  )
  console.log(`${r.id}: ${html.length} chars, text ${liveText === cleanText ? 'matches live' : 'DIFFERS from live'}`)
}
