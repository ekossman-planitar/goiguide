/**
 * Creates an UNPUBLISHED demo blog post (a draft) for showing the team how
 * publishing works. Nothing appears on the site until someone opens it in the
 * Studio, adds a featured image and clicks Publish.
 *
 * Safe to re-run: it resets the same draft each time.
 *
 * Run from the repo root while logged in to the Sanity CLI:
 *   npx sanity exec scripts/create-demo-post.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-06'})

let keyCount = 0
const key = () => `k${(keyCount++).toString(36)}`

const span = (text: string, marks: string[] = []) => ({_type: 'span', _key: key(), text, marks})
const block = (style: string, ...children: ReturnType<typeof span>[]) => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [] as {_key: string; _type: string; href: string}[],
  children,
})
const bullet = (text: string) => ({...block('normal', span(text)), listItem: 'bullet', level: 1})

// A paragraph with one link in it
const linkKey = 'resourcecenter'
const withLink = {
  ...block(
    'normal',
    span('Once published, the post shows up in the '),
    span('Resource Center', [linkKey]),
    span(' under the Blog filter, with its own page at /blogs/demo-publishing-workflow.'),
  ),
  markDefs: [{_key: linkKey, _type: 'link', href: '/resource-center?tab=blog'}],
}

async function main() {
  // Placeholder author (published, so the draft can reference it)
  await client.createOrReplace({
    _id: 'author-demo',
    _type: 'author',
    name: 'iGUIDE Marketing',
    role: 'Demo author (replace me)',
    bio: 'Placeholder author used to demo the author box. Swap in a real team member before publishing anything real.',
  })

  await client.createOrReplace({
    _id: 'drafts.demo-blog-post',
    _type: 'blogPost',
    title: 'Demo: publishing a blog post on goiguide.com',
    slug: {_type: 'slug', current: 'demo-publishing-workflow'},
    publishedAt: new Date().toISOString(),
    excerpt:
      'A practice post that shows the whole workflow: write, add an image, check the preview fields, and publish.',
    author: {_type: 'reference', _ref: 'author-demo'},
    body: [
      block('normal', span('This is a demo post. It exists only as a draft, so it is not on the website yet.')),
      block('h2', span('How publishing works')),
      bullet('Write the title, short description and body in the Studio.'),
      bullet('Upload a featured image. It is used on the card, at the top of the post and, by default, for social sharing.'),
      bullet('Optionally fill in the SEO & social tab. Anything left empty falls back to the title, description and featured image.'),
      bullet('Click Publish. The post goes live within about a minute.'),
      block('h2', span('Where it appears')),
      withLink,
      block('blockquote', span('Delete or unpublish this post after the demo.')),
    ],
    // SEO left empty on purpose, to demo the fallbacks
  })

  console.log('✓ Draft created: Resource Center → Blog → "Demo: publishing a blog post on goiguide.com"')
  console.log('  Add a featured image, then Publish to see it at /blogs/demo-publishing-workflow')
}

main().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
