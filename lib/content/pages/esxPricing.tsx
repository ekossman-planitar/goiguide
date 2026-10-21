/** /get-iguide/irc/esx — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {ReactNode} from 'react'
import type {Block} from '@/components/blocks/Blocks'
import {Button} from '@/components/ui/Button'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {SmartLink} from '@/components/ui/SmartLink'

export const meta = {
  title: 'ESX Pricing | iGuide',
  // NEW description (live had none)
  description:
    'Sketch processing pricing in USD for iGuide Instant Sketch, iGuide Standard: ESX and iGuide Premium: ESX files compatible with Xactimate.',
  path: '/get-iguide/irc/esx',
}

type Row = string[]

function PriceTable({head, rows}: Readonly<{head: string[]; rows: Row[]}>) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[480px] text-left text-base">
        <thead className="bg-surface">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-line">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-4 py-3 font-medium text-ink">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-4 py-3 text-body">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Package({
  image,
  heading,
  intro,
  table,
  after,
  download,
}: Readonly<{
  image: string
  heading: string
  intro: {href: string; text: string}
  table: {head: string[]; rows: Row[]}
  after?: ReactNode
  download?: {label: string; href: string}
}>) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
      <FallbackImage
        src={image}
        alt=""
        width={800}
        height={600}
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="h-auto w-full rounded-2xl"
        fallback={<div className="aspect-[4/3] w-full rounded-2xl bg-surface" />}
      />
      <div className="min-w-0">
        <h2 className="text-[32px] font-semibold leading-[normal] text-ink md:text-5xl md:leading-[normal]">{heading}</h2>
        <p className="mt-5 text-lg leading-7 text-body">
          <a href={intro.href} target="_blank" rel="noopener noreferrer">
            Click here
          </a>{' '}
          {intro.text}
        </p>
        <PriceTable {...table} />
        {after}
        {download && (
          <Button href={download.href} size="lg" className="mt-8">
            {download.label}
          </Button>
        )}
      </div>
    </div>
  )
}

const fullHead = ['Billable Area', 'iGuide Processing', 'ESX Processing', 'Total']

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Sketch Processing (USD)',
    subheading:
      'iGuide technology can automatically create room(s) or entire floor plan drawings and translate those directly into a format compatible with Xactimate.',
    // Live: sub-navigation links under the header
    extra: (
      <nav aria-label="Sub navigation" className="flex flex-wrap gap-2">
        {[
          ['Instant Sketch', '/get-iguide/irc/esx#instant_sketch'],
          ['iGuide Standard: ESX', '/get-iguide/irc/esx#iguide_standard'],
          ['iGuide Premium: ESX', '/get-iguide/irc/esx#iguide_premium'],
        ].map(([label, href]) => (
          <SmartLink
            key={href}
            href={href}
            className="rounded-full border border-line bg-white px-5 py-2 text-base font-semibold text-ink no-underline hover:border-primary-hover hover:text-primary-hover"
          >
            {label}
          </SmartLink>
        ))}
      </nav>
    ),
    media: {type: 'image', image: {src: '/assets/Uploads/Insurance-Header-Image.png', alt: ''}},
  },
  {
    type: 'custom',
    id: 'instant_sketch',
    background: 'surface',
    children: (
      <Package
        image="/assets/Uploads/sketch.jpg"
        heading="Instant Sketch*"
        intro={{href: 'https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Brochures/Instant-Sketch.pdf', text: 'to learn more information about what’s included in the iGuide Instant Sketch package.'}}
        table={{
          head: ['Billable Area', 'ESX Processing'],
          rows: [
            ['Up to 1,500 ft²', '$34.50 USD'],
            ['1,501-5,000 ft²', '$20 + $0.01 USD per ft²'],
          ],
        }}
        after={
          <p className="mt-4 text-sm leading-6 text-muted">
            *The machine-generated sketch quality relies on the input data the camera operator provides. Although iGuide and Verisk aim for
            typical file delivery in Xactimate within minutes, this timeframe may vary depending on load factors, such as after a catastrophic
            loss event. iGuide Instant Sketch is limited to properties no greater than 5000 sq ft and projects with no more than 75 scans.
          </p>
        }
        download={{label: 'Download Instant Sketch Sample', href: '/assets/downloads/iGUIDE_ESX_Sketch_Samples.zip'}}
      />
    ),
  },
  {
    type: 'custom',
    id: 'iguide_standard',
    children: (
      <Package
        image="/assets/Uploads/esx-standard_transparent.png"
        heading="iGuide Standard: ESX"
        intro={{href: 'https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Brochures/ESX-Add-on-Deliverables.pdf', text: 'to learn more information about what’s included in the iGuide Standard Sketch add-on.'}}
        table={{
          head: fullHead,
          rows: [
            ['Up to 1,500 ft²', '$33 USD', '$0.02 USD per ft²', '$33 + $0.02 USD per ft²'],
            ['1,501 -10,000 ft²', '$0.022 USD per ft²', '$0.02 USD per ft²', '$0.042 USD per ft²'],
            ['10,001-30,000 ft²', '$220 + $0.017 USD per ft²', '$200 + $0.015 USD per ft²', '$420 + $0.032 USD per ft²'],
            ['30,001-100,000 ft²', '$560 + $0.012 USD per ft²', '$500 + $0.011 USD per ft²', '$1,060 + $0.023 USD per ft²'],
            ['100,001 ft² +', '$1,400 + $0.010 USD per ft²', '$1,270 + $0.009 USD per ft²', '$2,670 + $0.019 USD per ft²'],
          ],
        }}
      />
    ),
  },
  {
    type: 'custom',
    id: 'iguide_premium',
    background: 'surface',
    children: (
      <Package
        image="/assets/Uploads/esx_premium.jpg"
        heading="iGuide Premium: ESX"
        intro={{href: 'https://6828755.fs1.hubspotusercontent-na1.net/hubfs/6828755/Marketing%20Catalogue/Brochures/ESX-Add-on-Deliverables.pdf', text: 'to learn more information about what’s included in the iGuide Premium ESX add-on.'}}
        table={{
          head: fullHead,
          rows: [
            ['Up to 1,500 ft²', '$45 USD', '$0.02 USD per ft²', '$45 + $0.02 USD per ft²'],
            ['1,501-10,000 ft²', '$0.03 USD per ft²', '$0.02 USD per ft²', '$0.05 USD per ft²'],
            ['10,001-30,000 ft²', '$300 + $0.023 USD per ft²', '$200 + $0.015 USD per ft²', '$500 + $0.038 USD per ft²'],
            ['30,001-100,000 ft²', '$760 + $0.017 USD per ft²', '$500 + $0.011 USD per ft²', '$1,260 + $0.028 USD per ft²'],
            ['100,001 ft² +', '$1,950 + $0.013 USD per ft²', '$1,270 + $0.009 USD per ft²', '$3,220 + $0.022 USD per ft²'],
          ],
        }}
        download={{label: 'Download Sample ESX', href: '/assets/downloads/sample_esx_data.ESX.zip'}}
      />
    ),
  },
  {
    type: 'custom',
    children: (
      <div className="mx-auto max-w-[600px] text-center">
        <p className="text-lg leading-7 text-body">Cabinets will be represented in the sketch file for iGuide Premiums.</p>
        <FallbackImage
          src="/assets/cabinets-and-tray-ceiling__ResizedImageWzYwMCwzMzhd.jpg"
          alt=""
          width={600}
          height={338}
          className="mt-6 h-auto w-full rounded-2xl"
          fallback={<div className="mt-6 aspect-[600/338] w-full rounded-2xl bg-surface" />}
        />
      </div>
    ),
  },
]
