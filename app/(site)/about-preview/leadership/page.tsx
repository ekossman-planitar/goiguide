import type {Metadata} from 'next'
import {LeadershipGrid} from '@/components/about/LeadershipGrid'
import {Section} from '@/components/blocks/Section'
import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {leaders, meta, type PressItem} from '@/lib/content/preview/leadership'
import {pageMetadata} from '@/lib/pageMetadata'
import {fetchSanity} from '@/sanity/lib/fetch'
import {PRESS_QUERY} from '@/sanity/lib/queries'

/** Draft leadership page for review (Evan, 2026-10-27). Not indexed, not in the sitemap. */
export const metadata: Metadata = {...pageMetadata(meta), robots: {index: false, follow: false}}

export default async function LeadershipPreviewPage() {
  const press = await fetchSanity<PressItem[]>(PRESS_QUERY, [])

  return (
    <>
      <section className="bg-white pt-16 lg:pt-20">
        <Container>
          <h1 className="type-display max-w-3xl text-ink">The people keeping it real.</h1>
          <p className="type-lead mt-5 max-w-3xl text-muted">
            Our leadership team has spent decades in property, tech and the field, and they all share one stubborn belief: if it’s worth doing, it’s worth
            getting right. They set clear direction, clear the way for their teams and grow the people around them. Meet the people steering iGuide into its
            next chapter.
          </p>
        </Container>
      </section>

      <Section background="white">
        <h2 className="sr-only">Leadership team</h2>
        <LeadershipGrid leaders={leaders} />
      </Section>

      <Section heading="As seen in" subheading="Our team, in the press and on stage." background="surface">
        {press.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {press.map((p) => (
              <li key={p._id}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.name}
                  className="flex h-24 items-center justify-center rounded-2xl border border-line bg-white px-6 shadow-card transition-shadow hover:shadow-lg"
                >
                  <FallbackImage src={p.logo} alt={p.name} width={p.dims?.width ?? 160} height={p.dims?.height ?? 40} className="h-auto max-h-10 w-auto max-w-full object-contain" fallback={<span className="text-sm font-semibold text-ink">{p.name}</span>} />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {['Press outlet', 'Press outlet', 'Event', 'Event', 'Press outlet', 'Event'].map((label, i) => (
              <li key={i} className="flex h-24 items-center justify-center rounded-2xl border-2 border-dashed border-line bg-white text-sm font-semibold text-muted">
                {label} logo
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  )
}
