'use client'

import Image from 'next/image'
import React, { useState, useTransition } from 'react'
import { Heart, CreditCard, Phone, Check, ChevronDown, AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  const [selectedTier, setSelectedTier] = useState<number | 'custom' | null>(null)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    country: 'congo',
    phone_number: '',
    anonymous: false,
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [isPending, startTransition] = useTransition()

  // Donation tiers
  const donationTiers = [
    { amount: 5000, label: 'Soutien de base', description: 'Aide à couvrir nos frais généraux' },
    { amount: 10000, label: 'Contributeur', description: 'Finance un atelier pour 2 jeunes' },
    { amount: 25000, label: 'Partenaire', description: 'Soutient un programme complet' },
    { amount: 50000, label: 'Mécène', description: 'Impact significatif sur notre mission' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setDonorDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleTierSelect = (amount: number | 'custom') => {
    setSelectedTier(amount)
    if (amount !== 'custom') {
      setCustomAmount('')
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
  }

  const requestPayment = async (formData: FormData): Promise<void> => {
    // Set form to submitting state
    setFormStatus('submitting')

    try {
      // Determine the amount to use
      let amount = ''
      if (selectedTier === 'custom') {
        amount = customAmount
      } else if (selectedTier) {
        amount = selectedTier.toString()
      } else {
        // Fallback to form data amount if no tier selected
        amount = formData.get('amount') as string
      }

      // Make sure we have an amount
      if (!amount || parseInt(amount) < 100) {
        throw new Error('Veuillez sélectionner ou entrer un montant valide.')
      }

      // Validate phone number
      const phoneNumber = formData.get('phone_number') as string
      if (!phoneNumber || phoneNumber.trim() === '') {
        throw new Error('Veuillez entrer un numéro de téléphone valide.')
      }

      // Call our backend API endpoint instead of MTN API directly
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          phoneNumber,
          name: formData.get('name'),
          email: formData.get('email'),
          anonymous: formData.get('anonymous') === 'on',
        }),
      })

      if (response.ok) {
        setFormStatus('success')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors du traitement du paiement.')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setFormStatus('error')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(() => {
      requestPayment(formData)
    })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="relative py-12 md:py-20 bg-[#0039F0]">
        <div className="absolute inset-0 opacity-10">
          <Image fill className="object-cover" src="/hero2.jpg" alt="Background pattern" priority />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
              <Heart className="text-white" size={30} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Votre soutien fait la différence
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Chaque don contribue à former la prochaine génération de leaders en Afrique et à créer
              un impact durable dans nos communautés.
            </p>
            <a
              href="#donation-form"
              className="inline-block bg-white text-[#0039F0] font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Faire un don maintenant
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Impact Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">L&apos;impact de votre don</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-[#0039F0]/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="text-[#0039F0]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Formation de jeunes</h3>
                <p className="text-gray-600">
                  Votre don permet de financer des programmes de formation de qualité pour les
                  jeunes talents.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-[#0039F0]/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="text-[#0039F0]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Organisation d&apos;événements</h3>
                <p className="text-gray-600">
                  Nous organisons des conférences et ateliers pour développer les compétences en
                  leadership.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-[#0039F0]/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="text-[#0039F0]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Mentorat et accompagnement</h3>
                <p className="text-gray-600">
                  Nous mettons en relation les jeunes avec des mentors expérimentés pour les guider.
                </p>
              </div>
            </div>
          </section>

          {/* Donation Form Section */}
          <section id="donation-form" className="mb-16 scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left side - Donation options and amounts */}
                <div className="lg:col-span-2 bg-gray-50 p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-6">Choisissez votre contribution</h2>

                  <div className="space-y-4 mb-8">
                    {donationTiers.map((tier) => (
                      <label key={tier.amount} className="block">
                        <div
                          className={`bg-white border ${
                            selectedTier === tier.amount
                              ? 'border-[#0039F0] ring-2 ring-[#0039F0]/20'
                              : 'border-gray-200 hover:border-[#0039F0]'
                          } rounded-lg p-4 cursor-pointer transition-colors flex items-start`}
                          onClick={() => handleTierSelect(tier.amount)}
                        >
                          <input
                            type="radio"
                            name="donation-amount"
                            value={tier.amount}
                            className="mt-1 mr-3"
                            checked={selectedTier === tier.amount}
                            onChange={() => {}}
                          />
                          <div>
                            <div className="font-medium">
                              {tier.label} - {tier.amount.toLocaleString()} XAF
                            </div>
                            <div className="text-sm text-gray-600">{tier.description}</div>
                          </div>
                        </div>
                      </label>
                    ))}

                    <label className="block">
                      <div
                        className={`bg-white border ${
                          selectedTier === 'custom'
                            ? 'border-[#0039F0] ring-2 ring-[#0039F0]/20'
                            : 'border-gray-200 hover:border-[#0039F0]'
                        } rounded-lg p-4 cursor-pointer transition-colors`}
                        onClick={() => handleTierSelect('custom')}
                      >
                        <div className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="donation-amount"
                            value="custom"
                            className="mr-3"
                            checked={selectedTier === 'custom'}
                            onChange={() => {}}
                          />
                          <div className="font-medium">Montant personnalisé</div>
                        </div>
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0]"
                          placeholder="Entrez un montant..."
                          min="1000"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          disabled={selectedTier !== 'custom'}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 mb-6">
                    <div className="flex gap-2">
                      <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Important</p>
                        <p className="text-sm">
                          100% de votre don est utilisé pour nos programmes. Nous vous enverrons un
                          reçu fiscal par email.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    <h3 className="font-medium text-gray-700 mb-1">À propos de vos données</h3>
                    <p>
                      Vos informations personnelles sont utilisées uniquement pour traiter votre don
                      et vous envoyer un reçu. Consultez notre{' '}
                      <Link href="/privacy" className="text-[#0039F0] hover:underline">
                        politique de confidentialité
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Right side - Payment form */}
                <div className="lg:col-span-3 p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-8">Vos informations</h2>

                  {formStatus === 'success' ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Check className="text-green-600" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        Merci pour votre don !
                      </h3>
                      <p className="text-green-700 mb-6">
                        Votre paiement a été traité avec succès. Un e-mail de confirmation vous a
                        été envoyé.
                      </p>
                      <p className="text-green-600 mb-8">
                        Grâce à votre soutien, nous pouvons continuer à développer nos programmes
                        pour les jeunes leaders.
                      </p>
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center py-2 px-6 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-colors font-medium rounded-lg"
                      >
                        Retour à l&apos;accueil
                      </Link>
                    </div>
                  ) : formStatus === 'error' ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="text-red-600" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-red-800 mb-2">
                        Une erreur est survenue
                      </h3>
                      <p className="text-red-700 mb-6">
                        Nous n&apos;avons pas pu traiter votre paiement. Veuillez vérifier vos
                        informations et réessayer.
                      </p>
                      <button
                        onClick={() => setFormStatus('idle')}
                        className="inline-flex items-center justify-center py-2 px-6 bg-red-600 text-white hover:bg-red-700 transition-colors font-medium rounded-lg"
                      >
                        Réessayer
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <input
                          name="anonymous"
                          id="anonymous"
                          type="checkbox"
                          className="w-4 h-4"
                          checked={donorDetails.anonymous}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="anonymous" className="text-gray-700 cursor-pointer">
                          Je préfère faire un don anonyme
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                            Nom complet
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={donorDetails.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0]"
                            placeholder="Votre nom & prénom"
                            disabled={donorDetails.anonymous}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={donorDetails.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0]"
                            placeholder="Votre adresse email"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-gray-700 font-medium mb-1">
                          Pays
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            name="country"
                            value={donorDetails.country}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0]"
                          >
                            <option value="congo">Congo</option>
                            <option value="rdc">RDC</option>
                            <option value="cameroun">Cameroun</option>
                            <option value="gabon">Gabon</option>
                            <option value="other">Autre pays</option>
                          </select>
                          <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                            size={20}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">
                          Montant du don
                        </label>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          min="100"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0]"
                          placeholder="Entrez le montant (XAF)"
                          value={selectedTier === 'custom' ? customAmount : selectedTier || ''}
                          readOnly
                        />
                        {!selectedTier && (
                          <p className="text-amber-600 text-sm mt-1">
                            Veuillez sélectionner un montant ci-contre
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-700 mb-3">
                          Choisir un moyen de paiement
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <label className="block">
                            <div className="bg-white border border-gray-200 hover:border-[#0039F0] rounded-lg p-4 cursor-pointer transition-colors flex items-center">
                              <input
                                type="radio"
                                name="payment-method"
                                value="mtn"
                                className="mr-3"
                                defaultChecked
                              />
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 relative">
                                  <Image
                                    src="/mtn.png"
                                    alt="MTN Mobile Money"
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span>MTN Mobile Money</span>
                              </div>
                            </div>
                          </label>
                          <label className="block">
                            <div className="bg-white border border-gray-200 hover:border-[#0039F0] rounded-lg p-4 cursor-pointer transition-colors flex items-center opacity-60">
                              <input
                                type="radio"
                                name="payment-method"
                                value="card"
                                className="mr-3"
                                disabled
                              />
                              <div className="flex items-center gap-2">
                                <CreditCard size={24} />
                                <span>Carte bancaire (Bientôt)</span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone_number"
                          className="block text-gray-700 font-medium mb-1"
                        >
                          Numéro MTN Mobile Money
                        </label>
                        <div className="flex">
                          <div className="flex-shrink-0 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3 flex items-center">
                            <Phone size={20} className="text-gray-500" />
                          </div>
                          <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            value={donorDetails.phone_number}
                            onChange={handleInputChange}
                            className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#0039F0]/20 focus:border-[#0039F0]"
                            placeholder="+242 06 000 00 00"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!selectedTier || formStatus === 'submitting' || isPending}
                        className="w-full bg-[#0039F0] hover:bg-[#0030cc] disabled:bg-[#0039F0]/50 disabled:cursor-not-allowed transition-colors py-4 px-6 text-white font-medium rounded-lg flex items-center justify-center gap-2"
                      >
                        {formStatus === 'submitting' || isPending ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Traitement en cours...
                          </>
                        ) : (
                          <>
                            <Heart size={20} />
                            Faire un don maintenant
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials/FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">Questions fréquentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">Comment sont utilisés mes dons ?</h3>
                <p className="text-gray-600">
                  Vos dons servent à financer nos programmes de formation, nos événements et toutes
                  nos activités visant à développer le leadership chez les jeunes africains.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">Puis-je obtenir un reçu fiscal ?</h3>
                <p className="text-gray-600">
                  Oui, vous recevrez automatiquement un reçu fiscal par email pour tout don
                  effectué. Si vous ne le recevez pas, contactez-nous.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">Puis-je faire un don mensuel ?</h3>
                <p className="text-gray-600">
                  Nous travaillons actuellement sur la mise en place d&apos;un système de dons
                  mensuels. Cette fonctionnalité sera bientôt disponible.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">
                  Comment puis-je suivre l&apos;utilisation de mon don ?
                </h3>
                <p className="text-gray-600">
                  Nous envoyons régulièrement des rapports d&apos;activité à nos donateurs pour les
                  tenir informés de l&apos;impact de leurs contributions.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-4">Besoin d&apos;aide pour votre don ?</h2>
            <p className="text-gray-600 mb-6">
              Notre équipe est disponible pour répondre à toutes vos questions sur le processus de
              don.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center py-3 px-6 border border-[#0039F0] text-[#0039F0] hover:bg-[#0039F0] hover:text-white transition-colors font-medium rounded-lg"
            >
              Contactez-nous
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
