/**
 * Landing pages used to show a shared site logo band (Logos → Logo bands), so
 * editing a landing page's logos could change rows on the rest of the site.
 * This copies each band's current logo list into the landing page's own logo
 * section and removes the link to the band. The bands and the logos themselves
 * are not changed.
 *
 * Dry run (shows what would change, writes nothing):
 *   npx sanity exec scripts/detach-landing-logo-bands.mjs --with-user-token
 * Apply:
 *   npx sanity exec scripts/detach-landing-logo-bands.mjs --with-user-token -- --apply
 *
 * Each page is patched only if it hasn't changed since it was read (ifRevisionId).
 * Published and draft versions are both updated.
 */
import {randomBytes} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-06'})
const APPLY = process.argv.includes('--apply')
const key = () => randomBytes(6).toString('hex')

const pages = await client.fetch(`*[_type == "landingPage" && count(sections[_type == "lpLogos" && defined(band)]) > 0]{_id, _rev, title, sections}`)
const bands = new Map((await client.fetch(`*[_type == "logoBand"]{_id, title, logos}`)).map((b) => [b._id, b]))

const tx = []
for (const page of pages) {
  const sections = page.sections.map((s) => {
    if (s._type !== 'lpLogos' || !s.band) return s
    const band = bands.get(s.band._ref) ?? bands.get(s.band._ref.replace(/^drafts\./, ''))
    const logos = s.logos?.length ? s.logos : (band?.logos ?? []).map((r) => ({_type: 'reference', _ref: r._ref, _key: key()}))
    console.log(`${APPLY ? '↻' : '·'} ${page._id} (${page.title ?? ''}): ${logos.length} logos from "${band?.title ?? s.band._ref}"`)
    const rest = {...s}
    delete rest.band
    return {...rest, logos}
  })
  tx.push(client.patch(page._id).ifRevisionId(page._rev).set({sections}))
}

console.log(`\n${tx.length} landing page${tx.length === 1 ? '' : 's'} ${APPLY ? 'updated' : 'would change'}.`)
if (!APPLY) console.log('Dry run only. Add -- --apply to write the changes.')
else if (tx.length) {
  const batch = client.transaction()
  for (const p of tx) batch.patch(p)
  await batch.commit()
  console.log('Done.')
}
