'use client'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { cn } from '@/lib/utils'

export type AccordionItem = { id: string | number; question: string; answer: string }

export function Accordion({
  items,
  className,
  defaultOpen,
}: {
  items: AccordionItem[]
  className?: string
  defaultOpen?: string | number
}) {
  const [open, setOpen] = useState<string | number | null>(defaultOpen ?? null)
  const baseId = useId()

  return (
    <div className={cn('divide-y divide-ink-200 border-y border-ink-200', className)}>
      {items.map((item) => {
        const isOpen = open === item.id
        const panelId = `${baseId}-${item.id}`
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    'font-display text-lg font-semibold tracking-tight transition-colors md:text-xl',
                    isOpen ? 'text-primary-600' : 'text-ink-900 group-hover:text-primary-600',
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-500',
                    isOpen
                      ? 'rotate-45 border-primary-600 bg-primary-600 text-white'
                      : 'border-ink-200 text-ink-700 group-hover:border-primary-600 group-hover:text-primary-600',
                  )}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pr-12 pb-7 whitespace-pre-line text-ink-600">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
