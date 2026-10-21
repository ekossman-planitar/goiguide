'use client'

import {useEffect, useRef} from 'react'

/**
 * Zendesk article body. The support team's accordions (a `.accordion` heading
 * followed by a `.panel`) open and close as on help.youriguide.com, and are
 * keyboard accessible. Panels only collapse once this script runs, so the
 * content is still readable without JavaScript.
 */
/** Wires one `.accordion` trigger to its `.panel`; returns a cleanup function. */
function wireAccordion(trigger: HTMLElement, panel: HTMLElement, index: number) {
  panel.id ||= `help-panel-${index}`
  trigger.setAttribute('role', 'button')
  trigger.setAttribute('tabindex', '0')
  trigger.setAttribute('aria-expanded', 'false')
  trigger.setAttribute('aria-controls', panel.id)
  let timer: ReturnType<typeof setTimeout> | undefined
  const liftLimit = () => {
    panel.style.maxHeight = 'none'
  }
  const toggle = () => {
    const open = trigger.classList.toggle('active')
    trigger.setAttribute('aria-expanded', String(open))
    clearTimeout(timer)
    panel.style.maxHeight = `${panel.scrollHeight}px`
    if (open) {
      // Lift the limit once open, so images that load later aren't cut off
      timer = setTimeout(liftLimit, 250)
    } else {
      // Forces a reflow so the collapse animates
      panel.getBoundingClientRect()
      panel.style.maxHeight = ''
    }
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }
  trigger.addEventListener('click', toggle)
  trigger.addEventListener('keydown', onKey)
  return () => {
    trigger.removeEventListener('click', toggle)
    trigger.removeEventListener('keydown', onKey)
    clearTimeout(timer)
  }
}

export function ArticleBody({html}: {html: string}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const cleanups: (() => void)[] = []
    root.querySelectorAll<HTMLElement>('.accordion').forEach((trigger, i) => {
      const panel = trigger.nextElementSibling as HTMLElement | null
      if (!panel?.classList.contains('panel')) return
      cleanups.push(wireAccordion(trigger, panel, i))
    })
    root.dataset.accordions = 'ready'
    return () => cleanups.forEach((fn) => fn())
  }, [html])

  return <div ref={ref} className="help-article-body" dangerouslySetInnerHTML={{__html: html}} />
}
