import {defineField, defineType} from 'sanity'
import {DownloadIcon} from '@sanity/icons/Download'
import {catalogues} from '../../../lib/catalogue'

/** One downloadable file in the Marketing Catalogue (photo pack, video, brochure, checklist…). */
export const catalogueItem = defineType({
  name: 'catalogueItem',
  title: 'Marketing Catalogue item',
  type: 'document',
  icon: DownloadIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'catalogue',
      title: 'Catalogue',
      type: 'string',
      options: {list: catalogues.map((c) => ({value: c.id, title: c.label})), layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'goiguide.com/<catalogue>/<slug> sends visitors straight to the file.',
      options: {source: 'title', maxLength: 120},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fileUrl',
      title: 'File',
      type: 'string',
      description: 'goiguide.com/assets/… path or full URL of the file to download.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({name: 'publishedAt', title: 'Date added', type: 'datetime', initialValue: () => new Date().toISOString()}),
    defineField({
      name: 'legacy',
      title: 'Imported from the old site',
      type: 'object',
      readOnly: true,
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'url', title: 'Old URL', type: 'string'}),
        defineField({name: 'lastModified', title: 'Last edited on the old site', type: 'datetime'}),
        defineField({name: 'importedAt', title: 'Imported', type: 'datetime'}),
      ],
    }),
  ],
  orderings: [{title: 'Newest first', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', catalogue: 'catalogue', media: 'thumbnail'},
    prepare: ({title, catalogue, media}) => ({title, subtitle: catalogues.find((c) => c.id === catalogue)?.label, media}),
  },
})
