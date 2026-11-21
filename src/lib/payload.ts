import 'server-only'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { Config } from '@/payload-types'
import { getLocale } from './i18n'

export const getPayloadClient = cache(async () => getPayload({ config }))

type GlobalSlug = keyof Config['globals']

/** Fetches a global in the visitor's locale. Deduplicated per request. */
export const getGlobal = cache(async <T extends GlobalSlug>(slug: T, depth = 1) => {
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  return payload.findGlobal({ slug, locale, depth }) as Promise<Config['globals'][T]>
})

/** Draft previews are only enabled through /next/preview for logged-in editors. */
export const isDraftMode = async () => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}
