import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  action,
  className,
  as: Heading = 'h2',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  action?: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-6 md:mb-16',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow && (
          <div className="mb-5">
            <Eyebrow tone={tone === 'light' ? 'light' : 'brand'}>{eyebrow}</Eyebrow>
          </div>
        )}
        <Heading className={cn('text-h2', tone === 'light' && 'text-white')}>{title}</Heading>
        {description && (
          <p className={cn('text-lead mt-5', tone === 'light' ? 'text-white/70' : 'text-ink-500')}>
            {description}
          </p>
        )}
      </Reveal>
      {action && (
        <Reveal delay={0.1} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  )
}
