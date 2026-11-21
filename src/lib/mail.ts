import 'server-only'
import { MailtrapClient } from 'mailtrap'

let client: MailtrapClient | null = null

/** Created lazily so a missing API key doesn't crash builds or unrelated routes. */
function getClient() {
  const token = process.env.MAILTRAP_API_KEY
  if (!token) throw new Error('MAILTRAP_API_KEY is not set')
  client ??= new MailtrapClient({ token })
  return client
}

const sender = () => ({
  email: process.env.MAILTRAP_SENDER_EMAIL || 'info@yl-association.org',
  name: process.env.MAILTRAP_SENDER_NAME || 'Young Leaders Association',
})

export const receiver = () => process.env.EMAIL_RECEIVER || 'contact@yl-association.org'

export async function sendMail({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}) {
  try {
    const result = await getClient().send({
      from: sender(),
      to: [{ email: to }],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: { email: replyTo } } : {}),
    })
    return { success: true as const, messageId: result.message_ids?.[0] }
  } catch (error) {
    console.error('Mailtrap error:', error)
    return { success: false as const, error }
  }
}

export async function sendBatchMail({
  subject,
  text,
  requests,
}: {
  subject: string
  text: string
  requests: { email: string; name?: string; custom_variables?: Record<string, string> }[]
}) {
  try {
    await getClient().batchSend({
      base: { from: sender(), subject, text },
      requests: requests.map((req) => ({
        to: [{ email: req.email, name: req.name }],
        custom_variables: req.custom_variables,
      })),
    })
    return { success: true as const }
  } catch (error) {
    console.error('Mailtrap batch error:', error)
    return { success: false as const, error }
  }
}
