import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getLocale } from '@/lib/i18n'
import { Locale, translations } from '@/lib/translations'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({ params }: any) {
  const { slug } = await params
  const locale = await getLocale() as Locale
  const t = translations[locale]
  
  try {
    const payload = await getPayload({ config })
    const { docs: posts } = await payload.find({
      collection: 'blog',
      locale: locale as any,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (posts.length === 0) {
      notFound()
    }

    const post: any = posts[0]

    return (
      <article className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div className="relative h-[40vh] md:h-[60vh] w-full">
          <Image
            src={post.featuredImage?.url || '/hero.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <Link 
                href="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" />
                <span>{locale === 'fr' ? 'Retour au blog' : 'Back to blog'}</span>
              </Link>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl mx-auto leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 xl:px-32 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-12 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#0039F0]" />
                <span>{new Date(post.publishedDate).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} className="text-[#0039F0]" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Rich Text Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-[#0039F0] prose-img:rounded-2xl">
              <RichText data={post.content} />
            </div>

            {/* Post Navigation / CTA */}
            <div className="mt-20 p-8 md:p-12 bg-gray-50 rounded-3xl text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {locale === 'fr' ? 'Intéressé par nos programmes ?' : 'Interested in our programs?'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {locale === 'fr' 
                  ? 'Découvrez comment nous pouvons vous aider à développer votre leadership et vos compétences.' 
                  : 'Discover how we can help you develop your leadership and skills.'}
              </p>
              <Link 
                href="/programmes"
                className="bg-[#0039F0] hover:bg-[#0030cc] text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-[#0039F0]/20"
              >
                {t.nav.programs}
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.common.errorTitle}</h1>
        <p className="text-gray-600 mb-8">{t.common.tryAgainLater}</p>
        <Link href="/blog" className="bg-[#0039F0] text-white px-8 py-3 rounded-full font-semibold">
          {locale === 'fr' ? 'Retour au blog' : 'Back to blog'}
        </Link>
      </div>
    )
  }
}
