import type {ReactNode} from 'react'
import {cn} from '@/lib/cn'
import {SmartLink} from './SmartLink'

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  className?: string
  id?: string
  newTab?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg border text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const variants = {
  primary: 'border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover',
  secondary: 'border-primary bg-white text-primary hover:bg-primary-soft',
}

const sizes = {
  // Match the live site: header button 16px/600 with 8px 16px padding; page buttons 12px 24px
  md: 'whitespace-nowrap px-4 py-2 text-base leading-6',
  lg: 'px-6 py-3 text-base leading-6',
}

/** Link styled as a button. */
export function Button({href, children, variant = 'primary', size = 'md', className, id, newTab}: ButtonProps) {
  return (
    <SmartLink
      href={href}
      id={id}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
    >
      {children}
    </SmartLink>
  )
}
