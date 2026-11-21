import { Eye } from 'lucide-react'
import { translations, type Locale } from '@/lib/translations'

export function PreviewBar({ locale }: { locale: Locale }) {
  const t = translations[locale]
  return (
    <div className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink-950 py-2 pr-2 pl-4 text-sm text-white shadow-2xl">
      <Eye className="size-4 text-sun-400" aria-hidden /> {t.ui.previewMode}
      {/* Route handler, not a page: a full navigation is intended */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/next/exit-preview" className="rounded-full bg-white/10 px-3 py-1 font-semibold hover:bg-white/20">
        {t.ui.exitPreview}
      </a>
    </div>
  )
}
