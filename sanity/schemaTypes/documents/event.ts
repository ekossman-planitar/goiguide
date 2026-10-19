import {defineArrayMember, defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {attendanceModes, DEFAULT_TIME_ZONE, eventCategories, eventTimeZones, eventTypes, sessionFormats} from '../../../lib/events'

type Doc = {startAt?: string; endAt?: string; attendance?: string}
const isOnline = (d: Doc | undefined) => d?.attendance === 'online'
const checkUrl = (v: unknown) => (!v || /^(\/|https?:\/\/)/.test(v as string) ? true : 'Start with https:// (or / for a goiguide.com page)')

/** An event on /events, with its own page at /event/<slug>. Hidden from /events once it ends. */
export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'content', title: 'Page content'},
    {name: 'signup', title: 'Links & sign-up'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Event name', type: 'string', group: 'details', validation: (r) => r.required().max(120)}),
    defineField({
      name: 'slug',
      title: 'Page URL',
      type: 'slug',
      group: 'details',
      description: 'The page lives at goiguide.com/event/<this>. Click Generate.',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Type',
      type: 'string',
      group: 'details',
      options: {list: eventTypes.map(({value, title}) => ({value, title}))},
      initialValue: 'conference',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Industries',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      options: {list: eventCategories.map(({value, title}) => ({value, title})), layout: 'grid'},
    }),
    defineField({
      name: 'attendance',
      title: 'Attend',
      type: 'string',
      group: 'details',
      options: {list: attendanceModes.map(({value, title}) => ({value, title})), layout: 'radio', direction: 'horizontal'},
      initialValue: 'in-person',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'timeZone',
      title: 'Event time zone',
      type: 'string',
      group: 'details',
      description: 'Times on the site are shown in this time zone. Pick the zone where the event happens (or the host zone for webinars).',
      options: {list: eventTimeZones.map(({value, title}) => ({value, title}))},
      initialValue: DEFAULT_TIME_ZONE,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'startAt',
      title: 'Starts',
      type: 'datetime',
      group: 'details',
      description: 'Enter the local start time. If you are in a different time zone from the event, switch the picker’s time zone first.',
      options: {allowTimeZoneSwitch: true} as never,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'endAt',
      title: 'Ends',
      type: 'datetime',
      group: 'details',
      description: 'The event disappears from /events after this time.',
      options: {allowTimeZoneSwitch: true} as never,
      validation: (r) =>
        r.required().custom((v, ctx) => {
          const start = (ctx.document as Doc | undefined)?.startAt
          return v && start && Date.parse(v as string) < Date.parse(start) ? 'Must be after the start' : true
        }),
    }),
    defineField({name: 'allDay', title: 'Hide times (all-day or multi-day event)', type: 'boolean', group: 'details', initialValue: false}),
    defineField({name: 'venue', title: 'Venue', type: 'string', group: 'details', description: 'e.g. Metro Toronto Convention Centre', hidden: ({document}) => isOnline(document as Doc)}),
    defineField({name: 'address', title: 'Street address', type: 'string', group: 'details', hidden: ({document}) => isOnline(document as Doc)}),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'details',
      hidden: ({document}) => isOnline(document as Doc),
      validation: (r) => r.custom((v, ctx) => (!isOnline(ctx.document as Doc) && !v ? 'Add the city' : true)),
    }),
    defineField({name: 'region', title: 'Province / state', type: 'string', group: 'details', hidden: ({document}) => isOnline(document as Doc)}),
    defineField({name: 'country', title: 'Country', type: 'string', group: 'details', initialValue: 'Canada', hidden: ({document}) => isOnline(document as Doc)}),
    defineField({name: 'booth', title: 'Booth number', type: 'string', group: 'details', description: 'Shown as "Visit us at booth …". Leave empty if iGuide has no booth.'}),
    defineField({name: 'price', title: 'Price', type: 'string', group: 'details', description: 'Optional, e.g. Free, $99, Free for iGuide customers.'}),

    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Shown on /events and in search results. One or two sentences.',
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      description: 'About 1600 × 900 px. Used on the event page, the list and social sharing.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required()})],
    }),
    defineField({name: 'body', title: 'Event page content', type: 'richText', group: 'content'}),
    defineField({
      name: 'speakers',
      title: 'Speakers / iGuide team attending',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'speaker',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'role', title: 'Role / company', type: 'string'}),
            defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
            defineField({
              name: 'linkedin',
              title: 'LinkedIn profile (optional)',
              type: 'url',
              validation: (r) => r.uri({scheme: ['https']}),
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
        }),
      ],
    }),
    defineField({
      name: 'sessions',
      title: 'On stage: sessions',
      type: 'array',
      group: 'content',
      description: 'Talks, panels or demos iGuide people are giving at this event. Shown as an "On stage" section, and the speakers get an "On stage" badge.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'session',
          fields: [
            defineField({name: 'title', title: 'Session title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'format', title: 'Format', type: 'string', options: {list: sessionFormats.map(({value, title}) => ({value, title}))}, initialValue: 'talk'}),
            defineField({name: 'startAt', title: 'Starts', type: 'datetime', description: 'In the event time zone above.'}),
            defineField({name: 'endAt', title: 'Ends', type: 'datetime'}),
            defineField({name: 'stage', title: 'Stage / room', type: 'string', description: 'e.g. Main Stage, Room 204'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({
              name: 'presenters',
              title: 'Presenters',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Type the names exactly as in "Speakers" above so their photos and LinkedIn links show.',
            }),
          ],
          preview: {
            select: {title: 'title', format: 'format', stage: 'stage'},
            prepare: ({title, format, stage}) => ({title, subtitle: [sessionFormats.find((f) => f.value === format)?.title, stage].filter(Boolean).join(' · ')}),
          },
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      group: 'content',
      description: 'Shown at the bottom of the event page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),

    defineField({name: 'eventUrl', title: 'Main event website', type: 'url', group: 'signup', validation: (r) => r.uri({scheme: ['http', 'https']})}),
    defineField({name: 'eventUrlLabel', title: 'Button label', type: 'string', group: 'signup', initialValue: 'Visit event website'}),
    defineField({
      name: 'registrationUrl',
      title: 'Registration link (optional)',
      type: 'string',
      group: 'signup',
      description: 'If people register somewhere else (Eventbrite, Zoom…). Shown as the main button.',
      validation: (r) => r.custom(checkUrl),
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'HubSpot form ID',
      type: 'string',
      group: 'signup',
      description: 'Sign-up form shown beside the event details (HubSpot → Marketing → Forms → the form’s ID). Hidden after the event ends.',
      validation: (r) => r.custom((v) => (!v || /^[0-9a-f-]{36}$/i.test(v as string) ? true : 'Paste the form ID, e.g. 882f819f-56c4-4def-b392-22f97de7e51f')),
    }),
    defineField({name: 'formHeading', title: 'Form heading', type: 'string', group: 'signup', initialValue: 'Register now'}),

    defineField({name: 'seo', title: 'SEO & social', type: 'seo', group: 'seo'}),
  ],
  orderings: [
    {title: 'Date (soonest first)', name: 'startAsc', by: [{field: 'startAt', direction: 'asc'}]},
    {title: 'Date (latest first)', name: 'startDesc', by: [{field: 'startAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', startAt: 'startAt', endAt: 'endAt', city: 'city', attendance: 'attendance', media: 'featuredImage'},
    prepare({title, startAt, endAt, city, attendance, media}) {
      const ended = endAt && Date.parse(endAt) < Date.now()
      const when = startAt ? new Date(startAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : 'No date'
      const where = attendance === 'online' ? 'Online' : city || ''
      return {title, subtitle: [ended ? 'Ended' : null, when, where].filter(Boolean).join(' · '), media}
    },
  },
})
