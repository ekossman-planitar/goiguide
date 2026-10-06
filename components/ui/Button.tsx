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
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg text-center font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'border border-primary text-primary bg-white hover:bg-primary-soft',
}

const sizes = {
  md: 'h-11 whitespace-nowrap px-5 text-[15px]',
  lg: 'min-h-14 px-6 py-3 text-base sm:px-8 sm:text-lg',
}

/** Link styled as a button. */
export function Button({href, children, variant = 'primary', size = 'md', className, id}: ButtonProps) {
  return (
    <SmartLink href={href} id={id} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </SmartLink>
  )
}
