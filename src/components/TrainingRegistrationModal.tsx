'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Modal from './ui/Modal'
import { translations, Locale } from '@/lib/translations'
import { CheckCircle2 } from 'lucide-react'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  locale: Locale
  trainingName: string
  trainingImage?: string
}

export default function TrainingRegistrationModal({
  isOpen,
  onClose,
  locale,
  trainingName,
  trainingImage,
}: RegistrationModalProps) {
  const t = translations[locale]
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/register-training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trainingName, ...formData }),
      })

      if (response.ok) {
        setStatus('success')
        setIsSubmitted(true)
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setStatus('error')
    } finally {
      setStatus('idle')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (isSubmitted) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsSubmitted(false)
          onClose()
        }}
        title={t.trainings.successTitle}
      >
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {t.trainings.successTitle}
          </h3>
          <p className="text-gray-600 mb-8">
            {t.trainings.successMessage}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              onClose()
            }}
            className="w-full bg-[#0039F0] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0030cc] transition-colors"
          >
            OK
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.trainings.registrationFormTitle}
    >
      <div className="p-6">
        {/* Training Summary */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-8">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={trainingImage || '/hero2.jpg'}
              alt={trainingName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{trainingName}</h4>
            <p className="text-sm text-gray-500">{t.trainings.registrationFormSubtitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700 mb-1">
              {t.contact.fullName}
            </label>
            <input
              required
              id="reg-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white p-4 rounded-xl border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-all"
              placeholder={t.contact.fullNamePlaceholder}
            />
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">
              {t.contact.contactInfo}
            </label>
            <input
              required
              id="reg-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white p-4 rounded-xl border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-all"
              placeholder={t.contact.emailPlaceholder}
            />
          </div>

          <div>
            <label htmlFor="reg-phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t.contact.phone}
            </label>
            <input
              required
              id="reg-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white p-4 rounded-xl border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-all"
              placeholder="+242 ..."
            />
          </div>

          <div>
            <label htmlFor="reg-gender" className="block text-sm font-medium text-gray-700 mb-1">
              {t.trainings.gender}
            </label>
            <select
              required
              id="reg-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-white p-4 rounded-xl border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-all"
            >
              <option value="">-- {t.common.filter} --</option>
              <option value="male">{t.trainings.genderMale}</option>
              <option value="female">{t.trainings.genderFemale}</option>
              <option value="other">{t.trainings.genderOther}</option>
            </select>
          </div>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
              {locale === 'fr' ? 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.' : 'An error occurred during submission. Please try again.'}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full bg-[#0039F0] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#0030cc] transition-all mt-4 shadow-lg shadow-[#0039F0]/20 ${
              status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {status === 'loading' ? (locale === 'fr' ? 'Envoi en cours...' : 'Registering...') : t.common.register}
          </button>
        </form>
      </div>
    </Modal>
  )
}
