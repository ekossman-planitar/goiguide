'use client'

import {Check} from 'lucide-react'
import {useEffect, useId, useRef, useState, type KeyboardEvent} from 'react'
import {cn} from '@/lib/cn'
import {ChevronDown} from './icons'

export type SelectOption = {value: string; label: string}

type Props = {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  /** Accessible name when there's no visible <label htmlFor={id}> */
  label?: string
  /** Put on the trigger button, so a visible <label htmlFor> (and any GTM selector) still points at it */
  id?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pill'
  /** 'field' = form field (stronger border, like text inputs); 'filter' = light border for filter bars */
  tone?: 'filter' | 'field'
  /** Open the list above the button (e.g. in the footer) */
  placement?: 'bottom' | 'top'
  align?: 'left' | 'right'
  className?: string
  buttonClassName?: string
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-4 text-base',
}

/**
 * Styled dropdown (replaces the browser's native <select>; look based on Flowbite's dropdown).
 * Accessible "select-only combobox": the button shows the choice, the list opens below it.
 * Keyboard: Enter / Space / ↓ open; ↑ ↓ Home End move; Enter picks; Esc closes; typing jumps to an option.
 */
export function Select({
  options,
  value,
  onChange,
  label,
  id,
  name,
  placeholder = 'Select…',
  disabled,
  size = 'md',
  shape = 'rounded',
  tone = 'filter',
  placement = 'bottom',
  align = 'left',
  className,
  buttonClassName,
}: Readonly<Props>) {
  const autoId = useId()
  const buttonId = id ?? `${autoId}-button`
  const listId = `${autoId}-list`
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const typed = useRef({text: '', at: 0})
  const selectedIndex = options.findIndex((o) => o.value === value)
  const selected = options[selectedIndex]

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // Keep the highlighted option in view
  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({block: 'nearest'})
  }, [open, active])

  const openList = () => {
    setActive(Math.max(0, selectedIndex))
    setOpen(true)
  }
  const pick = (i: number) => {
    const option = options[i]
    if (option && option.value !== value) onChange(option.value)
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const last = options.length - 1
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    const moves: Record<string, number> = {ArrowDown: Math.min(last, active + 1), ArrowUp: Math.max(0, active - 1), Home: 0, End: last}
    if (e.key in moves) {
      e.preventDefault()
      setActive(moves[e.key])
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(active)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'Tab') {
      setOpen(false)
    } else if (e.key.length === 1) {
      // Type-ahead
      const now = Date.now()
      typed.current = {text: (now - typed.current.at < 700 ? typed.current.text : '') + e.key.toLowerCase(), at: now}
      const i = options.findIndex((o) => o.label.toLowerCase().startsWith(typed.current.text))
      if (i >= 0) setActive(i)
    }
  }

  let borderClass = tone === 'field' ? 'border-muted' : 'border-line'
  if (open) borderClass = 'border-primary'

  return (
    <div ref={root} className={cn('relative', className)}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        id={buttonId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-label={label}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        // Space would otherwise also 'click' the button on key up and toggle it straight back
        onKeyUp={(e) => e.key === ' ' && e.preventDefault()}
        className={cn(
          'flex w-full items-center justify-between gap-3 border bg-white text-left font-medium text-ink transition-colors',
          'hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          'disabled:cursor-not-allowed disabled:border-line disabled:bg-surface disabled:text-muted',
          shape === 'pill' ? 'rounded-full' : 'rounded-lg',
          borderClass,
          sizes[size],
          buttonClassName,
        )}
      >
        <span className={cn('truncate', !selected && 'text-muted')}>{selected?.label ?? placeholder}</span>
        <ChevronDown aria-hidden width={16} height={16} className={cn('shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={buttonId}
          className={cn(
            'absolute z-50 max-h-72 min-w-full overflow-y-auto rounded-lg border border-line bg-white py-2 shadow-lg',
            placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {options.map((o, i) => {
            const isSelected = o.value === value
            return (
              <li
                key={o.value}
                id={`${listId}-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setActive(i)}
                onClick={() => pick(i)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-4 px-4 py-2 text-sm whitespace-nowrap',
                  i === active ? 'bg-surface text-primary-hover' : 'text-ink',
                  isSelected && 'font-semibold',
                )}
              >
                {o.label}
                {isSelected && (
                  <Check aria-hidden strokeWidth={2.5} className="h-4 w-4 shrink-0" />
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
