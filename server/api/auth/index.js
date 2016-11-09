'use strict'

const express = require('express')
const passport = require('passport')
const router = express.Router()

const auth = require('./auth.service.js')
const User = require('../user/user.model')
const Controller = require('./auth.controller')

// Passport Configuration
passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

require('./passport-strategy').setup(User)

module.exports = (options) => {
  const authController = new Controller(options)
  router.post('/', authController.getToken)
  router.get('/authProtected', auth.isAuthenticated(), authController.ping)
  return router
}
