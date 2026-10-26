import nodemailer from 'nodemailer'

const sendContactNotification = async ({
  name,
  email,
  subject,
  message,
}) => {
  // Read email configuration from backend .env
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_APP_PASSWORD,
    EMAIL_TO,
    EMAIL_FROM,
  } = process.env

  // Validate required environment variables
  if (
    !EMAIL_HOST ||
    !EMAIL_USER ||
    !EMAIL_APP_PASSWORD ||
    !EMAIL_TO ||
    !EMAIL_FROM
  ) {
    throw new Error(
      'Missing email configuration. Check your backend .env file.'
    )
  }

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT || 465),
    secure: Number(EMAIL_PORT || 465) === 465,
    auth: {
      user: EMAIL_USER.trim(),
      pass: EMAIL_APP_PASSWORD.trim(),
    },
  })

  // Send notification email
  const result = await transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: email,
    subject:
      subject?.trim() || `New portfolio message from ${name}`,
    text: `You received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Subject: ${subject || 'Portfolio contact message'}

Message:
${message}

---
Reply directly to this email to respond to ${name}.`,
  })

  console.log('Contact notification sent:', result.messageId)

  return result
}

export { sendContactNotification }
