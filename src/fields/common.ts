import type { CheckboxField, Field } from 'payload'

export const enabledField = (label = 'Afficher cette section'): CheckboxField => ({
  name: 'enabled',
  type: 'checkbox',
  label,
  defaultValue: true,
})

export const iconOptions = [
  { label: 'Utilisateurs', value: 'users' },
  { label: 'Diplôme', value: 'graduation' },
  { label: 'Calendrier', value: 'calendar' },
  { label: 'Cible', value: 'target' },
  { label: 'Fusée', value: 'rocket' },
  { label: 'Récompense', value: 'award' },
  { label: 'Cœur', value: 'heart' },
  { label: 'Globe', value: 'globe' },
  { label: 'Ampoule', value: 'lightbulb' },
  { label: 'Poignée de main', value: 'handshake' },
  { label: 'Étoile', value: 'star' },
  { label: 'Livre', value: 'book' },
]

export const sectionHeading = (prefix: string, defaults: { title?: string } = {}): Field[] => [
  {
    name: `${prefix}Title`,
    type: 'text',
    label: 'Titre',
    localized: true,
    defaultValue: defaults.title,
  },
  {
    name: `${prefix}Description`,
    type: 'textarea',
    label: 'Description',
    localized: true,
  },
]
