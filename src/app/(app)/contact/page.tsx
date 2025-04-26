import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function ContactPage() {
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'contactPage',
    })

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-[#0039F0] py-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <Image
              fill
              className="object-cover"
              src={
                pageGlobal?.heroImage &&
                typeof pageGlobal?.heroImage !== 'number' &&
                pageGlobal?.heroImage.url
                  ? pageGlobal?.heroImage.url
                  : '/hero.jpg'
              }
              alt="Contact Hero"
              priority
            />
          </div>
          <div className="container mx-auto px-4 md:px-8 xl:px-32 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <Mail className="text-white mr-2" size={18} />
                <span className="text-white font-semibold">Contactez-nous</span>
              </div>
              <h1 className="font-extrabold text-white text-4xl md:text-6xl leading-tight mb-6">
                {pageGlobal?.heroTitle || 'Discutons de votre projet'}
              </h1>
              <p className="text-gray-100 text-lg md:text-xl mb-8 md:w-5/6">
                {pageGlobal?.heroDescription ||
                  'Notre équipe est à votre disposition pour répondre à toutes vos questions. Contactez-nous dès aujourd&apos;hui.'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-8 xl:px-32 py-12 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
              {/* Contact Form - Reusing form from home page */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Envoyez-nous un message
                </h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nom complet
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full bg-white p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full bg-white p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sujet
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="w-full bg-white p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full bg-white p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                      placeholder="Votre message"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        className="w-4 h-4 text-[#0039F0] border-gray-300 rounded focus:ring-[#0039F0]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="text-gray-600">
                        J&apos;accepte que mes données soient traitées conformément à la{' '}
                        <a href="/privacy" className="text-[#0039F0] hover:underline">
                          politique de confidentialité
                        </a>
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-medium py-4 px-6 rounded-lg shadow-sm hover:shadow-md"
                    >
                      Envoyer le message
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Information */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 h-full">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations de contact</h2>

                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                        <Phone className="text-[#0039F0]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Téléphone</h3>
                        <p className="text-gray-600">+33 (0)1 23 45 67 89</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                        <Mail className="text-[#0039F0]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                        <p className="text-gray-600">contact@yl-association.org</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                        <MapPin className="text-[#0039F0]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Adresse</h3>
                        <p className="text-gray-600">10 Rue de la Liberté, 75001 Paris, France</p>
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#0039F0] hover:underline mt-2 text-sm"
                        >
                          Voir sur la carte <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0039F0]/10 flex items-center justify-center mr-4">
                        <Clock className="text-[#0039F0]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          Heures d&apos;ouverture
                        </h3>
                        <p className="text-gray-600">Lundi - Vendredi: 9h00 - 18h00</p>
                        <p className="text-gray-600">Samedi - Dimanche: Fermé</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-2xl shadow-sm p-6 overflow-hidden mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nous trouver</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-200">
               
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Carte interactive</p>
                </div>
              </div>
            </div> */}

            {/* FAQ Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Vous avez encore des questions ?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Consultez notre FAQ pour trouver des réponses aux questions fréquemment posées sur
                nos programmes et services.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full"
              >
                Voir notre FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading contact page:', error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Une erreur est survenue</h1>
        <p className="text-gray-600 mb-6">
          Nous n&apos;avons pas pu charger la page de contact. Veuillez réessayer plus tard.
        </p>
        <Link href="/" className="text-[#0039F0] hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    )
  }
}
