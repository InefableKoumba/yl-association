import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import AboutUsImagesSwiper from './about-us-swiper'

export default async function AboutUsSection() {
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'pages',
    })

    const images = []

    if (pageGlobal.home?.aboutUsSectionImages) {
      for (const heroImage of pageGlobal.home.aboutUsSectionImages) {
        if (
          heroImage.heroImage &&
          typeof heroImage.heroImage !== 'number' &&
          heroImage.heroImage.filename
        ) {
          images.push(process.env.NEXT_PUBLIC_CLOUDFLARE_PUB_URL + heroImage.heroImage.filename)
        }
      }
    }

    return (
      <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 bg-primary">
        <div className="flex flex-col gap-4 px-4 md:px-8 xl:pl-32 py-12 md:py-24">
          <h2 className="text-white font-extrabold text-3xl md:text-5xl">
            {pageGlobal.home?.aboutUsSectionTitle}
          </h2>
          <p className="text-gray-100">{pageGlobal.home?.aboutUsSectionDescription}</p>
          <div className="flex">
            <a
              href="#contact-us"
              className="bg-background text-sm px-4 xl:px-6 py-3 xl:py-4 rounded text-white font-medium"
            >
              {pageGlobal.home?.aboutUsSectionButtonText}
            </a>
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="relative">
            <div className="absolute border border-primary group hover:bg-primary rounded-full left-4 top-1/2 z-10 w-10 h-10 flex justify-center items-center">
              <ChevronLeft
                size={24}
                strokeWidth={1.2}
                className="text-primary group-hover:text-white"
              />
            </div>
          </div>
          <AboutUsImagesSwiper images={images} />
          <div className="relative">
            <div className="absolute border border-primary group hover:bg-primary rounded-full right-4 top-1/2 z-10 w-10 h-10 flex justify-center items-center">
              <ChevronRight
                size={24}
                strokeWidth={1.2}
                className="text-primary group-hover:text-white"
              />
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    return null
  }
}
