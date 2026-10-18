import {defineArrayMember, defineField} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'
import {CaseIcon} from '@sanity/icons/Case'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentPdfIcon} from '@sanity/icons/DocumentPdf'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {EditIcon} from '@sanity/icons/Edit'
import {PlayIcon} from '@sanity/icons/Play'
import {PresentationIcon} from '@sanity/icons/Presentation'
import {StarIcon} from '@sanity/icons/Star'
import {defineResourceType} from './defineResourceType'

export const blogPost = defineResourceType({
  name: 'blogPost',
  icon: EditIcon,
  extraFields: [defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}]})],
})

export const customerStory = defineResourceType({
  name: 'customerStory',
  icon: StarIcon,
  extraFields: [
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}]}),
    defineField({name: 'customerName', title: 'Customer name', type: 'string'}),
    defineField({name: 'customerLocation', title: 'Customer location', type: 'string'}),
    defineField({
      name: 'customerFacts',
      title: 'Customer details box',
      type: 'array',
      description: 'Short facts shown beside the story, e.g. Location, Industry, Use case.',
      of: [
        defineArrayMember({
          name: 'fact',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'customerCta',
      title: 'Details box button',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
  ],
})

export const whitePaper = defineResourceType({name: 'whitePaper', icon: DocumentIcon})
export const ebook = defineResourceType({name: 'ebook', icon: BookIcon})
export const brochure = defineResourceType({name: 'brochure', icon: DocumentPdfIcon})
export const video = defineResourceType({name: 'video', icon: PlayIcon})

export const webinar = defineResourceType({
  name: 'webinar',
  icon: PresentationIcon,
  extraFields: [
    defineField({
      name: 'eventDateText',
      title: 'Event date (as shown)',
      type: 'string',
      description: 'e.g. "Feb 8, 2024 2 pm ET". Shown under the title.',
    }),
    defineField({
      name: 'eventCta',
      title: 'Registration / recording button',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
  ],
})

export const newsArticle = defineResourceType({
  name: 'newsArticle',
  icon: CaseIcon,
  extraFields: [
    defineField({
      name: 'newsCta',
      title: 'Source / read more button',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'href', title: 'URL', type: 'string'}),
      ],
    }),
  ],
})

export const galleryItem = defineResourceType({name: 'galleryItem', icon: EarthGlobeIcon, dateTitle: 'Date added'})

export const resourceDocumentTypes = [blogPost, whitePaper, customerStory, brochure, video, webinar, newsArticle, galleryItem, ebook]
