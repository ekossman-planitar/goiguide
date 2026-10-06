import type {StructureResolver} from 'sanity/structure'
import {BellIcon} from '@sanity/icons/Bell'
import {BookIcon} from '@sanity/icons/Book'
import {HomeIcon} from '@sanity/icons/Home'
import {ImageIcon} from '@sanity/icons/Image'
import {UsersIcon} from '@sanity/icons/Users'
import {resourceTypes} from '../lib/resourceTypes'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home page')
        .id('homePage')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage').title('Home page')),
      S.divider(),
      S.listItem()
        .title('Resource Center')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Resource Center')
            .items(resourceTypes.map((type) => S.documentTypeListItem(type.name).title(type.label))),
        ),
      S.documentTypeListItem('author').title('Authors').icon(UsersIcon),
      S.divider(),
      S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
      S.documentTypeListItem('clientLogo').title('Client logos').icon(ImageIcon),
    ])
