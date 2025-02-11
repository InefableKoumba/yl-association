'use client'
import { Partner } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function PartnersSwiper({ partners }: { partners: PaginatedDocs<Partner> }) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={5}
      centeredSlides
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {partners.docs.map((partner, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-44 rounded bg-[#3AA6D1]"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
