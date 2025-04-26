import { ChevronLeft, ChevronRight, ArrowRight, Users, Award, Target } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import AboutUsImagesSwiper from './about-us-swiper'
import { HomePage } from '../payload-types'

interface AboutUsSectionProps {
  aboutUsData: HomePage['aboutUsSection']
}

export default function AboutUsSection({ aboutUsData }: AboutUsSectionProps) {
  const images: string[] =
    (aboutUsData?.aboutUsSectionImages
      ?.map((item) => {
        if (item.image && typeof item.image !== 'number' && item.image.filename) {
          return process.env.NEXT_PUBLIC_CLOUDFLARE_PUB_URL + item.image.filename
        }
        return null
      })
      .filter(Boolean) as string[]) || []

  return (
    <section className="py-24 bg-gradient-to-br from-[#0039F0]/5 via-white to-[#0039F0]/5">
      <div className="px-4 md:px-8 xl:px-32 mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#0039F0]/10 px-4 py-2 rounded-full mb-6">
            <span className="text-[#0039F0] font-semibold">Notre association</span>
          </div>
          <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-6">
            {aboutUsData?.aboutUsSectionTitle || 'À propos de Young Leaders'}
          </h2>
          <p className="text-gray-600 md:w-2/3 mx-auto">
            {aboutUsData?.aboutUsSectionDescription
              ? typeof aboutUsData.aboutUsSectionDescription === 'string'
                ? aboutUsData.aboutUsSectionDescription
                : 'Découvrez notre mission, notre histoire et les valeurs qui guident notre association.'
              : 'Découvrez notre mission, notre histoire et les valeurs qui guident notre association.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-[#0039F0]/10 flex items-center justify-center mb-6">
              <Target className="text-[#0039F0]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Notre mission</h3>
            <p className="text-gray-600">
              Former et accompagner la prochaine génération de leaders capables de faire face aux
              défis de demain.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-[#0039F0]/10 flex items-center justify-center mb-6">
              <Users className="text-[#0039F0]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Notre communauté</h3>
            <p className="text-gray-600">
              Un réseau diversifié de professionnels, d&apos;experts et de jeunes talents partageant
              les mêmes valeurs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full bg-[#0039F0]/10 flex items-center justify-center mb-6">
              <Award className="text-[#0039F0]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Notre expertise</h3>
            <p className="text-gray-600">
              Des années d&apos;expérience dans la formation au leadership et le développement de
              compétences professionnelles.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 md:px-8 xl:px-32">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg">
          <AboutUsImagesSwiper images={images} />
          <div className="absolute bottom-6 left-6 z-20 flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors">
              <ChevronLeft size={20} className="text-gray-800" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors">
              <ChevronRight size={20} className="text-gray-800" />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Nous formons les leaders de demain depuis plus de 10 ans
          </h3>
          <p className="text-gray-600 mb-4">
            Young Leaders Association a été fondée avec la conviction que chaque jeune talent
            possède le potentiel de devenir un leader inspirant. Notre approche combine théorie et
            pratique pour développer des compétences essentielles en leadership.
          </p>
          <p className="text-gray-600 mb-6">
            Grâce à notre réseau d&apos;experts et nos méthodes éprouvées, nous avons accompagné des
            centaines de personnes dans leur développement professionnel et personnel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-6 rounded-full"
            >
              Nous contacter
            </a>
            <a
              href="/a-propos"
              className="inline-flex items-center justify-center border-2 border-gray-300 hover:border-[#0039F0] hover:text-[#0039F0] transition-colors duration-300 text-gray-700 font-semibold py-3 px-6 rounded-full"
            >
              En savoir plus
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
