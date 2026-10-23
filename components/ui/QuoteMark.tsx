import {cn} from '@/lib/cn'

/** The site's one quote mark (red, from the customer story testimonial card). Decorative only. */
export function QuoteMark({className}: Readonly<{className?: string}>) {
  return (
    <svg aria-hidden viewBox="0 0 48 48" width="32" height="32" className={cn('block shrink-0 text-primary-hover', className)}>
      <path
        fill="currentColor"
        d="M36.4 15 33.5 20c2.2 0 4.08.78 5.65 2.35A7.7 7.7 0 0 1 41.5 28a7.7 7.7 0 0 1-2.35 5.65A7.7 7.7 0 0 1 33.5 36a7.7 7.7 0 0 1-5.65-2.35A7.7 7.7 0 0 1 25.5 28c0-.77.09-1.48.28-2.13.18-.65.46-1.27.82-1.87l6.35-11c.17-.3.4-.54.7-.73.3-.18.63-.27 1-.27.77 0 1.34.33 1.73 1 .38.67.39 1.33.02 2Zm-18 0L15.5 20c2.2 0 4.08.78 5.65 2.35A7.7 7.7 0 0 1 23.5 28a7.7 7.7 0 0 1-2.35 5.65A7.7 7.7 0 0 1 15.5 36a7.7 7.7 0 0 1-5.65-2.35A7.7 7.7 0 0 1 7.5 28c0-.77.09-1.48.28-2.13.18-.65.46-1.27.82-1.87l6.35-11c.17-.3.4-.54.7-.73.3-.18.63-.27 1-.27.77 0 1.34.33 1.73 1 .38.67.39 1.33.02 2Z"
      />
    </svg>
  )
}
