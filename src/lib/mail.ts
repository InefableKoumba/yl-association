import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_KEY!;
const SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL!;
const SENDER_NAME = process.env.MAILTRAP_SENDER_NAME!;

const client = new MailtrapClient({
  token: TOKEN,
});

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string
  subject: string
  text: string
  html?: string
}) => {
  try {
    const result = await client.send({
      from: {
        email: SENDER_EMAIL,
        name: SENDER_NAME,
      },
      to: [{ email: to }],
      subject: subject,
      text: text,
      html: html,
    });

    console.log('Email sent successfully via Mailtrap:', result.message_ids);
    return { success: true, messageId: result.message_ids?.[0] };
  } catch (error) {
    console.error('Mailtrap Error:', error);
    return { success: false, error };
  }
}

export const sendBatchMail = async ({
  subject,
  text,
  requests,
}: {
  subject: string
  text: string
  requests: { email: string; name?: string; custom_variables?: Record<string, string> }[]
}) => {
  try {
    const result = await client.batchSend({
      base: {
        from: { email: SENDER_EMAIL, name: SENDER_NAME },
        subject: subject,
        text: text,
      },
      requests: requests.map(req => ({
        to: [{ email: req.email, name: req.name }],
        custom_variables: req.custom_variables,
      })),
    });

    console.log('Batch email sent successfully via Mailtrap');
    return { success: true };
  } catch (error) {
    console.error('Mailtrap Batch Error:', error);
    return { success: false, error };
  }
}
