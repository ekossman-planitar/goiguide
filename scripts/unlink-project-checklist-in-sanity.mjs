/**
 * Removes the link (keeps the text) on "Project Requirements Checklist" in the
 * XL interior spaces guide. The old .docx is gone on live too; the earlier fix
 * pointed it at the homepage (Evan, 2026-10-22: remove the link instead).
 *
 * Dry run:  npx sanity exec scripts/unlink-project-checklist-in-sanity.mjs --with-user-token
 * Apply:    npx sanity exec scripts/unlink-project-checklist-in-sanity.mjs --with-user-token -- --apply
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-06'})
const APPLY = process.argv.includes('--apply')
const ID = 'whitePaper-the-ultimate-guide-to-capturing-and-measuring-xl-interior-spaces'
const TEXT = 'Project Requirements Checklist'

const doc = await client.getDocument(ID)
let found = 0
const body = (doc?.body ?? []).map((block) => {
  const keys = (block.markDefs ?? [])
    .filter(
      (m) =>
        (m.href === '/' || /support_downloads/.test(m.href ?? '')) &&
        (block.children ?? []).some((c) => (c.marks ?? []).includes(m._key) && c.text.includes(TEXT)),
    )
    .map((m) => m._key)
  if (!keys.length) return block
  found += keys.length
  return {
    ...block,
    markDefs: block.markDefs.filter((m) => !keys.includes(m._key)),
    children: block.children.map((c) => ({...c, marks: (c.marks ?? []).filter((k) => !keys.includes(k))})),
  }
})

console.log(`${found} link(s) found on "${TEXT}".`)
if (found !== 1) {
  console.log('Expected exactly 1, nothing written.')
} else if (APPLY) {
  await client.patch(ID).ifRevisionId(doc._rev).set({body}).commit()
  console.log('Link removed, text kept.')
} else {
  console.log('Dry run only. Add -- --apply to write the change.')
}
