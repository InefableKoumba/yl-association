import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Filter, Search } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default async function EventsPage() {
  try {
    const payload = await getPayload({ config })

    // Fetch the page global settings
    const pageGlobal = await payload.findGlobal({
      slug: 'eventsPage',
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
              {pageGlobal?.heroTitle || 'Événements'}
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-2xl">
              {pageGlobal?.heroDescription ||
                'Découvrez nos événements à venir et rejoignez notre communauté de jeunes leaders'}
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
              placeholder="Rechercher un événement..."
              className="pl-10 w-full py-2.5 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition-colors">
            <Filter size={18} />
            Filtrer
          </button>
        </div>

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b pb-2">
            {pageGlobal?.upcomingEventsSectionTitle || 'Événements à venir'}
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
                        {event.date && format(new Date(event.date), 'dd MMMM yyyy', { locale: fr })}
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
                          S&apos;inscrire
                        </button>
                      </Link>
                    ) : (
                      <Link href={`/evenements/${event.id}`}>
                        <button className="w-full border border-gray-300 hover:border-[#0039F0] text-gray-700 hover:text-[#0039F0] font-medium py-2.5 px-6 rounded-lg transition-colors">
                          Voir les détails
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Aucun événement à venir pour le moment.</p>
              <p className="mt-2 text-gray-500">
                Revenez bientôt pour découvrir nos prochains événements.
              </p>
            </div>
          )}
        </section>

        {/* Past Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 border-b pb-2">
            {pageGlobal?.pastEventsSectionTitle || 'Événements passés'}
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
                        {event.date && format(new Date(event.date), 'dd MMMM yyyy', { locale: fr })}
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
                        Voir le récapitulatif
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Aucun événement passé enregistré.</p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="bg-blue-50 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {pageGlobal?.ctaSectionTitle ||
              'Vous souhaitez proposer un événement ou devenir intervenant?'}
          </h2>
          <p className="mb-6 max-w-3xl mx-auto">
            {pageGlobal?.ctaSectionDescription ||
              "Nous sommes toujours à la recherche de nouvelles idées et de nouveaux talents pour enrichir notre communauté. Si vous avez une idée d'événement ou si vous souhaitez partager votre expertise, n'hésitez pas à nous contacter."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="text-[#0039F0] transition-all duration-300 hover:bg-[#0039F0] hover:text-white text-sm font-medium border border-[#0039F0] rounded-full px-6 py-3"
            >
              {pageGlobal?.proposeEventButtonText || 'Proposer un événement'}
            </Link>
            <Link
              href="/#contact"
              className="text-[#0039F0] transition-all duration-300 hover:bg-[#0039F0] hover:text-white text-sm font-medium border border-[#0039F0] rounded-full px-6 py-3"
            >
              {pageGlobal?.becomeSpeakerButtonText || 'Devenir intervenant'}
            </Link>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error loading events page:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Une erreur est survenue</h1>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons pas pu charger la page des événements. Veuillez réessayer plus tard.
        </p>
        <Link href="/" className="text-[#0039F0] hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    )
  }
}
