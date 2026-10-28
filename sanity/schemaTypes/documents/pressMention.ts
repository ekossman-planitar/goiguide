import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

/** A press outlet or event shown in the "As seen in" strip on the Leadership page. */
export const pressMention = defineType({
  name: 'pressMention',
  title: 'As seen in (press and events)',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Outlet or event name',
      type: 'string',
      description: 'Used as the alt text.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {list: [{title: 'Press', value: 'press'}, {title: 'Event', value: 'event'}], layout: 'radio'},
      initialValue: 'press',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'SVG preferred. Transparent PNG also works.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      description: 'The article or talk this logo links to.',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lowest number first. Leave empty to put it last.',
    }),
    defineField({name: 'hidden', title: 'Hide from the page', type: 'boolean', initialValue: false}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'kind', media: 'logo'}},
})
