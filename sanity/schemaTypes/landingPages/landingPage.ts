import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'
import {checkLandingPath} from '../../../lib/landingPages/reservedPaths'
import {lpLayouts} from '../../../lib/landingPages/layouts'
import {LayoutPicker} from '../../components/LayoutPicker'
import {LandingPathInput} from '../../components/LandingPathInput'
import {lpSections} from './objects'

/**
 * Paid-media landing page at any URL the editor chooses. Always noindex,
 * left out of the sitemap, and shown with the stripped landing-page header
 * and footer (logo only).
 */
export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'URL & settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal name',
      type: 'string',
      group: ['content', 'settings'],
      description: 'For finding it in the Studio, e.g. "REP — Google Search — Spring 2027 (B)". Not shown on the page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'path',
      title: 'Page URL',
      type: 'string',
      group: 'settings',
      description: 'The address on goiguide.com, starting with /. Checked against every page on the site and every other landing page.',
      components: {input: LandingPathInput},
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          const result = checkLandingPath(value)
          if (result !== true) return result
          const id = context.document?._id.replace(/^drafts\./, '')
          const taken = await context
            .getClient({apiVersion: '2026-10-06'})
            .fetch<{title?: string} | null>(
              '*[_type == "landingPage" && path == $path && !(_id in [$id, $draft])][0]{title}',
              {path: value, id, draft: `drafts.${id}`},
            )
          return taken ? `Another landing page already uses this URL ("${taken.title ?? 'untitled'}").` : true
        }),
    }),
    defineField({
      name: 'live',
      title: 'Page is live',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Turn off to take the page down (it shows "page not found") without deleting it.',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: ['content', 'settings'],
      description: 'The starting arrangement of sections. You can still add, remove and reorder sections below.',
      options: {list: lpLayouts.map((l) => ({title: l.name, value: l.id}))},
      components: {input: LayoutPicker},
      initialValue: 'lead-form',
    }),
    defineField({
      name: 'headerButton',
      title: 'Header button',
      type: 'lpButton',
      group: 'content',
      description: 'Optional button in the top bar (the logo is the only other thing there).',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: lpSections,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Browser tab title',
      type: 'string',
      group: 'settings',
      description: 'Also used when the page is shared. Landing pages are always hidden from search engines.',
      validation: (rule) => rule.required().max(70).warning('Keep it under 70 characters'),
    }),
    defineField({name: 'metaDescription', title: 'Share description', type: 'text', rows: 2, group: 'settings', validation: (rule) => rule.max(160).warning('Keep it under 160 characters')}),
    defineField({
      name: 'shareImage',
      title: 'Share image',
      type: 'image',
      group: 'settings',
      description: 'Shown when the link is shared. Defaults to the iGUIDE share image.',
    }),
    defineField({name: 'notes', title: 'Campaign notes', type: 'text', rows: 3, group: 'settings', description: 'Internal: campaign, audience, test hypothesis…'}),
    defineField({
      name: 'variantOf',
      title: 'A/B variant of',
      type: 'reference',
      to: [{type: 'landingPage'}],
      group: 'settings',
      description: 'Optional: link the B version to its A version, for reference.',
    }),
  ],
  preview: {
    select: {title: 'title', path: 'path', live: 'live'},
    prepare: ({title, path, live}) => ({title, subtitle: `${live === false ? '(Off) ' : ''}${path ?? 'no URL yet'}`}),
  },
  orderings: [{title: 'URL', name: 'pathAsc', by: [{field: 'path', direction: 'asc'}]}],
})

export const landingPageTypes = [landingPage]
