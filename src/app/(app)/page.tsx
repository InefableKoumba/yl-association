import Image from 'next/image'
import React from 'react'
import { CalendarDays, GraduationCap, UsersRound } from 'lucide-react'
import TrainingsList from '@/components/training-list'
import AboutUsSection from '@/components/about-us'
import { getPayload } from 'payload'
import config from '@payload-config'
import PartnersList from '@/components/partners-list'
import FAQ from '@/components/FAQ'
import MissionVision from '@/components/mission-vision'
import TeamSection from '@/components/team-section'
import Testimonials from '@/components/testimonials'
import UpcomingEvents from '@/components/upcoming-events'
import Link from 'next/link'

export default async function Page() {
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'homePage',
    })
    const heroImages = []
    if (pageGlobal?.heroSection?.heroImages && pageGlobal.heroSection.heroImages.length > 0) {
      for (const image of pageGlobal.heroSection.heroImages) {
        if (image.heroImage && typeof image.heroImage !== 'number' && image.heroImage.url) {
          heroImages.push(image.heroImage.url)
          break
        }
      }
    }

    // Get hero stats from CMS or use defaults
    const heroStats = pageGlobal?.heroSection?.heroStats || [
      {
        value: '425+',
        label: 'personnes formées',
        icon: 'users',
      },
      {
        value: '45+',
        label: 'formations disponibles',
        icon: 'graduation',
      },
      {
        value: '25+',
        label: 'événements organisés',
        icon: 'calendar',
      },
    ]

    // Function to render the appropriate icon based on the icon name
    const renderStatIcon = (iconName: string, size: number) => {
      switch (iconName) {
        case 'users':
          return <UsersRound color="#0039F0" strokeWidth={2} size={size} />
        case 'graduation':
          return <GraduationCap color="#0039F0" strokeWidth={2} size={size} />
        case 'calendar':
          return <CalendarDays color="#0039F0" strokeWidth={2} size={size} />
        default:
          return <UsersRound color="#0039F0" strokeWidth={2} size={size} />
      }
    }

    return (
      <div>
        <header>
          <div className="relative h-[40rem]">
            <div className="absolute left-0 top-0 w-full h-full -z-10">
              <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-black/40 backdrop-blur-[2px] z-10"></div>
              <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-[#0039F0]/10 mix-blend-overlay z-10"></div>
                <Image
                  fill
                  className="object-center object-cover scale-[1.02] animate-subtle-zoom"
                  src={heroImages[0] ?? '/hero2.jpg'}
                  alt="Young Leaders"
                  priority
                  quality={90}
                />
              </div>
            </div>
            <div className="flex flex-col xl:flex-row items-center justify-between h-full px-4 xl:px-32 py-12 relative z-10">
              <div className="flex xl:w-[55%]">
                <div className="flex flex-col gap-6">
                  <span className="text-[#0039F0] bg-white/90 py-1 px-4 rounded-full text-sm font-bold inline-block w-fit mx-auto xl:mx-0">
                    YOUNG LEADERS ASSOCIATION
                  </span>
                  <h1 className="font-extrabold text-white text-5xl md:text-6xl leading-[1.1] text-center xl:text-left">
                    {pageGlobal?.heroSection?.heroTitle || 'Formez les leaders de demain'}
                  </h1>
                  <p className="text-gray-100 text-lg w-[90%] md:w-[80%] mx-auto xl:mx-0 text-center xl:text-left mb-8">
                    {pageGlobal?.heroSection?.heroDescription ||
                      'Nous accompagnons les jeunes talents dans le développement de leurs compétences en leadership.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
                    <a
                      href="#trainings"
                      className="bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-lg text-center"
                    >
                      Découvrir nos formations
                    </a>
                    <a
                      href="#contact"
                      className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full text-center"
                    >
                      Nous contacter
                    </a>
                  </div>
                </div>
              </div>

              {/* Desktop stats (visible only on larger screens) */}
              <div className="hidden xl:flex xl:w-[40%] justify-end gap-6">
                <div className="flex flex-col gap-6">
                  {heroStats.slice(0, 2).map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 flex items-center"
                    >
                      <div className="bg-[#0039F0]/10 p-3 rounded-full mr-4">
                        {renderStatIcon(stat.icon, 32)}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                        <p className="text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {heroStats.length > 2 && (
                  <div className="flex flex-col gap-6 mt-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                      <div className="bg-[#0039F0]/10 p-3 rounded-full mr-4">
                        {renderStatIcon(heroStats[2].icon, 32)}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-800">{heroStats[2].value}</h3>
                        <p className="text-gray-600">{heroStats[2].label}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile stats (visible only on smaller screens) */}
              <div className="grid grid-cols-3 xl:hidden w-full mt-8 gap-2 md:gap-4 px-2">
                {heroStats.slice(0, 3).map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/90 p-2 md:p-4 rounded-lg shadow-md text-center flex flex-col items-center"
                  >
                    <div className="bg-[#0039F0]/10 p-2 rounded-full mb-1">
                      {renderStatIcon(stat.icon, 20)}
                    </div>
                    <p className="font-bold text-base md:text-lg">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label.split(' ')[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <MissionVision missionVisionSection={pageGlobal?.missionVisionSection} />

        <section
          className="px-4 md:px-8 xl:px-32 py-24 bg-gradient-to-b from-white to-gray-50"
          id="trainings"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
              <div className="md:max-w-2xl">
                <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6">
                  <span className="text-[#0039F0] font-semibold">Nos formations</span>
                </div>
                <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-4">
                  {pageGlobal?.trainingsSection?.ourTrainingsSectionTitle ||
                    'Développez vos compétences avec nos formations'}
                </h2>
                <p className="text-gray-600">
                  {pageGlobal?.trainingsSection?.ourTrainingsSectionDescription ||
                    'Explorez notre catalogue de formations conçues pour développer vos compétences en leadership et accélérer votre carrière.'}
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <a
                  href="/formations"
                  className="inline-flex items-center bg-white text-[#0039F0] border-2 border-[#0039F0] hover:bg-[#0039F0] hover:text-white transition-colors duration-300 font-semibold py-3 px-6 rounded-full"
                >
                  Voir toutes nos formations
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-8">
              <TrainingsList />
            </div>
          </div>
        </section>

        <UpcomingEvents />

        <AboutUsSection aboutUsData={pageGlobal?.aboutUsSection} />

        <TeamSection />

        <Testimonials />

        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="px-4 md:px-8 xl:px-32">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6">
                <span className="text-[#0039F0] font-semibold">Nos partenaires</span>
              </div>
              <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-4">
                {pageGlobal?.partnersSection?.ourPartnersSectionTitle || 'Ils nous font confiance'}
              </h2>
              <p className="text-gray-600 mx-auto">
                {pageGlobal?.partnersSection?.ourPartnersSectionDescription ||
                  'Nous collaborons avec des organisations de renom pour offrir les meilleures opportunités à nos participants.'}
              </p>
            </div>
            <PartnersList />
          </div>
        </section>
        <section className="py-24 bg-gradient-to-br from-white to-[#0039F0]/5">
          <div className="px-4 md:px-8 xl:px-32">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-6">
                {pageGlobal?.faqSection?.faqSectionTitle || 'Questions fréquentes'}
              </h2>
              <p className="text-gray-600">
                {pageGlobal?.faqSection?.faqSectionDescription ||
                  'Vous avez des questions ? Consultez notre FAQ pour trouver des réponses aux questions les plus courantes.'}
              </p>
            </div>
            <FAQ />
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                Vous ne trouvez pas de réponse à votre question ?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full"
              >
                Contactez-nous
              </a>
            </div>
          </div>
        </section>
        <div className="px-4 md:px-8 xl:px-32 py-24 bg-white" id="contact">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6">
                <span className="text-[#0039F0] font-semibold">Contactez-nous</span>
              </div>
              <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-6">
                {pageGlobal?.contactSection?.contactUsSectionTitle || 'Parlons de votre projet'}
              </h2>
              <p className="text-gray-600 md:w-2/3 mx-auto">
                {pageGlobal?.contactSection?.contactUsSectionDescription ||
                  'Envoyez-nous un message et nous vous répondrons dans les plus brefs délais. Notre équipe est à votre disposition pour répondre à toutes vos questions.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3 bg-gray-50 rounded-2xl shadow-sm p-8 md:p-10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nom complet
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full bg-white p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full bg-white p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sujet
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="w-full bg-white p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full bg-white p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                      placeholder="Votre message"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        className="w-4 h-4 text-[#0039F0] border-gray-300 rounded focus:ring-[#0039F0]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="text-gray-600">
                        J&apos;accepte que mes données soient traitées conformément à la{' '}
                        <a href="/privacy" className="text-[#0039F0] hover:underline">
                          politique de confidentialité
                        </a>
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-medium py-4 px-6 rounded-lg shadow-sm hover:shadow-md"
                    >
                      {pageGlobal?.contactSection?.contactUsSectionButtonText ||
                        'Envoyer le message'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-2">
                {pageGlobal?.contactSection?.contactUsSectionImage &&
                typeof pageGlobal.contactSection.contactUsSectionImage !== 'number' &&
                pageGlobal?.contactSection.contactUsSectionImage?.url ? (
                  <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg mb-8">
                    <Image
                      className="object-cover"
                      alt="Young Leaders"
                      src={pageGlobal.contactSection.contactUsSectionImage.url}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                ) : (
                  <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg mb-8 bg-gray-200"></div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Téléphone</h3>
                    <p className="text-gray-600">+33 (0)1 23 45 67 89</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Email</h3>
                    <p className="text-gray-600">contact@yl-association.org</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Adresse</h3>
                    <p className="text-gray-600">10 Rue de la Liberté, 75001 Paris, France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <p className="text-gray-600">
          Une erreur est survenue lors du chargement de la page. Veuillez réessayer plus tard.
        </p>
        <Link href="/" className="bg-[#0039F0] mt-4 text-white px-4 py-2 rounded-lg">
          Réessayer
        </Link>
      </div>
    )
  }
}
