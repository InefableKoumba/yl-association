'use client'
import { Facebook, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <div className="flex fixed z-50 border-b w-full left-0 top-0 justify-between items-center py-1 bg-white px-4 xl:px-32">
      <div className="w-72">
        <Link href={'/'}>
          <Image
            height={20}
            width={40}
            className="w-10 md:w-16"
            src="/logo.png"
            alt="Logo Young Leaders"
          />
        </Link>
      </div>
      <div className="hidden xl:flex font-medium w-full gap-8 items-center justify-center text-gray-700 text-base">
        <Link
          href="/"
          className={`hover:text-primary ${pathname === '/' ? 'text-primary font-semibold' : ''}`}
        >
          Accueil
        </Link>
        <Link
          href="/a-propos"
          className={`hover:text-primary ${pathname === '/a-propos' ? 'text-primary font-semibold' : ''}`}
        >
          A propos
        </Link>
        <Link
          href="/formations"
          className={`hover:text-primary ${pathname === '/formations' ? 'text-primary font-semibold' : ''}`}
        >
          Formations
        </Link>
        <Link
          href="/programmes"
          className={`hover:text-primary ${pathname === '/programmes' ? 'text-primary font-semibold' : ''}`}
        >
          Programmes
        </Link>
      </div>
      <div className="flex gap-4 items-center w-72">
        <div className="flex justify-center gap-2 items-center">
          <div className="border flex justify-center items-center rounded-full w-10 h-10">
            <Mail color="#333" strokeWidth={1.2} size={20} />
          </div>
          <div className="border flex justify-center items-center rounded-full w-10 h-10">
            <Facebook color="#333" strokeWidth={1.2} size={20} />
          </div>
        </div>
        <a
          href="#contact-us"
          className="hidden text-nowrap xl:flex gap-2 items-center bg-background hover:bg-background/90 text-sm px-4 xl:px-6 py-2 xl:py-3.5 rounded-full text-white font-medium"
        >
          <Phone color="#fff" strokeWidth={1.2} size={20} /> Nous contacter
        </a>
        <button className="xl:hidden grid grid-cols-2 gap-1">
          <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 bg-gray-200 rounded-sm"></div>
          <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 bg-gray-200 rounded-sm"></div>
          <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 bg-gray-200 rounded-sm"></div>
          <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 bg-gray-200 rounded-sm"></div>
        </button>
      </div>
    </div>
  )
}
