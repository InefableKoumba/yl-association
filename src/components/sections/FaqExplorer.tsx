'use client'
import { useMemo, useState } from 'react'
import { Accordion, type AccordionItem } from '@/components/ui/Accordion'
import { normalize, SearchInput } from '@/components/ui/SearchInput'

export function FaqExplorer({
  items,
  placeholder,
  clearLabel,
  emptyLabel,
  resultsLabel,
}: {
  items: AccordionItem[]
  placeholder: string
  clearLabel: string
  emptyLabel: string
  resultsLabel: string
}) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return q ? items.filter((i) => normalize(`${i.question} ${i.answer}`).includes(q)) : items
  }, [items, query])

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} placeholder={placeholder} clearLabel={clearLabel} className="mb-4" />
      <p aria-live="polite" className="mb-8 pl-5 text-sm text-ink-400">
        {query && resultsLabel.replace('{count}', String(filtered.length))}
      </p>
      {filtered.length ? (
        <Accordion key={query} items={filtered} defaultOpen={query ? filtered[0]?.id : undefined} />
      ) : (
        <p className="rounded-[var(--radius-card)] border border-dashed border-ink-300 py-16 text-center text-ink-500">
          {emptyLabel.replace('{query}', query)}
        </p>
      )}
    </div>
  )
}
