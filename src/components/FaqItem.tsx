'use client'
import { Faq } from '@/payload-types'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FaqItem({ faq }: { faq: Faq }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-[#0039F0]/30 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-gray-800 text-lg pr-8">{faq.question}</h3>
        <ChevronDown
          className={`text-[#0039F0] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
      </div>
    </div>
  )
}
