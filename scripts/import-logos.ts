/**
 * One-off: upload the homepage scroll logos to Sanity and put them in the
 * Home page logo carousel (in this order). Safe to re-run: logo documents use
 * fixed IDs and Sanity de-duplicates identical image uploads.
 *
 * Also creates the Home page document if it doesn't exist yet, filling the hero
 * with the current default copy (never overwrites fields that are already set).
 *
 * Run from the repo root while logged in to the Sanity CLI:
 *   npx sanity exec scripts/import-logos.ts --with-user-token -- "/path/to/logo/folder"
 */
import {createReadStream, existsSync} from 'node:fs'
import {basename, join} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-06'})

const folder = process.argv.slice(2).find((arg) => !arg.startsWith('-')) ?? ''

// Carousel order. Names are used as alt text.
const logos = [
  {id: 'royal-lepage', name: 'Royal LePage', file: 'Scrolling-LogosRoyalLePage.png'},
  {id: 'look-inside', name: 'Look Inside', file: 'loookinside-logo.png'},
  {id: 'preptours', name: 'PrepTours', file: 'Scrolling-LogosPrepTours.png'},
  {id: 'visual-advantage', name: 'Visual Advantage', file: 'Scrolling-LogosVisual.png'},
  {id: 'deft', name: 'Deft', file: 'Scrolling-LogosDeft.png'},
  {id: 'seeknow', name: 'SeekNow', file: 'Scrolling-LogosSeeknow.png'},
  {id: 'grindley-williams', name: 'Grindley Williams Engineering', file: 'Scrolling-LogosGrindley.png'},
  // File is named PrepTours-v2 but contains the PuroClean logo
  {id: 'puroclean', name: 'PuroClean', file: 'Scrolling-LogosPrepTours-v2.png'},
  {id: 'pizza-pizza', name: 'Pizza Pizza', file: 'Pizza-Pizza-Logo.png'},
  {id: 'keller-williams', name: 'Keller Williams', file: 'Scrolling-LogosKW.png'},
  {id: 'remax', name: 'RE/MAX', file: 'Scrolling-LogosRemax.png'},
  {id: 'bar-burrito', name: 'Bar Burrito', file: 'bar_burrito-v3.png'},
  {id: 'make-it-right', name: 'Make It Right', file: 'make-it-right.svg'},
]

const heroDefaults = {
  _type: 'object',
  eyebrow: {_type: 'link', label: 'New: Site Plans for residential listings', href: '/iguide/site-plans'},
  heading: 'Your fastest path to accurate floor plans and 3D virtual tours',
  subheading: 'Own your data, floor plans and virtual tour—all from a single scan.',
  cta: {_type: 'link', label: 'Book a Demo', href: '/book-a-demo'},
  secondaryCta: {_type: 'link', label: 'Learn more', href: '#how-it-works'},
  media: {_type: 'heroMedia', mediaType: 'image'},
}

async function main() {
  if (!folder || !existsSync(folder)) {
    throw new Error(`Logo folder not found: "${folder}". Pass it after --`)
  }
  const missing = logos.filter((logo) => !existsSync(join(folder, logo.file)))
  if (missing.length) throw new Error(`Missing files: ${missing.map((m) => m.file).join(', ')}`)

  const refs = []
  for (const logo of logos) {
    const path = join(folder, logo.file)
    const asset = await client.assets.upload('image', createReadStream(path), {filename: basename(path)})
    const _id = `clientLogo-${logo.id}`
    await client.createOrReplace({
      _id,
      _type: 'clientLogo',
      name: logo.name,
      logo: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
    })
    refs.push({_key: logo.id, _type: 'reference', _ref: _id})
    console.log(`✓ ${logo.name}`)
  }

  // Published Home page (create if needed), plus any unpublished draft so it doesn't hide the change
  await client.createIfNotExists({_id: 'homePage', _type: 'homePage'})
  const draft = await client.getDocument('drafts.homePage')
  for (const id of draft ? ['homePage', 'drafts.homePage'] : ['homePage']) {
    await client
      .patch(id)
      .setIfMissing({hero: heroDefaults})
      .setIfMissing({logoCarousel: {_type: 'object', heading: 'Trusted by **thousands** of professionals worldwide'}})
      .set({'logoCarousel.logos': refs})
      .commit()
  }
  console.log(`✓ Home page logo carousel now has ${refs.length} logos`)
}

main().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
