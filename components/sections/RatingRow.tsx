import Image from 'next/image'
import {Star} from '@/components/ui/icons'

/** Hard-coded review summary shown under the hero buttons (copy from live site). */
export function RatingRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 xl:justify-start">
      <div className="flex gap-1 text-star" aria-hidden>
        {Array.from({length: 5}, (_, i) => (
          <Star key={i} width={19} height={18} />
        ))}
      </div>
      <p className="flex items-center gap-3 text-base leading-none font-medium text-ink">
        4.9/5 based on 30+ reviews
        <Image src="/homepage/capterra.svg" alt="Capterra" width={350} height={81} className="h-5 w-auto" />
      </p>
    </div>
  )
}
