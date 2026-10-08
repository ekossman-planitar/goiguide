import {VersionHistory} from '@/components/downloads/VersionHistory'
import {Section} from '@/components/blocks/Section'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {heading, meta, otherDownloads, products, stitch, stitchHistory} from '@/lib/content/downloads'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

const external = (href: string) => (href.startsWith('http') ? {target: '_blank', rel: 'noopener noreferrer'} : {})

function DownloadIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25">
      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />
    </svg>
  )
}

export default function DownloadsPage() {
  return (
    <>
      {/* Hero: intro on the left, the most-used download (Stitch) on the right */}
      <section className="pt-8 pb-12 lg:pt-12 lg:pb-[60px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h1 className="text-balance text-[40px] font-bold leading-[normal] text-ink md:text-[56px]">{heading}</h1>
            <p className="mt-6 text-lg leading-7 text-muted">
              Welcome to the software and documentation downloads area. Here you will find the software required to work with data captured with
              the <SmartLink href="/camera-hardware" className="font-medium text-primary underline">iGUIDE Camera System</SmartLink> and update
              firmware to the latest version. If you are new to creating iGUIDEs start by downloading Stitch. Stitch will automatically update once
              installed and will notify you when your camera needs the newest firmware. Firmware update instructions are available on the{' '}
              <SmartLink href="https://help.youriguide.com/" className="font-medium text-primary underline">
                iGUIDE Support Desk
              </SmartLink>
              .
            </p>
          </div>
          <div className="rounded-2xl bg-sky p-8 lg:p-10">
            <p className="text-sm font-semibold text-primary">New to iGUIDE? Start here</p>
            <h2 className="mt-2 text-[32px] font-bold leading-tight text-ink">Stitch v{stitch.version}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={stitch.pc} size="lg">
                <DownloadIcon />
                Stitch for PC
              </Button>
              <Button href={stitch.mac} size="lg" variant="secondary">
                <DownloadIcon />
                Stitch for Mac
              </Button>
            </div>
            <p className="mt-5 text-base text-muted">{stitch.requirements}</p>
          </div>
        </Container>
      </section>

      <Section background="surface">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li
              key={product.id}
              id={product.id}
              className="flex scroll-mt-24 flex-col rounded-2xl border border-[#e7edf6] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]"
            >
              <h2 className="text-xl font-bold text-ink">{product.name}</h2>
              <ul className="mt-4 divide-y divide-[#e7edf6]">
                {product.files.map((file) => (
                  <li key={file.label} className="flex items-center justify-between gap-4 py-3">
                    <h3 className="text-base font-medium text-ink">{file.label}</h3>
                    <SmartLink
                      href={file.href}
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                      {...external(file.href)}
                    >
                      {file.action}
                      <DownloadIcon />
                    </SmartLink>
                  </li>
                ))}
              </ul>
              {product.note && <p className="mt-auto pt-4 text-sm text-muted">{product.note}</p>}
            </li>
          ))}
        </ul>
      </Section>

      <section id="e169" className="scroll-mt-24 py-16 lg:py-[60px]">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
          <div>
            <h2 className="text-[32px] font-bold leading-[normal] text-ink md:text-5xl md:leading-[normal]">Other Downloads</h2>
            <p className="mt-5 text-base leading-6 text-muted">
              Notice: Stitch software uses{' '}
              <SmartLink href="https://download.qt.io/archive/qt/5.12/" className="font-medium text-primary underline">
                Qt libraries
              </SmartLink>{' '}
              licensed under{' '}
              <SmartLink href="http://opensource.org/licenses/lgpl-3.0.html" className="font-medium text-primary underline">
                LGPLv3
              </SmartLink>
              .
            </p>
          </div>
          <ul className="divide-y divide-[#e7edf6] rounded-2xl border border-[#e7edf6] bg-white">
            {otherDownloads.map((file) => (
              <li key={file.href + file.file} className="flex items-center justify-between gap-4 px-5 py-2.5">
                <div className="min-w-0">
                  <SmartLink href={file.href} className="font-semibold break-words text-primary hover:underline">
                    {file.file}
                  </SmartLink>
                  {file.description && <span className="block text-sm text-body">{file.description}</span>}
                </div>
                <span className="shrink-0 text-sm text-muted">Uploaded: {file.uploaded}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section id="e170" background="surface">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
          <div>
            <h2 className="text-[32px] font-bold leading-[normal] text-ink md:text-5xl md:leading-[normal]">Stitch Version History</h2>
            <p className="mt-5 text-lg leading-7 text-muted">Release notes for every Stitch version, newest first.</p>
          </div>
          <VersionHistory releases={stitchHistory} />
        </div>
      </Section>
    </>
  )
}
