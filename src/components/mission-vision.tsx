import React from 'react'
import { Target, Rocket, BarChart3 } from 'lucide-react'

export default function MissionVision() {
  return (
    <section className="px-4 md:px-8 xl:px-32 py-24 bg-gradient-to-br from-[#0039F0]/5 to-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="mb-12">
            <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-4">
              <Target size={20} className="text-[#0039F0] mr-2" />
              <span className="text-[#0039F0] font-semibold">Notre Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Former la prochaine génération de leaders
            </h2>
            <p className="text-gray-700 mb-4">
              Notre mission est de développer le potentiel de leadership des jeunes talents à
              travers des formations innovantes, du mentorat personnalisé et des opportunités de
              mise en pratique concrètes.
            </p>
            <p className="text-gray-700">
              Nous nous engageons à créer un environnement favorable à l&apos;apprentissage,
              l&apos;échange et la croissance personnelle, où chacun peut développer les compétences
              nécessaires pour avoir un impact positif dans sa communauté et sa carrière.
            </p>
          </div>

          <div>
            <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-4">
              <Rocket size={20} className="text-[#0039F0] mr-2" />
              <span className="text-[#0039F0] font-semibold">Notre Vision</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Un monde où chaque jeune peut réaliser son plein potentiel
            </h2>
            <p className="text-gray-700">
              Nous aspirons à créer une société où chaque jeune, indépendamment de son origine ou de
              son parcours, a accès aux ressources, aux formations et au soutien nécessaires pour
              développer ses compétences en leadership et contribuer positivement à un avenir
              durable et équitable.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <BarChart3 size={24} className="text-[#0039F0] mr-2" />
            Nos Valeurs Fondamentales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Excellence</h4>
              <p className="text-gray-600">
                Nous nous efforçons d&apos;offrir des programmes de la plus haute qualité, en
                constante amélioration.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Innovation</h4>
              <p className="text-gray-600">
                Nous adoptons des approches créatives et avant-gardistes dans notre enseignement.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Inclusivité</h4>
              <p className="text-gray-600">
                Nous valorisons la diversité et créons un environnement où chacun se sent respecté.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Impact</h4>
              <p className="text-gray-600">
                Nous mesurons notre succès par les changements positifs que nos participants
                génèrent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
