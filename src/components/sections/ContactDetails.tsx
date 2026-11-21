import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { SiteSetting } from '@/payload-types'
import { translations, type Locale } from '@/lib/translations'

export function ContactDetails({ info, locale }: { info?: SiteSetting['contactInfo']; locale: Locale }) {
  const t = translations[locale]
  const phone = info?.phone || t.common.officePhone
  const email = info?.email || t.common.officeEmail
  const address = info?.address || t.common.officeAddress
  const map = info?.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  const rows = [
    { icon: Phone, label: t.ui.callUs, value: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}` },
    { icon: Mail, label: t.ui.writeUs, value: email, href: `mailto:${email}` },
    { icon: MapPin, label: t.ui.visitUs, value: address, href: map, external: true, cta: t.ui.viewOnMap },
    {
      icon: Clock,
      label: t.contact.openingHours,
      value: info?.openingHours || `${t.common.mondayFriday} : 9h00 - 18h00\n${t.common.saturdaySunday} : ${t.common.closed}`,
    },
  ]
  return (
    <div className="relative isolate h-full overflow-hidden rounded-[var(--radius-card)] bg-ink-950 p-6 text-white md:p-10">
      <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-primary-600/50 blur-3xl" />
      <h3 className="text-h3 text-white">{t.ui.contactDetails}</h3>
      <ul className="mt-8 space-y-7">
        {rows.map(({ icon: Icon, label, value, href, external, cta }) => (
          <li key={label} className="flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-sun-400">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">{label}</p>
              {href && !cta ? (
                <a href={href} className="mt-1 block break-words text-white transition hover:text-primary-300">{value}</a>
              ) : (
                <p className="mt-1 whitespace-pre-line text-white">{value}</p>
              )}
              {cta && href && (
                <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="mt-2 inline-block text-sm font-semibold text-primary-300 underline-offset-4 hover:underline">
                  {cta} ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
