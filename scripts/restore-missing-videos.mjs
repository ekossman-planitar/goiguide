/**
 * Adds back three videos the content import left out (found by comparing every
 * live page's videos with the new site, 2026-10-20):
 *  - "The latest from iGUIDE…" blog: the "2024 Wrapped Webinar" heading, intro and video at the top
 *  - "Why I use both iGUIDE and CubiCasa…" blog and the Northern Spruce Media story:
 *    "Want to hear more from Alex?" and the Ask Alex Anything video (live: thumbnail opening it in a lightbox)
 * Text is copied from live. Skips a document that already has the video.
 *
 * Dry run:  npx sanity exec scripts/restore-missing-videos.mjs --with-user-token
 * Apply:    npx sanity exec scripts/restore-missing-videos.mjs --with-user-token -- --apply
 */
import {randomUUID} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-06'})
const APPLY = process.argv.includes('--apply')
const key = () => randomUUID().replaceAll(/-/g, '').slice(0, 12)
const block = (text, style = 'normal') => ({_type: 'block', _key: key(), style, markDefs: [], children: [{_type: 'span', _key: key(), text, marks: []}]})
const video = (id, title) => ({_type: 'videoEmbed', _key: key(), url: `https://www.youtube.com/embed/${id}`, title})

const alex = () => [
  block('Want to hear more from Alex?'),
  video('pNee1TJQf7c', 'Ask Alex Anything: Scaling your real estate photography business'),
]

const jobs = [
  {
    id: 'blogPost-the-latest-from-iguide-to-help-you-grow-your-business-what-you-might-have-missed',
    videoId: 'EDXIk4UJgGY',
    at: 'before',
    blocks: () => [
      block('2024 Wrapped Webinar', 'h3'),
      block(
        'From standout stats and customer wins to exciting launches like the PLANIX R1 system, Advanced CAD Packages, and the new iGUIDE Operator Network (ION), this webinar has it all. Watch our year-in-review now!',
      ),
      video('EDXIk4UJgGY', '2024 Wrapped Webinar'),
    ],
  },
  {id: 'blogPost-why-i-use-both-iguide-and-cubicasa-in-my-business', videoId: 'pNee1TJQf7c', at: 'end', blocks: alex},
  {
    id: 'customerStory-northern-spruce-media-from-scrappy-beginnings-to-600-clients-strong-with-help-from-iguide',
    videoId: 'pNee1TJQf7c',
    at: 'end',
    blocks: alex,
  },
]

for (const job of jobs) {
  const doc = await client.getDocument(job.id)
  if (!doc) {
    console.log(`${job.id}: not found, skipped`)
    continue
  }
  if (JSON.stringify(doc.body ?? []).includes(job.videoId)) {
    console.log(`${job.id}: already has ${job.videoId}, skipped`)
    continue
  }
  const items = job.blocks()
  const body = doc.body ?? []
  // Before the trailing "Book a demo" line the import kept at the end of some stories
  const lastText = body.at(-1)?.children?.map((c) => c.text).join('') ?? ''
  let where = ['after', 'body[-1]']
  if (job.at === 'before') where = ['before', 'body[0]']
  else if (/^book a demo$/i.test(lastText.trim())) where = ['before', `body[_key=="${body.at(-1)._key}"]`]
  console.log(`${job.id}: add ${items.map((i) => i._type).join(', ')} ${where[0]} ${where[1]}`)
  if (APPLY) await client.patch(job.id).ifRevisionId(doc._rev).insert(where[0], where[1], items).commit()
}
console.log(APPLY ? 'Saved.' : 'Dry run: nothing written. Add -- --apply to save.')
