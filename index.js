import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

import connectDB from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import {
  notFound,
  errorHandler,
} from './middleware/errorMiddleware.js'
import helmet from 'helmet'

const app = express()
app.use(helmet())

app.set('trust proxy', 1)

const PORT = process.env.PORT || 5000

const FRONTEND_URL = (
  process.env.FRONTEND_URL || 'http://localhost:5173'
).replace(/\/+$/, '')

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)

app.use(express.json({ limit: '10kb' }))

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API is running',
  })
})

app.use('/api/contact', contactRoutes)

app.use(notFound)
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Allowed frontend origin: ${FRONTEND_URL}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
