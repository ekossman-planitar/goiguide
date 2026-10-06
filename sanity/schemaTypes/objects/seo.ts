import {defineField, defineType} from 'sanity'

/** Per-page search and social sharing overrides. Every field falls back to page content. */
export const seo = defineType({
  name: 'seo',
  title: 'SEO & social',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in search results and browser tabs. Falls back to the title. Aim for under 60 characters.',
      validation: (rule) => rule.max(70).warning('Long titles get cut off in search results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Shown under the title in search results. Falls back to the excerpt. Aim for 120–160 characters.',
      validation: (rule) => rule.max(170).warning('Long descriptions get cut off in search results'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Shown when the page is shared on LinkedIn, Facebook, Slack, etc. Falls back to the featured image. Cropped to 1200 × 630.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
