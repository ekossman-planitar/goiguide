import {ArrowRight} from './icons'
import {SmartLink} from './SmartLink'

const base = 'inline-flex items-center gap-2 rounded-[28px] px-3 py-2 text-xs leading-[18px] font-semibold text-ink'

/**
 * Callout pill above hero and section headings (light grey). A link when `href` is set:
 * on hover the text turns red and the arrow nudges right, like every text link.
 * On a grey section use tone="white" so it stays visible.
 */
export function Pill({label, href, tone = 'grey'}: Readonly<{label: string; href?: string; tone?: 'grey' | 'white'}>) {
  const styles = `${base} ${tone === 'white' ? 'bg-white' : 'bg-cream'}`
  if (!href) return <span className={styles}>{label}</span>
  return (
    <SmartLink href={href} className={`${styles} group transition-colors hover:text-primary-hover`}>
      {label}
      <ArrowRight width={14} height={14} />
    </SmartLink>
  )
}
