import type {ComponentPropsWithoutRef, ElementType} from 'react'
import {cn} from '@/lib/cn'

// default: same breakpoints as the live goiguide.com `.container`
// (640 / 768 / 1024 / 1280 / 1536px, 16px side padding)
const widths = {
  default: 'sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]',
  wide: 'max-w-5xl',
  medium: 'max-w-4xl',
  narrow: 'max-w-3xl',
}

type ContainerProps<T extends ElementType> = {as?: T; size?: keyof typeof widths} & ComponentPropsWithoutRef<T>

/** Centred page-width wrapper with responsive side padding. */
export function Container<T extends ElementType = 'div'>({as, size = 'default', className, ...props}: ContainerProps<T>) {
  const Tag = as ?? 'div'
  return <Tag className={cn('mx-auto w-full px-4', widths[size], className)} {...props} />
}
