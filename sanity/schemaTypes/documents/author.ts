import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

/** A post author, shown in the author box on articles. */
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'role', title: 'Job title', type: 'string'}),
    defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'bio', title: 'Short bio', type: 'text', rows: 3}),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
