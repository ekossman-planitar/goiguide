import {defineField, defineType} from 'sanity'

/** Reusable label + URL pair used by buttons and text links. */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'A path on goiguide.com (e.g. /pricing) or a full URL (https://…).',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          return /^(\/|#|https?:\/\/|mailto:|tel:)/.test(value)
            ? true
            : 'Start with /, #, https://, mailto: or tel:'
        }),
    }),
  ],
})
