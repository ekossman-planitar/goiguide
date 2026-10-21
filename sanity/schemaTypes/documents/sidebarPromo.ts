import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons/BlockElement'

/**
 * A promo card in the right-hand column of blog posts, under the fixed
 * "Book a demo" card. When several are live, each page view shows one at
 * random, so they take turns.
 */
export const sidebarPromo = defineType({
  name: 'sidebarPromo',
  title: 'Blog sidebar promo',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({name: 'name', title: 'Internal name', type: 'string', description: 'Only shown in the Studio.', validation: (rule) => rule.required()}),
    defineField({name: 'enabled', title: 'On', type: 'boolean', initialValue: true}),
    defineField({name: 'eyebrow', title: 'Small label above the heading', type: 'string', description: 'e.g. "Limited-time offer"', validation: (rule) => rule.max(40)}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required().max(70)}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 3, validation: (rule) => rule.max(200)}),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Shown at the top of the card, about 600 × 340 px.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({name: 'button', title: 'Button', type: 'link', validation: (rule) => rule.required()}),
    defineField({name: 'newTab', title: 'Open the button link in a new tab', type: 'boolean', initialValue: false}),
    defineField({name: 'startAt', title: 'Show from', type: 'datetime', description: 'Leave empty to show straight away.'}),
    defineField({
      name: 'endAt',
      title: 'Hide after',
      type: 'datetime',
      description: 'Leave empty to keep showing.',
      validation: (rule) =>
        rule.custom((endAt, context) => {
          const startAt = (context.document as {startAt?: string} | undefined)?.startAt
          return endAt && startAt && Date.parse(endAt) <= Date.parse(startAt) ? '"Hide after" must be later than "Show from"' : true
        }),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'heading', media: 'image', enabled: 'enabled', endAt: 'endAt'},
    prepare: ({title, subtitle, media, enabled, endAt}) => {
      let status = ''
      if (enabled === false) status = 'Off · '
      else if (endAt && Date.parse(endAt) <= Date.now()) status = 'Ended · '
      return {title, subtitle: status ? `${status}${subtitle}` : subtitle, media}
    },
  },
})
