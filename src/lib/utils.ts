export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** True for absolute http(s) links, mailto:, tel: — used to open in a new tab. */
export function isExternal(href?: string | null) {
  return Boolean(href && /^(https?:)?\/\//.test(href))
}

/** Normalises links typed in the CMS and maps legacy paths to existing routes. */
export function safeHref(href?: string | null, fallback = '/') {
  if (!href || href === '#') return fallback
  const legacy: Record<string, string> = {
    '/about': '/a-propos',
    '/formations': '/domaine-de-formation',
    '/trainings': '/domaine-de-formation',
    '/programs': '/programmes',
    '/donate': '/faire-un-don',
  }
  return legacy[href] ?? href
}

export function formatDate(value: string | null | undefined, locale: 'fr' | 'en', opts?: Intl.DateTimeFormatOptions) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...opts,
  })
}
