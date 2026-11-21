import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({
  children,
  tone = 'brand',
  className,
}: {
  children: ReactNode
  tone?: 'brand' | 'light'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase',
        tone === 'brand' ? 'text-primary-600' : 'text-white/80',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'relative inline-flex size-2 rounded-full',
          tone === 'brand' ? 'bg-primary-600' : 'bg-sun-400',
        )}
      >
        <span
          className={cn(
            'absolute inset-0 animate-ping rounded-full opacity-60 [animation-duration:2.4s]',
            tone === 'brand' ? 'bg-primary-600' : 'bg-sun-400',
          )}
        />
      </span>
      {children}
    </span>
  )
}
