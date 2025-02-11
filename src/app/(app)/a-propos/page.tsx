import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

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
                  pageGlobal.about?.heroImage &&
                  typeof pageGlobal.about?.heroImage !== 'number' &&
                  pageGlobal.about?.heroImage.url
                    ? pageGlobal.about?.heroImage.url
                    : '/hero2.jpg'
                }
                alt="Young Leaders"
              />
            </div>
            <div className="flex flex-col xl:flex-row items-center h-full px-4 xl:px-32">
              <div className="flex xl:w-[50rem]">
                <div className="flex flex-col gap-4">
                  <h2 className="font-extrabold text-white text-6xl leading-[5rem] text-center xl:text-left">
                    {pageGlobal.about?.heroTitle}
                  </h2>
                  <p className="text-gray-100 text-lg w-[80%] text-center xl:text-left">
                    {pageGlobal.about?.heroDescription}
                  </p>
                  <div className="flex justify-center xl:justify-start">
                    <a
                      href="#contact-us"
                      className="bg-background text-sm px-12 md:px-12 py-4 rounded text-white font-medium"
                    >
                      {pageGlobal.about?.heroButtonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="p-32">
          <h2 className="text-gray-800 font-extrabold text-3xl md:text-5xl mb-12">
            {pageGlobal.about?.aboutUsSectionTitle}
          </h2>
          <RichText data={pageGlobal.about?.aboutUsSectionDescription as any} />
        </section>
      </div>
    )
  } catch (error) {}
}
