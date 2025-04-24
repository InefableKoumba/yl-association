import Image from 'next/image'
import React from 'react'
import { CalendarDays, GraduationCap, Link, UsersRound } from 'lucide-react'
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

export default async function Page() {
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'pages',
    })
    const heroImages = []
    if (pageGlobal.home?.heroImages && pageGlobal.home.heroImages.length > 0) {
      for (const image of pageGlobal.home.heroImages) {
        if (image.heroImage && typeof image.heroImage !== 'number' && image.heroImage.url) {
          heroImages.push(image.heroImage.url)
          break
        }
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
                    {pageGlobal.home?.heroTitle || 'Formez les leaders de demain'}
                  </h1>
                  <p className="text-gray-100 text-lg w-[90%] md:w-[80%] mx-auto xl:mx-0 text-center xl:text-left mb-8">
                    {pageGlobal.home?.heroDescription ||
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
              <div className="hidden xl:flex xl:w-[40%] justify-end gap-6">
                <div className="flex flex-col gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                    <div className="bg-[#0039F0]/10 p-3 rounded-full mr-4">
                      <UsersRound color="#0039F0" strokeWidth={2} size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800">425+</h3>
                      <p className="text-gray-600">personnes formées</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                    <div className="bg-[#0039F0]/10 p-3 rounded-full mr-4">
                      <GraduationCap color="#0039F0" strokeWidth={2} size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800">45+</h3>
                      <p className="text-gray-600">formations disponibles</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                    <div className="bg-[#0039F0]/10 p-3 rounded-full mr-4">
                      <CalendarDays color="#0039F0" strokeWidth={2} size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800">25+</h3>
                      <p className="text-gray-600">événements organisés</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile stats (visible only on smaller screens) */}
              <div className="grid grid-cols-3 xl:hidden w-full mt-8 gap-2 md:gap-4 px-2">
                <div className="bg-white/90 p-2 md:p-4 rounded-lg shadow-md text-center flex flex-col items-center">
                  <div className="bg-[#0039F0]/10 p-2 rounded-full mb-1">
                    <UsersRound color="#0039F0" strokeWidth={2} size={20} />
                  </div>
                  <p className="font-bold text-base md:text-lg">425+</p>
                  <p className="text-xs text-gray-600">personnes formées</p>
                </div>
                <div className="bg-white/90 p-2 md:p-4 rounded-lg shadow-md text-center flex flex-col items-center">
                  <div className="bg-[#0039F0]/10 p-2 rounded-full mb-1">
                    <CalendarDays color="#0039F0" strokeWidth={2} size={20} />
                  </div>
                  <p className="font-bold text-base md:text-lg">25+</p>
                  <p className="text-xs text-gray-600">événements</p>
                </div>
                <div className="bg-white/90 p-2 md:p-4 rounded-lg shadow-md text-center flex flex-col items-center">
                  <div className="bg-[#0039F0]/10 p-2 rounded-full mb-1">
                    <GraduationCap color="#0039F0" strokeWidth={2} size={20} />
                  </div>
                  <p className="font-bold text-base md:text-lg">45+</p>
                  <p className="text-xs text-gray-600">formations</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <MissionVision />

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
                  {pageGlobal.home?.ourTrainingsSectionTitle ||
                    'Développez vos compétences avec nos formations'}
                </h2>
                <p className="text-gray-600">
                  {pageGlobal.home?.ourTrainingsSectionDescription ||
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

        <AboutUsSection />

        <TeamSection />

        <Testimonials />

        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="px-4 md:px-8 xl:px-32">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6">
                <span className="text-[#0039F0] font-semibold">Nos partenaires</span>
              </div>
              <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-6">
                {pageGlobal.home?.ourPartnersSectionTitle || 'Ils nous font confiance'}
              </h2>
              <p className="text-gray-600">
                {pageGlobal.home?.ourPartnersSectionDescription ||
                  'Découvrez les entreprises et organisations qui soutiennent notre mission et travaillent avec nous pour former les leaders de demain.'}
              </p>
            </div>
            <PartnersList />
          </div>
        </section>
        <section className="py-24 bg-gradient-to-br from-white to-[#0039F0]/5">
          <div className="px-4 md:px-8 xl:px-32">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-6">
                {pageGlobal.home?.faqSectionTitle || 'Questions fréquentes'}
              </h2>
              <p className="text-gray-600">
                {pageGlobal.home?.faqSectionDescription ||
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
                {pageGlobal.home?.contactUsSectionTitle || 'Parlons de votre projet'}
              </h2>
              <p className="text-gray-600 md:w-2/3 mx-auto">
                {pageGlobal.home?.contactUsSectionDescription ||
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
                      {pageGlobal.home?.contactUsSectionButtonText || 'Envoyer le message'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-2">
                {pageGlobal.home?.contactUsSectionImage &&
                typeof pageGlobal.home.contactUsSectionImage !== 'number' &&
                pageGlobal.home?.contactUsSectionImage?.url ? (
                  <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg mb-8">
                    <Image
                      className="object-cover"
                      alt="Young Leaders"
                      src={pageGlobal.home.contactUsSectionImage.url}
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
        <footer className="bg-gray-900 text-white">
          <div className="px-4 md:px-8 xl:px-32 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">Young Leaders</h3>
                  <p className="text-gray-400 text-sm">
                    Association pour le développement du leadership
                  </p>
                </div>
                <p className="text-gray-300 mb-6">
                  Notre mission est de former la prochaine génération de leaders inspirants et
                  compétents.
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#0039F0] transition-colors duration-300 rounded-full flex items-center justify-center"
                    aria-label="Facebook"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.2 10.875C20.9734 10.875 19.797 11.3623 18.9296 12.2296C18.0623 13.097 17.575 14.2734 17.575 15.5V18.075H15.1C14.976 18.075 14.875 18.175 14.875 18.3V21.7C14.875 21.824 14.975 21.925 15.1 21.925H17.575V28.9C17.575 29.024 17.675 29.125 17.8 29.125H21.2C21.324 29.125 21.425 29.025 21.425 28.9V21.925H23.922C24.025 21.925 24.115 21.855 24.14 21.755L24.99 18.355C24.9984 18.3218 24.9991 18.2872 24.992 18.2537C24.985 18.2202 24.9704 18.1888 24.9494 18.1618C24.9283 18.1348 24.9014 18.1129 24.8707 18.0979C24.84 18.0829 24.8062 18.075 24.772 18.075H21.425V15.5C21.425 15.3982 21.445 15.2974 21.484 15.2034C21.5229 15.1094 21.58 15.024 21.652 14.952C21.724 14.88 21.8094 14.8229 21.9034 14.784C21.9974 14.745 22.0982 14.725 22.2 14.725H24.8C24.924 14.725 25.025 14.625 25.025 14.5V11.1C25.025 10.976 24.925 10.875 24.8 10.875H22.2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#0039F0] transition-colors duration-300 rounded-full flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.94 13C14.9397 13.5305 14.7288 14.0391 14.3535 14.4139C13.9782 14.7888 13.4694 14.9993 12.939 14.999C12.4086 14.9988 11.9 14.7878 11.5251 14.4125C11.1502 14.0373 10.9397 13.5285 10.94 12.998C10.9403 12.4676 11.1512 11.959 11.5265 11.5841C11.9018 11.2092 12.4106 10.9988 12.941 10.999C13.4714 10.9993 13.98 11.2103 14.3549 11.5855C14.7298 11.9608 14.9403 12.4696 14.94 13ZM15 16.48H11V29H15V16.48ZM21.32 16.48H17.34V29H21.28V22.43C21.28 18.77 26.05 18.43 26.05 22.43V29H30V21.07C30 14.9 22.94 15.13 21.28 18.16L21.32 16.48Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#0039F0] transition-colors duration-300 rounded-full flex items-center justify-center"
                    aria-label="YouTube"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.0617 14.9398C29.9422 14.4946 29.7078 14.0886 29.382 13.7624C29.0563 13.4363 28.6505 13.2014 28.2055 13.0813C26.5672 12.6406 20 12.6406 20 12.6406C20 12.6406 13.4328 12.6406 11.7945 13.0789C11.3493 13.1986 10.9433 13.4334 10.6175 13.7596C10.2917 14.0859 10.0574 14.4921 9.93828 14.9375C9.5 16.5781 9.5 20 9.5 20C9.5 20 9.5 23.4219 9.93828 25.0602C10.1797 25.9648 10.8922 26.6773 11.7945 26.9188C13.4328 27.3594 20 27.3594 20 27.3594C20 27.3594 26.5672 27.3594 28.2055 26.9188C29.1102 26.6773 29.8203 25.9648 30.0617 25.0602C30.5 23.4219 30.5 20 30.5 20C30.5 20 30.5 16.5781 30.0617 14.9398ZM17.9141 23.1406V16.8594L23.3516 19.9766L17.9141 23.1406Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#0039F0] transition-colors duration-300 rounded-full flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8 10H24.2C27.4 10 30 12.6 30 15.8V24.2C30 25.7383 29.3889 27.2135 28.3012 28.3012C27.2135 29.3889 25.7383 30 24.2 30H15.8C12.6 30 10 27.4 10 24.2V15.8C10 14.2617 10.6111 12.7865 11.6988 11.6988C12.7865 10.6111 14.2617 10 15.8 10ZM15.6 12C14.6452 12 13.7295 12.3793 13.0544 13.0544C12.3793 13.7295 12 14.6452 12 15.6V24.4C12 26.39 13.61 28 15.6 28H24.4C25.3548 28 26.2705 27.6207 26.9456 26.9456C27.6207 26.2705 28 25.3548 28 24.4V15.6C28 13.61 26.39 12 24.4 12H15.6ZM25.25 13.5C25.5815 13.5 25.8995 13.6317 26.1339 13.8661C26.3683 14.1005 26.5 14.4185 26.5 14.75C26.5 15.0815 26.3683 15.3995 26.1339 15.6339C25.8995 15.8683 25.5815 16 25.25 16C24.9185 16 24.6005 15.8683 24.3661 15.6339C24.1317 15.3995 24 15.0815 24 14.75C24 14.4185 24.1317 14.1005 24.3661 13.8661C24.6005 13.6317 24.9185 13.5 25.25 13.5ZM20 15C21.3261 15 22.5979 15.5268 23.5355 16.4645C24.4732 17.4021 25 18.6739 25 20C25 21.3261 24.4732 22.5979 23.5355 23.5355C22.5979 24.4732 21.3261 25 20 25C18.6739 25 17.4021 24.4732 16.4645 23.5355C15.5268 22.5979 15 21.3261 15 20C15 18.6739 15.5268 17.4021 16.4645 16.4645C17.4021 15.5268 18.6739 15 20 15ZM20 17C19.2044 17 18.4413 17.3161 17.8787 17.8787C17.3161 18.4413 17 19.2044 17 20C17 20.7956 17.3161 21.5587 17.8787 22.1213C18.4413 22.6839 19.2044 23 20 23C20.7956 23 21.5587 22.6839 22.1213 22.1213C22.6839 21.5587 23 20.7956 23 20C23 19.2044 22.6839 18.4413 22.1213 17.8787C21.5587 17.3161 20.7956 17 20 17Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/a-propos"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      À propos
                    </a>
                  </li>
                  <li>
                    <a
                      href="/formations"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Nos formations
                    </a>
                  </li>
                  <li>
                    <a
                      href="/evenements"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Événements
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Informations</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="/faq" className="text-gray-300 hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="/conditions"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Conditions d&apos;utilisation
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                      Politique de confidentialité
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-gray-300 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">
                  {pageGlobal.home?.newsletterSectionTitle || 'Newsletter'}
                </h4>
                <p className="text-gray-300 mb-4">
                  {pageGlobal.home?.newsletterSectionDescription ||
                    'Restez informé de nos actualités et événements.'}
                </p>

                <form className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:border-[#0039F0]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-medium py-3 px-4 rounded-lg"
                  >
                    S&apos;abonner
                  </button>
                </form>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                Copyright © {new Date().getFullYear()} Young Leaders Association. Tous droits
                reservés.
              </p>
              <div className="mt-4 md:mt-0 flex gap-4 text-sm text-gray-400">
                <a href="/sitemap" className="hover:text-white transition-colors">
                  Sitemap
                </a>
                <span>|</span>
                <a href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    return null
  }
}
