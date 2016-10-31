const supertest = require('supertest')
const Server = require('../../server')
const expect = require('expect')

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

  describe('When requesting /api/pepite', () => {
    it('should return the list of all pepites', (done) => {
      supertest(app)
        .get('/api/pepite')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.length).toEqual(28, 'Invalid number of PEPITE')
          done()
        })
    })
  })
})
