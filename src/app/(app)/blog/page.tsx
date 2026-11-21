import type { Metadata } from 'next'
import { BlogCard } from '@/components/sections/BlogCard'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { getLocale, translations } from '@/lib/i18n'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'
import { getBlogPosts } from '@/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const page = await getGlobal('blogPage').catch(() => null)
  return { title: page?.heroTitle || translations[locale].ui.blogTitle, description: page?.heroDescription || translations[locale].ui.blogDescription }
}

export default async function BlogPage() {
  const locale = await getLocale()
  const t = translations[locale]
  const [page, posts] = await Promise.all([getGlobal('blogPage'), getBlogPosts()])
  const [first, ...rest] = posts

  return (
    <>
      <PageHero
        eyebrow={t.ui.blog}
        title={page.heroTitle || t.ui.blogTitle}
        description={page.heroDescription || t.ui.blogDescription}
        image={mediaUrl(page.heroImage)}
        imagePosition={mediaPosition(page.heroImage)}
        size="sm"
      />
      <section className="section-y">
        <div className="container-page">
          {!first ? (
            <p className="rounded-[var(--radius-card)] border border-dashed border-ink-300 py-20 text-center text-ink-500">{t.ui.noArticles}</p>
          ) : (
            <>
              <Reveal>
                <BlogCard post={first} locale={locale} featured />
              </Reveal>
              {rest.length > 0 && (
                <Stagger className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <StaggerItem key={p.id}><BlogCard post={p} locale={locale} /></StaggerItem>
                  ))}
                </Stagger>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
