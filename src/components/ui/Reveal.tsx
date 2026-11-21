'use client'
import { motion, type HTMLMotionProps, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Distance travelled (px) while fading in. */
  y?: number
  as?: 'div' | 'li' | 'section' | 'span' | 'article'
} & Omit<HTMLMotionProps<'div'>, 'children'>

/** Fades and lifts its content in once it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div', ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
}

const item: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: EASE } },
}

/** Staggers the entrance of its `StaggerItem` children. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: 'div' | 'ul' | 'ol'
}) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  )
}
