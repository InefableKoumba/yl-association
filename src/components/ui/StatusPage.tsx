import type { ReactNode } from 'react'
import { ButtonLink } from './Button'

/** Full-height message used for 404s and loading errors. */
export function StatusPage({
  code,
  title,
  description,
  actionHref = '/',
  actionLabel,
  secondary,
}: {
  code?: string
  title: string
  description?: string
  actionHref?: string
  actionLabel: string
  secondary?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-surface pt-40 pb-28 md:pt-48 md:pb-36">
      <div aria-hidden className="bg-dots mask-radial absolute inset-0 -z-10 opacity-70" />
      <div className="container-page text-center">
        {code && (
          <p className="font-display bg-gradient-to-b from-primary-600 to-primary-300 bg-clip-text text-[clamp(6rem,18vw,12rem)] leading-none font-bold tracking-tighter text-transparent">
            {code}
          </p>
        )}
        <h1 className="text-h2 mt-4">{title}</h1>
        {description && <p className="text-lead mx-auto mt-4 max-w-xl text-ink-500">{description}</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={actionHref} arrow>
            {actionLabel}
          </ButtonLink>
          {secondary}
        </div>
      </div>
    </section>
  )
}
