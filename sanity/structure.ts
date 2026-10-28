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
import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {FolderIcon} from '@sanity/icons/Folder'
import {catalogues} from '../lib/catalogue'
import {lpLayouts} from '../lib/landingPages/layouts'
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
        .child(
          S.list()
            .title('Landing pages')
            .items([
              S.listItem()
                .title('All landing pages')
                .id('lp-all')
                .icon(RocketIcon)
                .child(S.documentTypeList('landingPage').title('All landing pages').defaultOrdering([{field: 'path', direction: 'asc'}])),
              S.divider(),
              // Each folder opens the pages in it; "+" there creates the page inside that folder
              S.listItem()
                .title('Folders')
                .id('lp-folders')
                .icon(FolderIcon)
                .child(
                  S.documentTypeList('landingPageFolder')
                    .title('Folders')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                    .child((folderId) =>
                      S.documentList()
                        .title('Landing pages in this folder')
                        .schemaType('landingPage')
                        .filter('_type == "landingPage" && folder._ref == $folderId')
                        .params({folderId: folderId.replace(/^drafts\./, '')})
                        .defaultOrdering([{field: 'path', direction: 'asc'}])
                        .initialValueTemplates(lpLayouts.map((l) => S.initialValueTemplateItem(`landingPage-${l.id}`, {folderId: folderId.replace(/^drafts\./, '')}))),
                    ),
                ),
              S.listItem()
                .title('Not in a folder')
                .id('lp-unfiled')
                .child(
                  S.documentList()
                    .title('Not in a folder')
                    .schemaType('landingPage')
                    .filter('_type == "landingPage" && !defined(folder)')
                    .defaultOrdering([{field: 'path', direction: 'asc'}]),
                ),
              S.divider(),
              S.listItem()
                .title('Edit folders')
                .id('lp-folder-admin')
                .icon(FolderIcon)
                .child(S.documentTypeList('landingPageFolder').title('Edit folders')),
            ]),
        ),
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
      S.documentTypeListItem('sidebarPromo').title('Blog sidebar promos').icon(BlockElementIcon),
      S.listItem()
        .title('Logos')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Logos')
            .items([
              S.documentTypeListItem('logoBand').title('Logo bands (rows on pages)'),
              S.documentTypeListItem('clientLogo').title('All client logos'),
              S.documentTypeListItem('pressMention').title('As seen in (Leadership page)'),
            ]),
        ),
      S.documentTypeListItem('testimonial').title('Testimonials').icon(CommentIcon),
    ])
