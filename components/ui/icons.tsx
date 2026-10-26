import {
  ArrowRight as LucideArrowRight,
  ChevronDown as LucideChevronDown,
  ChevronLeft as LucideChevronLeft,
  ChevronRight as LucideChevronRight,
  Menu as LucideMenu,
  Star as LucideStar,
  X as LucideX,
  type LucideProps,
} from 'lucide-react'

/**
 * Interface icons. The site's one icon set is Lucide (lucide.dev, ISC licence: free for any
 * use, including commercial). Use these wrappers or import from 'lucide-react' directly;
 * never draw a one-off icon or mix in another set. See /brand-guideline#icons.
 */
type IconProps = LucideProps

export function ChevronDown(props: Readonly<IconProps>) {
  return <LucideChevronDown width={16} height={16} aria-hidden {...props} />
}

export function ChevronLeft(props: Readonly<IconProps>) {
  return <LucideChevronLeft width={16} height={16} aria-hidden {...props} />
}

export function ChevronRight(props: Readonly<IconProps>) {
  return <LucideChevronRight width={16} height={16} aria-hidden {...props} />
}

/** Trailing link arrow: `link-arrow` nudges it right when its link (or card) is hovered, site-wide (globals.css) */
export function ArrowRight({className, ...props}: Readonly<IconProps>) {
  return <LucideArrowRight width={18} height={18} aria-hidden {...props} className={className ? `link-arrow ${className}` : 'link-arrow'} />
}

export function MenuIcon(props: Readonly<IconProps>) {
  return <LucideMenu width={24} height={24} aria-hidden {...props} />
}

export function CloseIcon(props: Readonly<IconProps>) {
  return <LucideX width={24} height={24} aria-hidden {...props} />
}

/** Filled review star */
export function Star(props: Readonly<IconProps>) {
  return <LucideStar width={22} height={22} fill="currentColor" aria-hidden {...props} />
}
