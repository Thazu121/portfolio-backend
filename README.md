# Personal Portfolio — Backend API

A RESTful backend for my personal portfolio website, built with Node.js, Express, and MongoDB. It handles contact form submissions, persists messages, and sends email notifications through the Resend API.

## Live API

**Backend:** [https://portfolio-trld.onrender.com]


## Features

- RESTful API built with Express.js
- Contact form submission endpoint
- MongoDB database integration with Mongoose
- Email notifications using Resend
- CORS configuration for frontend integration
- Request rate limiting
- Environment-based configuration
- Error handling and input validation

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Email Service:** Resend API
- **Modules:** JavaScript ES modules
- **Deployment:** Render

## Getting Started

### Prerequisites

- Node.js
- npm
- A MongoDB database
- A Resend account and API key

### Installation

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
cd portfolio-backend
npm install
```

### Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender
EMAIL_TO=your_recipient_email
```

Configure these values in your deployment environment as well. Use a sender address permitted by your Resend account.

**Security:** Never commit your `.env` file, database credentials, or Resend API key.

### Run Locally

```bash
node index.js
```

If your project defines a development script, you can use `npm run dev` instead.

The API runs at `http://localhost:5000` by default.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Check API health |
| `POST` | `/api/contact` | Submit a contact form message |

### Contact Request Example

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project."
}
```

The contact endpoint stores the message in MongoDB and attempts to send an email notification.

## Deployment

The backend is deployed on Render.

To deploy your own instance:

1. Push the backend to your Git repository.
2. Create a web service on Render.
3. Set the start command to `node index.js`.
4. Configure the required environment variables.
5. Deploy and test the health-check endpoint.

## Security

- Keep credentials in environment variables.
- Restrict CORS to trusted frontend origins.
- Validate and sanitize incoming data.
- Apply rate limiting to contact submissions.
- Never expose private credentials in source control.

## License

This project is available for portfolio demonstration and educational purposes. Contact me before reusing substantial portions of the code.
