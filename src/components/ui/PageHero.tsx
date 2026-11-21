import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'
import { HeroTitle } from './HeroTitle'
import { Reveal } from './Reveal'

/**
 * Hero used by inner pages: dark ink panel with the brand glow, optional
 * background photo and an animated title.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imagePosition,
  actions,
  children,
  align = 'left',
  size = 'md',
}: {
  eyebrow?: ReactNode
  title: string
  description?: ReactNode
  image?: string
  imagePosition?: string
  actions?: ReactNode
  children?: ReactNode
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <header className="relative isolate overflow-hidden bg-ink-950 text-white">
      {image && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover opacity-45"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_35rem_at_15%_0%,rgb(0_57_240/0.65),transparent_60%),radial-gradient(40rem_30rem_at_100%_100%,rgb(0_57_240/0.35),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/30 via-ink-950/50 to-ink-950/90"
      />
      <div aria-hidden className="bg-grid-light mask-fade-b absolute inset-0 -z-10 opacity-60" />

      <div
        className={cn(
          'container-page relative',
          size === 'sm' && 'pt-36 pb-16 md:pt-44 md:pb-20',
          size === 'md' && 'pt-40 pb-20 md:pt-52 md:pb-28',
          size === 'lg' && 'pt-44 pb-24 md:pt-56 md:pb-36',
        )}
      >
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
          {eyebrow && (
            <Reveal className="mb-6">
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <HeroTitle text={title} className="text-h1 text-white" />
          {description && (
            <Reveal delay={0.25} className="text-lead mt-6 max-w-2xl text-white/75">
              {description}
            </Reveal>
          )}
          {actions && (
            <Reveal
              delay={0.35}
              className={cn('mt-10 flex flex-wrap gap-3', align === 'center' && 'justify-center')}
            >
              {actions}
            </Reveal>
          )}
          {children}
        </div>
      </div>
    </header>
  )
}
