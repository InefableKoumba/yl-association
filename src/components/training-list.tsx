import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, Clock, Users, ExternalLink } from 'lucide-react'

export default async function TrainingsList() {
  try {
    const payload = await getPayload({ config })
    const trainingDomains = await payload.find({
      collection: 'trainingDomains',
    })

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {trainingDomains.docs.map((trainingDomain) => (
          <div
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            key={trainingDomain.id}
          >
            <div className="relative h-[220px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                alt={trainingDomain.name ?? 'Formation'}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                src={
                  trainingDomain.image &&
                  typeof trainingDomain.image !== 'number' &&
                  trainingDomain.image.filename
                    ? process.env.NEXT_PUBLIC_CLOUDFLARE_PUB_URL + trainingDomain.image.filename
                    : '/1.jpg'
                }
                fill
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#0039F0] text-white text-sm font-medium py-1 px-3 rounded-full">
                  {trainingDomain.trainings?.length || 0} formations
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-full bg-[#0039F0]/10">
                  <GraduationCap className="text-[#0039F0]" size={18} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-xl text-gray-800">{trainingDomain.name}</h3>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 mt-2 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>2-5 jours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>15 participants max</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Formations disponibles :
                </h4>
                <ul className="space-y-2">
                  {trainingDomain.trainings && trainingDomain.trainings.length > 0 ? (
                    trainingDomain.trainings.slice(0, 3).map((training) => (
                      <li key={training.id} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0039F0]"></div>
                        <Link
                          href={`/domaine-de-formation/${trainingDomain.id}/formations/${training.id}`}
                          className="text-gray-600 hover:text-[#0039F0] transition-colors font-medium text-sm"
                        >
                          {training.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-sm italic">Pas de formations disponibles</li>
                  )}

                  {trainingDomain.trainings && trainingDomain.trainings.length > 3 && (
                    <li className="text-sm text-gray-500 pt-1">
                      <span>+ {trainingDomain.trainings.length - 3} autres formations</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  href={`/domaine-de-formation/${trainingDomain.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 font-medium bg-gray-50 hover:bg-[#0039F0] text-gray-800 hover:text-white transition-colors duration-300 rounded-lg"
                >
                  <span>Découvrir ce domaine</span>
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } catch (error) {
    return null
  }
}
