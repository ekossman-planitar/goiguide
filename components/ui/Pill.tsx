import {ArrowRight} from './icons'
import {SmartLink} from './SmartLink'

const styles =
  'inline-flex items-center gap-2 rounded-[28px] bg-cream px-3 py-2 text-xs leading-[18px] font-semibold text-ink'

/** Cream pill, as used above hero and section headings on the live site. A link when `href` is set. */
export function Pill({label, href}: {label: string; href?: string}) {
  if (!href) return <span className={styles}>{label}</span>
  return (
    <SmartLink href={href} className={`${styles} transition-opacity hover:opacity-85`}>
      {label}
      <ArrowRight width={14} height={14} />
    </SmartLink>
  )
}
