import React from 'react'
import Image from 'next/image'
import { Lightbulb, Award, Star } from 'lucide-react'
import { Locale, translations } from '@/lib/translations'

interface Testimonial {
  quote: string
  name: string
  role: string
  company?: string
  image?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Participer aux formations de Young Leaders a été un tournant dans ma carrière. J'ai acquis des compétences essentielles en leadership qui m'ont permis d'obtenir une promotion dans mon entreprise.",
    name: 'Marie Dupont',
    role: 'Directrice Marketing',
    company: 'TechInnovate',
    image: '/testimonials/testimonial-1.jpg',
  },
  {
    quote:
      "Le programme de mentorat m'a donné accès à des professionnels exceptionnels qui m'ont guidé dans ma transition de carrière. Je recommande cette association à tous les jeunes ambitieux.",
    name: 'Lucas Moreau',
    role: 'Entrepreneur',
    company: 'Startup Écologique',
    image: '/testimonials/testimonial-2.jpg',
  },
  {
    quote:
      "Les ateliers pratiques et les études de cas réels ont transformé ma vision du leadership. J'ai désormais les outils pour inspirer mon équipe et générer des résultats concrets.",
    name: 'Camille Leroy',
    role: "Responsable d'Équipe",
    company: 'Secteur Public',
    image: '/testimonials/testimonial-3.jpg',
  },
]

export default function Testimonials({
  locale,
  testimonials = defaultTestimonials,
}: {
  locale: Locale
  testimonials?: Testimonial[]
}) {
  const t = translations[locale]

  return (
    <section className="px-4 md:px-8 xl:px-32 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-4">
          {t.common.successStories}
        </h2>
        <p className="text-gray-600 md:w-2/3 mx-auto">
          {t.common.testimonialsDescription}
        </p>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-[#0039F0]/5 to-[#0039F0]/10 p-8 rounded-xl text-center">
          <div className="flex justify-center mb-4">
            <Lightbulb size={40} className="text-[#0039F0]" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-2">95%</h3>
          <p className="text-gray-600">
            {t.common.recommendationMetric}
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#0039F0]/5 to-[#0039F0]/10 p-8 rounded-xl text-center">
          <div className="flex justify-center mb-4">
            <Award size={40} className="text-[#0039F0]" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-2">+40%</h3>
          <p className="text-gray-600">
            {t.common.leadershipMetric}
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#0039F0]/5 to-[#0039F0]/10 p-8 rounded-xl text-center">
          <div className="flex justify-center mb-4">
            <Star size={40} className="text-[#0039F0]" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-2">2500+</h3>
          <p className="text-gray-600">
            {t.common.hoursMetric}
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              {testimonial.image ? (
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-full bg-[#0039F0]/20 flex items-center justify-center">
                  <span className="text-[#0039F0] font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">
                  {testimonial.role}
                  {testimonial.company ? `, ${testimonial.company}` : ''}
                </p>
              </div>
            </div>
            <div className="relative">
              <svg
                className="absolute -top-2 -left-2 h-6 w-6 text-[#0039F0]/30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-600 italic">{testimonial.quote}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
