'use strict'

const all = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://mongo:27017/ee',
    options: {
      db: {
        safe: true
      }
    }
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY || 'sendgrid_api_key'
  },

  // Secret for session
  secrets: {
    session: process.env.SESSION_SECRET || 'ssshhhhh'
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'https://etudiant-entrepreneur.beta.gouv.fr'
  }
}

module.exports = all
