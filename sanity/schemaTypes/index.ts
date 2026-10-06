import {type SchemaTypeDefinition} from 'sanity'

import {announcement} from './documents/announcement'
import {author} from './documents/author'
import {clientLogo} from './documents/clientLogo'
import {homePage} from './documents/homePage'
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
    clientLogo,
    ...resourceDocumentTypes,
    author,
    link,
    heroMedia,
    seo,
    richText,
  ],
}
