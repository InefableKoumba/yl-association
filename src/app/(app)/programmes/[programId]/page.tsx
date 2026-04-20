import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ArrowLeft, Users } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getLocale } from '@/lib/i18n'
import { Locale, translations } from '@/lib/translations'



export default async function ProgramDetailsPage({ params }: any) {
  const locale = await getLocale() as Locale
  const t = translations[locale]
  const dateLocale = locale === 'fr' ? fr : enUS
  try {
    const { programId } = await params
    const payload = await getPayload({ config })

    // Fetch the program
    const program = await payload.findByID({
      collection: 'programs',
      id: programId,
      locale: locale,
    })

    if (!program) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.programs.notFoundTitle}</h1>
          <p className="text-gray-600 mb-6">
            {t.programs.notFoundDescription}
          </p>
          <Link href="/programmes" className="text-[#0039F0] hover:underline">
            {t.programs.backToPrograms}
          </Link>
        </div>
      )
    }

    // Format date
    const formattedDate = program.date
      ? format(new Date(program.date), 'dd MMMM yyyy', { locale: dateLocale })
      : ''

    return (
      <div className="bg-gray-50 min-h-screen py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          {/* Back Link */}
          <Link
            href="/programmes"
            className="inline-flex items-center text-gray-600 hover:text-[#0039F0] mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>{t.programs.backToPrograms}</span>
          </Link>

          <div className="bg-white shadow-md rounded-xl overflow-hidden mb-12">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src={
                  program.image && typeof program.image !== 'number' && program.image.url
                    ? program.image.url
                    : '/hero.jpg'
                }
                alt={program.title || t.programs.heroTitle}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 rounded-full bg-white/10 text-sm">
                    {program.status === 'upcoming' ? t.programs.upcoming : t.programs.past}
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{program.title}</h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="md:w-2/3">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      {t.programs.descriptionTitle}
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      {program.longDescription ? (
                        <RichText data={program.longDescription} />
                      ) : (
                        <p className="text-gray-700">{program.shortDescription}</p>
                      )}
                    </div>
                  </div>

                  {program.status === 'past' && (
                    <div className="mt-8">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {t.programs.photosTitle}
                      </h2>
                      <div className="bg-gray-100 p-16 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 text-center">
                          {t.programs.photosComingSoon}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="md:w-1/3">
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      {t.programs.detailsTitle}
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <Calendar className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">{t.programs.dateLabel}</span>
                          <p className="text-gray-800 font-medium">{formattedDate}</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <Clock className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">{t.programs.timeLabel}</span>
                          <p className="text-gray-800 font-medium">{program.time}</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <MapPin className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">{t.programs.locationLabel}</span>
                          <p className="text-gray-800 font-medium">{program.location}</p>
                        </div>
                      </li>
                      {program.maximumParticipants && (
                        <li className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                            <Users className="text-[#0039F0]" size={20} />
                          </div>
                          <div>
                            <span className="text-gray-500 text-sm">{t.programs.participantsLabel}</span>
                            <p className="text-gray-800 font-medium">
                              {t.programs.maxParticipants.replace('{count}', program.maximumParticipants.toString())}
                            </p>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>

                  {program.status === 'upcoming' && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">{t.programs.registrationTitle}</h3>
                      {program.isRegistrationAvailable ? (
                        <div className="space-y-3">
                          <Link
                            href={program.registrationLink || '/contact'}
                            className="flex items-center justify-center w-full py-3 px-6 bg-[#0039F0] hover:bg-[#0030cc] text-white font-medium rounded-lg transition-colors"
                          >
                            {t.programs.registerButton}
                          </Link>
                          <Link
                            href="/contact"
                            className="flex items-center justify-center w-full py-3 px-6 border border-gray-300 hover:border-[#0039F0] text-gray-800 hover:text-[#0039F0] font-medium rounded-lg transition-colors"
                          >
                            {t.programs.requestInfoButton}
                          </Link>
                        </div>
                      ) : (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                          <p className="font-medium mb-1">
                            {t.programs.registrationUnavailable}
                          </p>
                          <p className="text-sm">
                            {t.programs.registrationUnavailableDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {program.status === 'past' && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">{t.programs.pastProgramTitle}</h3>
                      <p className="text-gray-600 mb-4">
                        {t.programs.pastProgramDescription}
                      </p>
                      <Link
                        href="/programmes"
                        className="flex items-center justify-center w-full py-3 px-6 border border-gray-300 hover:border-[#0039F0] text-gray-800 hover:text-[#0039F0] font-medium rounded-lg transition-colors"
                      >
                        {t.programs.viewUpcomingButton}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related or Upcoming Programs */}
          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {program.status === 'upcoming' ? t.programs.otherUpcomingPrograms : t.programs.nextPrograms}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* We would typically fetch and display related programs here, but for now let's add a placeholder */}
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex items-center justify-center h-48">
                <Link href="/programmes" className="text-[#0039F0] hover:underline text-center">
                  <p className="mb-2 text-gray-800 font-medium">{t.programs.discoverAllPrograms}</p>
                  <p className="text-sm text-gray-600">{t.programs.clickToSeeFullList}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading program details:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.common.errorTitle}</h1>
        <p className="text-gray-600 mb-6">
          {t.programs.errorLoadingProgram} {t.common.tryAgainLater}
        </p>
        <Link href="/programmes" className="text-[#0039F0] hover:underline">
          {t.programs.backToPrograms}
        </Link>
      </div>
    )
  }
}
