import {LogoCards} from '@/components/blocks/LogoCards'
import {MediaView} from '@/components/blocks/MediaView'
import {PageHero} from '@/components/blocks/PageHero'
import {Section} from '@/components/blocks/Section'
import {integrations as c} from '@/lib/content/solutions/integrations'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(c.meta)

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        heading={c.hero.heading}
        subheading={c.hero.subheading}
        ctas={[{label: 'See all platforms', href: '#supported-platforms', variant: 'secondary'}]}
        media={<MediaView media={{type: 'image', image: c.hero.image, priority: true}} />}
      />
      <Section heading={c.featured.heading} subheading={c.featured.subheading} background="surface">
        <LogoCards items={c.featured.items} columns={4} />
      </Section>
      <Section id="supported-platforms" heading={c.supported.heading} subheading={c.supported.subheading}>
        {/* Jump links: the list is long, so let visitors skip to their category */}
        <nav aria-label="Platform categories" className="-mt-4 mb-12 flex flex-wrap gap-2">
          {c.supported.groups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
            >
              {g.heading}
            </a>
          ))}
        </nav>
        <div className="space-y-16">
          {c.supported.groups.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-28">
              <h3 className="text-[28px] leading-tight font-bold text-ink">{g.heading}</h3>
              <p className="mt-2 max-w-3xl text-lg leading-7 text-muted">{g.text}</p>
              <div className="mt-6">
                <LogoCards items={g.items} headingLevel="h4" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
