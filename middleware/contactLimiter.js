
import rateLimit from 'express-rate-limit'

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages. Please try again in 15 minutes.',
  },
})

export default contactLimiter
