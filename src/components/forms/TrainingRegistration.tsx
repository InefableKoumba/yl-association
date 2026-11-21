'use client'
import { CheckCircle2, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { Dictionary } from '@/payload-types'
import { Button } from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { translations, type Locale } from '@/lib/translations'
import { useSubmit } from './useSubmit'

export default function TrainingRegistration({
  locale,
  trainingName,
  domainName,
  trainingImage,
  buttonText,
  dictionary,
}: {
  locale: Locale
  trainingName: string
  domainName?: string | null
  trainingImage?: string
  buttonText: string
  dictionary?: Dictionary | null
}) {
  const t = translations[locale]
  const d = dictionary?.forms
  const [open, setOpen] = useState(false)
  const { status, setStatus, submit } = useSubmit('/api/register-training')

  const close = () => {
    setOpen(false)
    if (status === 'success') setStatus('idle')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await submit({ ...Object.fromEntries(new FormData(e.currentTarget)), trainingName, domainName })
  }

  return (
    <>
      <Button size="lg" className="w-full" arrow onClick={() => setOpen(true)}>
        {buttonText}
      </Button>
      <Modal isOpen={open} onClose={close} title={status === 'success' ? d?.successTitle || t.trainings.successTitle : t.trainings.registrationFormTitle} closeLabel={t.ui.close}>
        {status === 'success' ? (
          <div className="p-8 text-center" role="status">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-8" />
            </span>
            <p className="mt-6 text-ink-600">{d?.successMessage || t.trainings.successMessage}</p>
            <Button className="mt-8 w-full" onClick={close}>OK</Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5 p-6">
            <div className="flex items-center gap-4 rounded-2xl bg-ink-50 p-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={trainingImage || '/hero2.jpg'} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display font-semibold text-ink-900">{trainingName}</p>
                <p className="text-sm text-ink-500">{t.trainings.registrationFormSubtitle}</p>
              </div>
            </div>
            <div>
              <label htmlFor="r-name" className="field-label">{d?.fullName || t.contact.fullName}</label>
              <input id="r-name" name="name" required maxLength={120} autoComplete="name" placeholder={t.contact.fullNamePlaceholder} className="field" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="r-email" className="field-label">{d?.email || t.common.email}</label>
                <input id="r-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder={t.contact.emailPlaceholder} className="field" />
              </div>
              <div>
                <label htmlFor="r-phone" className="field-label">{d?.phone || t.common.phone}</label>
                <input id="r-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" placeholder="+242 …" className="field" />
              </div>
            </div>
            <div>
              <label htmlFor="r-gender" className="field-label">{d?.gender || t.trainings.gender}</label>
              <select id="r-gender" name="gender" required defaultValue="" className="field">
                <option value="" disabled>{t.ui.selectOption}</option>
                <option value="male">{t.trainings.genderMale}</option>
                <option value="female">{t.trainings.genderFemale}</option>
                <option value="other">{t.trainings.genderOther}</option>
              </select>
            </div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            {status === 'error' && (
              <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{d?.errorMessage || t.ui.genericError}</p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'} icon={status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : undefined}>
              {status === 'loading' ? d?.sending || t.donate.details.submitting : d?.send || t.common.register}
            </Button>
          </form>
        )}
      </Modal>
    </>
  )
}
