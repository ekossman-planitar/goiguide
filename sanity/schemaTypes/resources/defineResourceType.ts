import {defineField, defineType, type FieldDefinition} from 'sanity'
import type {ComponentType} from 'react'
import {getResourceType, linkTypes, type ResourceTypeName} from '../../../lib/resourceTypes'

type Options = {
  name: ResourceTypeName
  icon: ComponentType
  /** Fields specific to this type, added after the shared ones. */
  extraFields?: FieldDefinition[]
  /** Label for the date field (e.g. "Date added" for undated types). */
  dateTitle?: string
}

const linkTypeTitles: Record<(typeof linkTypes)[number], string> = {
  page: 'Its own page on goiguide.com',
  external: 'Another website',
  video: 'A video (YouTube, Vimeo…)',
  download: 'A file download (PDF, ZIP…)',
  tour: 'An iGUIDE tour',
}

/**
 * Builds a Resource Center document type. Every type shares the fields the
 * listing cards and detail pages need (title, slug, date, excerpt, image,
 * categories, where the card links to, body) plus SEO.
 */
export function defineResourceType({name, icon, extraFields = [], dateTitle = 'Published date'}: Options) {
  const config = getResourceType(name)!
  const categories = Object.entries(config.categories as Record<string, string>)

  return defineType({
    name,
    title: config.singular,
    type: 'document',
    icon,
    groups: [
      {name: 'content', title: 'Content', default: true},
      {name: 'seo', title: 'SEO & social'},
    ],
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        group: 'content',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'slug',
        title: 'URL slug',
        type: 'slug',
        group: 'content',
        description: `Page address: goiguide.com${config.basePath}/<slug>`,
        options: {source: 'title', maxLength: 120},
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'publishedAt',
        title: dateTitle,
        type: 'datetime',
        group: 'content',
        description: 'Newest first in the Resource Center.',
        initialValue: () => new Date().toISOString(),
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'excerpt',
        title: 'Short description',
        type: 'text',
        rows: 3,
        group: 'content',
        description: 'Shown on the card and under the page title. 1–2 sentences.',
        // Some imported live entries have none or a long one: warn, don't block
        validation: (rule) => rule.max(300).warning('Long descriptions get cut off on cards'),
      }),
      defineField({
        name: 'featuredImage',
        title: 'Featured image',
        type: 'image',
        group: 'content',
        options: {hotspot: true},
        fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
      }),
      ...(categories.length
        ? [
            defineField({
              name: 'categories',
              title: 'Categories',
              type: 'array',
              group: 'content',
              of: [{type: 'string'}],
              options: {list: categories.map(([value, title]) => ({value, title})), layout: 'grid'},
            }),
          ]
        : []),
      defineField({
        name: 'linkType',
        title: 'Card opens',
        type: 'string',
        group: 'content',
        initialValue: 'page',
        options: {list: linkTypes.map((value) => ({value, title: linkTypeTitles[value]})), layout: 'radio'},
      }),
      defineField({
        name: 'externalUrl',
        title: 'Link to',
        type: 'string',
        group: 'content',
        description: 'Video, file, tour or website the card opens. Files can be a goiguide.com/assets/… path.',
        hidden: ({parent}) => !parent?.linkType || parent.linkType === 'page',
      }),
      ...extraFields.map((field) => ({group: 'content', ...field})),
      defineField({
        name: 'headerVideoUrl',
        title: 'Header video (embed URL)',
        type: 'url',
        group: 'content',
        description: 'Shown instead of the featured image at the top of the page, e.g. https://www.youtube.com/embed/…',
      }),
      defineField({name: 'body', title: 'Body', type: 'richText', group: 'content'}),
      defineField({name: 'seo', title: 'SEO & social', type: 'seo', group: 'seo'}),
      defineField({
        name: 'legacy',
        title: 'Imported from the old site',
        type: 'object',
        group: 'seo',
        readOnly: true,
        options: {collapsible: true, collapsed: true},
        description: 'Filled by the import script. For reference only.',
        fields: [
          defineField({name: 'url', title: 'Old URL', type: 'string'}),
          defineField({name: 'lastModified', title: 'Last edited on the old site', type: 'datetime'}),
          defineField({name: 'importedAt', title: 'Imported', type: 'datetime'}),
          defineField({name: 'notes', title: 'Import notes', type: 'text', rows: 3}),
        ],
      }),
    ],
    orderings: [{title: 'Newest first', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
    preview: {
      select: {title: 'title', date: 'publishedAt', media: 'featuredImage'},
      prepare: ({title, date, media}) => ({
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media,
      }),
    },
  })
}
