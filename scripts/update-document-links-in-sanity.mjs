/**
 * Brochure and eBook PDFs now live on HubSpot (Evan, 2026-10-20: "Goiguide
 * WebpagesRedirects" Brochures + eBooks tabs). The old goiguide.com/assets/…
 * files 404 on the new site, so every link to them in Sanity is pointed at the
 * HubSpot copy:
 *   1. Brochure / eBook / white paper cards ("Card opens" = download or
 *      external): matched by title, set to "Download file" + the HubSpot URL.
 *      This also replaces the Google Drive links on the 6 CAD deliverable brochures.
 *   2. Any other link to one of these PDFs anywhere in Sanity (body links,
 *      "Download" buttons, landing pages…): matched by file name.
 * Card titles, pages and slugs are not touched; cards set to "Page" stay pages.
 *
 * Dry run (lists every change, writes nothing):
 *   npx sanity exec scripts/update-document-links-in-sanity.mjs --with-user-token
 * Apply:
 *   npx sanity exec scripts/update-document-links-in-sanity.mjs --with-user-token -- --apply
 *
 * Each document is patched only if it hasn't changed since it was read
 * (ifRevisionId), so edits made in the Studio meanwhile are never overwritten.
 */
const APPLY = process.argv.includes('--apply')

const HUB = 'https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue'
const brochures = [
  ['Unleash the power of iGUIDE', 'Unleash-the-power-of-iGUIDE_Brochure_Jan-2024.pdf'],
  ['iGUIDE for Real Estate Photographers', 'iGUIDE-for-Real-Estate-Photographers-Brochure.pdf'],
  ['iGUIDE for Real Estate Agents', 'iGUIDE_for_Real_Estate_Agents_Brochure.pdf'],
  ['iGUIDE Site Surveys & Measurement', 'iGUIDE_Site_Survey.pdf'],
  ['iGUIDE for Architecture & Remodeling', 'iGUIDE-for-Architecture-Engineering-and-Construction_Final_7July2023.pdf'],
  ['iGUIDE for Insurance', 'iGUIDE-for-Insurance-Brochure.pdf'],
  ['iGUIDE for Facilities Management', 'iGUIDE-for-Facilities-Management_Brochure_Final.pdf'],
  ['iGUIDE for Insurance & Claims Adjusters', 'iGUIDE-for-Insurance-Claims-Adjusters_Brochure-v3.pdf'],
  ['Residential CAD Product Overview - US', 'iGUIDE_CAD_Solutions_Residential_USD.pdf'],
  ['Residential CAD Product Overview - CA', 'iGUIDE_CAD_Solutions_Residential_CAD.pdf'],
  ['Commercial CAD Product Overview - US', 'iGUIDE_CAD_Solutions_Commercial_USD.pdf'],
  ['Commercial CAD Product Overview - CA', 'iGUIDE_CAD_Solutions_Commercial_CAD.pdf'],
  ['iGUIDE: Security information', 'iGUIDE_Security_Information_October_2024.pdf'],
  ['The iGUIDE Portal', 'iGUIDE_Portal_Brochure_Final-1.pdf'],
  ['iGUIDE PLANIX R1 vs Pro: Comparison', 'PLANIX_PRO_R1_Tech_Specs_Comparison-1.pdf'],
  ['iGUIDE PLANIX R1 Camera System - Technical Specifications', 'PLANIX_R1_Tech_Specs.pdf'],
  ['iGUIDE PLANIX Camera System: Technical specifications', 'iGUIDE_PLANIX_Tech-Specs_Final.pdf'],
  ['iGUIDE Lead Magnet', 'iGUIDE_Lead_Magnet_1-Pager_Final.pdf'],
  ['iGUIDE Instant: Introduction', 'iGUIDE_Instant_Sales_Sheet_Final_Web.pdf'],
  ['How to: Importing iGUIDE DWG files into Chief Architect', 'How-to_DWG_Chief_Architect.pdf'],
  ['iGUIDE Instant Sketch: Introduction', 'iGUIDE_Instant_Sketch_Sales_Sheet.pdf'],
  ['iGUIDE Instant Sketch: 4 step process', 'iGUIDE_Instant_Sketch_Infographic_Final.pdf'],
  ['Advanced Drawing Package Deliverables', 'Advanced Drawing Package Deliverables.pdf'],
  ['iGUIDE CAD Floor Plan Add-on Deliverables', 'Floor Plan (DWG) Deliverables.pdf'],
  ['iGUIDE Reflected Ceiling Plan Deliverables', 'Reflected Ceiling Plan (DWG) Deliverables.pdf'],
  ['iGUIDE Roof Plan Deliverables', 'Roof Plan (DWG) Deliverables.pdf'],
  ['iGUIDE 3D Model Deliverables', '3D Model (RVT) Deliverables.pdf'],
  ['iGUIDE Exterior Elevations Deliverables', 'Exterior Elevation Plan (DWG) Deliverables.pdf'],
  ['ESX Add-on Deliverables', 'ESX-Add-on-Deliverables.pdf'],
  ['iGUIDE Instant Sketch - Xactimate: Deliverables', 'Instant-Sketch.pdf'],
].map(([title, file]) => ({title, file, url: `${HUB}/Brochures/${encodeURI(file)}`}))
const ebooks = [
  ['How to market iGUIDE services', 'iGUIDE-How-to-market-iGUIDE-services.pdf'],
  ['How to win more listings with iGUIDE', 'How-to-win-more-listings-with-iGUIDE.pdf'],
  ['The Ultimate Guide to Capturing and Measuring XL Interior Spaces', 'iGUIDE-Guide-to-Capturing-and-Measuring-XL-Interior-Spaces.pdf'],
  ['Winning in Insurance and Restoration: Stand out from your competitors', 'iGUIDE-Winning-in-Insurance-Restoration-Final-28June2023.pdf'],
  ['3D Cameras and 360 Cameras: State of 3D Virtual Tour Technology', 'iGUIDE-State-of-3D-Tour-Technology.pdf'],
  ['A New Definition of Professionalism', 'A-New-Definition-of-Professionalism-iGUIDE.pdf'],
].map(([title, file]) => ({title, file, url: `${HUB}/eBooks/${encodeURI(file)}`}))

// Titles may already read "iGuide" if the brand rename script has run
const norm = (s) => (s ?? '').toLowerCase().replace(/\s+/g, ' ').trim()
const byTitle = {brochure: new Map(brochures.map((b) => [norm(b.title), b])), doc: new Map(ebooks.map((e) => [norm(e.title), e]))}
// Old file names on goiguide.com (and older versions of the same file) → new URL
const byFile = new Map([...brochures, ...ebooks].map((d) => [d.file.toLowerCase(), d.url]))
byFile.set('esx-add-on-deliverables-2.pdf', byFile.get('esx-add-on-deliverables.pdf'))
byFile.set('iguide-for-insurance-claims-adjusters_brochure.pdf', byFile.get('iguide-for-insurance-claims-adjusters_brochure-v3.pdf'))
byFile.set('iguide_portal_brochure_final.pdf', byFile.get('iguide_portal_brochure_final-1.pdf'))

/** A link to an old goiguide.com copy of one of the PDFs → its HubSpot URL */
function newUrlFor(value) {
  if (typeof value !== 'string' || value.includes('hubspotusercontent')) return null
  const m = value.match(/^(?:https?:\/\/(?:www\.)?goiguide\.com)?(\/(?:assets|support_downloads)\/[^?#]+\.pdf)(?:[?#].*)?$/i)
  if (!m) return null
  const file = decodeURIComponent(m[1].split('/').pop()).toLowerCase()
  return byFile.get(file) ?? null
}

/** Path segment for an array item: by _key when it has one, else by index */
const itemSegment = (v, i) => (v && typeof v === 'object' && v._key ? `_key=="${v._key}"` : i)

function walk(value, path, changes) {
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${itemSegment(v, i)}]`, changes))
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) if (!k.startsWith('_')) walk(v, path ? `${path}.${k}` : k, changes)
  } else {
    const url = newUrlFor(value)
    if (url) changes.push({path, from: value, to: url})
  }
}

/** Which list a document's card is matched against */
const CARD_TYPES = new Map([
  ['brochure', 'brochure'],
  ['ebook', 'doc'],
  ['whitePaper', 'doc'],
])

/** Changes for one document; records its list title in `matched` when it has a card */
function planDoc(doc, matched) {
  const set = {}
  const notes = []
  const cardType = CARD_TYPES.get(doc._type) ?? null
  const card = cardType && byTitle[cardType].get(norm(doc.title))
  if (card) matched.add(card.title)
  if (card && doc.linkType && doc.linkType !== 'page' && doc.externalUrl !== card.url) {
    set.linkType = 'download'
    set.externalUrl = card.url
    notes.push(`card link: ${doc.linkType} ${doc.externalUrl} → download ${card.url}`)
  }
  const changes = []
  walk(doc, '', changes)
  for (const c of changes) {
    if (c.path === 'externalUrl' && set.externalUrl) continue
    set[c.path] = c.to
    notes.push(`${c.path}: ${c.from} → ${c.to}`)
  }
  return {set, notes}
}

/** Every change to make: [{doc, set, notes}], plus the list titles with no card in Sanity */
export function planChanges(docs) {
  const matched = new Set()
  const plan = []
  for (const doc of docs) {
    const {set, notes} = planDoc(doc, matched)
    if (notes.length) plan.push({doc, set, notes})
  }
  const unmatched = [...brochures, ...ebooks].filter((d) => !matched.has(d.title)).map((d) => d.title)
  return {plan, unmatched}
}

// Run only via `sanity exec` (the module is also imported by a test with sample data)
if (process.argv.some((a) => a.endsWith('update-document-links-in-sanity.mjs'))) {
  const {getCliClient} = await import('sanity/cli')
  const client = getCliClient({apiVersion: '2026-10-06'})
  const docs = await client.fetch('*[!(_type match "sanity.*") && !(_type match "system.*")]')
  const {plan, unmatched} = planChanges(docs)
  const tx = client.transaction()
  for (const {doc, set, notes} of plan) {
    console.log(`\n${doc._id} (${doc.title ?? doc._type})`)
    for (const n of notes) console.log(`  ${n}`)
    tx.patch(doc._id, (p) => p.ifRevisionId(doc._rev).set(set))
  }
  console.log(`\n${plan.length} document(s) to update.`)
  if (unmatched.length) console.log(`No card found for: ${unmatched.join('; ')}`)
  if (!APPLY) console.log('Dry run: nothing written. Add -- --apply to save.')
  else if (plan.length) {
    await tx.commit()
    console.log('Saved.')
  }
}
