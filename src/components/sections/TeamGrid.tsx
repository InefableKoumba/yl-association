import Image from 'next/image'
import type { Team } from '@/payload-types'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { mediaPosition, mediaUrl } from '@/lib/media'

export function TeamGrid({ members }: { members: Team[] }) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((m) => (
        <StaggerItem key={m.id} as="article" className="group">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink-100">
            <Image
              src={mediaUrl(m.image, '/hero.jpg')!}
              alt={m.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              style={{ objectPosition: mediaPosition(m.image) }}
            />
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink-950/95 to-ink-950/40 p-5 text-sm text-white/85 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-within:translate-y-0">
              <p className="line-clamp-6">{m.bio}</p>
            </div>
          </div>
          <h3 className="text-h3 mt-5">{m.name}</h3>
          <p className="mt-1 text-sm font-medium text-primary-600">{m.role}</p>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
