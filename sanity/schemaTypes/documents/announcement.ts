import {defineField, defineType} from 'sanity'
import {BellIcon} from '@sanity/icons/Bell'

/**
 * One message in the sitewide announcement bar.
 * Only messages inside their schedule window are shown; with none, the bar is hidden.
 */
export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'link',
      title: 'Link (optional)',
      type: 'link',
    }),
    defineField({
      name: 'startAt',
      title: 'Show from',
      type: 'datetime',
      description: 'Leave empty to show immediately once published.',
    }),
    defineField({
      name: 'endAt',
      title: 'Hide after',
      type: 'datetime',
      description: 'Leave empty to show until unpublished.',
      validation: (rule) =>
        rule.custom((endAt, context) => {
          const startAt = (context.document as {startAt?: string} | undefined)?.startAt
          if (endAt && startAt && Date.parse(endAt) <= Date.parse(startAt)) {
            return '"Hide after" must be later than "Show from"'
          }
          return true
        }),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers show first when several announcements are live.',
      initialValue: 10,
    }),
  ],
  orderings: [
    {title: 'Sort order', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'message', startAt: 'startAt', endAt: 'endAt'},
    prepare({title, startAt, endAt}) {
      const now = Date.now()
      let status = 'Live'
      if (startAt && Date.parse(startAt) > now) status = `Scheduled · starts ${new Date(startAt).toLocaleString()}`
      else if (endAt && Date.parse(endAt) <= now) status = 'Expired'
      else if (endAt) status = `Live · ends ${new Date(endAt).toLocaleString()}`
      return {title, subtitle: status}
    },
  },
})
