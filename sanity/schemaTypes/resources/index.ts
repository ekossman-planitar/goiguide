import {defineField} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentPdfIcon} from '@sanity/icons/DocumentPdf'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {EditIcon} from '@sanity/icons/Edit'
import {PlayIcon} from '@sanity/icons/Play'
import {PresentationIcon} from '@sanity/icons/Presentation'
import {StarIcon} from '@sanity/icons/Star'
import {defineResourceType} from './defineResourceType'

/** Optional link that sends the card somewhere else (PDF, YouTube, registration page…). */
const externalUrl = defineField({
  name: 'externalUrl',
  title: 'Link to (optional)',
  type: 'url',
  description: 'If set, the card links here instead of the page on goiguide.com.',
})

export const blogPost = defineResourceType({
  name: 'blogPost',
  icon: EditIcon,
  extraFields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({name: 'body', title: 'Body', type: 'richText'}),
  ],
})

export const customerStory = defineResourceType({name: 'customerStory', icon: StarIcon, extraFields: [externalUrl]})
export const whitePaper = defineResourceType({name: 'whitePaper', icon: DocumentIcon, extraFields: [externalUrl]})
export const brochure = defineResourceType({name: 'brochure', icon: DocumentPdfIcon, extraFields: [externalUrl]})
export const video = defineResourceType({name: 'video', icon: PlayIcon, extraFields: [externalUrl]})
export const webinar = defineResourceType({name: 'webinar', icon: PresentationIcon, extraFields: [externalUrl]})
export const newsArticle = defineResourceType({name: 'newsArticle', icon: CaseIcon, extraFields: [externalUrl]})
export const galleryItem = defineResourceType({
  name: 'galleryItem',
  icon: EarthGlobeIcon,
  dateTitle: 'Date added',
  hasPage: false,
  extraFields: [
    defineField({
      name: 'tourUrl',
      title: 'iGUIDE tour URL',
      type: 'url',
      description: 'The sample tour the card opens.',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const resourceDocumentTypes = [
  blogPost,
  whitePaper,
  customerStory,
  brochure,
  video,
  webinar,
  newsArticle,
  galleryItem,
]
