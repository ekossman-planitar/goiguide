/** /compare — copy, links and asset paths from the live page (checked 2026-10-14). */
// NEW content: live page was empty (h1 "Compare" only). This index lists the five comparison pages,
// using each page's live h1 as the card title.
import type {Block} from '@/components/blocks/Blocks'
import {ArrowRight} from '@/components/ui/icons'
import {SmartLink} from '@/components/ui/SmartLink'
import {hero as cubicasa, meta as cubicasaMeta} from './compareCubicasa'
import {hero as docusketch, meta as docusketchMeta} from './compareDocusketch'
import {hero as manual, meta as manualMeta} from './compareManualMeasurement'
import {hero as matterport, meta as matterportMeta} from './compareMatterport'
import {hero as zillow, meta as zillowMeta} from './compareZillow3dHome'

export const meta = {
  title: 'Compare | iGuide',
  // NEW description (live had none)
  description: 'See how iGuide compares to Matterport, DocuSketch, Zillow 3D Home, CubiCasa and manual measurement.',
  path: '/compare',
}

const pages = [
  {title: matterport.heading, href: matterportMeta.path},
  {title: docusketch.heading, href: docusketchMeta.path},
  {title: zillow.heading, href: zillowMeta.path},
  {title: manual.heading, href: manualMeta.path},
  {title: cubicasa.heading, href: cubicasaMeta.path},
]

export const blocks: Block[] = [
  {
    type: 'custom',
    id: 'compare',
    background: 'surface',
    children: (
      <>
        <h1 className="type-display text-ink">Compare</h1>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <li key={page.href} className="flex">
              <SmartLink
                href={page.href}
                className="group flex w-full flex-col justify-between gap-6 rounded-2xl border border-line bg-white p-6 shadow-card transition-colors hover:border-primary-hover"
              >
                <h2 className="type-heading-sm text-ink group-hover:text-primary-hover">{page.title}</h2>
                <ArrowRight width={20} height={20} className="text-primary group-hover:text-primary-hover" aria-hidden />
              </SmartLink>
            </li>
          ))}
        </ul>
      </>
    ),
  },
]
