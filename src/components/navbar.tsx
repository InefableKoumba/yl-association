'use client'
import { Facebook, Mail, Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    { href: '/', label: 'Accueil' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/formations', label: 'Formations' },
    { href: '/evenements', label: 'Événements' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-10 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              height={20}
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
              className={`text-gray-700 hover:text-[#0039F0] transition-colors duration-200 font-medium ${
                pathname === link.href ? 'text-[#0039F0] font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex space-x-1">
            <a
              href="mailto:contact@yl-association.org"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-[#0039F0] hover:bg-[#0039F0]/5 transition-colors"
              aria-label="Email"
            >
              <Mail className="text-gray-700 hover:text-[#0039F0]" size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-[#0039F0] hover:bg-[#0039F0]/5 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="text-gray-700 hover:text-[#0039F0]" size={18} />
            </a>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center bg-[#0039F0] hover:bg-[#0030cc] text-white transition-colors duration-300 font-medium py-2 px-5 rounded-full"
          >
            <Phone className="mr-2" size={16} /> Nous contacter
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
        className={`lg:hidden fixed top-[56px] md:top-[72px] left-0 right-0 bg-white shadow-lg transform transition-all duration-300 ease-in-out overflow-auto ${
          isMenuOpen
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
              className={`block py-3 text-gray-700 hover:text-[#0039F0] text-lg font-medium border-b border-gray-100 ${
                pathname === link.href ? 'text-[#0039F0] font-semibold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-6 mt-4 flex flex-col space-y-4">
            <p className="text-sm text-gray-500 font-medium">Contactez-nous</p>

            <div className="flex items-center space-x-2">
              <Mail className="text-gray-500" size={16} />
              <a
                href="mailto:contact@yl-association.org"
                className="text-gray-700 hover:text-[#0039F0]"
              >
                contact@yl-association.org
              </a>
            </div>

            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#0039F0]/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="text-gray-700" size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#0039F0]/10 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[#0039F0] hover:bg-[#0030cc] text-white transition-colors duration-300 font-medium py-3 px-5 rounded-lg mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="mr-2" size={18} /> Nous contacter
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
