import React from 'react'
import { Target, Rocket, BarChart3 } from 'lucide-react'

// Define the props interface for the component
interface MissionVisionProps {
  missionVisionSection?: {
    missionTitle?: string | null
    missionHeading?: string | null
    missionDescription?: string | null
    missionDescription2?: string | null
    visionTitle?: string | null
    visionHeading?: string | null
    visionDescription?: string | null
    valuesTitle?: string | null
    values?:
    | {
      title: string
      description: string
      id?: string | null
    }[]
    | null
  } | null
}

export default function MissionVision({ missionVisionSection }: MissionVisionProps) {
  // Extract data with fallbacks for each field
  const missionTitle = missionVisionSection?.missionTitle || 'Notre Mission'
  const missionHeading =
    missionVisionSection?.missionHeading || 'Former la prochaine génération de leaders'
  const missionDescription =
    missionVisionSection?.missionDescription ||
    'Notre mission est de développer le potentiel de leadership des jeunes talents à travers des formations innovantes, du mentorat personnalisé et des opportunités de mise en pratique concrètes.'
  const missionDescription2 =
    missionVisionSection?.missionDescription2 ||
    "Nous nous engageons à créer un environnement favorable à l'apprentissage, l'échange et la croissance personnelle, où chacun peut développer les compétences nécessaires pour avoir un impact positif dans sa communauté et sa carrière."

  const visionTitle = missionVisionSection?.visionTitle || 'Notre Vision'
  const visionHeading =
    missionVisionSection?.visionHeading ||
    'Un monde où chaque jeune peut réaliser son plein potentiel'
  const visionDescription =
    missionVisionSection?.visionDescription ||
    'Nous aspirons à créer une société où chaque jeune, indépendamment de son origine ou de son parcours, a accès aux ressources, aux formations et au soutien nécessaires pour développer ses compétences en leadership et contribuer positivement à un avenir durable et équitable.'

  const valuesTitle = missionVisionSection?.valuesTitle || 'Nos Valeurs Fondamentales'

  // Get values from props or use default values
  const values = missionVisionSection?.values || [
    {
      title: 'Excellence',
      description:
        "Nous nous efforçons d'offrir des programmes de la plus haute qualité, en constante amélioration.",
    },
    {
      title: 'Innovation',
      description:
        'Nous adoptons des approches créatives et avant-gardistes dans notre enseignement.',
    },
    {
      title: 'Inclusivité',
      description:
        'Nous valorisons la diversité et créons un environnement où chacun se sent respecté.',
    },
    {
      title: 'Impact',
      description:
        'Nous mesurons notre succès par les changements positifs que nos participants génèrent.',
    },
  ]

  return (
    <section className="px-4 md:px-8 xl:px-32 py-24 bg-gradient-to-br from-[#0039F0]/5 to-white pt-44">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="mb-12">
            <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-4">
              <Target size={20} className="text-[#0039F0] mr-2" />
              <span className="text-[#0039F0] font-semibold">{missionTitle}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{missionHeading}</h2>
            <p className="text-gray-700 mb-4">{missionDescription}</p>
            {missionDescription2 && <p className="text-gray-700">{missionDescription2}</p>}
          </div>

          <div>
            <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-4">
              <Rocket size={20} className="text-[#0039F0] mr-2" />
              <span className="text-[#0039F0] font-semibold">{visionTitle}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{visionHeading}</h2>
            <p className="text-gray-700">{visionDescription}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <BarChart3 size={24} className="text-[#0039F0] mr-2" />
            {valuesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
