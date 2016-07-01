'use strict'

class SystemController {
    ping(req, res) {
        res.json('pong')
    }
}

module.exports = SystemController