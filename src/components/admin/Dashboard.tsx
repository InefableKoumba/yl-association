import type { AdminViewServerProps } from 'payload'
import Link from 'next/link'
import React from 'react'

type Props = Partial<Pick<AdminViewServerProps, 'payload' | 'user'>> & {
  payload?: AdminViewServerProps['payload']
}

const quickActions = [
  { href: '/admin/collections/blog/create', label: 'Écrire un article', hint: 'Blog' },
  { href: '/admin/collections/programs/create', label: 'Ajouter un programme', hint: 'Événements' },
  { href: '/admin/globals/homePage', label: "Modifier l'accueil", hint: 'Pages du site' },
  { href: '/admin/collections/trainingDomains', label: 'Gérer les formations', hint: 'Catalogue' },
  { href: '/admin/globals/site-settings', label: 'Paramètres du site', hint: 'Menu, contact, SEO' },
  { href: '/admin/collections/media', label: 'Médiathèque', hint: 'Images & fichiers' },
]

async function safeCount(
  payload: NonNullable<Props['payload']>,
  collection: 'blog' | 'programs' | 'trainingDomains' | 'faq' | 'team' | 'partners',
  where?: Record<string, unknown>,
) {
  try {
    const res = await payload.count({ collection, where: where as never, overrideAccess: true })
    return res.totalDocs
  } catch {
    return null
  }
}

export default async function Dashboard({ payload, user }: Props) {
  const name =
    (user as { name?: string | null } | undefined)?.name ||
    (user as { email?: string } | undefined)?.email?.split('@')[0] ||
    ''

  const stats = payload
    ? await Promise.all([
        safeCount(payload, 'programs', { status: { equals: 'upcoming' } }).then((v) => ({
          label: 'Programmes à venir',
          value: v,
          href: '/admin/collections/programs',
        })),
        safeCount(payload, 'blog', { _status: { equals: 'published' } }).then((v) => ({
          label: 'Articles publiés',
          value: v,
          href: '/admin/collections/blog',
        })),
        safeCount(payload, 'blog', { _status: { equals: 'draft' } }).then((v) => ({
          label: 'Brouillons',
          value: v,
          href: '/admin/collections/blog?where[_status][equals]=draft',
        })),
        safeCount(payload, 'trainingDomains').then((v) => ({
          label: 'Domaines de formation',
          value: v,
          href: '/admin/collections/trainingDomains',
        })),
        safeCount(payload, 'faq').then((v) => ({
          label: 'Questions FAQ',
          value: v,
          href: '/admin/collections/faq',
        })),
        safeCount(payload, 'partners').then((v) => ({
          label: 'Partenaires',
          value: v,
          href: '/admin/collections/partners',
        })),
      ])
    : []

  return (
    <section className="yl-dash">
      <div className="yl-dash__hero">
        <div>
          <p className="yl-dash__eyebrow">Tableau de bord</p>
          <h1>Bonjour{name ? `, ${name}` : ''} 👋</h1>
          <p>Gérez le contenu du site Young Leaders : pages, formations, programmes et actualités.</p>
        </div>
        <a className="yl-dash__site" href="/" target="_blank" rel="noopener noreferrer">
          Voir le site ↗
        </a>
      </div>

      {stats.length > 0 && (
        <div className="yl-dash__stats">
          {stats.map((s) => (
            <Link key={s.label} href={s.href} className="yl-dash__stat">
              <span className="yl-dash__stat-value">{s.value ?? '—'}</span>
              <span className="yl-dash__stat-label">{s.label}</span>
            </Link>
          ))}
        </div>
      )}

      <h2 className="yl-dash__title">Actions rapides</h2>
      <div className="yl-dash__actions">
        {quickActions.map((a) => (
          <Link key={a.href} href={a.href} className="yl-dash__action">
            <span className="yl-dash__action-hint">{a.hint}</span>
            <span className="yl-dash__action-label">{a.label} →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
