import { Calendar, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Locale, translations } from '@/lib/translations'

export default async function UpcomingPrograms({ locale }: { locale: Locale }) {
  const t = translations[locale]
  let programs: any[] = []

  try {
    const payload = await getPayload({ config })
    const programsData = await payload.find({
      collection: 'programs',
      locale: locale as any,
      where: {
        date: {
          greater_than_equal: new Date().toISOString(),
        }
      },
      sort: 'date',
      limit: 3,
    })
    programs = programsData.docs
  } catch (error) {
    console.error('Error fetching programs:', error)
  }

  if (programs.length === 0) return null

  return (
    <section className="px-4 md:px-8 xl:px-32 py-24 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-4">
          {t.common.upcomingPrograms}
        </h2>
        <p className="text-gray-600 md:w-2/3 mx-auto">
          {t.common.upcomingProgramsDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {program.image && typeof program.image !== 'number' && (
              <div className="relative h-48 w-full">
                <Image src={program.image.url || '/hero.jpg'} alt={program.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-3">{program.title}</h3>

              <div className="flex items-center text-gray-600 mb-2">
                <Calendar size={16} className="mr-2 text-[#0039F0]" />
                <span>{program.date}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <Clock size={16} className="mr-2 text-[#0039F0]" />
                <span>{program.time}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={16} className="mr-2 text-[#0039F0]" />
                <span>{program.location}</span>
              </div>

              <p className="text-gray-700 mb-6">{program.shortDescription}</p>

              <a
                href={program.registrationLink || '#'}
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
          href="/programmes"
          className="inline-flex items-center text-[#0039F0] font-medium hover:underline"
        >
          {t.common.viewAllPrograms}
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
