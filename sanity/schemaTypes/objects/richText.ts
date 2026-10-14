import {defineArrayMember, defineField, defineType} from 'sanity'
import {CodeIcon} from '@sanity/icons/Code'
import {LaunchIcon} from '@sanity/icons/Launch'
import {PlayIcon} from '@sanity/icons/Play'

/** Article body: headings, lists, links, images, videos and call-to-action banners. */
export const richText = defineType({
  name: 'richText',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      marks: {
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({name: 'href', title: 'URL', type: 'string', validation: (rule) => rule.required()}),
              defineField({name: 'newTab', title: 'Open in a new tab', type: 'boolean'}),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
        defineField({name: 'href', title: 'Link (optional)', type: 'string'}),
      ],
    }),
    defineArrayMember({
      name: 'videoEmbed',
      title: 'Video',
      type: 'object',
      icon: PlayIcon,
      fields: [
        defineField({name: 'url', title: 'Embed URL', type: 'url', description: 'e.g. https://www.youtube.com/embed/…', validation: (rule) => rule.required()}),
        defineField({name: 'title', title: 'Title (for screen readers)', type: 'string'}),
      ],
      preview: {select: {title: 'title', subtitle: 'url'}},
    }),
    defineArrayMember({
      name: 'ctaBanner',
      title: 'Call-to-action banner',
      type: 'object',
      icon: LaunchIcon,
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
        defineField({name: 'buttonLabel', title: 'Button label', type: 'string'}),
        defineField({name: 'buttonUrl', title: 'Button URL', type: 'string'}),
        defineField({
          name: 'hubspotFormId',
          title: 'HubSpot form ID',
          type: 'string',
          description: 'If set, the button opens this HubSpot form instead of going to the URL.',
        }),
        defineField({name: 'image', title: 'Background image', type: 'image'}),
      ],
      preview: {select: {title: 'heading', subtitle: 'buttonLabel'}},
    }),
    defineArrayMember({
      name: 'htmlEmbed',
      title: 'HTML embed (imported)',
      type: 'object',
      icon: CodeIcon,
      description: 'Raw HTML/script carried over from the old site. Not shown on the page until reviewed.',
      fields: [
        defineField({name: 'html', title: 'HTML', type: 'text', rows: 8}),
        defineField({name: 'show', title: 'Show on the page', type: 'boolean', initialValue: false}),
      ],
      preview: {select: {subtitle: 'html'}, prepare: ({subtitle}) => ({title: 'HTML embed', subtitle})},
    }),
  ],
})
