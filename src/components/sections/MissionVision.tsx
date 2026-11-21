import type { HomePage } from '@/payload-types'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { translations, type Locale } from '@/lib/translations'

export function MissionVision({ data, locale }: { data?: HomePage['missionVisionSection']; locale: Locale }) {
  const t = translations[locale]
  const values = data?.values ?? []
  const blocks = [
    { label: data?.missionTitle || t.about.ourMission, heading: data?.missionHeading, body: [data?.missionDescription, data?.missionDescription2] },
    { label: data?.visionTitle || 'Vision', heading: data?.visionHeading, body: [data?.visionDescription] },
  ]

  return (
    <section className="section-y relative isolate overflow-hidden">
      <div aria-hidden className="bg-dots mask-radial absolute -top-20 right-0 -z-10 size-[40rem] opacity-60" />
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {blocks.map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Eyebrow>{b.label}</Eyebrow>
              {b.heading && <h2 className="text-h2 mt-5">{b.heading}</h2>}
              {b.body.filter(Boolean).map((p, j) => (
                <p key={j} className="mt-5 text-ink-500">
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </div>

        {values.length > 0 && (
          <div className="mt-20 md:mt-28">
            <Reveal>
              <h3 className="text-h3 mb-8 text-ink-900">{data?.valuesTitle || t.ui.ourValues}</h3>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <StaggerItem
                  key={v.id ?? i}
                  className="group relative overflow-hidden rounded-[var(--radius-card)] border border-ink-200/80 bg-white p-7 transition-colors duration-500 hover:border-primary-600 hover:bg-primary-600"
                >
                  <span className="font-display text-sm font-semibold text-primary-600 transition-colors group-hover:text-white/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-h3 mt-10 transition-colors group-hover:text-white">{v.title}</h4>
                  <p className="mt-3 text-sm text-ink-500 transition-colors group-hover:text-white/80">{v.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </div>
    </section>
  )
}
