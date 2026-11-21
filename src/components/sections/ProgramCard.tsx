import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Program } from '@/payload-types'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { translations, type Locale } from '@/lib/translations'
import { cn } from '@/lib/utils'

export function ProgramCard({ program, locale }: { program: Program; locale: Locale }) {
  const t = translations[locale]
  const past = program.status === 'past'
  const date = program.date ? new Date(program.date) : null
  const loc = locale === 'fr' ? 'fr-FR' : 'en-GB'

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        <Image
          src={mediaUrl(program.image, '/hero2.jpg')!}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            'object-cover transition-all duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105',
            past && 'grayscale-[60%] group-hover:grayscale-0',
          )}
          style={{ objectPosition: mediaPosition(program.image) }}
        />
        {date && (
          <div className="absolute top-4 left-4 flex flex-col items-center rounded-2xl bg-white px-3.5 py-2 text-center shadow-[var(--shadow-soft)]">
            <span className="font-display text-2xl leading-none font-bold text-ink-900">
              {date.toLocaleDateString(loc, { day: '2-digit', timeZone: 'UTC' })}
            </span>
            <span className="mt-1 text-[0.65rem] font-semibold tracking-widest text-primary-600 uppercase">
              {date.toLocaleDateString(loc, { month: 'short', timeZone: 'UTC' }).replace('.', '')}{' '}
              {date.getUTCFullYear()}
            </span>
          </div>
        )}
        <span
          className={cn(
            'absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur',
            past ? 'bg-ink-900/70 text-white' : 'bg-primary-600 text-white',
          )}
        >
          {past ? t.ui.pastBadge : program.isRegistrationAvailable ? t.ui.registrationOpen : t.ui.upcomingBadge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-h3">
          <Link href={`/programmes/${program.id}`} className="after:absolute after:inset-0 after:content-['']">
            {program.title}
          </Link>
        </h3>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500">
          {program.time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-primary-600" aria-hidden /> {program.time}
            </span>
          )}
          {program.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary-600" aria-hidden /> {program.location}
            </span>
          )}
        </div>
        <p className="mt-4 line-clamp-3 text-sm text-ink-600">{program.shortDescription}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary-600">
          {past ? t.common.viewSummary : t.common.viewDetails}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </article>
  )
}
