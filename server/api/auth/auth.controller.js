'use strict'

const passport = require('passport')
const auth = require('./auth.service')

class AuthController {
  ping(req, res) {
    res.json('pong')
  }

  getToken(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      var error = err || info
      if (error) return res.status(401).json(error)
      if (!user) return res.status(404).json({ message: 'Something went wrong, please try again.' })

      var token = auth.signToken(user._id, user.role, user.email)
      res.json({ token: token })
    })(req, res, next)
  }
}

module.exports = AuthController
