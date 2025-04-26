import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, ArrowRight } from 'lucide-react'

interface PageParams {
  params: {
    domainId: string
  }
}

export default async function TrainingDomainPage({ params }: any) {
  try {
    const { domainId } = await params
    const payload = await getPayload({ config })

    // Fetch the training domain
    const trainingDomain = await payload.findByID({
      collection: 'trainingDomains',
      id: domainId,
    })

    if (!trainingDomain) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Domaine de formation non trouvé</h1>
          <p className="text-gray-600 mb-6">
            Le domaine de formation que vous recherchez n&apos;existe pas ou a été supprimé.
          </p>
          <Link href="/domaine-de-formation" className="text-[#0039F0] hover:underline">
            Retour à la liste des formations
          </Link>
        </div>
      )
    }

    return (
      <div className="bg-gray-50 min-h-screen px-4 xl:px-24">
        <div className="container mx-auto px-4 xl:px-8 py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/domaine-de-formation" className="hover:text-[#0039F0]">
                Formations
              </Link>
              <span>•</span>
              <span className="text-[#0039F0] font-medium">{trainingDomain.name}</span>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-12">
            <Image
              src={
                trainingDomain.image &&
                typeof trainingDomain.image !== 'number' &&
                trainingDomain.image.filename
                  ? process.env.NEXT_PUBLIC_CLOUDFLARE_PUB_URL + trainingDomain.image.filename
                  : '/hero2.jpg'
              }
              alt={trainingDomain.name || 'Domaine de formation'}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-white/10">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <span className="text-white/80 font-medium">Domaine de formation</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{trainingDomain.name}</h1>
              <p className="text-white/80">
                {trainingDomain.trainings?.length || 0} formation
                {trainingDomain.trainings?.length !== 1 ? 's' : ''} disponible
                {trainingDomain.trainings?.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Trainings List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Nos formations dans ce domaine
            </h2>

            {trainingDomain.trainings && trainingDomain.trainings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingDomain.trainings.map((training: any) => (
                  <div
                    key={training.id}
                    className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <h3 className="font-bold text-gray-800 mb-3 text-xl">{training.name}</h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {training.shortDescription}
                    </p>
                    {training.price && (
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-700">Prix:</span>
                        <span className="ml-2 text-gray-700 text-sm">{training.price}</span>
                      </div>
                    )}
                    <Link
                      href={`/domaine-de-formation/${domainId}/formations/${training.id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 font-medium bg-gray-50 hover:bg-[#0039F0] text-gray-800 hover:text-white transition-colors duration-300 rounded-lg mt-auto"
                    >
                      <span>Voir les détails</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  Aucune formation disponible dans ce domaine pour le moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading training domain:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Une erreur est survenue</h1>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons pas pu charger les détails de ce domaine de formation. Veuillez
          réessayer plus tard.
        </p>
        <Link href="/domaine-de-formation" className="text-[#0039F0] hover:underline">
          Retour à la liste des formations
        </Link>
      </div>
    )
  }
}
