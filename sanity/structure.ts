import type {StructureResolver} from 'sanity/structure'
import {BellIcon} from '@sanity/icons/Bell'
import {BookIcon} from '@sanity/icons/Book'
import {CommentIcon} from '@sanity/icons/Comment'
import {DownloadIcon} from '@sanity/icons/Download'
import {HomeIcon} from '@sanity/icons/Home'
import {ImageIcon} from '@sanity/icons/Image'
import {UsersIcon} from '@sanity/icons/Users'
import {catalogues} from '../lib/catalogue'
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
      S.listItem()
        .title('Marketing Catalogue')
        .icon(DownloadIcon)
        .child(
          S.list()
            .title('Marketing Catalogue')
            .items([
              S.documentTypeListItem('catalogueItem').title('All items'),
              S.divider(),
              ...catalogues.map((c) =>
                S.listItem()
                  .title(c.label)
                  .id(`catalogue-${c.id}`)
                  .child(
                    S.documentTypeList('catalogueItem')
                      .title(c.label)
                      .filter('_type == "catalogueItem" && catalogue == $catalogue')
                      .params({catalogue: c.id})
                      .initialValueTemplates([]),
                  ),
              ),
            ]),
        ),
      S.documentTypeListItem('author').title('Authors').icon(UsersIcon),
      S.divider(),
      S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
      S.listItem()
        .title('Logos')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Logos')
            .items([
              S.documentTypeListItem('logoBand').title('Logo bands (rows on pages)'),
              S.documentTypeListItem('clientLogo').title('All client logos'),
            ]),
        ),
      S.documentTypeListItem('testimonial').title('Testimonials').icon(CommentIcon),
    ])
