import { ArrowUpRight, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { TrainingDomain } from '@/payload-types'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { fmt, translations, type Locale } from '@/lib/translations'

export function TrainingDomainCard({ domain, locale, index = 0 }: { domain: TrainingDomain; locale: Locale; index?: number }) {
  const t = translations[locale]
  const trainings = domain.trainings ?? []
  const image = mediaUrl(domain.image, '/hero.jpg')!
  const href = `/domaine-de-formation/${domain.id}`

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          style={{ objectPosition: mediaPosition(domain.image) }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900 backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
          <GraduationCap className="size-3.5" aria-hidden />
          {fmt(t.ui.trainingCount, { count: trainings.length })}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-h3">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {domain.name}
          </Link>
        </h3>
        {domain.description && <p className="mt-3 line-clamp-3 text-sm text-ink-500">{domain.description}</p>}
        {trainings.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5 text-sm">
            {trainings.slice(0, 3).map((tr) => (
              <li key={tr.id} className="flex items-center gap-2.5 text-ink-600">
                <span className="size-1.5 shrink-0 rounded-full bg-primary-600" aria-hidden />
                <span className="truncate">{tr.name}</span>
              </li>
            ))}
            {trainings.length > 3 && (
              <li className="pl-4 text-ink-400">{fmt(t.ui.otherTrainings, { count: trainings.length - 3 })}</li>
            )}
          </ul>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary-600">
          {t.ui.discoverDomain}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </article>
  )
}
