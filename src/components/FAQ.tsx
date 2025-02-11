import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import { Faq } from '@/payload-types'
import FaqItem from './FaqItem'

export default async function FAQ() {
  const payload = await getPayload({ config })
  const faq = await payload.find({
    collection: 'faq',
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-8 mt-12">
      {faq.docs.map((item: Faq) => (
        <FaqItem faq={item} key={item.id} />
      ))}
    </div>
  )
}
