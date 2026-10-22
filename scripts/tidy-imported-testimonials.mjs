/**
 * Tidies data the live-page import created (2026-10-22):
 *  - testimonials whose job title landed in the company field ("President, Levco Builders")
 *    get role "President" and company "Levco Builders" (English and French)
 *  - client logos named after a caption or a file name get the company's name (also their alt text)
 * Visible quotes are not touched.
 *
 * Run from the repo root:
 *   Preview:  npx sanity exec scripts/tidy-imported-testimonials.mjs -- --dry-run
 *   Apply:    npx sanity exec scripts/tidy-imported-testimonials.mjs --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2026-10-06'})

const ROLE = /^(President|Président|Independent Adjuster|Expert en sinistres indépendant),\s*(.+)$/

const LOGO_NAMES = {
  'clientLogo-president-levco-builders-215a45': 'Levco Builders',
  'clientLogo-independent-adjuster-capstone-claims-corporation-8420f8': 'Capstone Claims Corporation',
  'clientLogo-scrolling-logosbilly-alvaro-edf099': 'Billy Alvaro',
  'clientLogo-scrolling-logosrego-realty-8cda88': 'Rego Realty',
}

const testimonials = await client.fetch('*[_type == "testimonial" && !defined(role) && defined(company)]{_id, _rev, name, company}')
const changes = []
for (const t of testimonials) {
  const m = ROLE.exec(t.company)
  if (m) changes.push({id: t._id, rev: t._rev, set: {role: m[1], company: m[2]}, label: `${t.name}: "${t.company}" → role "${m[1]}", company "${m[2]}"`})
}
const logos = await client.fetch('*[_id in $ids]{_id, _rev, name}', {ids: Object.keys(LOGO_NAMES)})
for (const l of logos) {
  if (l.name !== LOGO_NAMES[l._id]) changes.push({id: l._id, rev: l._rev, set: {name: LOGO_NAMES[l._id]}, label: `logo "${l.name}" → "${LOGO_NAMES[l._id]}"`})
}

for (const c of changes) console.log(`${DRY_RUN ? '·' : '+'} ${c.label}`)
if (!DRY_RUN && changes.length) {
  const tx = client.transaction()
  for (const c of changes) tx.patch(c.id, (p) => p.ifRevisionId(c.rev).set(c.set))
  await tx.commit()
}
console.log(`\n${changes.length} ${DRY_RUN ? 'to change (dry run, nothing saved)' : 'saved'}.`)
