import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {SmartLink} from '@/components/ui/SmartLink'
import {LandingSections} from '@/components/landing/LandingSections'
import {LpFooter, LpHeader} from '@/components/landing/LpChrome'
import type {LpSection} from '@/components/landing/types'
import {lpLayouts} from '@/lib/landingPages/layouts'
import {sampleSections} from '@/lib/landingPages/samples'

type Props = {params: Promise<{layout: string}>}

export function generateStaticParams() {
  return lpLayouts.map((l) => ({layout: l.id}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {layout: id} = await params
  const found = lpLayouts.find((l) => l.id === id)
  return {title: {absolute: `${found?.name ?? 'Template'} — landing page template | iGUIDE`}, robots: {index: false, follow: false}}
}

/** Full example of one landing page layout, with sample content (not linked from the site). */
export default async function LandingTemplatePage({params}: Props) {
  const {layout: id} = await params
  const layout = lpLayouts.find((l) => l.id === id)
  if (!layout) notFound()
  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-sm text-white">
        Template preview: <strong>{layout.name}</strong> — sample content. <SmartLink href="/landing-templates" className="underline">All templates</SmartLink>
      </div>
      <LpHeader button={{label: 'Book a demo', action: 'form'}} />
      <main className="flex-1">
        <LandingSections sections={sampleSections(layout.id) as unknown as LpSection[]} />
      </main>
      <LpFooter />
    </>
  )
}
