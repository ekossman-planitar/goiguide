'use client'

import {useEffect, useRef, type ReactNode} from 'react'
import {CloseIcon} from '@/components/ui/icons'
import {cn} from '@/lib/cn'

/**
 * Native <dialog> modal (focus trap, Esc to close and backdrop come from the browser),
 * styled like the site's other dialogs (rounded-2xl, shadow-xl, 50% black backdrop).
 */
export function Modal({
  open,
  onClose,
  label,
  children,
  className,
}: Readonly<{open: boolean; onClose: () => void; label: string; children: ReactNode; className?: string}>) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={cn(
        'm-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl bg-white p-0 text-left shadow-xl backdrop:bg-black/50',
        className,
      )}
    >
      <div className="relative">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-card transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <CloseIcon width={20} height={20} />
        </button>
        {open && children}
      </div>
    </dialog>
  )
}
