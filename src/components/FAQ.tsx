import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import { Faq } from '@/payload-types'
import FaqItem from './FaqItem'
import { MessageCircleQuestion } from 'lucide-react'

export default async function FAQ() {
  try {
    const payload = await getPayload({ config })
    const faq = await payload.find({
      collection: 'faq',
    })

    if (faq.docs.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          Aucune question fréquente disponible pour le moment.
        </div>
      )
    }

    return (
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0039F0]/10 mb-6">
            <MessageCircleQuestion className="text-[#0039F0]" size={32} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faq.docs.map((item: Faq) => (
            <FaqItem faq={item} key={item.id} />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading FAQ:', error)
    return (
      <div className="text-center text-red-500 py-8">
        Une erreur est survenue lors du chargement des questions fréquentes.
      </div>
    )
  }
}
