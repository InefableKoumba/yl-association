import { Calendar, CheckCircle2, Clock, MapPin, Users } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TrainingRegistration from '@/components/forms/TrainingRegistration'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { getLocale, translations } from '@/lib/i18n'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'
import { getDomain } from '@/lib/queries'

type Props = { params: Promise<{ domainId: string; trainingId: string }> }

async function load(params: Props['params']) {
  const { domainId, trainingId } = await params
  const domain = await getDomain(domainId)
  const training = domain?.trainings?.find((tr) => tr.id === trainingId)
  return { domain, training }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { training } = await load(params)
  return training ? { title: training.name ?? undefined, description: training.shortDescription ?? undefined } : {}
}

export default async function TrainingPage({ params }: Props) {
  const locale = await getLocale()
  const t = translations[locale]
  const { domain, training } = await load(params)
  if (!domain || !training) notFound()
  const dictionary = await getGlobal('dictionary')
  const image = mediaUrl(domain.image)
  const details = [
    { icon: Clock, label: t.trainings.durationLabel, value: training.duration || t.trainings.durationValue },
    { icon: Users, label: t.trainings.participants, value: training.participants || t.trainings.maxParticipants },
    { icon: Calendar, label: t.trainings.nextSessionLabel, value: training.nextSession || t.trainings.nextSessionValue },
    { icon: MapPin, label: t.trainings.locationLabel, value: training.format || t.trainings.locationValue },
  ]
  const points = training.learningPoints ?? []
  const others = (domain.trainings ?? []).filter((tr) => tr.id !== training.id).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={<Link href={`/domaine-de-formation/${domain.id}`} className="hover:text-white">{domain.name}</Link>}
        title={training.name || t.trainings.detailsTitle}
        description={training.shortDescription}
        image={image || '/hero2.jpg'}
        imagePosition={mediaPosition(domain.image)}
        size="sm"
      />
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-h2">{t.trainings.descriptionTitle}</h2>
              <div className="mt-6">
                {training.longDescription ? <RichText data={training.longDescription as never} /> : <p className="text-lead text-ink-500">{training.shortDescription}</p>}
              </div>
            </Reveal>
            {points.length > 0 && (
              <div className="mt-14">
                <Reveal><h2 className="text-h3">{t.ui.whatYouLearn}</h2></Reveal>
                <Stagger as="ul" className="mt-6 grid gap-3 sm:grid-cols-2">
                  {points.map((p) => (
                    <StaggerItem as="li" key={p.id} className="flex gap-3 rounded-2xl bg-ink-50 p-4 text-ink-700">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden />
                      {p.point}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1} className="rounded-[var(--radius-card)] border border-ink-200/80 bg-white p-7 shadow-[var(--shadow-soft)] lg:sticky lg:top-32">
              <p className="text-sm text-ink-500">{t.common.price}</p>
              <p className="font-display mt-1 text-3xl font-bold text-ink-900">{training.price || t.common.onDemand}</p>
              <ul className="my-7 space-y-4 border-y border-ink-100 py-7">
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
              <TrainingRegistration locale={locale} trainingName={training.name ?? ''} domainName={domain.name} trainingImage={image} buttonText={t.trainings.registerButton} dictionary={dictionary} />
              <ButtonLink href="/contact" variant="outline" size="lg" className="mt-3 w-full">{t.trainings.requestInfoButton}</ButtonLink>
            </Reveal>
          </aside>
        </div>
      </section>
      {others.length > 0 && (
        <section className="section-y bg-ink-50">
          <div className="container-page">
            <h2 className="text-h2 mb-10">{t.trainings.otherTrainingsTitle}</h2>
            <Stagger className="grid gap-6 md:grid-cols-3">
              {others.map((o) => (
                <StaggerItem key={o.id} as="article" className="group relative rounded-[var(--radius-card)] border border-ink-200/80 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <h3 className="text-h3">
                    <Link href={`/domaine-de-formation/${domain.id}/formations/${o.id}`} className="after:absolute after:inset-0">{o.name}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-ink-500">{o.shortDescription}</p>
                  <span className="mt-5 inline-block text-sm font-semibold text-primary-600">{t.trainings.viewDetails} →</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  )
}
