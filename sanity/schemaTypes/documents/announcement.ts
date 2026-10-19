import {defineField, defineType} from 'sanity'
import {BellIcon} from '@sanity/icons/Bell'

/**
 * One message in the sitewide announcement bar.
 * Only messages inside their schedule window are shown; with none, the bar is hidden.
 * Each message can show on all pages or only listed ones (same rules as pop-ups);
 * paid-media landing pages only when "Include paid landing pages" is ticked.
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
      name: 'region',
      title: 'Region',
      type: 'string',
      initialValue: 'global',
      options: {list: [{title: 'Global site (never on Australia pages)', value: 'global'}, {title: 'Australia only (/au pages)', value: 'au'}], layout: 'radio'},
      description: 'Each region is kept separate: Australia items only show on /au pages, global items never do.',
    }),
    defineField({
      name: 'showOn',
      title: 'Show on',
      type: 'string',
      initialValue: 'all',
      options: {list: [{title: 'All pages', value: 'all'}, {title: 'Only the pages listed below', value: 'only'}], layout: 'radio'},
    }),
    defineField({
      name: 'paths',
      title: 'Pages',
      type: 'array',
      of: [{type: 'string'}],
      description: 'One page per line, e.g. /pricing. End with /* for a whole section, e.g. /blogs/* or /au/*.',
      hidden: ({document}) => (document as {showOn?: string} | undefined)?.showOn !== 'only',
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.document as {showOn?: string} | undefined)?.showOn === 'only' && !(value as string[] | undefined)?.length ? 'Add at least one page' : true,
        ),
    }),
    defineField({
      name: 'excludePaths',
      title: 'Never show on',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Pages to skip, same format.',
    }),
    defineField({
      name: 'includeLandingPages',
      title: 'Include paid landing pages',
      type: 'boolean',
      initialValue: false,
      description: 'Off by default: paid-media landing pages don\'t show the bar unless this is ticked.',
      hidden: ({document}) => (document as {showOn?: string} | undefined)?.showOn === 'only',
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
