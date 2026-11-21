import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Infinite horizontal scroller; pauses on hover. Content is duplicated once. */
export function Marquee({
  children,
  className,
  duration = 40,
}: {
  children: ReactNode
  className?: string
  duration?: number
}) {
  return (
    <div
      className={cn('group mask-fade-x relative flex overflow-hidden', className)}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      <div className="flex w-max shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused] md:gap-6 md:pr-6">
        {children}
        <div aria-hidden className="flex items-center gap-4 md:gap-6">
          {children}
        </div>
      </div>
    </div>
  )
}
