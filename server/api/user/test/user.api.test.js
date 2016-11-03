const supertest = require('supertest')
const Server = require('../../server')
const expect = require('expect')

describe('api: user', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/user/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/user/ping')
        .expect(200, '"pong"', done)
    })
  })

  describe('When requesting /api/user', () => {
    it('should return the list of all users', (done) => {
      supertest(app)
        .get('/api/user')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body.length).toBeGreaterThan(0, 'There should be users')
          done()
        })
    })
  })

  describe('All users with a role pepite', () => {
    it('should be related to a corresponding PEPITE', (done) => {
      supertest(app)
        .get('/api/user')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          const pepiteUsers = res.body.filter(u => u.role == 'pepite')
          expect(pepiteUsers.length).toBeGreaterThan(0, 'There should be users with a role pepite')
          pepiteUsers.forEach(user => {
            expect(user.pepite).toExist()
            expect(user.pepite.name).toExist()
          })
          done()
        })
    })
  })
})
