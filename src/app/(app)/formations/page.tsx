import TrainingsList from '@/components/training-list'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'

export default async function Page() {
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'pages',
    })

    return (
      <div>
        <header>
          <div className="relative h-[40rem]">
            <div className="absolute left-0 top-0 w-full h-full -z-10">
              <div className="absolute left-0 top-0 w-full h-full bg-black from-black bg-opacity-60 z-10"></div>
              <Image
                fill
                className="object-top object-cover"
                src={
                  pageGlobal.trainings?.heroImage &&
                  typeof pageGlobal.trainings?.heroImage !== 'number' &&
                  pageGlobal.trainings?.heroImage.url
                    ? pageGlobal.trainings?.heroImage.url
                    : '/hero2.jpg'
                }
                alt="Young Leaders"
              />
            </div>
            <div className="flex flex-col xl:flex-row items-center h-full px-4 xl:px-32">
              <div className="flex xl:w-[50rem]">
                <div className="flex flex-col gap-4">
                  <h2 className="font-extrabold text-white text-6xl leading-[5rem] text-center xl:text-left">
                    {pageGlobal.trainings?.heroTitle}
                  </h2>
                  <p className="text-gray-100 text-lg w-[80%] text-center xl:text-left">
                    {pageGlobal.trainings?.heroDescription}
                  </p>
                  <div className="flex justify-center xl:justify-start">
                    <a
                      href="#contact-us"
                      className="bg-background text-sm px-12 md:px-12 py-4 rounded text-white font-medium"
                    >
                      {pageGlobal.trainings?.heroButtonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="xl:px-32 py-24">
          <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold">
            {pageGlobal.trainings?.trainingsSectionTitle}
          </h2>
          <p className="xl:w-2/3 mt-4">{pageGlobal.trainings?.heroDescription}</p>
          <div className="mt-12">
            <TrainingsList />
          </div>
        </section>
      </div>
    )
  } catch (error) {
    return null
  }
}
