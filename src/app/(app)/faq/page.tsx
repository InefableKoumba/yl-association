import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircleQuestion, Search, ArrowRight } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import FaqItem from '@/components/FaqItem'
import { Faq } from '@/payload-types'
import { getLocale } from '@/lib/i18n'
import { Locale, translations } from '@/lib/translations'

export default async function FaqPage() {
  const locale = await getLocale() as Locale
  const t = translations[locale]
  try {
    const payload = await getPayload({ config })

    // Fetch the page global settings
    const pageGlobal = await payload.findGlobal({
      slug: 'faqPage',
      locale: locale as any,
    })

    // Fetch all FAQ items
    const { docs: faqItems } = await payload.find({
      collection: 'faq',
      locale: locale as any,
    })

    // Group FAQs by first letter for table of contents
    const groupedFaqs: Record<string, Faq[]> = faqItems.reduce(
      (acc: Record<string, Faq[]>, faq: Faq) => {
        const firstLetter = faq.question.charAt(0).toUpperCase()
        if (!acc[firstLetter]) {
          acc[firstLetter] = []
        }
        acc[firstLetter].push(faq)
        return acc
      },
      {},
    )

    const alphabeticalLetters = Object.keys(groupedFaqs).sort()

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-[#0039F0] py-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <Image
              fill
              className="object-cover"
              src={
                pageGlobal?.heroImage &&
                  typeof pageGlobal?.heroImage !== 'number' &&
                  pageGlobal?.heroImage.url
                  ? pageGlobal?.heroImage.url
                  : '/hero.jpg'
              }
              alt="FAQ Hero"
              priority
            />
          </div>
          <div className="container mx-auto px-4 md:px-8 xl:px-32 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <MessageCircleQuestion className="text-white mr-2" size={18} />
                <span className="text-white font-semibold">{t.common.frequentlyAskedQuestions}</span>
              </div>
              <h1 className="font-extrabold text-white text-4xl md:text-6xl leading-tight mb-6">
                {pageGlobal?.heroTitle || t.faq.heroTitle}
              </h1>
              <p className="text-gray-100 text-lg md:text-xl mb-8 md:w-5/6">
                {pageGlobal?.heroDescription || t.faq.heroDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Search & FAQ Section */}
        <div className="container mx-auto px-4 md:px-8 xl:px-32 py-12 md:py-24">
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-16">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="search"
                  placeholder={t.faq.searchPlaceholder}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors bg-white shadow-sm"
                />
              </div>
              <p className="text-gray-500 text-sm mt-3 text-center">
                {t.faq.notFindingAnswer}{' '}
                <Link href="/contact" className="text-[#0039F0] hover:underline">
                  {t.common.contactUs}
                </Link>
              </p>
            </div>

            {/* FAQ Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {pageGlobal?.faqSectionTitle || t.faq.faqSectionTitle}
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageGlobal?.faqSectionDescription || t.faq.faqSectionDescription}
              </p>
            </div>

            {/* Alphabetical Navigation */}
            {alphabeticalLetters.length > 5 && (
              <div className="mb-12">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {locale === 'fr' ? 'Navigation par ordre alphabétique' : 'Alphabetical Navigation'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {alphabeticalLetters.map((letter) => (
                      <a
                        key={letter}
                        href={`#section-${letter}`}
                        className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 hover:bg-[#0039F0] text-gray-800 hover:text-white transition-colors font-medium text-sm"
                      >
                        {letter}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Items */}
            <div className="space-y-16">
              {alphabeticalLetters.map((letter) => (
                <div key={letter} id={`section-${letter}`} className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                      <span className="text-[#0039F0] font-bold text-xl">{letter}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {t.faq.questionsStartingWith.replace('{letter}', letter)}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {groupedFaqs[letter].map((faq: Faq) => (
                      <FaqItem key={faq.id} faq={faq} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-20 bg-white rounded-xl p-8 md:p-12 text-center shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {t.contact.stillHaveQuestions}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                {t.contact.faqDescription}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full"
              >
                {t.common.contactUs} <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading FAQ page:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.common.errorTitle}</h1>
        <p className="text-gray-600 mb-6">
          {t.faq.errorLoadingFaq} {t.common.tryAgainLater}
        </p>
        <Link href="/" className="text-[#0039F0] hover:underline">
          {t.common.backToHome}
        </Link>
      </div>
    )
  }
}
