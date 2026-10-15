import {defineArrayMember, defineField, defineType, type ValidationContext} from 'sanity'
import {SparklesIcon} from '@sanity/icons/Sparkles'
import {ColourInput} from '../../components/ColourInput'
import {contrastRatio, DEFAULT_COLOURS, HEX_PATTERN} from '../../../lib/popup/rules'

type Doc = {
  layout?: 'image' | 'split'
  startAt?: string
  endAt?: string
  showOn?: 'all' | 'only'
  backgroundColour?: string
  textColour?: string
  highlightColour?: string
  button?: {background?: string; textColour?: string}
  countdown?: {endsAt?: string}
}
const doc = (context: ValidationContext) => (context.document ?? {}) as Doc
const isImageOnly = (d: Doc) => d.layout === 'image'

const colour = (name: string, title: string, fallback: string, description?: string, group: string | null = 'design') =>
  defineField({
    name,
    title,
    type: 'string',
    ...(group ? {group} : {}),
    description: `${description ? `${description} ` : ''}Empty = ${fallback}.`,
    components: {input: ColourInput},
    validation: (rule) => rule.custom((v) => (!v || HEX_PATTERN.test(v as string) ? true : 'Use a 6-digit hex colour, e.g. #2e2c30')),
  })

const checkHref = (v: unknown) => (!v || /^(\/|#|https?:\/\/|mailto:|tel:)/.test(v as string) ? true : 'Start with /, #, https://, mailto: or tel:')

/** A site pop-up: image-only or two-column, scheduled, shown on all or chosen pages. */
export const sitePopup = defineType({
  name: 'sitePopup',
  title: 'Pop-up',
  type: 'document',
  icon: SparklesIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'design', title: 'Colours'},
    {name: 'when', title: 'Schedule & pages'},
    {name: 'behaviour', title: 'Behaviour'},
  ],
  fields: [
    defineField({name: 'name', title: 'Name (internal)', type: 'string', group: 'content', description: 'Only shown in the Studio, e.g. "Black Friday 2026".', validation: (r) => r.required()}),
    defineField({name: 'enabled', title: 'Pop-up is on', type: 'boolean', group: 'content', initialValue: true, description: 'Turn off to hide it straight away, whatever the schedule.'}),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'content',
      initialValue: 'split',
      options: {list: [{title: 'Image only (whole pop-up is a clickable image)', value: 'image'}, {title: 'Two columns: image + text', value: 'split'}], layout: 'radio'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      description: 'Image only: about 1000 × 1000 px or 1000 × 700 px. Two columns: about 800 × 900 px (it is cropped to fill its half).',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string', description: 'Describe the image for screen readers. For an image-only pop-up, include any words that are in the image.', validation: (r) => r.required()})],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imageLink',
      title: 'Link when the image is clicked',
      type: 'string',
      group: 'content',
      description: 'A path (/pricing) or full URL.',
      hidden: ({document}) => !isImageOnly(document as Doc),
      validation: (r) => r.custom(checkHref),
    }),
    defineField({
      name: 'imageSide',
      title: 'Image side',
      type: 'string',
      group: 'content',
      initialValue: 'left',
      options: {list: [{title: 'Left', value: 'left'}, {title: 'Right', value: 'right'}], layout: 'radio', direction: 'horizontal'},
      hidden: ({document}) => isImageOnly(document as Doc),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      hidden: ({document}) => isImageOnly(document as Doc),
      validation: (r) => r.custom((v, ctx) => (isImageOnly(doc(ctx)) || v ? true : 'Add a title')),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'content',
      description: 'Make words bold to show them in the highlight colour.',
      hidden: ({document}) => isImageOnly(document as Doc),
      of: [defineArrayMember({type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: [], marks: {decorators: [{title: 'Highlight (bold)', value: 'strong'}], annotations: []}})],
    }),
    defineField({
      name: 'countdown',
      title: 'Countdown timer (optional)',
      type: 'object',
      group: 'content',
      description: 'Shows between the description and the button, e.g. for a sale deadline.',
      hidden: ({document}) => isImageOnly(document as Doc),
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'endsAt', title: 'Counts down to', type: 'datetime', description: 'Leave empty for no timer.'}),
        defineField({name: 'label', title: 'Label', type: 'string', initialValue: 'Offer ends in'}),
        defineField({name: 'hidePopupWhenDone', title: 'Stop showing the pop-up when the timer reaches zero', type: 'boolean', initialValue: true}),
      ],
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      group: 'content',
      hidden: ({document}) => isImageOnly(document as Doc),
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'Link', type: 'string', description: 'A path (/pricing) or full URL.', validation: (r) => r.custom(checkHref)}),
        defineField({name: 'openBooking', title: 'Open the "book a demo" calendar instead of going to the link', type: 'boolean', initialValue: false}),
        defineField({name: 'newTab', title: 'Open link in a new tab', type: 'boolean', initialValue: false}),
        colour('background', 'Button colour', 'black, red on hover', undefined, null),
        colour('textColour', 'Button text colour', 'white', undefined, null),
      ],
      validation: (r) =>
        r.custom((b: {label?: string; href?: string; openBooking?: boolean; background?: string; textColour?: string} | undefined) => {
          if (!b?.label) return true
          if (!b.href && !b.openBooking) return 'Add a link for the button'
          return true
        }),
    }),

    colour('backgroundColour', 'Background colour', DEFAULT_COLOURS.background, 'Behind the text column.'),
    colour('textColour', 'Text colour', DEFAULT_COLOURS.text),
    colour('highlightColour', 'Highlight colour', DEFAULT_COLOURS.highlight, 'Used for bold words in the description and the timer.'),

    defineField({name: 'startAt', title: 'Show from', type: 'datetime', group: 'when', description: 'Leave empty to start as soon as it is published and on.'}),
    defineField({
      name: 'endAt',
      title: 'Stop showing after',
      type: 'datetime',
      group: 'when',
      description: 'Leave empty to keep showing until turned off.',
      validation: (r) => r.custom((v, ctx) => (v && doc(ctx).startAt && Date.parse(v as string) <= Date.parse(doc(ctx).startAt!) ? '"Stop showing after" must be later than "Show from"' : true)),
    }),
    defineField({
      name: 'showOn',
      title: 'Show on',
      type: 'string',
      group: 'when',
      initialValue: 'all',
      options: {list: [{title: 'All pages', value: 'all'}, {title: 'Only the pages listed below', value: 'only'}], layout: 'radio'},
    }),
    defineField({
      name: 'paths',
      title: 'Pages',
      type: 'array',
      group: 'when',
      of: [{type: 'string'}],
      description: 'One page per line, e.g. /pricing. End with /* for a whole section, e.g. /blogs/* or /au/*.',
      hidden: ({document}) => (document as Doc)?.showOn !== 'only',
      validation: (r) => r.custom((v, ctx) => (doc(ctx).showOn === 'only' && !(v as string[] | undefined)?.length ? 'Add at least one page' : true)),
    }),
    defineField({name: 'excludePaths', title: 'Never show on', type: 'array', group: 'when', of: [{type: 'string'}], description: 'Pages to skip, same format. /book-a-demo is a good one to leave out.'}),
    defineField({
      name: 'includeLandingPages',
      title: 'Also show on paid-media landing pages',
      type: 'boolean',
      group: 'when',
      initialValue: false,
      description: 'Off by default so ads land on a page without distractions.',
      hidden: ({document}) => (document as Doc)?.showOn === 'only',
    }),

    defineField({
      name: 'trigger',
      title: 'Open the pop-up',
      type: 'string',
      group: 'behaviour',
      initialValue: 'delay',
      options: {list: [{title: 'After a few seconds', value: 'delay'}, {title: 'After scrolling part of the page', value: 'scroll'}, {title: 'When the visitor goes to leave (desktop; mobile falls back to the delay)', value: 'exit'}], layout: 'radio'},
    }),
    defineField({name: 'delaySeconds', title: 'Seconds to wait', type: 'number', group: 'behaviour', initialValue: 5, validation: (r) => r.min(0).max(120), hidden: ({document}) => (document as {trigger?: string})?.trigger === 'scroll'}),
    defineField({name: 'scrollPercent', title: 'Percent of the page scrolled', type: 'number', group: 'behaviour', initialValue: 40, validation: (r) => r.min(5).max(100), hidden: ({document}) => (document as {trigger?: string})?.trigger !== 'scroll'}),
    defineField({
      name: 'frequency',
      title: 'After a visitor closes it, show it again',
      type: 'string',
      group: 'behaviour',
      initialValue: 'days',
      options: {list: [{title: 'Never', value: 'never'}, {title: 'After a number of days', value: 'days'}, {title: 'On their next visit (new browser session)', value: 'session'}], layout: 'radio'},
    }),
    defineField({name: 'frequencyDays', title: 'Days', type: 'number', group: 'behaviour', initialValue: 7, validation: (r) => r.min(1).max(365), hidden: ({document}) => (document as {frequency?: string})?.frequency !== 'days'}),
    defineField({name: 'priority', title: 'Priority', type: 'number', group: 'behaviour', initialValue: 10, description: 'If more than one pop-up could show on a page, the lowest number wins. Only one shows at a time.'}),
  ],
  // Readability warning (AODA / WCAG AA): doesn't block publishing
  validation: (rule) =>
    rule.custom((document) => {
      const d = (document ?? {}) as Doc
      if (isImageOnly(d)) return true
      const bg = d.backgroundColour || DEFAULT_COLOURS.background
      const problems: string[] = []
      const check = (fg: string | undefined, fallback: string, what: string, bgc = bg) => {
        const c = fg || fallback
        if (HEX_PATTERN.test(c) && HEX_PATTERN.test(bgc) && contrastRatio(c, bgc) < 4.5) problems.push(`${what} (${contrastRatio(c, bgc).toFixed(1)}:1)`)
      }
      check(d.textColour, DEFAULT_COLOURS.text, 'text on background')
      check(d.highlightColour, DEFAULT_COLOURS.highlight, 'highlight on background')
      check(d.button?.textColour, '#ffffff', 'button text on button', d.button?.background || '#2e2c30')
      return problems.length ? `Hard to read for some visitors (accessibility needs 4.5:1): ${problems.join(', ')}` : true
    }).warning(),
  orderings: [{title: 'Priority', name: 'priorityAsc', by: [{field: 'priority', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', enabled: 'enabled', startAt: 'startAt', endAt: 'endAt', media: 'image'},
    prepare({title, enabled, startAt, endAt, media}) {
      const now = Date.now()
      let status = 'Live'
      if (!enabled) status = 'Off'
      else if (startAt && Date.parse(startAt) > now) status = `Scheduled · starts ${new Date(startAt).toLocaleString()}`
      else if (endAt && Date.parse(endAt) <= now) status = 'Ended'
      else if (endAt) status = `Live · ends ${new Date(endAt).toLocaleString()}`
      return {title, subtitle: status, media}
    },
  },
})
