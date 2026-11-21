import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { COOKIE_NAME } from '@/lib/translations'

/**
 * Used by the admin live preview: enables draft mode for logged-in users,
 * switches to the edited locale and redirects to `path`.
 */
export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path') || '/'
  const locale = req.nextUrl.searchParams.get('locale')
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid path', { status: 400 })
  }

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return new Response('Unauthorized', { status: 401 })

  ;(await draftMode()).enable()
  if (locale === 'fr' || locale === 'en') {
    ;(await cookies()).set(COOKIE_NAME, locale, { path: '/', maxAge: 31536000, sameSite: 'lax' })
  }
  redirect(path)
}
