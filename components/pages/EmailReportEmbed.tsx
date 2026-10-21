import {cn} from '@/lib/cn'
import {ReportScaleFit} from './ReportScaleFit'

/**
 * Sample iGuide email report, embedded as the live page does (the email's own
 * inline-styled HTML, copied verbatim from the live capture). `scaleHeight`
 * turns on the fit-to-width script for the annotated analytics canvas.
 */
export function EmailReportEmbed({html, label, scaleHeight, className}: Readonly<{html: string; label: string; scaleHeight?: number; className?: string}>) {
  return (
    <>
      <section
        aria-label={label}
        className={cn('overflow-x-auto', className)}
        // Static markup from the live page; no scripts
        dangerouslySetInnerHTML={{__html: html}}
      />
      {scaleHeight ? <ReportScaleFit nativeHeight={scaleHeight} /> : null}
    </>
  )
}
