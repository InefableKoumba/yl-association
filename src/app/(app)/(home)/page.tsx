import Image from 'next/image'
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
import UpcomingPrograms from '@/components/upcoming-programs'
import Link from 'next/link'
import { getLocale, translations } from '@/lib/i18n'
import ContactForm from '@/components/ContactForm'
import { Locale } from '@/lib/translations'

export default async function Page() {
  const locale = await getLocale()
  const t = translations[locale]
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'homePage',
      locale: locale as any,
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
    const heroStats = pageGlobal?.heroSection?.heroStats || []

    // Function to render the appropriate icon based on the icon name
    const renderStatIcon = (iconName: string, size: number) => {
      switch (iconName) {
        case 'users':
          return <UsersRound color="white" strokeWidth={2} size={size} />
        case 'graduation':
          return <GraduationCap color="white" strokeWidth={2} size={size} />
        case 'calendar':
          return <CalendarDays color="white" strokeWidth={2} size={size} />
        default:
          return <UsersRound color="white" strokeWidth={2} size={size} />
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
                  quality={75}
                />
              </div>
            </div>
            <div className="flex flex-col items-center xl:items-start justify-center h-full px-4 xl:px-32 py-12 relative z-10">
              <div className="flex xl:w-[70%]">
                <div className="flex flex-col gap-6">
                  <span className="text-[#0039F0] bg-white/95 py-1.5 px-5 rounded-full text-sm font-black inline-block w-fit mx-auto xl:mx-0 shadow-lg shadow-white/10 uppercase tracking-widest">
                    Young Leaders Association
                  </span>
                  <h1 className="font-black text-white text-5xl md:text-7xl lg:text-8xl leading-[1] text-center xl:text-left drop-shadow-2xl">
                    {pageGlobal?.heroSection?.heroTitle || t.common.register}
                  </h1>
                  <p className="text-gray-100 text-xl md:text-2xl w-[95%] md:w-[85%] mx-auto xl:mx-0 text-center xl:text-left mb-8 font-medium leading-relaxed drop-shadow-lg">
                    {pageGlobal?.heroSection?.heroDescription ||
                      'Nous accompagnons les jeunes talents dans le développement de leurs compétences en leadership.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center xl:justify-start">
                    <a
                      href="#trainings"
                      className="bg-[#0039F0] hover:bg-[#0030cc] transition-all duration-300 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-600/30 text-center text-lg active:scale-95"
                    >
                      {pageGlobal?.heroSection?.heroPrimaryButtonText || t.common.seeAllTrainings}
                    </a>
                    <a
                      href="#contact"
                      className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 transition-all duration-300 text-white font-bold py-4 px-10 rounded-2xl text-center text-lg active:scale-95"
                    >
                      {pageGlobal?.heroSection?.heroSecondaryButtonText || t.common.contactUs}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bridge Stats Row - Desktop & Mobile Integrated */}
            <div className="absolute left-0 right-0 -bottom-16 md:-bottom-20 lg:-bottom-24 z-20 px-4 md:px-8 xl:px-32">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
                {heroStats.slice(0, 3).map((stat, index) => {
                  const colors = [
                    { border: 'border-blue-400/30', accent: 'bg-blue-600', shadow: 'shadow-blue-600/20' },
                    { border: 'border-emerald-400/30', accent: 'bg-emerald-600', shadow: 'shadow-emerald-600/20' },
                    { border: 'border-amber-400/30', accent: 'bg-amber-600', shadow: 'shadow-amber-600/20' }
                  ][index] || { border: 'border-white/20', accent: 'bg-gray-600', shadow: 'shadow-gray-600/20' };

                  return (
                    <div
                      key={index}
                      className={`group relative bg-white/10 backdrop-blur-2xl border-2 ${colors.border} p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex items-center transform transition-all duration-500 hover:-translate-y-4 hover:bg-white/15`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 ${colors.accent}/10 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                      <div className={`${colors.accent} ${colors.shadow} p-4 md:p-5 rounded-3xl mr-6 md:mr-8 shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-12`}>
                        {renderStatIcon(stat.icon, 36)}
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-1 tracking-tight">{stat.value}</h3>
                        <p className="text-white/60 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
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
                  <span className="text-[#0039F0] font-semibold">{t.nav.trainings}</span>
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
                  {pageGlobal?.trainingsSection?.trainingsSectionButtonText || t.common.seeAllTrainings}
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
              <TrainingsList locale={locale} />
            </div>
          </div>
        </section>

        <UpcomingPrograms locale={locale} />

        <AboutUsSection aboutUsData={pageGlobal?.aboutUsSection} />

        <TeamSection />

        <Testimonials
          locale={locale}
          testimonials={pageGlobal?.testimonialsSection?.testimonials?.map(t => ({
            quote: t.content || '',
            name: t.name || '',
            role: t.role || '',
            image: typeof t.photo !== 'number' && t.photo?.filename
              ? process.env.NEXT_PUBLIC_CLOUDFLARE_PUB_URL + t.photo.filename
              : undefined
          }))}
        />

        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="px-4 md:px-8 xl:px-32">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6">
                <span className="text-[#0039F0] font-semibold">{t.nav.about}</span>
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
            <FAQ locale={locale} />
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                Vous ne trouvez pas de réponse à votre question ?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full"
              >
                {t.common.contactUs}
              </a>
            </div>
          </div>
        </section>
        <div className="px-4 md:px-8 xl:px-32 py-24 bg-white" id="contact">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6">
                <span className="text-[#0039F0] font-semibold">{t.nav.contact}</span>
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
              <div className="lg:col-span-3">
                <ContactForm locale={locale as Locale} />
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
    console.log(error)
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
