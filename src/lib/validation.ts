import 'server-only'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isEmail = (v: unknown): v is string => typeof v === 'string' && v.length <= 200 && EMAIL_RE.test(v)

/** Trims a value, strips control characters / line breaks used for header injection and caps its length. */
export function clean(v: unknown, max = 200, multiline = false): string {
  if (typeof v !== 'string') return ''
  const s = multiline ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '') : v.replace(/[\u0000-\u001F]/g, ' ')
  return s.trim().slice(0, max)
}

/** Reads a JSON body safely and rejects obvious bots (filled honeypot). */
export async function readForm(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = (await request.json()) as Record<string, unknown>
    if (!body || typeof body !== 'object') return null
    if (typeof body.website === 'string' && body.website.length > 0) return null
    return body
  } catch {
    return null
  }
}
