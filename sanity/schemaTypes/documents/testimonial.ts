import {defineArrayMember, defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

/**
 * A customer quote. The same testimonial can appear on several pages; editing
 * it here updates all of them. Created by scripts/seed-cms-library.mjs from
 * the quotes that were in the code.
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'hidden',
      title: 'Hide everywhere',
      type: 'boolean',
      initialValue: false,
      description: 'Removes this testimonial from every page that shows it.',
    }),
    defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'detail', title: 'Supporting sentence', type: 'text', rows: 3, description: 'Optional. Shown under the quote on some layouts.'}),
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({
      name: 'photo',
      title: 'Headshot',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company logo',
      type: 'reference',
      to: [{type: 'clientLogo'}],
      description: 'Shown on customer story cards and some quote layouts.',
    }),
    defineField({name: 'link', title: 'Link', type: 'link', description: 'Optional, e.g. "Read their story".'}),
    defineField({
      name: 'usedOn',
      title: 'Shown on',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      readOnly: true,
      description: 'Pages that show this testimonial. Set by the site, for reference.',
    }),
  ],
  preview: {
    select: {name: 'name', company: 'company', logoName: 'companyLogo.name', quote: 'quote', hidden: 'hidden', media: 'photo', logo: 'companyLogo.logo'},
    prepare: ({name, company, logoName, quote, hidden, media, logo}) => ({
      title: [name, company].filter(Boolean).join(', ') || logoName || 'Testimonial',
      subtitle: `${hidden ? '(Hidden) ' : ''}${quote ?? ''}`,
      media: media ?? logo,
    }),
  },
})
