import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ProgramCard } from '@/components/sections/ProgramCard'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { fmt, getLocale, translations } from '@/lib/i18n'
import { mediaAlt, mediaPosition, mediaUrl } from '@/lib/media'
import { getProgram, getPrograms } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ programId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProgram((await params).programId)
  const og = mediaUrl(p?.image)
  return p ? { title: p.title, description: p.shortDescription, openGraph: og ? { images: [{ url: og }] } : undefined } : {}
}

export default async function ProgramPage({ params }: Props) {
  const locale = await getLocale()
  const t = translations[locale]
  const program = await getProgram((await params).programId)
  if (!program) notFound()
  const upcoming = program.status === 'upcoming'
  const others = (await getPrograms('upcoming', 4)).filter((p) => p.id !== program.id).slice(0, 3)
  const gallery = (program.gallery ?? []).map((g) => ({ src: mediaUrl(g.image), alt: mediaAlt(g.image) })).filter((g) => g.src)
  const link = program.registrationLink && program.registrationLink !== '#' ? program.registrationLink : '/contact'
  const details = [
    { icon: Calendar, label: t.programs.dateLabel, value: formatDate(program.date, locale) },
    { icon: Clock, label: t.programs.timeLabel, value: program.time },
    { icon: MapPin, label: t.programs.locationLabel, value: program.location },
    ...(program.maximumParticipants
      ? [{ icon: Users, label: t.programs.participantsLabel, value: fmt(t.programs.maxParticipants, { count: program.maximumParticipants }) }]
      : []),
  ]

  return (
    <>
      <PageHero
        eyebrow={upcoming ? t.programs.upcoming : t.programs.past}
        title={program.title}
        description={program.shortDescription}
        image={mediaUrl(program.image, '/hero.jpg')}
        imagePosition={mediaPosition(program.image)}
        size="sm"
      />
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="text-h2">{t.programs.descriptionTitle}</h2>
            <div className="mt-6">
              {program.longDescription ? <RichText data={program.longDescription as never} /> : <p className="text-lead text-ink-500">{program.shortDescription}</p>}
            </div>
          </Reveal>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1} className="rounded-[var(--radius-card)] border border-ink-200/80 bg-white p-7 shadow-[var(--shadow-soft)] lg:sticky lg:top-32">
              <h2 className="text-h3">{t.programs.detailsTitle}</h2>
              <ul className="my-7 space-y-4">
                {details.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary-50 text-primary-600"><Icon className="size-5" aria-hidden /></span>
                    <span>
                      <span className="block text-xs text-ink-400">{label}</span>
                      <span className="block font-medium text-ink-900">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {upcoming ? (
                program.isRegistrationAvailable ? (
                  <div className="space-y-3">
                    <ButtonLink href={link} size="lg" arrow className="w-full">{t.programs.registerButton}</ButtonLink>
                    <ButtonLink href="/contact" size="lg" variant="outline" className="w-full">{t.programs.requestInfoButton}</ButtonLink>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-sun-300/30 p-4 text-sm text-ink-800">
                    <p className="font-semibold">{t.programs.registrationUnavailable}</p>
                    <p className="mt-1">{t.programs.registrationUnavailableDescription}</p>
                  </div>
                )
              ) : (
                <div>
                  <p className="text-sm text-ink-500">{t.programs.pastProgramDescription}</p>
                  <ButtonLink href="/programmes" variant="outline" className="mt-4 w-full">{t.programs.viewUpcomingButton}</ButtonLink>
                </div>
              )}
            </Reveal>
          </aside>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="section-y bg-ink-50">
          <div className="container-page">
            <h2 className="text-h2 mb-10">{t.programs.photosTitle}</h2>
            <Stagger className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {gallery.map((g, i) => (
                <StaggerItem key={i} className="overflow-hidden rounded-2xl">
                  <Image src={g.src!} alt={g.alt} width={800} height={600} sizes="(max-width: 640px) 100vw, 33vw" className="h-auto w-full transition-transform duration-700 hover:scale-105" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="section-y">
          <div className="container-page">
            <h2 className="text-h2 mb-10">{upcoming ? t.programs.otherUpcomingPrograms : t.programs.nextPrograms}</h2>
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <StaggerItem key={p.id}><ProgramCard program={p} locale={locale} /></StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  )
}
