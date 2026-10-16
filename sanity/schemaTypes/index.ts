import {type SchemaTypeDefinition} from 'sanity'

import {announcement} from './documents/announcement'
import {author} from './documents/author'
import {catalogueItem} from './documents/catalogueItem'
import {clientLogo} from './documents/clientLogo'
import {homePage} from './documents/homePage'
import {logoBand} from './documents/logoBand'
import {sitePopup} from './documents/sitePopup'
import {event} from './documents/event'
import {testimonial} from './documents/testimonial'
import {landingPage} from './landingPages/landingPage'
import {lpButton, lpMedia} from './landingPages/objects'
import {heroMedia} from './objects/heroMedia'
import {link} from './objects/link'
import {richText} from './objects/richText'
import {seo} from './objects/seo'
import {resourceDocumentTypes} from './resources'

/** Document types that exist only once and are edited from a fixed Studio entry. */
export const singletonTypes = new Set(['homePage'])

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    homePage,
    announcement,
    sitePopup,
    event,
    clientLogo,
    logoBand,
    testimonial,
    landingPage,
    lpButton,
    lpMedia,
    ...resourceDocumentTypes,
    catalogueItem,
    author,
    link,
    heroMedia,
    seo,
    richText,
  ],
}
