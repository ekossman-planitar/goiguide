/**
 * Zendesk articles that live elsewhere on goiguide.com. Their /support/articles/{id}-…
 * address (any slug, or the bare id) permanently redirects to the new page,
 * and every link the site builds to them points straight at the new page.
 * The article itself stays in Zendesk.
 */
export const helpArticleRedirects: Record<number, string> = {
  // "iGUIDE Marketing Catalogue" → rebuilt as a site page (Evan, 2026-10-22)
  28225392683154: '/support/marketing-catalogue',
}
