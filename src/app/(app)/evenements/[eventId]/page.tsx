import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ArrowLeft, Users } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface PageParams {
  params: {
    eventId: string
  }
}

export default async function EventDetailsPage({ params }: any) {
  try {
    const { eventId } = await params
    const payload = await getPayload({ config })

    // Fetch the event
    const event = await payload.findByID({
      collection: 'events',
      id: eventId,
    })

    if (!event) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Événement non trouvé</h1>
          <p className="text-gray-600 mb-6">
            L&apos;événement que vous recherchez n&apos;existe pas ou a été supprimé.
          </p>
          <Link href="/evenements" className="text-[#0039F0] hover:underline">
            Retour aux événements
          </Link>
        </div>
      )
    }

    // Format date
    const formattedDate = event.date
      ? format(new Date(event.date), 'dd MMMM yyyy', { locale: fr })
      : ''

    return (
      <div className="bg-gray-50 min-h-screen py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          {/* Back Link */}
          <Link
            href="/evenements"
            className="inline-flex items-center text-gray-600 hover:text-[#0039F0] mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Retour aux événements</span>
          </Link>

          <div className="bg-white shadow-md rounded-xl overflow-hidden mb-12">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src={
                  event.image && typeof event.image !== 'number' && event.image.url
                    ? event.image.url
                    : '/hero.jpg'
                }
                alt={event.title || 'Événement'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 rounded-full bg-white/10 text-sm">
                    {event.status === 'upcoming' ? 'À venir' : 'Passé'}
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="md:w-2/3">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Description de l&apos;événement
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      {event.longDescription ? (
                        <RichText data={event.longDescription} />
                      ) : (
                        <p className="text-gray-700">{event.shortDescription}</p>
                      )}
                    </div>
                  </div>

                  {event.status === 'past' && (
                    <div className="mt-8">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Photos de l&apos;événement
                      </h2>
                      <div className="bg-gray-100 p-16 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 text-center">
                          Les photos de cet événement seront bientôt disponibles
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="md:w-1/3">
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Détails de l&apos;événement
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <Calendar className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Date</span>
                          <p className="text-gray-800 font-medium">{formattedDate}</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <Clock className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Heure</span>
                          <p className="text-gray-800 font-medium">{event.time}</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <MapPin className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Lieu</span>
                          <p className="text-gray-800 font-medium">{event.location}</p>
                        </div>
                      </li>
                      {event.maximumParticipants && (
                        <li className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                            <Users className="text-[#0039F0]" size={20} />
                          </div>
                          <div>
                            <span className="text-gray-500 text-sm">Participants</span>
                            <p className="text-gray-800 font-medium">
                              Maximum {event.maximumParticipants} personnes
                            </p>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>

                  {event.status === 'upcoming' && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Inscription</h3>
                      {event.isRegistrationAvailable ? (
                        <div className="space-y-3">
                          <Link
                            href={event.registrationLink || '/contact'}
                            className="flex items-center justify-center w-full py-3 px-6 bg-[#0039F0] hover:bg-[#0030cc] text-white font-medium rounded-lg transition-colors"
                          >
                            S&apos;inscrire à cet événement
                          </Link>
                          <Link
                            href="/contact"
                            className="flex items-center justify-center w-full py-3 px-6 border border-gray-300 hover:border-[#0039F0] text-gray-800 hover:text-[#0039F0] font-medium rounded-lg transition-colors"
                          >
                            Demander plus d&apos;informations
                          </Link>
                        </div>
                      ) : (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                          <p className="font-medium mb-1">
                            Inscription temporairement indisponible
                          </p>
                          <p className="text-sm">
                            Veuillez nous contacter pour plus d&apos;informations sur cet événement.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {event.status === 'past' && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Événement passé</h3>
                      <p className="text-gray-600 mb-4">
                        Cet événement a déjà eu lieu. Restez informé de nos prochains événements.
                      </p>
                      <Link
                        href="/evenements"
                        className="flex items-center justify-center w-full py-3 px-6 border border-gray-300 hover:border-[#0039F0] text-gray-800 hover:text-[#0039F0] font-medium rounded-lg transition-colors"
                      >
                        Voir les événements à venir
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related or Upcoming Events */}
          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {event.status === 'upcoming' ? 'Autres événements à venir' : 'Prochains événements'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* We would typically fetch and display related events here, but for now let's add a placeholder */}
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex items-center justify-center h-48">
                <Link href="/evenements" className="text-[#0039F0] hover:underline text-center">
                  <p className="mb-2 text-gray-800 font-medium">Découvrez tous nos événements</p>
                  <p className="text-sm text-gray-600">Cliquez ici pour voir la liste complète</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading event details:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Une erreur est survenue</h1>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons pas pu charger les détails de cet événement. Veuillez réessayer plus
          tard.
        </p>
        <Link href="/evenements" className="text-[#0039F0] hover:underline">
          Retour à la liste des événements
        </Link>
      </div>
    )
  }
}
