'use client'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function AboutUsImagesSwiper({ images }: { images: string[] }) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative">
            <Image src={image} alt="Young Leaders" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
