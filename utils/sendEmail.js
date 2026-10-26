import { Resend } from 'resend'

const sendContactNotification = async ({
  name,
  email,
  subject,
  message,
}) => {
  const { RESEND_API_KEY, EMAIL_TO, EMAIL_FROM } = process.env

  if (!RESEND_API_KEY || !EMAIL_TO || !EMAIL_FROM) {
    throw new Error(
      'Missing RESEND_API_KEY, EMAIL_TO, or EMAIL_FROM.'
    )
  }

  const resend = new Resend(RESEND_API_KEY)

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [EMAIL_TO],
    replyTo: email,
    subject:
      subject?.trim() || `New portfolio message from ${name}`,
    text: `You received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Subject: ${subject || 'Portfolio contact message'}

Message:
${message}`,
  })

  if (error) {
    console.error('Resend email error:', error)
    throw new Error(error.message || 'Email notification failed.')
  }

  console.log('Contact notification sent:', data.id)
  return data
}
console.log('Email environment check:', {
  RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
  EMAIL_TO: Boolean(process.env.EMAIL_TO),
  EMAIL_FROM: Boolean(process.env.EMAIL_FROM),
})

if (
  !process.env.RESEND_API_KEY ||
  !process.env.EMAIL_TO ||
  !process.env.EMAIL_FROM
) {
  throw new Error('Email environment variables are missing.')
}

export { sendContactNotification }
