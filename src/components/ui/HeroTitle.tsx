'use client'
import { motion, useReducedMotion } from 'motion/react'

/** Splits a heading into words that rise into place one after another. */
export function HeroTitle({
  text,
  className,
  as = 'h1',
  delay = 0.05,
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2'
  delay?: number
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const words = text.split(/\s+/).filter(Boolean)

  if (reduce) {
    const Static = as
    return <Static className={className}>{text}</Static>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '105%', rotate: 4 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.06 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
