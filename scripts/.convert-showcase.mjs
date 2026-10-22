// TEMP: converts the saved showcase captures for /dev-lp-preview (delete before commit)
import {readFileSync, writeFileSync} from 'node:fs'
import {convertPage} from './landing-pages/convert-live.mjs'
const pages = ['/get-iguide/survey/tell-us-how-we-did', '/get-iguide/survey/tell-us-how-we-did-non-re', '/get-iguide/rep/learn-more-2025-07-24', '/get-iguide/aec/learn-more-old', '/get-iguide/rep/nar', '/get-iguide/aec/showcase', '/get-iguide/fm/showcase', '/get-iguide/irc/showcase', '/get-iguide/irc/showcase-forensic', '/get-iguide/irc/show', '/get-iguide/rep/showcase', '/get-iguide/rep-au/showcase']
for (const p of (process.argv[2] ? [process.argv[2]] : pages)) {
  const name = p.slice(1).replaceAll('/', '_')
  const html = readFileSync(`scripts/.import-samples/unlisted/${name}.html`, 'utf8')
  const r = convertPage(html, p, {chrome: 'landing'})
  writeFileSync(`scripts/.import-samples/converted/_${name}.json`, JSON.stringify(r, null, 2))
  console.log(p, r.doc.sections.length, 'sections', r.doc.sections.map((s) => s._type + (s.anchor ? '#' + s.anchor : '')).join(' '), '| unsupported:', r.unsupported.map((u) => u.id).join(','))
}
