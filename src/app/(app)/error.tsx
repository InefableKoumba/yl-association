'use client'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { StatusPage } from '@/components/ui/StatusPage'
import { COOKIE_NAME, translations } from '@/lib/translations'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])
  const locale = typeof document !== 'undefined' && document.cookie.includes(`${COOKIE_NAME}=en`) ? 'en' : 'fr'
  const t = translations[locale]
  return (
    <StatusPage
      title={t.common.errorTitle}
      description={t.common.tryAgainLater}
      actionLabel={t.common.backToHome}
      secondary={<Button variant="outline" onClick={reset}>{t.ui.tryAgain}</Button>}
    />
  )
}
