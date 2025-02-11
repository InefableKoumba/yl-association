'use client'
import { Faq } from '@/payload-types'
import { useState } from 'react'

export default function FaqItem({ faq }: { faq: Faq }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div key={faq.id} className="flex flex-col gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black hover:text-primary text-left font-semibold"
      >
        {isOpen ? <span>-</span> : <span>+</span>} {faq.question}
      </button>
      {isOpen && <span>{faq.answer}</span>}
    </div>
  )
}
