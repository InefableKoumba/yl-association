import type { Access, FieldAccess } from 'payload'

type MaybeUser = { role?: string | null } | null | undefined

export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => Boolean(req.user)

const userIsAdmin = (user: MaybeUser) => Boolean(user) && (user?.role ?? 'admin') === 'admin'

export const isAdmin: Access = ({ req }) => userIsAdmin(req.user as MaybeUser)

export const isAdminFieldLevel: FieldAccess = ({ req }) => userIsAdmin(req.user as MaybeUser)

/** Admins can access every user, editors only themselves. */
export const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (userIsAdmin(req.user as MaybeUser)) return true
  return { id: { equals: req.user.id } }
}

/** Published documents for everyone, drafts for logged-in users. */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
