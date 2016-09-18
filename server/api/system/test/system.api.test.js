const supertest = require('supertest')
const Server = require('../../server')

describe('api: system', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/system/ping')
        .expect(200, '"pong"', done)
    })
  })

  describe('When requesting a bad route', () => {
    it('should return a 404 not found error', (done) => {
      supertest(app)
        .get('/api/not-existing')
        .expect('Content-Type', /json/)
        .expect(404, done)
    })
  })

  describe('When requesting /api/error', () => {
    it('should return error', (done) => {
      supertest(app)
        .get('/api/system/error')
        .expect(500, done)
    })
  })
})
