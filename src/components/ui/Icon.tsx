import {
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Handshake,
  Heart,
  Globe,
  Lightbulb,
  Rocket,
  Star,
  Target,
  UsersRound,
  type LucideProps,
} from 'lucide-react'

const icons = {
  users: UsersRound,
  graduation: GraduationCap,
  calendar: CalendarDays,
  target: Target,
  rocket: Rocket,
  award: Award,
  heart: Heart,
  globe: Globe,
  lightbulb: Lightbulb,
  handshake: Handshake,
  star: Star,
  book: BookOpen,
} as const

export type IconName = keyof typeof icons

/** Renders one of the icons selectable in the CMS. */
export function CmsIcon({ name, ...props }: { name?: string | null } & Omit<LucideProps, 'name'>) {
  const Component = icons[(name as IconName) ?? 'users'] ?? UsersRound
  return <Component aria-hidden strokeWidth={1.75} {...props} />
}
