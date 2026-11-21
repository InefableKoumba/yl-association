import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogCard, readingTime } from '@/components/sections/BlogCard'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { ButtonLink } from '@/components/ui/Button'
import { HeroTitle } from '@/components/ui/HeroTitle'
import { ReadingProgress } from '@/components/ui/ReadingProgress'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { getLocale, translations } from '@/lib/i18n'
import { mediaAlt, mediaPosition, mediaUrl } from '@/lib/media'
import { getBlogPosts, getPostBySlug } from '@/lib/queries'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug)
  if (!post) return {}
  const og = mediaUrl(post.featuredImage)
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: { type: 'article', publishedTime: post.publishedDate, images: og ? [{ url: og }] : undefined },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const locale = await getLocale()
  const t = translations[locale]
  const post = await getPostBySlug((await params).slug)
  if (!post) notFound()
  const more = (await getBlogPosts(4)).filter((p) => p.id !== post.id).slice(0, 3)
  const image = mediaUrl(post.featuredImage)

  return (
    <article>
      <ReadingProgress />
      <header className="relative bg-ink-50 pt-40 pb-12 md:pt-48">
        <div className="container-page max-w-4xl">
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> {t.ui.backToBlog}
          </Link>
          <HeroTitle text={post.title} className="text-h1 mt-6" />
          <Reveal delay={0.25} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
            {post.author && <span className="font-semibold text-ink-900">{t.ui.by} {post.author}</span>}
            <span aria-hidden>•</span>
            <time dateTime={post.publishedDate}>{formatDate(post.publishedDate, locale)}</time>
            <span aria-hidden>•</span>
            <span>{readingTime(post)} {t.ui.minRead}</span>
          </Reveal>
        </div>
      </header>
      {image && (
        <Reveal className="container-page -mb-4">
          <div className="relative mx-auto aspect-[16/8] max-w-6xl overflow-hidden rounded-[2rem]">
            <Image src={image} alt={mediaAlt(post.featuredImage, post.title)} fill priority sizes="(max-width: 1280px) 100vw, 1200px" className="object-cover" style={{ objectPosition: mediaPosition(post.featuredImage) }} />
          </div>
        </Reveal>
      )}
      <div className="container-page max-w-3xl py-16 md:py-24">
        {post.excerpt && <p className="text-lead mb-10 border-l-4 border-primary-600 pl-6 font-medium text-ink-800">{post.excerpt}</p>}
        <RichText data={post.content as never} />
      </div>

      {more.length > 0 && (
        <section className="section-y bg-ink-50">
          <div className="container-page">
            <h2 className="text-h2 mb-10">{t.ui.latestNews}</h2>
            <Stagger className="grid gap-6 md:grid-cols-3">
              {more.map((p) => <StaggerItem key={p.id}><BlogCard post={p} locale={locale} /></StaggerItem>)}
            </Stagger>
          </div>
        </section>
      )}
      <div className="pt-24">
        <CtaBanner title={t.ui.interestedTitle} description={t.ui.interestedDescription}>
          <ButtonLink href="/programmes" variant="white" size="lg" arrow>{t.nav.programs}</ButtonLink>
        </CtaBanner>
      </div>
    </article>
  )
}
