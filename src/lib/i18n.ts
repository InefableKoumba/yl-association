import { cookies } from 'next/headers'
import { COOKIE_NAME, Locale } from './translations'

export async function getLocale(): Promise<Locale> {
    const cookieStore = await cookies()
    const locale = cookieStore.get(COOKIE_NAME)?.value as Locale
    return locale === 'en' ? 'en' : 'fr'
}

export * from './translations'
