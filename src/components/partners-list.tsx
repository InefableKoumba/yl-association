import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import PartnersSwiper from './partners-swiper'

export default async function PartnersList() {
  try {
    const payload = await getPayload({ config })
    const partners = await payload.find({
      collection: 'partners',
    })

    return (
      <div className="flex items-center px-32 mt-12">
        <div className="relative flex justify-center items-center">
          <div className="absolute border border-primary group hover:bg-primary rounded-full left-4 z-10 w-10 h-10 flex justify-center items-center">
            <ChevronLeft
              size={24}
              strokeWidth={1.2}
              className="text-primary group-hover:text-white"
            />
          </div>
        </div>
        <div className="w-full px-24 overflow-hidden">
          <PartnersSwiper partners={partners} />
        </div>
        <div className="relative flex justify-center items-center">
          <div className="absolute border border-primary group hover:bg-primary rounded-full right-4 z-10 w-10 h-10 flex justify-center items-center">
            <ChevronRight
              size={24}
              strokeWidth={1.2}
              className="text-primary group-hover:text-white"
            />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return null
  }
}
