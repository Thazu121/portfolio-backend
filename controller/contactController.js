import Contact from '../models/Contacts.js'
import { sendContactNotification } from '../utils/sendEmail.js'

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const createContact = async (req, res) => {
  try {
    const name =
      typeof req.body.name === 'string' ? req.body.name.trim() : ''

    const email =
      typeof req.body.email === 'string'
        ? req.body.email.trim().toLowerCase()
        : ''

    const subject =
      typeof req.body.subject === 'string'
        ? req.body.subject.trim()
        : ''

    const message =
      typeof req.body.message === 'string' ? req.body.message.trim() : ''

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      })
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: 'One or more fields exceed the allowed length.',
      })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    // Save the contact before attempting to send the notification.
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    })

    let emailSent = false

    try {
      await sendContactNotification({
        name,
        email,
        subject,
        message,
      })

      emailSent = true
      console.log(`Contact notification sent for ${contact._id}`)
    } catch (emailError) {
      console.error(
        'Contact notification email failed:',
        emailError.message
      )
    }

    return res.status(201).json({
      success: true,
      message: emailSent
        ? 'Your message was sent successfully!'
        : 'Your message was saved, but the email notification could not be sent.',
      data: {
        id: contact._id,
        emailSent,
      },
    })
  } catch (error) {
    console.error('Create contact error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to save your message. Please try again later.',
    })
  }
}