import {Button} from '@/components/ui/Button'
import {fetchSanity} from '@/sanity/lib/fetch'
import {SIDEBAR_PROMOS_QUERY} from '@/sanity/lib/queries'
import {SidebarPromo, type SidebarPromoData} from './SidebarPromo'

/**
 * Right-hand column on blog posts: a fixed "Book a demo" card, then one promo
 * from the Studio ("Blog sidebar promos"), picked at random per page view when
 * several are live. Sticks while the post scrolls on desktop.
 * GTM: the demo button keeps the site's `book-demo` class (opens Calendly);
 * promo buttons carry `.blog-sidebar-promo`; their card has data-promo (the promo's Studio ID).
 */
export async function BlogSidebar() {
  const promos = await fetchSanity<SidebarPromoData[]>(SIDEBAR_PROMOS_QUERY, [])
  return (
    <div className="space-y-6">
      <aside aria-label="Book a demo" className="blog-sidebar-demo rounded-2xl bg-primary p-6 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Book a demo</p>
        <p className="mt-2 text-2xl leading-tight font-semibold">See how iGuide works for you</p>
        <p className="mt-3 leading-relaxed text-white/85">Get a first look at the full iGuide experience with a personalized product tour.</p>
        <Button href="/book-a-demo" variant="secondary" className="book-demo mt-6 w-full justify-center border-white!">
          Book a demo
        </Button>
      </aside>
      {promos.length > 0 && <SidebarPromo promos={promos} />}
    </div>
  )
}
