import TrainingsList from '@/components/training-list'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import Link from 'next/link'
import { GraduationCap, Search } from 'lucide-react'
import { TrainingsPage } from '@/payload-types'
import { getLocale, translations } from '@/lib/i18n'

export default async function FormationsPage() {
  const locale = await getLocale()
  const t = translations[locale]
  try {
    const payload = await getPayload({ config })
    const pageGlobal = (await payload.findGlobal({
      slug: 'trainingsPage',
      locale: locale as any,
    })) as TrainingsPage

    // Get all training domains to show the total number of trainings
    const trainingDomains = await payload.find({
      collection: 'trainingDomains',
      locale: locale as any,
    })

    // Calculate total number of trainings across all domains
    const totalTrainings = trainingDomains.docs.reduce((total, domain) => {
      return total + (domain.trainings?.length || 0)
    }, 0)

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <header>
          <div className="relative h-[32rem] md:h-[40rem]">
            <div className="absolute left-0 top-0 w-full h-full -z-10">
              <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-black/40 backdrop-blur-[2px] z-10"></div>
              <Image
                fill
                className="object-center object-cover"
                src={
                  pageGlobal?.heroImage &&
                    typeof pageGlobal?.heroImage !== 'number' &&
                    pageGlobal?.heroImage.url
                    ? pageGlobal?.heroImage.url
                    : '/hero.jpg'
                }
                alt="Young Leaders Formations"
                priority
                quality={90}
              />
            </div>
            <div className="container mx-auto h-full flex flex-col justify-center px-4 xl:px-32">
              <div className="max-w-3xl">
                <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                  <GraduationCap className="text-white mr-2" size={20} />
                  <span className="text-white font-semibold">{t.nav.trainings}</span>
                </div>
                <h1 className="font-extrabold text-white text-4xl md:text-6xl leading-tight mb-6">
                  {pageGlobal?.heroTitle || (locale === 'fr' ? 'Développez vos compétences en leadership' : 'Develop your leadership skills')}
                </h1>
                <p className="text-gray-100 text-lg md:text-xl mb-8 md:w-5/6">
                  {pageGlobal?.heroDescription ||
                    (locale === 'fr'
                      ? 'Découvrez notre catalogue de formations pour développer vos compétences et accélérer votre carrière.'
                      : 'Discover our training catalog to develop your skills and accelerate your career.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#formations-list"
                    className="bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-lg text-center"
                  >
                    {pageGlobal?.heroButtonText || (locale === 'fr' ? 'Voir les formations' : 'View trainings')}
                  </a>
                  <Link
                    href="/contact"
                    className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full text-center"
                  >
                    {t.common.contactUs}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section id="formations-list" className="container mx-auto px-4 xl:px-32 py-16 md:py-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-4">
                <GraduationCap className="text-[#0039F0] mr-2" size={20} />
                <span className="text-[#0039F0] font-semibold">{locale === 'fr' ? 'Catalogue de formations' : 'Training Catalog'}</span>
              </div>
              <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-4">
                {pageGlobal?.trainingsSectionTitle || (locale === 'fr' ? 'Nos domaines de formation' : 'Our training domains')}
              </h2>
              <p className="text-gray-600 md:max-w-2xl">
                {pageGlobal?.trainingsSectionDescription ||
                  pageGlobal?.heroDescription ||
                  (locale === 'fr'
                    ? `Explorez nos ${trainingDomains.docs.length} domaines de formation comprenant plus de ${totalTrainings} formations spécialisées pour tous les niveaux.`
                    : `Explore our ${trainingDomains.docs.length} training domains comprising more than ${totalTrainings} specialized trainings for all levels.`)}
              </p>
            </div>

            {/* Search box - This could be made functional in the future */}
            <div className="mt-6 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  className="bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0]"
                  placeholder={locale === 'fr' ? 'Rechercher une formation...' : 'Search for a training...'}
                />
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <TrainingsList locale={locale} />
          </div>

          {/* Contact CTA */}
          <div className="mt-20 bg-gray-100 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {locale === 'fr' ? 'Besoin d\'une formation sur mesure?' : 'Need a custom training?'}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {locale === 'fr'
                ? 'Notre équipe peut élaborer un programme personnalisé adapté aux besoins spécifiques de votre organisation.'
                : 'Our team can develop a customized program adapted to the specific needs of your organization.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full"
            >
              {t.common.contactUs}
            </Link>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error loading formations page:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Une erreur est survenue</h1>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons pas pu charger la page des formations. Veuillez réessayer plus tard.
        </p>
        <Link href="/" className="text-[#0039F0] hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    )
  }
}
