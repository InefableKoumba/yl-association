import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import { AboutPage } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getLocale, translations } from '@/lib/i18n'
import Link from 'next/link'
import { Users, Info, Target } from 'lucide-react'

export default async function AboutUsPage() {
  const locale = await getLocale()
  const t = translations[locale]
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'aboutPage',
      locale: locale as any,
    })

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
                    : '/hero2.jpg'
                }
                alt="Young Leaders - À Propos"
                priority
                quality={90}
              />
            </div>
            <div className="container mx-auto h-full flex flex-col justify-center px-4 xl:px-32">
              <div className="max-w-3xl">
                <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                  <Info className="text-white mr-2" size={20} />
                  <span className="text-white font-semibold">{t.about.ourHistory}</span>
                </div>
                <h1 className="font-extrabold text-white text-4xl md:text-6xl leading-tight mb-6">
                  {pageGlobal?.heroTitle || (locale === 'fr' ? 'Découvrez Young Leaders' : 'Discover Young Leaders')}
                </h1>
                <p className="text-gray-100 text-lg md:text-xl mb-8 md:w-5/6">
                  {pageGlobal?.heroDescription ||
                    (locale === 'fr'
                      ? 'Nous sommes une association dédiée à former et accompagner la prochaine génération de leaders.'
                      : 'We are an association dedicated to training and supporting the next generation of leaders.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#about-content"
                    className="bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-lg text-center"
                  >
                    {pageGlobal?.heroButtonText || t.common.learnMore}
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

        {/* About Content Section */}
        <section id="about-content" className="container mx-auto px-4 xl:px-32 py-16 md:py-24">
          <div className="mb-16">
            <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6">
              <Target className="text-[#0039F0] mr-2" size={20} />
              <span className="text-[#0039F0] font-semibold">{t.about.ourMission}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-8">
              {pageGlobal?.aboutUsSectionTitle || (locale === 'fr' ? 'À propos de Young Leaders' : 'About Young Leaders')}
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              {pageGlobal?.aboutUsSectionDescription ? (
                <RichText data={pageGlobal.aboutUsSectionDescription} />
              ) : (
                <p>
                  Young Leaders est une association dédiée au développement de compétences en
                  leadership chez les jeunes talents. Nous croyons fermement que chaque jeune a le
                  potentiel de devenir un leader dans son domaine, et notre mission est de fournir
                  les ressources, la formation et le soutien nécessaires pour réaliser ce potentiel.
                </p>
              )}
            </div>
          </div>

          {/* Gallery Section (if available) */}
          {pageGlobal?.aboutUsGallerySectionImages &&
            pageGlobal.aboutUsGallerySectionImages.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  {pageGlobal.aboutUsGallerySectionTitle || (locale === 'fr' ? 'Notre galerie photos' : 'Our photo gallery')}
                </h3>

                {pageGlobal.aboutUsGallerySectionDescription && (
                  <p className="text-gray-600 mb-8 max-w-3xl">
                    {pageGlobal.aboutUsGallerySectionDescription}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pageGlobal.aboutUsGallerySectionImages.map(
                    (item, index) =>
                      item.image &&
                      typeof item.image !== 'number' &&
                      item.image.url && (
                        <div
                          key={index}
                          className="relative h-64 rounded-lg overflow-hidden shadow-md"
                        >
                          <Image
                            src={item.image.url}
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-500"
                          />
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

          {/* CTA Section */}
          <div className="mt-20 bg-gray-100 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t.about.joinOurMission}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {t.about.contactUsDescription}
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
    console.error('Error loading about page:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Une erreur est survenue</h1>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons pas pu charger la page À propos. Veuillez réessayer plus tard.
        </p>
        <Link href="/" className="text-[#0039F0] hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    )
  }
}
