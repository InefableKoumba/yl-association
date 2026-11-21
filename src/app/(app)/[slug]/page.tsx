import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { fmt, getLocale, translations } from '@/lib/i18n'
import { getPageBySlug } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug((await params).slug)
  return page ? { title: page.title, description: page.intro ?? undefined } : {}
}

export default async function ContentPage({ params }: Props) {
  const locale = await getLocale()
  const page = await getPageBySlug((await params).slug)
  if (!page) notFound()
  return (
    <>
      <PageHero title={page.title} description={page.intro} size="sm" />
      <Reveal className="container-page max-w-3xl py-16 md:py-24">
        <p className="mb-10 text-sm text-ink-400">{fmt(translations[locale].ui.lastUpdated, { date: formatDate(page.updatedAt, locale) })}</p>
        <RichText data={page.content as never} />
      </Reveal>
    </>
  )
}
