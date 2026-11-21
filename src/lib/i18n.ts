import 'server-only'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { COOKIE_NAME, type Locale } from './translations'

export const getLocale = cache(async (): Promise<Locale> => {
  const cookieStore = await cookies()
  const locale = cookieStore.get(COOKIE_NAME)?.value
  return locale === 'en' ? 'en' : 'fr'
})

export * from './translations'
