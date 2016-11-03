'use strict'

const User = require('./user.model')

class UserController {
  ping(req, res) {
    res.json('pong')
  }

  index(req, res) {
    return User.find({})
      .populate('pepite')
      .then((users) => {
        res.json(users)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }
}

module.exports = UserController
