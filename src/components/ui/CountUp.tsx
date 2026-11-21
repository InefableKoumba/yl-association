'use client'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

/**
 * Animates the numeric part of a CMS value like "425+", "95%" or "2 500+"
 * when it scrolls into view. The real value is server-rendered, so it is
 * correct without JavaScript; non-numeric values are shown as-is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    const match = value.match(/^(\D*)([\d\s.,]+)(.*)$/)
    if (!el || !inView || reduce || !match) return
    const target = Number(match[2].replace(/[\s,]/g, '').replace(/\.(?=\d{3}\b)/g, ''))
    if (!Number.isFinite(target) || target <= 0) return
    const [, prefix, , suffix] = match
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v).toLocaleString('fr-FR')}${suffix}`
      },
      onComplete: () => {
        el.textContent = value
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span className={className} aria-label={value}>
      <span ref={ref} aria-hidden>
        {value}
      </span>
    </span>
  )
}
