import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

/**
 * A row of client logos shown on one or more pages (e.g. "Real estate logos").
 * Pages pick a band by its fixed ID; editing the band here updates every page
 * that shows it. Created by scripts/seed-cms-library.mjs.
 */
export const logoBand = defineType({
  name: 'logoBand',
  title: 'Logo band',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'For finding it here. Not shown on the site.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      description: 'Shown in this order. Drag to reorder. Remove every logo to fall back to the default list.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'clientLogo'}]})],
    }),
    defineField({
      name: 'usedOn',
      title: 'Shown on',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      readOnly: true,
      description: 'Pages that show this band. Set by the site, for reference.',
    }),
  ],
  preview: {
    select: {title: 'title', usedOn: 'usedOn', media: 'logos.0.logo'},
    prepare: ({title, usedOn, media}) => ({title, subtitle: (usedOn as string[] | undefined)?.join(', '), media}),
  },
})
