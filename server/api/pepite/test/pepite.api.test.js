const supertest = require('supertest')
const Server = require('../../server')

describe('api: pepite', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/pepite/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/pepite/ping')
        .expect(200, '"pong"', done)
    })
  })
})
