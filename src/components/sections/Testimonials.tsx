'use client'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export type TestimonialItem = { id: string; name: string; role?: string | null; content: string; photo?: string }

export function Testimonials({ items, prevLabel, nextLabel }: { items: TestimonialItem[]; prevLabel: string; nextLabel: string }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0])
  const go = (d: number) => setState(([i]) => [(i + d + items.length) % items.length, d])
  const item = items[index]

  return (
    <div className="relative">
      <Quote aria-hidden className="mb-8 size-14 fill-primary-600 text-primary-600" />
      <div className="relative min-h-[16rem] md:min-h-[13rem]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={item.id}
            custom={dir}
            initial={{ opacity: 0, x: dir >= 0 ? 40 : -40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: dir >= 0 ? -40 : 40, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="font-display text-2xl leading-snug font-medium tracking-tight text-white md:text-[2rem]">
              “{item.content}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              {item.photo ? (
                <Image src={item.photo} alt="" width={56} height={56} className="size-14 rounded-full object-cover ring-2 ring-white/20" />
              ) : (
                <span className="grid size-14 place-items-center rounded-full bg-primary-600 font-display text-xl font-bold text-white">
                  {item.name.charAt(0)}
                </span>
              )}
              <span>
                <span className="block font-semibold text-white">{item.name}</span>
                {item.role && <span className="block text-sm text-white/60">{item.role}</span>}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      {items.length > 1 && (
        <div className="mt-10 flex items-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label={prevLabel} className="grid size-12 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-ink-950">
            <ArrowLeft className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label={nextLabel} className="grid size-12 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-ink-950">
            <ArrowRight className="size-5" />
          </button>
          <span className="ml-2 font-display text-sm text-white/50 tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  )
}
