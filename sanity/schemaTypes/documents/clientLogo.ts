import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

/** A customer/partner logo, reusable in any logo carousel. */
export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client logo',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Company name',
      type: 'string',
      description: 'Used as the alt text.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'SVG preferred. Transparent PNG also works.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
  },
})
