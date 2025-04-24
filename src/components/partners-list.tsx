import { HandshakeIcon } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import Image from 'next/image'

export default async function PartnersList() {
  try {
    const payload = await getPayload({ config })
    const partners = await payload.find({
      collection: 'partners',
    })

    if (partners.docs.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          Aucun partenaire disponible pour le moment.
        </div>
      )
    }

    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0039F0]/10 mb-6">
            <HandshakeIcon className="text-[#0039F0]" size={28} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {partners.docs.map((partner, index) => (
            <div
              key={partner.id || index}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center h-32 group"
            >
              {partner.logo && typeof partner.logo !== 'number' && partner.logo.url ? (
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo.url}
                    alt={partner.name || `Partenaire ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 40vw, 150px"
                    className="object-contain object-center p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="text-center p-4 w-full">
                  <div className="font-medium text-gray-800 group-hover:text-[#0039F0] transition-colors">
                    {partner.name || `Partenaire ${index + 1}`}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/partenaires"
            className="inline-flex items-center bg-white text-[#0039F0] border-2 border-[#0039F0] hover:bg-[#0039F0] hover:text-white transition-colors duration-300 font-semibold py-3 px-6 rounded-full"
          >
            Voir tous nos partenaires
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
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
      </div>
    )
  } catch (error) {
    console.error('Error loading partners:', error)
    return (
      <div className="text-center text-red-500 py-8">
        Une erreur est survenue lors du chargement des partenaires.
      </div>
    )
  }
}
