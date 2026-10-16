import type {StructureResolver} from 'sanity/structure'
import {BellIcon} from '@sanity/icons/Bell'
import {BookIcon} from '@sanity/icons/Book'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {CommentIcon} from '@sanity/icons/Comment'
import {RocketIcon} from '@sanity/icons/Rocket'
import {SparklesIcon} from '@sanity/icons/Sparkles'
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
      S.listItem()
        .title('Landing pages (paid media)')
        .id('landingPages')
        .icon(RocketIcon)
        .child(S.documentTypeList('landingPage').title('Landing pages').defaultOrdering([{field: 'path', direction: 'asc'}])),
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
      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .title('Upcoming')
                .id('events-upcoming')
                .child(S.documentTypeList('event').title('Upcoming events').filter('_type == "event" && (!defined(endAt) || dateTime(endAt) > dateTime(now()))').defaultOrdering([{field: 'startAt', direction: 'asc'}])),
              S.listItem()
                .title('Past')
                .id('events-past')
                .child(S.documentTypeList('event').title('Past events').filter('_type == "event" && dateTime(endAt) <= dateTime(now())').defaultOrdering([{field: 'startAt', direction: 'desc'}])),
            ]),
        ),
      S.documentTypeListItem('author').title('Authors').icon(UsersIcon),
      S.divider(),
      S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
      S.documentTypeListItem('sitePopup').title('Pop-ups').icon(SparklesIcon),
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
