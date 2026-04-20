import { Calendar, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Locale, translations } from '@/lib/translations'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  image?: string
  registrationLink: string
}

const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'Workshop: Leadership Transformationnel',
    date: '15 Novembre 2023',
    time: '14:00 - 17:00',
    location: 'Campus Paris Innovation, Paris',
    description:
      'Découvrez les principes du leadership transformationnel et comment les appliquer dans votre contexte professionnel.',
    image: '/events/event-1.jpg',
    registrationLink: '#register',
  },
  {
    id: '2',
    title: 'Conférence: Innovations en Leadership',
    date: '22 Novembre 2023',
    time: '18:30 - 20:30',
    location: 'Espace Coworking Central, Lyon',
    description:
      "Une soirée avec des experts internationaux partageant les dernières innovations en matière de leadership et de gestion d'équipe.",
    image: '/events/event-2.jpg',
    registrationLink: '#register',
  },
  {
    id: '3',
    title: 'Formation: Communication Efficace',
    date: '5 Décembre 2023',
    time: '09:00 - 17:00',
    location: 'Centre de Formation Est, Strasbourg',
    description:
      'Une journée intensive pour développer vos compétences en communication et prise de parole en public.',
    image: '/events/event-3.jpg',
    registrationLink: '#register',
  },
]

export default async function UpcomingEvents({ locale }: { locale: Locale }) {
  const t = translations[locale]
  let events: any[] = []

  try {
    const payload = await getPayload({ config })
    const eventsData = await payload.find({
      collection: 'events',
      locale: locale as any,
      where: {
        date: {
          greater_than_equal: new Date().toISOString(),
        }
      },
      sort: 'date',
      limit: 3,
    })
    events = eventsData.docs
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  if (events.length === 0) return null

  return (
    <section className="px-4 md:px-8 xl:px-32 py-24 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-4">
          {t.common.upcomingEvents}
        </h2>
        <p className="text-gray-600 md:w-2/3 mx-auto">
          {t.common.upcomingEventsDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {event.image && (
              <div className="relative h-48 w-full">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-3">{event.title}</h3>

              <div className="flex items-center text-gray-600 mb-2">
                <Calendar size={16} className="mr-2 text-[#0039F0]" />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <Clock size={16} className="mr-2 text-[#0039F0]" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={16} className="mr-2 text-[#0039F0]" />
                <span>{event.location}</span>
              </div>

              <p className="text-gray-700 mb-6">{event.description}</p>

              <a
                href={event.registrationLink || '#'}
                className="block w-full bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-medium py-2 px-4 rounded-full text-center"
              >
                {t.common.register}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="/evenements"
          className="inline-flex items-center text-[#0039F0] font-medium hover:underline"
        >
          {t.common.viewAllEvents}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
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
    </section>
  )
}
