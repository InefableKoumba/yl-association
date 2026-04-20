import { NextResponse } from 'next/server'
import { sendBatchMail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const { subject, text, recipients } = await request.json()

    if (!subject || !text || !recipients || !Array.isArray(recipients)) {
      return NextResponse.json(
        { error: 'Subject, text, and an array of recipients are required.' },
        { status: 400 }
      )
    }

    const result = await sendBatchMail({
      subject,
      text,
      requests: recipients,
    })

    if (result.success) {
      return NextResponse.json({
        message: 'Batch emails sent successfully',
      })
    } else {
      return NextResponse.json({ error: 'Failed to send batch emails' }, { status: 500 })
    }
  } catch (error) {
    console.error('Batch API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
