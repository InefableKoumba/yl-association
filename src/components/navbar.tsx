'use client'
import { Facebook, Mail, Menu, Phone, X, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { COOKIE_NAME, DEFAULT_LOCALE, translations, Locale } from '@/lib/translations'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentLocale, setCurrentLocale] = useState<Locale>(DEFAULT_LOCALE)

  // Initialize locale from cookie
  useEffect(() => {
    const cookies = document.cookie.split('; ')
    const localeCookie = cookies.find(row => row.startsWith(`${COOKIE_NAME}=`))
    if (localeCookie) {
      setCurrentLocale(localeCookie.split('=')[1] as Locale)
    }
  }, [])

  const handleLanguageChange = (newLocale: Locale) => {
    document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; max-age=31536000`
    setCurrentLocale(newLocale)
    window.location.reload()
  }

  const t = translations[currentLocale]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Add body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/a-propos', label: t.nav.about },
    { href: '/domaine-de-formation', label: t.nav.trainings },
    { href: '/evenements', label: t.nav.events },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 bg-white  ${scrolled ? 'shadow-md' : undefined}`}
    >
      <div
        className={`bg-[#0039F0] transition-all duration-300 text-white py-2 px-4 text-center text-sm font-medium ${scrolled ? 'py-2' : 'py-4'
          }`}
      >
        {t.nav.donate}
        <Link href="/faire-un-don" className="ml-2 underline hover:text-white/90 transition-colors">
          {t.nav.donateButton} &rarr;
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-10 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              height={18}
              width={40}
              className="w-12 md:w-16 transition-transform hover:scale-105"
              src="/logo.png"
              alt="Logo Young Leaders"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-gray-700 hover:text-[#0039F0] transition-colors duration-200 font-medium ${pathname === link.href ? 'text-[#0039F0] font-semibold' : ''
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language & Contact */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative group">
            <button
              className="flex items-center space-x-2 px-3 py-2 rounded-full border border-gray-200 hover:border-[#0039F0] hover:bg-[#0039F0]/5 transition-all"
              aria-label={t.nav.languageSwitcher}
            >
              <Globe size={16} className="text-[#0039F0]" />
              <span className="text-sm font-bold text-gray-700 capitalize">
                {currentLocale === 'fr' ? '🇫🇷 FR' : '🇺🇸 EN'}
              </span>
            </button>
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60] min-w-[140px] overflow-hidden">
              <button
                onClick={() => handleLanguageChange('fr')}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center transition-colors ${currentLocale === 'fr' ? 'bg-[#0039F0]/5 text-[#0039F0] font-bold' : 'text-gray-700'}`}
              >
                <span className="mr-3 text-lg">🇫🇷</span> Français
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center transition-colors ${currentLocale === 'en' ? 'bg-[#0039F0]/5 text-[#0039F0] font-bold' : 'text-gray-700'}`}
              >
                <span className="mr-3 text-lg">🇺🇸</span> English
              </button>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center bg-[#0039F0] hover:bg-[#0030cc] text-white transition-all duration-300 font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg active:scale-95"
          >
            <Phone className="mr-2" size={16} /> {t.nav.contact}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          {isMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[56px] md:top-[72px] left-0 right-0 bg-white shadow-lg transform transition-all duration-300 ease-in-out overflow-auto ${isMenuOpen
          ? 'opacity-100 max-h-[calc(100vh-72px)]'
          : 'opacity-0 max-h-0 pointer-events-none'
          }`}
        style={{ height: isMenuOpen ? 'calc(100vh - 72px)' : '0' }}
      >
        <div className="px-4 py-6 space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 text-gray-700 hover:text-[#0039F0] text-lg font-medium border-b border-gray-100 ${pathname === link.href ? 'text-[#0039F0] font-semibold' : ''
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-6 mt-4 flex flex-col space-y-4">
            <p className="text-sm text-gray-500 font-medium">{t.nav.contact}</p>

            <div className="flex items-center gap-4 py-2">
              <button
                onClick={() => handleLanguageChange('fr')}
                className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${currentLocale === 'fr' ? 'border-[#0039F0] bg-[#0039F0]/5 text-[#0039F0]' : 'border-gray-200 text-gray-700'}`}
              >
                <span>🇫🇷</span> FR
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${currentLocale === 'en' ? 'border-[#0039F0] bg-[#0039F0]/5 text-[#0039F0]' : 'border-gray-200 text-gray-700'}`}
              >
                <span>🇺🇸</span> EN
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="text-gray-500" size={16} />
              <a
                href="mailto:contact@yl-association.org"
                className="text-gray-700 hover:text-[#0039F0]"
              >
                contact@yl-association.org
              </a>
            </div>


            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] text-white transition-colors duration-300 font-medium py-3 px-5 rounded-lg mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="mr-2" size={18} /> {t.nav.contact}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
