import Image from 'next/image'
import type { Partner } from '@/payload-types'
import { Marquee } from '@/components/ui/Marquee'
import { mediaUrl } from '@/lib/media'

export function PartnerLogo({ partner }: { partner: Partner }) {
  const logo = mediaUrl(partner.logo)
  const inner = logo ? (
    <Image src={logo} alt={partner.name} width={160} height={64} className="h-12 w-auto max-w-[9rem] object-contain grayscale transition duration-500 group-hover/logo:grayscale-0" />
  ) : (
    <span className="font-display text-lg font-semibold text-ink-700">{partner.name}</span>
  )
  const cls = 'group/logo flex h-24 min-w-[11rem] items-center justify-center rounded-2xl border border-ink-200/80 bg-white px-8 transition hover:border-primary-200 hover:shadow-[var(--shadow-soft)]'
  return partner.websiteUrl ? (
    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className={cls} title={partner.name}>
      {inner}
    </a>
  ) : (
    <div className={cls} title={partner.name}>
      {inner}
    </div>
  )
}

export function PartnersStrip({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null
  if (partners.length < 5) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {partners.map((p) => (
          <PartnerLogo key={p.id} partner={p} />
        ))}
      </div>
    )
  }
  return (
    <Marquee duration={Math.max(25, partners.length * 5)}>
      {partners.map((p) => (
        <PartnerLogo key={p.id} partner={p} />
      ))}
    </Marquee>
  )
}
