import {HelpFooter} from '@/components/help/HelpFooter'
import {HelpHeader, type HelpNavCategory} from '@/components/help/HelpHeader'
import {categoryPath, getCategories} from '@/lib/help/zendesk'
import './help.css'

/**
 * Help Center microsite (/support): same brand as goiguide.com, with its own
 * header and footer. Content comes from Zendesk (lib/help/zendesk.ts).
 */
export default async function HelpLayout({children}: Readonly<{children: React.ReactNode}>) {
  let categories: HelpNavCategory[] = []
  try {
    categories = (await getCategories()).map((c) => ({name: c.name, description: c.description, href: categoryPath(c)}))
  } catch (error) {
    // The Topics menu is empty until Zendesk answers again; the page itself still renders
    console.error('[help] categories for the header failed', error)
  }
  return (
    <>
      <HelpHeader categories={categories} />
      <main className="flex-1">{children}</main>
      <HelpFooter />
    </>
  )
}
