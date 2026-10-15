'use client'

import {useRef, useState} from 'react'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {cn} from '@/lib/cn'

type Props = {
  label: string
  /** Heading inside the pop-up (live: "Get in touch", "Connect with a Project Manager") */
  title: string
  formId: string
  /** Keeps the live button's id (e.g. gsbtn) so GTM triggers keep matching */
  id?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

/**
 * Button that opens a HubSpot form in a modal, like the live site's lightbox
 * buttons. The form is only created the first time the dialog opens.
 */
export function FormDialogButton({label, title, formId, id, variant = 'primary', className}: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [opened, setOpened] = useState(false)

  return (
    <>
      <button
        type="button"
        id={id}
        onClick={() => {
          setOpened(true)
          ref.current?.showModal()
        }}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-6 py-3 text-center text-base leading-6 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          variant === 'primary'
            ? 'border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover'
            : 'border-primary bg-white text-primary hover:border-primary-hover hover:text-primary-hover',
          className,
        )}
      >
        {label}
      </button>
      <dialog
        ref={ref}
        aria-label={title}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl bg-white p-0 text-left shadow-xl backdrop:bg-black/50"
      >
        <div className="relative p-8">
          <button
            type="button"
            aria-label="Close"
            onClick={() => ref.current?.close()}
            className="absolute top-3 right-3 cursor-pointer p-1 text-2xl leading-none text-ink hover:opacity-60"
          >
            ×
          </button>
          <h3 className="mb-4 pr-8 text-2xl font-semibold text-ink">{title}</h3>
          {opened && <HubSpotForm formId={formId} className="min-h-[320px]" />}
        </div>
      </dialog>
    </>
  )
}
