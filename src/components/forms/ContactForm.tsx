'use client'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import Link from 'next/link'
import type { Dictionary } from '@/payload-types'
import { Button } from '@/components/ui/Button'
import { translations, type Locale } from '@/lib/translations'
import { useSubmit } from './useSubmit'

export default function ContactForm({ locale, dictionary, privacyHref }: { locale: Locale; dictionary?: Dictionary | null; privacyHref?: string }) {
  const t = translations[locale]
  const d = dictionary?.forms
  const { status, setStatus, submit } = useSubmit('/api/contact')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const ok = await submit(Object.fromEntries(new FormData(form)))
    if (ok) form.reset()
  }

  return (
    <div className="relative rounded-[var(--radius-card)] border border-ink-200/80 bg-white p-6 shadow-[var(--shadow-soft)] md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-8" />
            </span>
            <h3 className="text-h3 mt-6">{d?.successTitle || t.trainings.successTitle}</h3>
            <p className="mt-3 max-w-sm text-ink-500">{d?.successMessage || t.ui.messageSent}</p>
            <Button variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
              {t.ui.sendAnother}
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} className="space-y-5">
            <h3 className="text-h3">{t.contact.sendMessage}</h3>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="field-label">{d?.fullName || t.contact.fullName}</label>
                <input id="c-name" name="name" required maxLength={120} autoComplete="name" placeholder={t.contact.fullNamePlaceholder} className="field" />
              </div>
              <div>
                <label htmlFor="c-email" className="field-label">{d?.email || t.common.email}</label>
                <input id="c-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder={t.contact.emailPlaceholder} className="field" />
              </div>
            </div>
            <div>
              <label htmlFor="c-subject" className="field-label">{d?.subject || t.contact.subject}</label>
              <input id="c-subject" name="subject" maxLength={200} placeholder={t.contact.subjectPlaceholder} className="field" />
            </div>
            <div>
              <label htmlFor="c-message" className="field-label">{d?.message || t.contact.message}</label>
              <textarea id="c-message" name="message" required rows={6} maxLength={5000} placeholder={t.contact.messagePlaceholder} className="field resize-y" />
            </div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <label className="flex items-start gap-3 text-sm text-ink-500">
              <input type="checkbox" name="privacy" required className="mt-0.5 size-4 shrink-0 rounded accent-primary-600" />
              <span>
                {t.contact.privacyAgreement}
                {privacyHref && (
                  <>
                    {' '}
                    (<Link href={privacyHref} className="text-primary-600 underline underline-offset-2">{t.footer.privacyPolicy}</Link>)
                  </>
                )}
              </span>
            </label>
            {status === 'error' && (
              <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {d?.errorMessage || t.ui.genericError}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'} icon={status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}>
              {status === 'loading' ? d?.sending || t.donate.details.submitting : d?.send || t.contact.sendButton}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
