'use client'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/** Cross-fading, slowly zooming background images with a parallax drift. */
export function HeroSlideshow({ images, interval = 6500 }: { images: { src: string; position?: string }[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])

  useEffect(() => {
    if (images.length < 2 || reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval, reduce])

  return (
    <div ref={ref} className="absolute inset-0 -z-20 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          >
            <Image
              src={images[index].src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="animate-kenburns object-cover"
              style={{ objectPosition: images[index].position }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {images.length > 1 && (
        <div className="absolute right-6 bottom-6 z-10 hidden gap-2 md:flex">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="h-1 w-8 overflow-hidden rounded-full bg-white/30"
            >
              {i === index && (
                <motion.span
                  className="block h-full origin-left bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: interval / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
