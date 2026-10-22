import {defineArrayMember, defineField, defineType} from 'sanity'
import {lpSectionLabels} from '../../../lib/landingPages/layouts'
import {reportSampleOptions} from '../../../lib/landingPages/reportSamples'

/* Shared pieces ------------------------------------------------------------ */

const imageWithAlt = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: {hotspot: true},
    fields: [defineField({name: 'alt', title: 'Alt text', type: 'string', description: 'Describe the image for screen readers. Leave empty only for decorative images.'})],
  })

/** A button: book a demo (opens the booking pop-up), jump to the form on this page, or go to a URL */
export const lpButton = defineType({
  name: 'lpButton',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'action',
      title: 'What it does',
      type: 'string',
      initialValue: 'form',
      options: {
        list: [
          {title: 'Scroll to the form on this page', value: 'form'},
          {title: 'Book a demo (booking pop-up)', value: 'demo'},
          {title: 'Go to a URL', value: 'url'},
          {title: 'Open a HubSpot form in a pop-up', value: 'popup'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'HubSpot form ID',
      type: 'string',
      hidden: ({parent}) => parent?.action !== 'popup',
      description: 'From HubSpot → Marketing → Forms → (form) → Share → Embed code: the formId value.',
      validation: (rule) =>
        rule.custom((value, context) => ((context.parent as {action?: string} | undefined)?.action === 'popup' && !value ? 'Add the form ID' : true)),
    }),
    defineField({name: 'popupTitle', title: 'Pop-up heading', type: 'string', hidden: ({parent}) => parent?.action !== 'popup'}),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      hidden: ({parent}) => parent?.action !== 'url',
      description: 'A full URL (https://…) or a path on goiguide.com. Opens in a new tab, so visitors keep this page open.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {action?: string} | undefined
          if (parent?.action !== 'url') return true
          if (!value) return 'Add the URL'
          return /^(\/|https?:\/\/)/.test(value) ? true : 'Start with / or https://'
        }),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'action'}},
})

/** Image, video file, YouTube video or live iGuide tour */
export const lpMedia = defineType({
  name: 'lpMedia',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'iGuide tour', value: 'tour'},
          {title: 'YouTube video', value: 'youtube'},
          {title: 'Video file (MP4)', value: 'video'},
          {title: 'Other embed (e.g. 3D model viewer)', value: 'embed'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    {...imageWithAlt('image', 'Image'), hidden: ({parent}: {parent?: {kind?: string}}) => parent?.kind !== 'image'},
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => !parent?.kind || parent.kind === 'image',
      description:
        'iGuide: https://youriguide.com/… · YouTube: the normal watch link or the embed link · Video file: an .mp4 URL · Other embed: the embed (iframe) link, e.g. an Autodesk share link',
    }),
    defineField({name: 'title', title: 'Title (for screen readers)', type: 'string', hidden: ({parent}) => !parent?.kind || parent.kind === 'image'}),
  ],
})

const heading = defineField({name: 'heading', title: 'Heading', type: 'string'})
const buttons = (title = 'Buttons', max?: number) =>
  defineField({
    name: 'buttons',
    title,
    type: 'array',
    of: [defineArrayMember({type: 'lpButton'})],
    validation: max ? (rule) => rule.max(max) : undefined,
  })
const subheading = defineField({name: 'subheading', title: 'Intro text', type: 'text', rows: 2})
const background = defineField({
  name: 'background',
  title: 'Background',
  type: 'string',
  initialValue: 'white',
  options: {list: [{title: 'White', value: 'white'}, {title: 'Light grey', value: 'surface'}, {title: 'Light blue', value: 'sky'}], layout: 'radio', direction: 'horizontal'},
})
/** Optional ID so an in-page menu (or any link) can jump to the section: #anchor */
const anchor = defineField({
  name: 'anchor',
  title: 'Anchor (for in-page links)',
  type: 'string',
  description: 'Optional. Lower-case letters, numbers and dashes, e.g. "processing". Link to it with #processing (see In-page menu).',
  validation: (rule) => rule.regex(/^[a-z0-9-]+$/, {name: 'lower-case letters, numbers and dashes'}),
})

const section = (name: keyof typeof lpSectionLabels, fields: ReturnType<typeof defineField>[], subtitle = 'heading') =>
  defineArrayMember({
    name,
    title: lpSectionLabels[name],
    type: 'object',
    fields: [...fields, anchor],
    preview: {select: {title: subtitle}, prepare: ({title}) => ({title: title || lpSectionLabels[name], subtitle: lpSectionLabels[name]})},
  })

/* Sections ------------------------------------------------------------------- */

export const lpSections = [
  section('lpHero', [
    defineField({
      name: 'style',
      title: 'Hero style',
      type: 'string',
      initialValue: 'form',
      options: {
        list: [
          {title: 'Text left, form right', value: 'form'},
          {title: 'Text left, media right', value: 'media'},
          {title: 'Centred text (form or buttons below)', value: 'centered'},
          {title: 'Banner: text over a full-width image', value: 'banner'},
        ],
        layout: 'radio',
      },
    }),
    defineField({name: 'eyebrow', title: 'Small text above the headline', type: 'string'}),
    defineField({name: 'heading', title: 'Headline', type: 'string', validation: (rule) => rule.required()}),
    subheading,
    defineField({name: 'bullets', title: 'Bullet points', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'buttons', title: 'Buttons', type: 'array', of: [defineArrayMember({type: 'lpButton'})], validation: (rule) => rule.max(2)}),
    defineField({name: 'showRating', title: 'Show the "4.9/5 based on 30+ reviews" line', type: 'boolean', initialValue: false}),
    defineField({name: 'media', title: 'Media', type: 'lpMedia', hidden: ({parent}) => parent?.style !== 'media'}),
    {...imageWithAlt('backgroundImage', 'Background image', 'Shown behind the text, darkened so the white text stays readable.'), hidden: ({parent}: {parent?: {style?: string}}) => parent?.style !== 'banner'},
    defineField({name: 'formHeading', title: 'Form heading', type: 'string', hidden: ({parent}) => parent?.style === 'media'}),
    defineField({name: 'formText', title: 'Text under the form heading', type: 'text', rows: 2, hidden: ({parent}) => parent?.style === 'media'}),
    defineField({
      name: 'centerText',
      title: 'Centre the text, with the form below it',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.style !== 'banner',
    }),
    defineField({
      name: 'meetingsUrl',
      title: 'HubSpot meetings calendar link (instead of a form)',
      type: 'url',
      hidden: ({parent}) => parent?.style !== 'form',
      description: 'e.g. https://meetings.planitar.com/meetings/iguide-sales/… Shows the booking calendar where the form would be.',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'HubSpot form ID',
      type: 'string',
      hidden: ({parent}) => parent?.style === 'media',
      description: 'From HubSpot → Marketing → Forms → (form) → Share → Embed code: the formId value. On a banner hero the form shows in a white card beside the headline; leave empty for a text-only banner.',
    }),
  ]),
  section('lpLogos', [
    heading,
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      description:
        'Logos for this landing page only: changes here never affect the logo rows on the rest of the site. Pick from the shared logo library (Logos → All client logos). Drag to reorder.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'clientLogo'}]})],
      validation: (rule) =>
        rule.custom((logos, context) =>
          (logos as unknown[] | undefined)?.length || (context.parent as {band?: unknown} | undefined)?.band ? true : 'Add at least one logo',
        ),
    }),
    // Before 2026-10-19 landing pages pointed at a shared site logo band. Kept only so older
    // pages keep showing their logos until scripts/detach-landing-logo-bands.mjs copies them in.
    defineField({
      name: 'band',
      title: 'Shared logo band (old)',
      type: 'reference',
      to: [{type: 'logoBand'}],
      readOnly: true,
      hidden: ({value}) => !value,
      description: 'Old link to a site-wide logo band. Add logos above to replace it.',
    }),
  ]),
  section('lpFeatures', [
    heading,
    subheading,
    defineField({
      name: 'display',
      title: 'Display',
      type: 'string',
      initialValue: 'cards',
      options: {
        list: [
          {title: 'Cards in columns', value: 'cards'},
          {title: 'Rows: image beside the text (one feature per row)', value: 'rows'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      initialValue: 3,
      options: {list: [2, 3, 4], layout: 'radio', direction: 'horizontal'},
      hidden: ({parent}) => parent?.display === 'rows',
    }),
    defineField({
      name: 'items',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feature',
          type: 'object',
          fields: [
            imageWithAlt('icon', 'Icon', 'Optional, shown small above the title'),
            imageWithAlt('image', 'Image', 'Optional, shown large (above the title on cards, beside the text in rows)'),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
            defineField({name: 'bullets', title: 'Checklist', type: 'array', of: [defineArrayMember({type: 'string'})]}),
            buttons('Buttons (e.g. sample downloads)'),
          ],
          preview: {select: {title: 'title', media: 'image'}},
        }),
      ],
    }),
    defineField({name: 'footnote', title: 'Footnote', type: 'text', rows: 3}),
    buttons('Buttons under the features', 2),
    background,
  ]),
  section('lpSplit', [
    heading,
    defineField({name: 'body', title: 'Text', type: 'text', rows: 4}),
    defineField({name: 'bulletsHeading', title: 'Heading above the bullet points', type: 'string'}),
    defineField({name: 'bullets', title: 'Bullet points', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({
      name: 'specsHeading',
      title: 'Spec table: fold-out heading',
      type: 'string',
      description: 'Optional, e.g. Technical Specifications. When set, the spec table is folded away under this heading (for long spec sheets).',
    }),
    defineField({
      name: 'specs',
      title: 'Spec table (label and value rows)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'spec',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', description: 'Leave empty to show the label as a group heading (e.g. Performance).'}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({name: 'footnote', title: 'Footnote', type: 'string'}),
    defineField({name: 'buttons', title: 'Buttons', type: 'array', of: [defineArrayMember({type: 'lpButton'})], validation: (rule) => rule.max(3)}),
    defineField({name: 'media', title: 'Media', type: 'lpMedia'}),
    defineField({name: 'mediaSide', title: 'Media side', type: 'string', initialValue: 'right', options: {list: ['left', 'right'], layout: 'radio', direction: 'horizontal'}}),
    background,
  ]),
  section('lpSteps', [
    heading,
    subheading,
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'step',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
            imageWithAlt('image', 'Image'),
          ],
          preview: {select: {title: 'title', media: 'image'}},
        }),
      ],
    }),
  ]),
  section('lpTestimonials', [
    heading,
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
      description: 'Pick from Testimonials, or create a new one there.',
      validation: (rule) => rule.min(1),
    }),
    background,
  ]),
  section('lpStats', [
    heading,
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'stat',
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Figure', type: 'string', description: 'e.g. 15 min', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'What it means', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'value', subtitle: 'text'}},
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    background,
  ]),
  section('lpCompare', [
    heading,
    subheading,
    defineField({name: 'oursLabel', title: 'Our column', type: 'string', initialValue: 'iGuide'}),
    defineField({name: 'theirsLabel', title: 'Their column', type: 'string', initialValue: 'Others'}),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'row',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Feature', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'ours', title: 'iGuide', type: 'string', description: 'Shown with a tick'}),
            defineField({name: 'theirs', title: 'Them', type: 'string', description: 'Shown with a cross'}),
          ],
          preview: {select: {title: 'label', subtitle: 'ours'}},
        }),
      ],
    }),
    defineField({name: 'footnote', title: 'Footnote', type: 'string'}),
  ]),
  section('lpTabs', [
    heading,
    subheading,
    defineField({
      name: 'display',
      title: 'Display',
      type: 'string',
      initialValue: 'media',
      options: {
        list: [
          {title: 'Samples: media with text below', value: 'media'},
          {title: 'Packages: description, checklist and image side by side', value: 'packages'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tab',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Tab label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'heading', title: 'Panel heading (packages display; defaults to the tab label)', type: 'string'}),
            defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
            defineField({name: 'bullets', title: 'Checklist (packages display)', type: 'array', of: [defineArrayMember({type: 'string'})]}),
            defineField({name: 'media', title: 'Media', type: 'lpMedia'}),
            defineField({name: 'link', title: 'Image link (opens in a new tab)', type: 'url', description: 'Optional: clicking the image opens this page, e.g. the listing it shows.'}),
            defineField({name: 'buttons', title: 'Buttons (e.g. sample downloads)', type: 'array', of: [defineArrayMember({type: 'lpButton'})]}),
          ],
          preview: {select: {title: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'zoom',
      title: 'Click images to view them full screen',
      type: 'boolean',
      initialValue: false,
      description: 'For detailed drawings such as floor plans. Images with their own link open the link instead.',
    }),
    background,
  ]),
  section('lpTourDemo', [
    defineField({name: 'eyebrow', title: 'Small text above the heading', type: 'string'}),
    heading,
    subheading,
    defineField({
      name: 'tips',
      title: 'Tips (icon + short instruction)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'tip',
          type: 'object',
          fields: [imageWithAlt('icon', 'Icon'), defineField({name: 'text', title: 'Text', type: 'string', validation: (rule) => rule.required()})],
          preview: {select: {title: 'text', media: 'icon'}},
        }),
      ],
    }),
    defineField({
      name: 'tours',
      title: 'Tours',
      type: 'array',
      description: 'One tour, or several shown as tabs (e.g. Standard / Radix).',
      of: [
        defineArrayMember({
          name: 'tour',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Tab label', type: 'string', description: 'Only needed with more than one tour.'}),
            defineField({name: 'media', title: 'Tour or video', type: 'lpMedia', validation: (rule) => rule.required()}),
            defineField({
              name: 'usOnly',
              title: 'US only',
              type: 'boolean',
              initialValue: false,
              description: 'Hidden when the in-page menu\'s USD / CAD switch is set to CAD (e.g. iGuide Instant).',
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'media.url'}},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    buttons('Below the tour: buttons (e.g. floor plan downloads)', 4),
    defineField({name: 'samplesHeading', title: 'Sample gallery: heading', type: 'string', description: 'e.g. More samples'}),
    defineField({
      name: 'samples',
      title: 'Sample gallery',
      type: 'array',
      description: 'Thumbnails that open other tours in a new tab. The first row shows; the rest open with "More samples".',
      of: [
        defineArrayMember({
          name: 'sample',
          type: 'object',
          fields: [
            imageWithAlt('image', 'Thumbnail'),
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'Tour link', type: 'url', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'url', media: 'image'}},
        }),
      ],
    }),
    defineField({name: 'listHeading', title: 'Below the tour: heading', type: 'string'}),
    defineField({name: 'list', title: 'Below the tour: checklist', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'closing', title: 'Below the tour: closing text', type: 'text', rows: 2}),
    background,
  ]),
  section('lpVideos', [
    heading,
    defineField({
      name: 'fullWidth',
      title: 'One video at full width, no caption',
      type: 'boolean',
      initialValue: false,
      description: 'As on the old ad pages: a single video across the full page width. The video title is still used for screen readers.',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'video',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'YouTube or iGuide URL', type: 'url', validation: (rule) => rule.required()}),
          ],
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
    background,
  ]),
  section('lpForm', [
    heading,
    subheading,
    defineField({name: 'hubspotFormId', title: 'HubSpot form ID', type: 'string', validation: (rule) => rule.required()}),
    background,
  ]),
  section('lpFaq', [
    defineField({name: 'heading', title: 'Heading', type: 'string', initialValue: 'Frequently asked questions'}),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'qa',
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
  ]),
  section('lpCta', [
    heading,
    defineField({name: 'text', title: 'Text', type: 'text', rows: 2}),
    defineField({name: 'buttons', title: 'Buttons', type: 'array', of: [defineArrayMember({type: 'lpButton'})], validation: (rule) => rule.max(2)}),
  ]),
  section('lpResources', [
    heading,
    defineField({
      name: 'items',
      title: 'Resources',
      type: 'array',
      description: 'Blog posts, customer stories, brochures and other Resource Center items, shown as cards.',
      of: [defineArrayMember({type: 'reference', to: ['blogPost', 'whitePaper', 'customerStory', 'brochure', 'video', 'webinar', 'newsArticle', 'galleryItem'].map((type) => ({type}))})],
      validation: (rule) => rule.max(6),
    }),
    background,
  ]),
  section('lpNotice', [defineField({name: 'text', title: 'Small print', type: 'text', rows: 6})], 'text'),
  section(
    'lpAnchorNav',
    [
      defineField({
        name: 'links',
        title: 'Links',
        type: 'array',
        description: 'Stays at the top of the screen while scrolling. Link to a section with #its-anchor (set "Anchor" on that section), or to another page.',
        of: [
          defineArrayMember({
            name: 'navLink',
            type: 'object',
            fields: [
              defineField({
                name: 'kind',
                title: 'Type',
                type: 'string',
                initialValue: 'link',
                options: {
                  list: [
                    {title: 'Link', value: 'link'},
                    {title: 'USD / CAD switch (hides tours marked "US only" when set to CAD)', value: 'regionSwitch'},
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'label',
                title: 'Label',
                type: 'string',
                hidden: ({parent}) => parent?.kind === 'regionSwitch',
                validation: (rule) => rule.custom((v, c) => ((c.parent as {kind?: string})?.kind === 'regionSwitch' || v ? true : 'Add a label')),
              }),
              defineField({
                name: 'href',
                title: 'Link',
                type: 'string',
                description: '#anchor, a path (/…) or a full URL.',
                hidden: ({parent}) => parent?.kind === 'regionSwitch',
                validation: (rule) =>
                  rule.custom((v, c) => {
                    if ((c.parent as {kind?: string})?.kind === 'regionSwitch') return true
                    if (!v) return 'Add the link'
                    return /^(#|\/|https?:\/\/)/.test(v) ? true : 'Start with #, / or https://'
                  }),
              }),
              defineField({name: 'newTab', title: 'Open in a new tab', type: 'boolean', initialValue: false, hidden: ({parent}) => parent?.kind === 'regionSwitch'}),
            ],
            preview: {select: {title: 'label', subtitle: 'href', kind: 'kind'}, prepare: ({title, subtitle, kind}) => (kind === 'regionSwitch' ? {title: 'USD / CAD switch'} : {title, subtitle})},
          }),
        ],
        validation: (rule) => rule.min(1),
      }),
    ],
    'links.0.label',
  ),
  section('lpTables', [
    heading,
    subheading,
    defineField({
      name: 'tables',
      title: 'Tables',
      type: 'array',
      description: 'One table, or several (as tabs, or one under the other with their labels as headings).',
      of: [
        defineArrayMember({
          name: 'table',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Tab label / table heading', type: 'string', description: 'Only needed with more than one table.'}),
            imageWithAlt('image', 'Image above the table', 'Optional'),
            defineField({name: 'columns', title: 'Column headings', type: 'array', of: [defineArrayMember({type: 'string'})], description: 'Leave the first one empty for a row-label column.'}),
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'row',
                  type: 'object',
                  fields: [defineField({name: 'cells', title: 'Cells', type: 'array', of: [defineArrayMember({type: 'string'})]})],
                  preview: {select: {title: 'cells.0', subtitle: 'cells.1'}},
                }),
              ],
            }),
            defineField({name: 'note', title: 'Note under the table', type: 'text', rows: 2}),
            buttons('Buttons under the table', 2),
          ],
          preview: {select: {title: 'label', subtitle: 'columns.1'}},
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'display',
      title: 'Several tables',
      type: 'string',
      initialValue: 'tabs',
      options: {list: [{title: 'Tabs', value: 'tabs'}, {title: 'One under the other', value: 'stacked'}], layout: 'radio', direction: 'horizontal'},
    }),
    defineField({name: 'footnote', title: 'Footnote', type: 'text', rows: 2}),
    background,
  ]),
  section('lpReport', [
    heading,
    subheading,
    defineField({
      name: 'samples',
      title: 'Sample reports',
      type: 'array',
      description: 'Real iGuide emails, stored with the site. Two samples show side by side.',
      of: [defineArrayMember({type: 'string', options: {list: reportSampleOptions}})],
      validation: (rule) => rule.min(1).max(2).unique(),
    }),
    background,
  ]),
]
