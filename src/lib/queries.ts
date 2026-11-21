import 'server-only'
import { cache } from 'react'
import type { Where } from 'payload'
import { getLocale } from './i18n'
import { getPayloadClient, isDraftMode } from './payload'

export const getTrainingDomains = cache(async (ids?: number[]) => {
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  const where: Where | undefined = ids && ids.length ? { id: { in: ids } } : undefined
  const res = await payload.find({
    collection: 'trainingDomains',
    locale,
    where,
    sort: ['order', 'createdAt'],
    limit: 100,
    depth: 1,
  })
  return res.docs
})

export const getPrograms = cache(async (status?: 'upcoming' | 'past', limit = 100) => {
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  const res = await payload.find({
    collection: 'programs',
    locale,
    where: status ? { status: { equals: status } } : undefined,
    sort: status === 'upcoming' ? 'date' : '-date',
    limit,
    depth: 1,
  })
  return res.docs
})

export const getBlogPosts = cache(async (limit = 100) => {
  const [payload, locale, draft] = await Promise.all([getPayloadClient(), getLocale(), isDraftMode()])
  const res = await payload.find({
    collection: 'blog',
    locale,
    sort: '-publishedDate',
    limit,
    depth: 1,
    draft,
    where: draft ? undefined : { _status: { equals: 'published' } },
  })
  return res.docs
})

export const getFaqs = cache(async (ids?: number[], limit = 200) => {
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  const res = await payload.find({
    collection: 'faq',
    locale,
    where: ids && ids.length ? { id: { in: ids } } : undefined,
    sort: ['order', 'createdAt'],
    limit,
    depth: 0,
  })
  return res.docs
})

export const getPartners = cache(async (ids?: number[]) => {
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  const res = await payload.find({
    collection: 'partners',
    locale,
    where: ids && ids.length ? { id: { in: ids } } : undefined,
    sort: ['order', 'createdAt'],
    limit: 100,
    depth: 1,
  })
  return res.docs
})

export const getTeam = cache(async () => {
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  const res = await payload.find({
    collection: 'team',
    locale,
    sort: ['order', 'createdAt'],
    limit: 100,
    depth: 1,
  })
  return res.docs
})

/** Relationship values may be IDs or populated docs; returns the IDs. */
export function relationIds(value?: Array<number | { id: number }> | null): number[] {
  return (value ?? []).map((v) => (typeof v === 'number' ? v : v.id)).filter(Boolean)
}

export const getDomain = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) return null
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  return payload.findByID({ collection: 'trainingDomains', id, locale, depth: 1, disableErrors: true })
})

export const getProgram = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) return null
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  return payload.findByID({ collection: 'programs', id, locale, depth: 1, disableErrors: true })
})

export const getPostBySlug = cache(async (slug: string) => {
  const [payload, locale, draft] = await Promise.all([getPayloadClient(), getLocale(), isDraftMode()])
  const res = await payload.find({
    collection: 'blog',
    locale,
    draft,
    limit: 1,
    depth: 1,
    where: draft ? { slug: { equals: slug } } : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
  })
  return res.docs[0] ?? null
})

export const getPageBySlug = cache(async (slug: string) => {
  const [payload, locale] = await Promise.all([getPayloadClient(), getLocale()])
  const res = await payload.find({ collection: 'pages', locale, limit: 1, depth: 1, where: { slug: { equals: slug } } })
  return res.docs[0] ?? null
})
