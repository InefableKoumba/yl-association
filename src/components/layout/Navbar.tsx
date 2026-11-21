'use client'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight, Heart, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { buttonClasses } from '@/components/ui/Button'
import { COOKIE_NAME, translations, type Locale } from '@/lib/translations'
import { cn, safeHref } from '@/lib/utils'

export type NavItem = { label: string; url: string }

type Props = {
  locale: Locale
  navigation?: NavItem[] | null
  announcement?: {
    enabled?: boolean | null
    text?: string | null
    linkLabel?: string | null
    linkUrl?: string | null
  } | null
  contactLabel?: string | null
}

function persistLocale(next: Locale) {
  document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=31536000; samesite=lax`
  window.location.reload()
}

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar({ locale, navigation, announcement, contactLabel }: Props) {
  const t = translations[locale]
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 320 && y > prev && !open)
  })

  // Close the mobile menu on navigation (state adjusted during render)
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const links: NavItem[] =
    navigation && navigation.length > 0
      ? navigation.map((l) => ({ label: l.label, url: safeHref(l.url) }))
      : [
          { url: '/', label: t.nav.home },
          { url: '/a-propos', label: t.nav.about },
          { url: '/domaine-de-formation', label: t.nav.trainings },
          { url: '/programmes', label: t.nav.programs },
          { url: '/blog', label: t.ui.blog },
        ]

  const switchLocale = (next: Locale) => {
    if (next !== locale) persistLocale(next)
  }

  const showBar = announcement?.enabled !== false
  const barText = announcement?.text || t.nav.donate
  const barLinkLabel = announcement?.linkLabel || t.nav.donateButton
  const barLink = safeHref(announcement?.linkUrl, '/faire-un-don')

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {showBar && (
          <div
            className={cn(
              'overflow-hidden bg-primary-600 text-white transition-[max-height] duration-500',
              scrolled ? 'max-h-0' : 'max-h-12',
            )}
          >
            <div className="container-page flex h-10 items-center justify-center gap-2 text-center text-[0.8rem] font-medium">
              <Heart className="hidden size-3.5 fill-sun-400 text-sun-400 sm:block" aria-hidden />
              <span className="truncate">{barText}</span>
              <Link
                href={barLink}
                className="group inline-flex shrink-0 items-center gap-1 font-semibold underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
              >
                {barLinkLabel}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        )}

        <div className="container-page pt-3">
          <nav
            aria-label="Navigation principale"
            className={cn(
              'flex h-16 items-center justify-between gap-6 rounded-full border pr-2 pl-4 transition-all duration-500 md:h-[4.5rem] md:pl-6',
              scrolled || open
                ? 'border-ink-200/70 bg-white/80 shadow-[0_10px_40px_-18px_rgb(11_18_51/0.35)] backdrop-blur-xl'
                : 'border-white/40 bg-white/90 backdrop-blur-md',
            )}
          >
            <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Young Leaders — Accueil">
              <Image
                src="/logo.png"
                alt=""
                width={48}
                height={48}
                priority
                className="size-10 object-contain md:size-12"
              />
              <span className="hidden font-display text-[1.05rem] leading-none font-bold tracking-tight text-ink-900 sm:block">
                Young
                <br />
                Leaders
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((link) => {
                const active = isActive(pathname, link.url)
                return (
                  <li key={link.url + link.label}>
                    <Link
                      href={link.url}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors',
                        active ? 'text-primary-700' : 'text-ink-600 hover:text-ink-900',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-primary-50"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <div
                role="group"
                aria-label={t.nav.languageSwitcher}
                className="hidden items-center rounded-full bg-ink-100 p-1 text-xs font-semibold sm:flex"
              >
                {(['fr', 'en'] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => switchLocale(code)}
                    aria-pressed={locale === code}
                    className={cn(
                      'rounded-full px-3 py-1.5 uppercase transition-all',
                      locale === code ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-900',
                    )}
                  >
                    {code}
                  </button>
                ))}
              </div>
              <div className="hidden md:block">
                <Link href="/contact" className={buttonClasses({ size: 'md' })}>
                  {contactLabel || t.nav.contact}
                </Link>
              </div>
              <button
                type="button"
                className="grid size-12 place-items-center rounded-full text-ink-900 transition hover:bg-ink-100 lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="size-6" /> : <Menu className="size-6" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink-950 px-6 pt-36 pb-10 text-white lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 4rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 4rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 4rem)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div aria-hidden className="bg-grid-light mask-fade-b pointer-events-none absolute inset-0 opacity-50" />
            <nav aria-label={t.ui.menu} className="relative flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {[...links, { url: '/contact', label: contactLabel || t.nav.contact }].map((link, i) => (
                  <motion.li
                    key={link.url + link.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.url}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl font-semibold tracking-tight transition-colors',
                        isActive(pathname, link.url) ? 'text-primary-300' : 'text-white hover:text-primary-300',
                      )}
                    >
                      {link.label}
                      <ArrowRight className="size-5 opacity-50" aria-hidden />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative mt-8 flex items-center justify-between gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <div className="flex items-center rounded-full bg-white/10 p-1 text-sm font-semibold">
                {(['fr', 'en'] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => switchLocale(code)}
                    aria-pressed={locale === code}
                    className={cn(
                      'rounded-full px-4 py-2 uppercase transition',
                      locale === code ? 'bg-white text-ink-900' : 'text-white/70',
                    )}
                  >
                    {code}
                  </button>
                ))}
              </div>
              <Link href={barLink} className={buttonClasses({ variant: 'white', size: 'md' })}>
                <Heart className="size-4" aria-hidden /> {barLinkLabel}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
