import {cn} from '@/lib/cn'

/** The PLANIX survey simulator iframe, sized to a phone or tablet screen (live: 300×600 and 600×800). */
export function SimulatorFrame({src, title, device}: Readonly<{src: string; title: string; device: 'phone' | 'tablet'}>) {
  return (
    <div
      className={cn(
        'mx-auto w-full overflow-hidden rounded-[28px] border-8 border-ink bg-ink shadow-xl',
        device === 'phone' ? 'aspect-[1/2] max-w-[316px]' : 'aspect-[3/4] max-w-[616px]',
      )}
    >
      <iframe src={src} title={title} className="h-full w-full bg-white" allowFullScreen />
    </div>
  )
}
