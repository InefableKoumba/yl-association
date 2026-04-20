'use client'
import React, { useState } from 'react'
import TrainingRegistrationModal from '@/components/TrainingRegistrationModal'
import { Locale } from '@/lib/translations'

interface RegisterButtonProps {
  locale: Locale
  trainingName: string
  trainingImage?: string
  buttonText: string
}

export default function RegisterButton({
  locale,
  trainingName,
  trainingImage,
  buttonText,
}: RegisterButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center w-full py-3 px-6 bg-[#0039F0] hover:bg-[#0030cc] text-white font-medium rounded-lg transition-colors"
      >
        {buttonText}
      </button>

      <TrainingRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
        trainingName={trainingName}
        trainingImage={trainingImage}
      />
    </>
  )
}
