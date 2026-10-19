import {defineField, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons/Folder'

/** A folder for organising landing pages in the Studio (e.g. a campaign or an audience). Not shown on the site. */
export const landingPageFolder = defineType({
  name: 'landingPageFolder',
  title: 'Landing page folder',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({name: 'title', title: 'Folder name', type: 'string', description: 'e.g. "Q1 2027 photographer campaign" or "AEC".', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Notes', type: 'text', rows: 2}),
  ],
  orderings: [{title: 'Name', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description'}},
})
