
import Contact from '../models/Contacts.js'

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !email.trim() ||
      typeof message !== 'string' ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      })
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: typeof subject === 'string' ? subject.trim() : '',
      message: message.trim(),
    })

    return res.status(201).json({
      success: true,
      message: 'Your message was sent successfully!',
      data: {
        id: contact._id,
      },
    })
  } catch (error) {
    console.error('Contact API error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to send your message. Please try again.',
    })
  }
}
