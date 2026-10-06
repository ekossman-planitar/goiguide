import {defineField, defineType, type FieldDefinition} from 'sanity'
import type {ComponentType} from 'react'
import {getResourceType, type ResourceTypeName} from '../../../lib/resourceTypes'

type Options = {
  name: ResourceTypeName
  icon: ComponentType
  /** Fields specific to this type, added after the shared ones. */
  extraFields?: FieldDefinition[]
  /** Label for the date field (e.g. "Date added" for undated types). */
  dateTitle?: string
  /** False for types that only link out (no page on goiguide.com, so no slug). */
  hasPage?: boolean
}

/**
 * Builds a Resource Center document type. Every type shares the fields the
 * listing cards need (title, slug, date, excerpt, featured image) plus SEO.
 */
export function defineResourceType({name, icon, extraFields = [], dateTitle = 'Published date', hasPage = true}: Options) {
  const config = getResourceType(name)!

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
        hidden: !hasPage,
        name: 'slug',
        title: 'URL slug',
        type: 'slug',
        group: 'content',
        description: `Page address: goiguide.com${config.basePath}/<slug>`,
        options: {source: 'title', maxLength: 96},
        validation: (rule) => (hasPage ? rule.required() : rule),
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
        description: 'Shown on the card. 1–2 sentences.',
        validation: (rule) => rule.required().max(220),
      }),
      defineField({
        name: 'featuredImage',
        title: 'Featured image',
        type: 'image',
        group: 'content',
        options: {hotspot: true},
        fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        validation: (rule) => rule.required(),
      }),
      ...extraFields.map((field) => ({group: 'content', ...field})),
      defineField({name: 'seo', title: 'SEO & social', type: 'seo', group: 'seo'}),
    ],
    orderings: [
      {title: 'Newest first', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
    ],
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
