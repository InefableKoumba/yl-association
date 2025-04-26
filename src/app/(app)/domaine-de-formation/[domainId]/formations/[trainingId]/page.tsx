import React from 'react'
import { GraduationCap, Clock, Users, ArrowLeft, Calendar, MapPin } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface PageParams {
  domainId: string
  trainingId: string
}

export default async function TrainingDetailPage({ params }: any) {
  try {
    const { domainId, trainingId } = await params
    const payload = await getPayload({ config })

    // Fetch the training domain
    const trainingDomain = await payload.findByID({
      collection: 'trainingDomains',
      id: domainId,
    })

    // Find the specific training in the domain's trainings array
    const training = trainingDomain?.trainings?.find((t: any) => t.id === trainingId)

    if (!training) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Formation non trouvée</h1>
          <p className="text-gray-600 mb-6">
            La formation que vous recherchez n&apos;existe pas ou a été supprimée.
          </p>
          <Link
            href={`/domaine-de-formation/${domainId}`}
            className="text-[#0039F0] hover:underline"
          >
            Retour au domaine de formation
          </Link>
        </div>
      )
    }

    return (
      <div className="bg-gray-50 min-h-screen py-8 md:py-16">
        <div className="container mx-auto px-4 xl:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/formations" className="hover:text-[#0039F0]">
                Formations
              </Link>
              <span>•</span>
              <Link href={`/domaine-de-formation/${domainId}`} className="hover:text-[#0039F0]">
                {trainingDomain.name}
              </Link>
              <span>•</span>
              <span className="text-[#0039F0] font-medium">{training.name}</span>
            </div>
          </div>

          {/* Back Link */}
          <Link
            href={`/domaine-de-formation/${domainId}`}
            className="inline-flex items-center text-gray-600 hover:text-[#0039F0] mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Retour aux formations de {trainingDomain.name}</span>
          </Link>

          <div className="bg-white shadow-md rounded-xl overflow-hidden mb-12">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src={
                  trainingDomain.image &&
                  typeof trainingDomain.image !== 'number' &&
                  trainingDomain.image.filename
                    ? process.env.NEXT_PUBLIC_CLOUDFLARE_PUB_URL + trainingDomain.image.filename
                    : '/hero2.jpg'
                }
                alt={training.name || 'Formation'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-white/10">
                    <GraduationCap className="text-white" size={20} />
                  </div>
                  <span className="text-white/80 font-medium">{trainingDomain.name}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{training.name}</h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="md:w-2/3">
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Description de la formation
                    </h2>
                    {training.longDescription && <RichText data={training.longDescription} />}
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Ce que vous apprendrez</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Since we don't have actual learning points in the CMS, we'll show placeholders */}
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0039F0]/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#0039F0]"></div>
                        </div>
                        <span className="text-gray-700">
                          Compétences fondamentales en leadership
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0039F0]/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#0039F0]"></div>
                        </div>
                        <span className="text-gray-700">Techniques de communication efficace</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0039F0]/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#0039F0]"></div>
                        </div>
                        <span className="text-gray-700">Gestion d&apos;équipe et motivation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0039F0]/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#0039F0]"></div>
                        </div>
                        <span className="text-gray-700">Résolution de problèmes complexes</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="md:w-1/3">
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Détails de la formation
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <Clock className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Durée</span>
                          <p className="text-gray-800 font-medium">2-5 jours</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <Users className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Participants</span>
                          <p className="text-gray-800 font-medium">15 maximum</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <Calendar className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Prochaine session</span>
                          <p className="text-gray-800 font-medium">Sur demande</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0039F0]/10 flex items-center justify-center">
                          <MapPin className="text-[#0039F0]" size={20} />
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Lieu</span>
                          <p className="text-gray-800 font-medium">En présentiel ou à distance</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Prix</h3>
                    <p className="text-gray-700 text-sm mb-4">{training.price || 'Sur demande'}</p>
                    <div className="space-y-3">
                      <Link
                        href="/contact"
                        className="flex items-center justify-center w-full py-3 px-6 bg-[#0039F0] hover:bg-[#0030cc] text-white font-medium rounded-lg transition-colors"
                      >
                        S&apos;inscrire à cette formation
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center justify-center w-full py-3 px-6 border border-gray-300 hover:border-[#0039F0] text-gray-800 hover:text-[#0039F0] font-medium rounded-lg transition-colors"
                      >
                        Demander plus d&apos;informations
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Trainings */}
          {trainingDomain.trainings && trainingDomain.trainings.length > 1 && (
            <div className="mt-12 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Autres formations dans ce domaine
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trainingDomain.trainings
                  .filter((t: any) => t.id !== trainingId)
                  .slice(0, 3)
                  .map((relatedTraining: any) => (
                    <div
                      key={relatedTraining.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                    >
                      <h3 className="font-bold text-gray-800 mb-2">{relatedTraining.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedTraining.shortDescription}
                      </p>
                      <Link
                        href={`/domaine-de-formation/${domainId}/formations/${relatedTraining.id}`}
                        className="text-[#0039F0] hover:underline text-sm font-medium"
                      >
                        Voir les détails
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading training details:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Une erreur est survenue</h1>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons pas pu charger les détails de cette formation. Veuillez réessayer plus
          tard.
        </p>
        <Link href="/formations" className="text-[#0039F0] hover:underline">
          Retour à la liste des formations
        </Link>
      </div>
    )
  }
}
