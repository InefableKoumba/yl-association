import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Filter, Search } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { getLocale } from '@/lib/i18n'
import { Locale, translations } from '@/lib/translations'

export default async function EventsPage() {
  const locale = await getLocale() as Locale
  const t = translations[locale]
  const dateLocale = locale === 'fr' ? fr : enUS
  try {
    const payload = await getPayload({ config })

    // Fetch the page global settings
    const pageGlobal = await payload.findGlobal({
      slug: 'eventsPage',
      locale: locale as any,
    })

    // Fetch events
    const { docs: upcomingEvents } = await payload.find({
      collection: 'events',
      where: {
        status: {
          equals: 'upcoming',
        },
      },
      sort: 'date',
      locale: locale as any,
    })

    const { docs: pastEvents } = await payload.find({
      collection: 'events',
      where: {
        status: {
          equals: 'past',
        },
      },
      sort: '-date',
      limit: 3, // Show only the 3 most recent past events
      locale: locale as any,
    })

    return (
      <div className="container mx-auto py-8 px-4 md:px-24">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] mb-12 rounded-xl overflow-hidden">
          <Image
            src={
              pageGlobal?.heroImagePage &&
                typeof pageGlobal?.heroImagePage !== 'number' &&
                pageGlobal?.heroImagePage.url
                ? pageGlobal?.heroImagePage.url
                : '/hero.jpg'
            }
            alt="Événements Young Leaders Association"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              {pageGlobal?.heroTitle || t.events.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-2xl">
              {pageGlobal?.heroDescription || t.events.heroDescription}
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

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b pb-2">
            {pageGlobal?.upcomingEventsSectionTitle || t.common.upcomingEvents}
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        event.image && typeof event.image !== 'number' && event.image.url
                          ? event.image.url
                          : '/images/placeholder-event.jpg'
                      }
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Calendar size={16} />
                      <span>
                        {event.date && format(new Date(event.date), 'dd MMMM yyyy', { locale: dateLocale })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <p className="mb-6 text-gray-700">{event.shortDescription}</p>
                    {event.isRegistrationAvailable ? (
                      <Link href={event.registrationLink || '/contact'}>
                        <button className="w-full bg-[#0039F0] hover:bg-[#0030cc] text-white font-medium py-2.5 px-6 rounded-lg transition-colors">
                          {t.common.register}
                        </button>
                      </Link>
                    ) : (
                      <Link href={`/evenements/${event.id}`}>
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
              <p className="text-gray-600">{t.common.noUpcomingEvents}</p>
              <p className="mt-2 text-gray-500">
                {t.common.checkBackSoon}
              </p>
            </div>
          )}
        </section>

        {/* Past Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b pb-2">
            {pageGlobal?.pastEventsSectionTitle || t.common.pastEvents}
          </h2>
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow opacity-80"
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        event.image && typeof event.image !== 'number' && event.image.url
                          ? event.image.url
                          : '/images/placeholder-event.jpg'
                      }
                      alt={event.title}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Calendar size={16} />
                      <span>
                        {event.date && format(new Date(event.date), 'dd MMMM yyyy', { locale: dateLocale })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <p className="mb-6 text-gray-700">{event.shortDescription}</p>
                    <Link href={`/evenements/${event.id}`}>
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
              <p className="text-gray-600">{t.common.noPastEvents}</p>
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
              {pageGlobal?.proposeEventButtonText || t.common.proposeEvent}
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
    console.error('Error loading events page:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.common.errorTitle}</h1>
        <p className="text-gray-600 mb-6">
          {t.events.errorLoadingEvents} {t.common.tryAgainLater}
        </p>
        <Link href="/" className="text-[#0039F0] hover:underline">
          {t.common.backToHome}
        </Link>
      </div>
    )
  }
}
