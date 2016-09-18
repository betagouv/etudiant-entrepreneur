'use strict'

class SystemController {
  ping(req, res) {
    res.json('pong')
  }

  error() {
    throw new Error('error')
  }
}

module.exports = SystemController
