import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Blog } from '@/payload-types'
import { lexicalToText } from '@/components/ui/RichText'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { translations, type Locale } from '@/lib/translations'
import { cn, formatDate } from '@/lib/utils'

export function readingTime(post: Blog) {
  const words = lexicalToText(post.content as never).split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export function BlogCard({ post, locale, featured = false }: { post: Blog; locale: Locale; featured?: boolean }) {
  const t = translations[locale]
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]',
        featured && 'md:flex-row',
      )}
    >
      <div className={cn('relative overflow-hidden bg-ink-100', featured ? 'aspect-[16/10] md:aspect-auto md:w-3/5' : 'aspect-[16/10]')}>
        <Image
          src={mediaUrl(post.featuredImage, '/hero.jpg')!}
          alt=""
          fill
          sizes={featured ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          style={{ objectPosition: mediaPosition(post.featuredImage) }}
        />
      </div>
      <div className={cn('flex flex-1 flex-col p-6 md:p-7', featured && 'md:justify-center md:p-10')}>
        <p className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-ink-400 uppercase">
          <time dateTime={post.publishedDate}>{formatDate(post.publishedDate, locale)}</time>
          <span aria-hidden>•</span>
          <span>
            {readingTime(post)} {t.ui.minRead}
          </span>
        </p>
        <h3 className={cn('mt-3', featured ? 'text-h2' : 'text-h3')}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && <p className={cn('mt-3 text-ink-500', featured ? 'text-lead line-clamp-4' : 'line-clamp-3 text-sm')}>{post.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary-600">
          {t.ui.readArticle}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </article>
  )
}
