'use client'

import {useEffect} from 'react'

/**
 * Scales a fixed-width (1200 × height) annotated report canvas down to the
 * available width, as the live page's inline script did. Expects the
 * #iguide-report-outer / -scaler / -canvas elements from the embedded markup.
 */
export function ReportScaleFit({nativeWidth = 1200, nativeHeight}: {nativeWidth?: number; nativeHeight: number}) {
  useEffect(() => {
    const outer = document.getElementById('iguide-report-outer')
    const scaler = document.getElementById('iguide-report-scaler')
    const canvas = document.getElementById('iguide-report-canvas')
    if (!outer || !scaler || !canvas) return
    const fit = () => {
      const scale = Math.min(1, scaler.clientWidth / nativeWidth)
      canvas.style.transform = `scale(${scale})`
      scaler.style.height = `${nativeHeight * scale}px`
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(outer)
    globalThis.addEventListener('resize', fit)
    return () => {
      observer.disconnect()
      globalThis.removeEventListener('resize', fit)
    }
  }, [nativeWidth, nativeHeight])
  return null
}
