import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getLocale } from '@/lib/i18n'
import { Locale, translations } from '@/lib/translations'

export default async function BlogPage() {
  const locale = await getLocale() as Locale
  const t = translations[locale]
  
  try {
    const payload = await getPayload({ config })
    const { docs: posts } = await payload.find({
      collection: 'blog',
      locale: locale as any,
      sort: '-publishedDate',
    })

    return (
      <div className="min-h-screen bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 xl:px-32">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              {locale === 'fr' ? 'Notre Blog' : 'Our Blog'}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {locale === 'fr' 
                ? 'Découvrez nos derniers articles, actualités et conseils sur le leadership et le développement personnel.' 
                : 'Discover our latest articles, news and tips on leadership and personal development.'}
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-500">
                {locale === 'fr' ? 'Aucun article pour le moment.' : 'No articles at the moment.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
                >
                  <Link href={`/blog/${post.slug}`} className="relative h-64 overflow-hidden">
                    <Image
                      src={post.featuredImage?.url || '/hero.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.publishedDate).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#0039F0] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[#0039F0] font-semibold hover:gap-2 transition-all"
                      >
                        {locale === 'fr' ? 'Lire la suite' : 'Read more'} <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.common.errorTitle}</h1>
        <p className="text-gray-600 mb-8">{t.common.tryAgainLater}</p>
        <Link href="/" className="bg-[#0039F0] text-white px-8 py-3 rounded-full font-semibold">
          {t.common.backToHome}
        </Link>
      </div>
    )
  }
}
