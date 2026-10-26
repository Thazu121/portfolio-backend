
import nodemailer from 'nodemailer'

const emailUser = process.env.EMAIL_USER
const emailPassword = process.env.EMAIL_APP_PASSWORD

const transporter =
  emailUser && emailPassword
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      })
    : null

export const sendContactNotification = async ({
  name,
  email,
  subject,
  message,
}) => {
  if (!transporter) {
    throw new Error(
      'Email is not configured. Check EMAIL_USER and EMAIL_APP_PASSWORD in .env.'
    )
  }

  const recipient = process.env.EMAIL_TO || emailUser

  return transporter.sendMail({
    from: `"Portfolio Contact Form" <${emailUser}>`,
    to: recipient,
    replyTo: email,
    subject: `Portfolio contact: ${subject?.trim() || `Message from ${name}`}`,
    text: [
      'You received a new message from your portfolio contact form.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject?.trim() || '(not provided)'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  })
}
