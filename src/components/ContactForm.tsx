'use client'
import React, { useState } from 'react'
import { translations, Locale } from '@/lib/translations'

interface ContactFormProps {
  locale: Locale
}

export default function ContactForm({ locale }: ContactFormProps) {
  const t = translations[locale]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '', privacy: false })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setStatus('error')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {t.contact.sendMessage}
      </h2>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center mb-6">
          <h3 className="font-bold mb-2 text-lg">{t.trainings.successTitle}</h3>
          <p>{locale === 'fr' ? 'Votre message a été envoyé avec succès. Nous vous répondrons bientôt.' : 'Your message has been sent successfully. We will get back to you soon.'}</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-4 text-green-800 font-semibold underline"
          >
            {locale === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
              {locale === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : 'An error occurred. Please try again.'}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t.contact.fullName}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                placeholder={t.contact.fullNamePlaceholder}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
                placeholder={t.contact.emailPlaceholder}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              {t.contact.subject}
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
              placeholder={t.contact.subjectPlaceholder}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 focus:border-[#0039F0] focus:ring-2 focus:ring-[#0039F0]/20 focus:outline-none transition-colors"
              placeholder={t.contact.messagePlaceholder}
              required
            ></textarea>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                checked={formData.privacy}
                onChange={handleChange}
                required
                className="w-4 h-4 text-[#0039F0] border-gray-300 rounded focus:ring-[#0039F0]"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="privacy" className="text-gray-600">
                {t.contact.privacyAgreement}{' '}
                <a href="/privacy" className="text-[#0039F0] hover:underline">
                  {locale === 'fr' ? 'politique de confidentialité' : 'privacy policy'}
                </a>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-medium py-4 px-6 rounded-lg shadow-sm hover:shadow-md ${
                status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {status === 'loading' ? (locale === 'fr' ? 'Envoi en cours...' : 'Sending...') : t.contact.sendButton}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
