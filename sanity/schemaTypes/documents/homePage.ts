import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

/** Singleton: content for the homepage sections that are CMS-controlled. */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'logos', title: 'Logo carousel'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Pill above heading (optional)',
          type: 'link',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'cta',
          title: 'Button',
          type: 'link',
        }),
        defineField({
          name: 'media',
          title: 'Right side: image or video',
          type: 'heroMedia',
        }),
      ],
    }),
    defineField({
      name: 'logoCarousel',
      title: 'Logo carousel',
      type: 'object',
      group: 'logos',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Wrap words in **double asterisks** to bold them.',
          initialValue: 'Trusted by **thousands** of professionals worldwide',
        }),
        defineField({
          name: 'logos',
          title: 'Logos',
          type: 'array',
          description: 'Drag to reorder.',
          of: [defineArrayMember({type: 'reference', to: [{type: 'clientLogo'}]})],
          validation: (rule) => rule.unique(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home page'}),
  },
})
