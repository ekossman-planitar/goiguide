import {Star} from '@/components/ui/icons'

/** Hard-coded review summary shown under the hero button (copy from live site). */
export function RatingRow() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <div className="flex gap-1 text-star" aria-hidden>
        {Array.from({length: 5}, (_, i) => (
          <Star key={i} />
        ))}
      </div>
      <p className="text-[17px] text-ink">
        4.9/5 based on 30+ reviews <span className="ml-2 font-semibold text-[#044d80]">Capterra</span>
      </p>
    </div>
  )
}
