/**
 * Marketing Catalogue: downloadable marketing files for iGUIDE customers
 * (linked from the help centre). On the live site each item is a page that
 * immediately redirects to its file; here /<catalogue>/<slug> redirects on the
 * server, and /marketing-catalogue lists everything with a filter per catalogue.
 * `path` values are the live holder URLs (checked 2026-10-08); `title` is the live page title, as is (checked 2026-10-09).
 */
export const catalogues = [
  {id: 'photos', label: 'Photos', title: 'Photos | iGUIDE', path: '/photos'},
  {id: 'videos', label: 'Videos', title: 'Videos | iGUIDE', path: '/catalogue-videos'},
  {id: 'presentations', label: 'Presentations', title: 'Presentations | iGUIDE', path: '/presentations'},
  {id: 'brochures', label: 'Brochures', title: 'Brochures | iGUIDE', path: '/catalogue-brochures'},
  {id: 'one-pagers', label: 'One-pagers', title: 'one-pagers | iGUIDE', path: '/one-pagers'},
  {id: 'checklists', label: 'Checklists', title: 'Checklists | iGUIDE', path: '/checklists'},
  {id: 'drawing-package-samples', label: 'Drawing Package Samples', title: 'Drawing Package Samples | iGUIDE', path: '/drawing-package-samples'},
] as const

export type CatalogueId = (typeof catalogues)[number]['id']

export const MARKETING_CATALOGUE_PATH = '/marketing-catalogue'

export function getCatalogue(id: string) {
  return catalogues.find((c) => c.id === id)
}

export function getCatalogueByPath(path: string) {
  return catalogues.find((c) => c.path === path)
}
