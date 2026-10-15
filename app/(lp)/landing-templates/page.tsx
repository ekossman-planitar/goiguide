import type {Metadata} from 'next'
import {LpFooter, LpHeader} from '@/components/landing/LpChrome'
import {Container} from '@/components/ui/Container'
import {lpLayouts, lpSectionLabels} from '@/lib/landingPages/layouts'
import {LayoutWireframe} from '@/sanity/components/LayoutWireframe'

export const metadata: Metadata = {
  title: {absolute: 'Landing page templates | iGUIDE'},
  robots: {index: false, follow: false},
}

/** Overview of the landing page layouts editors can pick in the Studio (not linked from the site). */
export default function LandingTemplatesPage() {
  return (
    <>
      <LpHeader />
      <main className="flex-1 bg-surface py-16">
        <Container>
          <h1 className="text-4xl font-semibold text-ink">Landing page templates</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Pick one of these when you create a landing page in the Studio (Landing pages → +). Each starts with the sections shown; you can add,
            remove and reorder sections afterwards.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lpLayouts.map((l) => (
              <li key={l.id} className="rounded-2xl border border-line bg-white p-6">
                <LayoutWireframe sections={l.sections} heroStyle={l.heroStyle} width={220} />
                <h2 className="mt-5 text-xl font-semibold text-ink">{l.name}</h2>
                <p className="mt-2 text-base text-body">{l.bestFor}</p>
                <p className="mt-3 text-sm text-muted">{l.sections.map((s) => lpSectionLabels[s]).join(' · ')}</p>
                <a href={`/landing-templates/${l.id}`} className="mt-4 inline-block font-semibold text-primary hover:underline">
                  See the full example →
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <LpFooter />
    </>
  )
}
