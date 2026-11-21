import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn, isExternal } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'glass'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white shadow-[0_8px_24px_-10px_rgb(0_57_240/0.7)] hover:bg-primary-700 hover:shadow-[0_14px_34px_-12px_rgb(0_57_240/0.8)] focus-visible:outline-primary-600',
  secondary: 'bg-ink-900 text-white hover:bg-ink-800 focus-visible:outline-ink-900',
  outline:
    'border border-ink-200 bg-white text-ink-900 hover:border-primary-600 hover:text-primary-600 focus-visible:outline-primary-600',
  ghost: 'text-primary-600 hover:bg-primary-50 focus-visible:outline-primary-600',
  white: 'bg-white text-primary-700 hover:bg-primary-50 focus-visible:outline-white',
  glass:
    'border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 focus-visible:outline-white',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  /** Show an animated arrow after the label. */
  arrow?: boolean
  icon?: ReactNode
  className?: string
  children: ReactNode
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: Pick<CommonProps, 'variant' | 'size' | 'className'> = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

function Inner({ arrow, icon, children, external }: CommonProps & { external?: boolean }) {
  const Arrow = external ? ArrowUpRight : ArrowRight
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <Arrow
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px"
        />
      )}
    </>
  )
}

export function Button({
  variant,
  size,
  arrow,
  icon,
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      <Inner arrow={arrow} icon={icon}>
        {children}
      </Inner>
    </button>
  )
}

export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  icon,
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<ComponentProps<'a'>, 'children' | 'href'>) {
  const external = isExternal(href)
  const classes = buttonClasses({ variant, size, className })
  if (external || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        <Inner arrow={arrow} icon={icon} external={external}>
          {children}
        </Inner>
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...props}>
      <Inner arrow={arrow} icon={icon}>
        {children}
      </Inner>
    </Link>
  )
}
