import { ArrowUpRight, Clock, Users } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fmt, getLocale, translations } from '@/lib/i18n'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { getDomain } from '@/lib/queries'

type Props = { params: Promise<{ domainId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const domain = await getDomain((await params).domainId)
  return domain ? { title: domain.name ?? undefined, description: domain.description ?? undefined } : {}
}

export default async function DomainPage({ params }: Props) {
  const { domainId } = await params
  const locale = await getLocale()
  const t = translations[locale]
  const domain = await getDomain(domainId)
  if (!domain) notFound()
  const trainings = domain.trainings ?? []

  return (
    <>
      <PageHero
        eyebrow={
          <Link href="/domaine-de-formation" className="hover:text-white">
            {t.nav.trainings} / {t.trainings.domainTitle}
          </Link>
        }
        title={domain.name || t.trainings.domainTitle}
        description={domain.description || fmt(t.ui.trainingCount, { count: trainings.length })}
        image={mediaUrl(domain.image, '/hero2.jpg')}
        imagePosition={mediaPosition(domain.image)}
        size="sm"
      />
      <section className="section-y">
        <div className="container-page">
          <SectionHeader title={t.trainings.ourTrainingsInDomain} description={fmt(t.ui.trainingCount, { count: trainings.length })} />
          {trainings.length ? (
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trainings.map((tr, i) => (
                <StaggerItem key={tr.id} as="article" className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[var(--shadow-lift)]">
                  <span className="font-display text-sm font-semibold text-primary-600">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-h3 mt-6">
                    <Link href={`/domaine-de-formation/${domain.id}/formations/${tr.id}`} className="after:absolute after:inset-0">
                      {tr.name}
                    </Link>
                  </h3>
                  {tr.shortDescription && <p className="mt-3 line-clamp-4 text-sm text-ink-500">{tr.shortDescription}</p>}
                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-ink-600">
                    {tr.duration && <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1"><Clock className="size-3.5" />{tr.duration}</span>}
                    {tr.participants && <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1"><Users className="size-3.5" />{tr.participants}</span>}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-5 mt-6">
                    <span className="text-sm font-semibold text-ink-900">{tr.price || t.common.onDemand}</span>
                    <span className="grid size-10 place-items-center rounded-full bg-primary-50 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <p className="py-12 text-center text-ink-500">{t.trainings.noTrainingsInDomain}</p>
          )}
          <div className="mt-14">
            <ButtonLink href="/domaine-de-formation" variant="outline">← {t.trainings.backToDomainList}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
