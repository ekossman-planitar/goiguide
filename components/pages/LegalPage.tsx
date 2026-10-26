import type {ReactNode} from 'react'
import {Container} from '@/components/ui/Container'

/** Typography for long legal text (our own first-party HTML from lib/content/legal/ or JSX children). */
const prose = [
  'text-lg leading-relaxed text-body',
  '[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:text-ink md:[&_h2]:text-[28px]',
  '[&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink',
  '[&_h4]:mt-8 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-ink',
  '[&_h5]:mt-6 [&_h5]:text-base [&_h5]:font-semibold [&_h5]:uppercase [&_h5]:tracking-wide [&_h5]:text-muted',
  '[&_p]:mt-4',
  '[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
  '[&_li>ul]:mt-2 [&_li>ol]:mt-2 [&_li::marker]:text-muted',
  '[&_strong]:font-semibold [&_strong]:text-ink',
  '[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:[overflow-wrap:anywhere] [&_a:hover]:text-primary-hover',
  '[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-base max-md:[&_table]:text-sm',
  '[&_td]:[overflow-wrap:anywhere] [&_th]:[overflow-wrap:anywhere] max-md:[&_td]:p-2 max-md:[&_th]:p-2',
  '[&_td]:border [&_td]:border-line [&_td]:p-3 [&_td]:align-top [&_th]:border [&_th]:border-line [&_th]:bg-surface [&_th]:p-3 [&_th]:text-left',
  '[&_tr:first-child_td]:bg-surface [&_td_ul]:mt-0 [&_td_p:first-child]:mt-0',
  '[&>*:first-child]:mt-0',
].join(' ')

type Props = {
  title: string
  /** e.g. "Last updated: January 29, 2026." (shown as on the live page) */
  lastUpdated?: string
  /** Cleaned first-party HTML (lib/content/legal/*.ts) */
  html?: string
  children?: ReactNode
}

/** Long-form legal / rules page: h1, optional "last updated" line, readable narrow body. */
export function LegalPage({title, lastUpdated, html, children}: Readonly<Props>) {
  return (
    <Container as="article" size="narrow" className="py-16 lg:py-20">
      <header className="border-b border-line pb-8">
        <h1 className="type-title text-ink">{title}</h1>
        {lastUpdated && <p className="mt-4 text-base text-muted">{lastUpdated}</p>}
      </header>
      <div className={`mt-10 ${prose}`}>
        {/* Our own legal copy, copied from the live page */}
        {html && <div dangerouslySetInnerHTML={{__html: html}} />}
        {children}
      </div>
    </Container>
  )
}
