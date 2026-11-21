import Image from 'next/image'
import type { HomePage } from '@/payload-types'
import { CountUp } from '@/components/ui/CountUp'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { mediaUrl } from '@/lib/media'

export function StatsBand({ data }: { data?: HomePage['statsSection'] }) {
  const stats = data?.stats ?? []
  if (!stats.length) return null
  return (
    <section className="section-y relative isolate overflow-hidden bg-ink-950 text-white">
      <div aria-hidden className="bg-grid-light mask-radial absolute inset-0 -z-10" />
      <div aria-hidden className="absolute top-0 left-1/2 -z-10 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-primary-600/40 blur-3xl" />
      <div className="container-page">
        {data?.statsSectionTitle && (
          <SectionHeader align="center" tone="light" title={data.statsSectionTitle} description={data.statsSectionDescription} />
        )}
        <Stagger
          className={`grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/10 ${
            ['', '', 'sm:grid-cols-2', 'sm:grid-cols-3', 'sm:grid-cols-2 lg:grid-cols-4'][Math.min(stats.length, 4)]
          }`}
        >
          {stats.map((s, i) => {
            const icon = mediaUrl(s.icon)
            return (
              <StaggerItem key={s.id ?? i} className="bg-ink-950 p-8 text-center md:p-10">
                {icon && <Image src={icon} alt="" width={40} height={40} className="mx-auto mb-5 size-10 object-contain" />}
                <CountUp value={s.value} className="font-display block bg-gradient-to-b from-white to-primary-200 bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-6xl" />
                <p className="mt-3 text-sm text-white/60">{s.label}</p>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
