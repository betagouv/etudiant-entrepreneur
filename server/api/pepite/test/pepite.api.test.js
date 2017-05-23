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
          expect(res.body.length).toEqual(29, 'Invalid number of PEPITE')
          done()
        })
    })
  })

  describe('When requesting /api/pepite/:id', () => {
    describe('When the id is valid and exists', () => {
      it('should return a specific pepite', (done) => {
        supertest(app)
          .get('/api/pepite/1')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.name).toEqual('ETENA')
            done()
          })
      })
    })

    describe('When the id is valid but does not exist', () => {
      it('should return a not found error', () => {
        supertest(app)
          .get('/api/pepite/42')
          .expect(404)
      })
    })

    describe('When the id is invalid', () => {
      it('should return a bad request', () => {
        supertest(app)
          .get('/api/pepite/invalid_id')
          .expect(400)
      })
    })
  })
})
