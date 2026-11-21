'use client'
import { Search, X } from 'lucide-react'

export function SearchInput({
  value,
  onChange,
  placeholder,
  clearLabel,
  className = '',
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  clearLabel: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-400" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="field rounded-full! py-4 pr-12 pl-13 shadow-[var(--shadow-soft)] [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} aria-label={clearLabel} className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-900">
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

export const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
