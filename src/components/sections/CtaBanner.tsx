import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'

/** Rounded brand-blue call to action used at the bottom of pages. */
export function CtaBanner({ title, description, children }: { title: string; description?: string | null; children?: ReactNode }) {
  return (
    <section className="container-page pb-24 md:pb-32">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-primary-600 px-6 py-16 text-center text-white md:px-16 md:py-20">
          <div aria-hidden className="bg-grid-light mask-radial absolute inset-0 -z-10" />
          <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-72 animate-spin-slow rounded-full border-[40px] border-white/10" />
          <div aria-hidden className="absolute -bottom-32 -left-20 -z-10 size-80 rounded-full bg-primary-400/40 blur-3xl" />
          <h2 className="text-h2 mx-auto max-w-3xl text-white">{title}</h2>
          {description && <p className="text-lead mx-auto mt-5 max-w-2xl text-white/80">{description}</p>}
          {children && <div className="mt-10 flex flex-wrap justify-center gap-3">{children}</div>}
        </div>
      </Reveal>
    </section>
  )
}
