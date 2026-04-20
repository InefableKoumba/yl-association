import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Filter, Search } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { getLocale } from '@/lib/i18n'
import { Locale, translations } from '@/lib/translations'

export default async function ProgramsPage() {
  const locale = await getLocale() as Locale
  const t = translations[locale]
  const dateLocale = locale === 'fr' ? fr : enUS
  try {
    const payload = await getPayload({ config })

    // Fetch the page global settings
    const pageGlobal = await payload.findGlobal({
      slug: 'programsPage',
      locale: locale,
    })

    // Fetch programs
    const { docs: upcomingPrograms } = await payload.find({
      collection: 'programs',
      where: {
        status: {
          equals: 'upcoming',
        },
      },
      sort: 'date',
      locale: locale as any,
    })

    const { docs: pastPrograms } = await payload.find({
      collection: 'programs',
      where: {
        status: {
          equals: 'past',
        },
      },
      sort: '-date',
      limit: 3, // Show only the 3 most recent past programs
      locale: locale,
    })

    return (
      <div className="container mx-auto py-8 px-4 md:px-24">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] mb-12 rounded-xl overflow-hidden">
          <Image
            src={
              pageGlobal?.heroImage &&
                typeof pageGlobal?.heroImage !== 'number' &&
                pageGlobal?.heroImage.url
                ? pageGlobal?.heroImage.url
                : '/hero.jpg'
            }
            alt="Programmes Young Leaders Association"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              {pageGlobal?.heroTitle || t.programs.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-2xl">
              {pageGlobal?.heroDescription || t.programs.heroDescription}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              placeholder={t.common.searchPlaceholder}
              className="pl-10 w-full py-2.5 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition-colors">
            <Filter size={18} />
            {t.common.filter}
          </button>
        </div>

        {/* Upcoming Programs Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b pb-2">
            {pageGlobal?.upcomingProgramsSectionTitle || t.common.upcomingPrograms}
          </h2>
          {upcomingPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        program.image && typeof program.image !== 'number' && program.image.url
                          ? program.image.url
                          : '/images/placeholder-event.jpg'
                      }
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Calendar size={16} />
                      <span>
                        {program.date && format(new Date(program.date), 'dd MMMM yyyy', { locale: dateLocale })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Clock size={16} />
                      <span>{program.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={16} />
                      <span>{program.location}</span>
                    </div>
                    <p className="mb-6 text-gray-700">{program.shortDescription}</p>
                    {program.isRegistrationAvailable ? (
                      <Link href={program.registrationLink || '/contact'}>
                        <button className="w-full bg-[#0039F0] hover:bg-[#0030cc] text-white font-medium py-2.5 px-6 rounded-lg transition-colors">
                          {t.common.register}
                        </button>
                      </Link>
                    ) : (
                      <Link href={`/programmes/${program.id}`}>
                        <button className="w-full border border-gray-300 hover:border-[#0039F0] text-gray-700 hover:text-[#0039F0] font-medium py-2.5 px-6 rounded-lg transition-colors">
                          {t.common.viewDetails}
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">{t.common.noUpcomingPrograms}</p>
              <p className="mt-2 text-gray-500">
                {t.common.checkBackSoon}
              </p>
            </div>
          )}
        </section>

        {/* Past Programs Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b pb-2">
            {pageGlobal?.pastProgramsSectionTitle || t.common.pastPrograms}
          </h2>
          {pastPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow opacity-80"
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        program.image && typeof program.image !== 'number' && program.image.url
                          ? program.image.url
                          : '/images/placeholder-event.jpg'
                      }
                      alt={program.title}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Calendar size={16} />
                      <span>
                        {program.date && format(new Date(program.date), 'dd MMMM yyyy', { locale: dateLocale })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Clock size={16} />
                      <span>{program.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={16} />
                      <span>{program.location}</span>
                    </div>
                    <p className="mb-6 text-gray-700">{program.shortDescription}</p>
                    <Link href={`/programmes/${program.id}`}>
                      <button className="w-full border border-gray-300 hover:border-[#0039F0] text-gray-700 hover:text-[#0039F0] font-medium py-2.5 px-6 rounded-lg transition-colors">
                        {t.common.viewSummary}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">{t.common.noPastPrograms}</p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="bg-blue-50 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {pageGlobal?.ctaSectionTitle || t.common.proposeTitle}
          </h2>
          <p className="mb-6 max-w-3xl mx-auto">
            {pageGlobal?.ctaSectionDescription || t.common.proposeDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="text-[#0039F0] transition-all duration-300 hover:bg-[#0039F0] hover:text-white text-sm font-medium border border-[#0039F0] rounded-full px-6 py-3"
            >
              {pageGlobal?.proposeProgramButtonText || t.common.proposeProgram}
            </Link>
            <Link
              href="/#contact"
              className="text-[#0039F0] transition-all duration-300 hover:bg-[#0039F0] hover:text-white text-sm font-medium border border-[#0039F0] rounded-full px-6 py-3"
            >
              {pageGlobal?.becomeSpeakerButtonText || t.common.becomeSpeaker}
            </Link>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error loading programs page:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.common.errorTitle}</h1>
        <p className="text-gray-600 mb-6">
          {t.programs.errorLoadingPrograms} {t.common.tryAgainLater}
        </p>
        <Link href="/" className="text-[#0039F0] hover:underline">
          {t.common.backToHome}
        </Link>
      </div>
    )
  }
}
