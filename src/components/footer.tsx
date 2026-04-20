'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { COOKIE_NAME, DEFAULT_LOCALE, translations, Locale } from '@/lib/translations'

interface FooterProps {
  socialLinks?: {
    facebook?: string | null
    instagram?: string | null
    linkedin?: string | null
    youtube?: string | null
  } | null
}

export default function Footer({ socialLinks }: FooterProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(DEFAULT_LOCALE)

  // Initialize locale from cookie
  useEffect(() => {
    const cookies = document.cookie.split('; ')
    const localeCookie = cookies.find(row => row.startsWith(`${COOKIE_NAME}=`))
    if (localeCookie) {
      setCurrentLocale(localeCookie.split('=')[1] as Locale)
    }
  }, [])

  const t = translations[currentLocale]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="px-4 md:px-8 xl:px-32 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1">Young Leaders</h3>
              <p className="text-gray-400 text-sm">
                {t.footer.associationDescription}
              </p>
            </div>
            <p className="text-gray-300 mb-6">
              {t.footer.missionStatement}
            </p>
            <div className="flex gap-4">
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#0674E7] transition-all duration-300 rounded-xl flex items-center justify-center group"
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="group-hover:scale-110 transition-transform">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#E4405F] transition-all duration-300 rounded-xl flex items-center justify-center group"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#0077B5] transition-all duration-300 rounded-xl flex items-center justify-center group"
                  aria-label="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="group-hover:scale-110 transition-transform">
                    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.59c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.69h-3.56V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                  </svg>
                </a>
              )}
              {socialLinks?.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 hover:bg-[#FF0000] transition-all duration-300 rounded-xl flex items-center justify-center group"
                  aria-label="YouTube"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="group-hover:scale-110 transition-transform">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.017 3.017 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t.footer.usefulLinks}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/formations"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.nav.trainings}
                </Link>
              </li>
              <li>
                <Link
                  href="/programmes"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.nav.programs}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t.footer.information}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.footer.termsOfUse}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t.footer.newsletter}</h4>
            <p className="text-gray-300 mb-4">
              {t.footer.stayInformed}
            </p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const email = (e.currentTarget.elements.namedItem('newsletter-email') as HTMLInputElement).value;
              const button = e.currentTarget.querySelector('button');
              if (button) button.disabled = true;

              try {
                const res = await fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email }),
                });
                if (res.ok) {
                  alert(currentLocale === 'fr' ? 'Merci de votre inscription !' : 'Thank you for subscribing!');
                  (e.target as HTMLFormElement).reset();
                } else {
                  throw new Error();
                }
              } catch (err) {
                alert(currentLocale === 'fr' ? 'Une erreur est survenue.' : 'An error occurred.');
              } finally {
                if (button) button.disabled = false;
              }
            }} className="space-y-3">
              <div className="relative">
                <input
                  id="newsletter-email"
                  name="newsletter-email"
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:border-[#0039F0]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} Young Leaders Association. {t.footer.rights}
          </p>
          <div className="mt-4 md:mt-0 flex gap-4 text-sm text-gray-400">
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <span>|</span>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
