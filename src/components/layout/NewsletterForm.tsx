'use client'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function NewsletterForm({
  placeholder,
  submitLabel,
  successMessage,
  errorMessage,
}: {
  placeholder: string
  submitLabel: string
  successMessage: string
  errorMessage: string
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), website: data.get('website') }),
      })
      if (!res.ok) throw new Error()
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5 transition focus-within:border-primary-400 focus-within:bg-white/10">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-white/40 outline-none"
        />
        {/* Honeypot: hidden from humans, filled by bots */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label={submitLabel}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-600 text-white transition hover:bg-primary-500 disabled:opacity-60"
        >
          {status === 'loading' ? (
            <Loader2 className="size-4 animate-spin" />
          ) : status === 'success' ? (
            <Check className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-sm">
        {status === 'success' && <span className="text-emerald-300">{successMessage}</span>}
        {status === 'error' && <span className="text-red-300">{errorMessage}</span>}
      </p>
    </form>
  )
}
