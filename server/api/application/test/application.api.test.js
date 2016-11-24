const supertest = require('supertest')
const Server = require('../../server')
const ApplicationModel = require('../application.model')
const applicationData = require('../application.seed')
const expect = require('expect')

const authHelper = require('../../lib/testUtils/authHelper')

describe('api: application', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/application/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/application/ping')
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

  describe('When requesting /api/application/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/application/ping')
        .expect(200, '"pong"', done)
    })
  })
  describe('When requesting /api/application/send', () => {
    it('should give valid id', (done) => {
      supertest(app)
        .put('/api/application/ddazdaz/send')
        .expect(404, done)
    })
  })

  describe('When requesting /api/pepite/:id/application', () => {
    let validToken = {}

    before((done) => {
      ApplicationModel.insertMany(applicationData, () => authHelper.getToken(app, 'peel@univ-lorraine.fr', 'test', validToken, done))
    })

    after((done) => {
      ApplicationModel.remove(done)
    })

    describe('When an invalidtoken is provided', () => {
      it('should return a 401 error', (done) => {
        supertest(app)
          .get('/api/pepite/2/application')
          .expect(401, done)
      })
    })

    describe('When the PEPITE has not application', () => {
      it('should give an empty array', (done) => {
        supertest(app)
          .get('/api/pepite/2/application')
          .set('Authorization', `Bearer ${validToken.token}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual([])
            return done()
          })
      })
    })

    describe('When the PEPITE has an application', () => {
      it('should give all applications made to the PEPITE', (done) => {
        supertest(app)
          .get('/api/pepite/1/application')
          .set('Authorization', `Bearer ${validToken.token}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.length).toBe(1)
            done()
          })
      })
    })

    describe('When the PEPITE has several applications', () => {
      it('should give all applications made to the PEPITE', (done) => {
        supertest(app)
          .get('/api/pepite/3/application')
          .set('Authorization', `Bearer ${validToken.token}`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.length).toBe(2)
            done()
          })
      })
    })
  })
})
