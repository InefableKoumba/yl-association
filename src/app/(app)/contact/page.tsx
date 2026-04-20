import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getLocale, translations } from '@/lib/i18n'
import ContactForm from '@/components/ContactForm'
import { Locale } from '@/lib/translations'

export default async function ContactPage() {
  const locale = await getLocale()
  const t = translations[locale]
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'contactPage',
      locale: locale as any,
    })

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
              alt="Contact Hero"
              priority
            />
          </div>
          <div className="container mx-auto px-4 md:px-8 xl:px-32 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <Mail className="text-white mr-2" size={18} />
                <span className="text-white font-semibold">{t.common.contactUs}</span>
              </div>
              <h1 className="font-extrabold text-white text-4xl md:text-6xl leading-tight mb-6">
                {pageGlobal?.heroTitle || (locale === 'fr' ? 'Discutons de votre projet' : 'Let\'s talk about your project')}
              </h1>
              <p className="text-gray-100 text-lg md:text-xl mb-8 md:w-5/6">
                {pageGlobal?.heroDescription ||
                  (locale === 'fr'
                    ? 'Notre équipe est à votre disposition pour répondre à toutes vos questions. Contactez-nous dès aujourd\'hui.'
                    : 'Our team is at your disposal to answer all your questions. Contact us today.')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-8 xl:px-32 py-12 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
              {/* Contact Form - Reusing form from home page */}
              <div className="lg:col-span-3">
                <ContactForm locale={locale as Locale} />
              </div>

              {/* Contact Information */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 h-full">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.contact.contactInfo}</h2>

                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                        <Phone className="text-[#0039F0]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{t.common.phone}</h3>
                        <p className="text-gray-600">{t.common.officePhone}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                        <Mail className="text-[#0039F0]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{t.common.email}</h3>
                        <p className="text-gray-600">{t.common.officeEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                        <MapPin className="text-[#0039F0]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{t.contact.address}</h3>
                        <p className="text-gray-600">{t.common.officeAddress}</p>
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#0039F0] hover:underline mt-2 text-sm"
                        >
                          {t.contact.viewOnMap} <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                        <Clock className="text-[#0039F0]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {t.contact.openingHours}
                        </h3>
                        <p className="text-gray-600">{t.common.mondayFriday}: 9h00 - 18h00</p>
                        <p className="text-gray-600">{t.common.saturdaySunday}: {t.common.closed}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-2xl shadow-sm p-6 overflow-hidden mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.common.findUs}</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-200">
               
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">{t.common.interactiveMap}</p>
                </div>
              </div>
            </div> */}

            {/* FAQ Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t.contact.stillHaveQuestions}
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t.contact.faqDescription}
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full"
              >
                {t.contact.viewFaq}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading contact page:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.common.errorTitle}</h1>
        <p className="text-gray-600 mb-6">
          {t.contact.errorDescription}
        </p>
        <Link href="/" className="text-[#0039F0] hover:underline">
          {t.common.backToHome}
        </Link>
      </div>
    )
  }
}
