import {CheckList} from '@/components/blocks/CheckList'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {MediaView} from '@/components/blocks/MediaView'
import {PageHero} from '@/components/blocks/PageHero'
import {Section} from '@/components/blocks/Section'
import {PricingCalculator} from '@/components/pricing/PricingCalculator'
import {PricingSideBySide} from '@/components/pricing/PricingSideBySide'
import {CustomerStories} from '@/components/sections/CustomerStories'
import {Faq} from '@/components/sections/Faq'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {customerStories} from '@/lib/content/homeSections'
import {addOns, calculator, faq, hero, meta, packages} from '@/lib/content/pricing'
import {book} from '@/lib/content/solutions/shared'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function PricingPage() {
  return (
    <>
      <PageHero
        heading={hero.heading}
        ctas={[{label: 'Estimate your project cost', href: '#calculator'}]}
        media={<MediaView media={{type: 'image', image: hero.image, priority: true}} className="rounded-2xl" />}
      >
        <p className="font-semibold text-ink">Included with every iGUIDE*</p>
        <CheckList items={hero.included} className="mt-4" />
        <p className="mt-5 text-sm leading-5">{hero.footnote}</p>
      </PageHero>

      <Section id="calculator" background="surface" heading={calculator.heading}>
        <PricingCalculator />
      </Section>

      <PricingSideBySide data={{...packages, allLink: {label: 'Explore add-ons', href: '#add-ons'}}} />

      <Section id="add-ons" heading="Build smarter, add the extras that matter">
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {addOns.map((addOn) => (
            <li
              key={addOn.title}
              className="grid grid-cols-[96px_minmax(0,1fr)] gap-5 rounded-2xl border border-[#e7edf6] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.075)]"
            >
              <FallbackImage
                src={addOn.image.src}
                alt={addOn.image.alt}
                width={192}
                height={192}
                className="aspect-square h-auto w-full rounded-xl bg-surface object-cover"
                fallback={<div className="aspect-square w-full rounded-xl bg-surface" />}
              />
              <div>
                <h3 className="text-lg leading-6 font-bold text-ink">{addOn.title}</h3>
                <p className="mt-1.5 text-sm leading-5 text-body">{addOn.summary}</p>
                <p className="mt-3 text-sm text-muted">
                  iGUIDE package + <span className="text-base font-bold text-ink">{addOn.priceCAD}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Same four stories as the live pricing page and homepage */}
      <CustomerStories {...customerStories} />

      <Faq heading={faq.heading} items={faq.items} />
      <div className="bg-sky pb-16 lg:pb-[60px]">
        <CtaButtons ctas={[book()]} className="justify-center" />
      </div>
    </>
  )
}
