'use client'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState, type ReactNode } from 'react'
import { normalize, SearchInput } from '@/components/ui/SearchInput'
import { cn } from '@/lib/utils'

export type FilterableItem = { key: string | number; text: string; group?: string; node: ReactNode }

/**
 * Client-side search + optional tab filter over server-rendered cards.
 * Cards are rendered on the server and passed in as nodes.
 */
export function FilterableGrid({
  items,
  tabs,
  placeholder,
  clearLabel,
  emptyLabel,
  className = 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
}: {
  items: FilterableItem[]
  tabs?: { value: string; label: string }[]
  placeholder: string
  clearLabel: string
  /** Use `{query}` as placeholder. */
  emptyLabel: string
  className?: string
}) {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState(tabs?.[0]?.value ?? 'all')

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return items.filter(
      (i) => (tab === 'all' || !tabs || i.group === tab) && (!q || normalize(i.text).includes(q)),
    )
  }, [items, query, tab, tabs])

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {tabs && tabs.length > 1 ? (
          <div role="tablist" className="inline-flex w-fit rounded-full bg-ink-100 p-1">
            {tabs.map((t) => (
              <button
                key={t.value}
                role="tab"
                type="button"
                aria-selected={tab === t.value}
                onClick={() => setTab(t.value)}
                className={cn('relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors', tab === t.value ? 'text-white' : 'text-ink-600 hover:text-ink-900')}
              >
                {tab === t.value && <motion.span layoutId="filter-tab" className="absolute inset-0 -z-0 rounded-full bg-primary-600" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <SearchInput value={query} onChange={setQuery} placeholder={placeholder} clearLabel={clearLabel} className="w-full md:max-w-sm" />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-ink-300 py-16 text-center text-ink-500">
          {emptyLabel.replace('{query}', query)}
        </p>
      ) : (
        <motion.div layout className={className}>
          <AnimatePresence mode="popLayout">
            {filtered.map((i) => (
              <motion.div
                key={i.key}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {i.node}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
