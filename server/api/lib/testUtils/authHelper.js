'use strict'
const supertest = require('supertest')

function getToken(app, email, password, tokenRef, done) {
  supertest(app)
    .post('/api/auth/')
    .send({ email, password })
    .end((err, res) => {
      if (err) {
        return done(new Error(err))
      }
      if (!('token' in res.body)) {
        return done(new Error('Missing token key'))
      }
      tokenRef.token = res.body.token
      return done()
    })
}

module.exports = {
  getToken
}
