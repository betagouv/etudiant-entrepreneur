const supertest = require('supertest')
const Server = require('../../server')
const expect = require('expect')

describe('api: region', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/region/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/region/ping')
        .expect(200, '"pong"', done)
    })
  })

  describe('When requesting /api/region', () => {
    it('should return the list of all regions', (done) => {
      supertest(app)
        .get('/api/region')
        .expect(200)
        .end((err, res) => {
          const expectedRegionNumber = 14
          if (err) {
            return done(err)
          }
          expect(res.body.length).toEqual(expectedRegionNumber, 'Invalid number of region')
          done()
        })
    })
  })

  describe('When requesting /api/region/:id', () => {
    describe('When the id is valid and exists', () => {
      it('should return a specific region', (done) => {
        supertest(app)
          .get('/api/region/1')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.name).toEqual('Alsace - Champagne-Ardenne - Lorraine')
            done()
          })
      })
    })

    describe('When the id is valid but does not exist', () => {
      it('should return a not found error', () => {
        supertest(app)
          .get('/api/region/42')
          .expect(404)
      })
    })

    describe('When the id is invalid', () => {
      it('should return a bad request', () => {
        supertest(app)
          .get('/api/region/invalid_id')
          .expect(400)
      })
    })
  })

  describe('When requesting /api/region/:id/pepite', () => {
    describe('When the id is valid and exists', () => {
      it('should return region\'s pepite list', (done) => {
        supertest(app)
          .get('/api/region/1/pepite')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.length).toEqual(3)
            done()
          })
      })
    })

    describe('When the id is valid but does not exist', () => {
      it('should return a not found error', () => {
        supertest(app)
          .get('/api/region/42/pepite')
          .expect(404)
      })
    })

    describe('When the id is invalid', () => {
      it('should return a bad request', () => {
        supertest(app)
          .get('/api/region/invalid_id/pepite')
          .expect(400)
      })
    })
  })

  describe('When requesting /api/region/:id/pepite', () => {
    describe('When the id is valid and exists', () => {
      it('should return region\'s pepite list', (done) => {
        supertest(app)
          .get('/api/region/1/pepite')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.length).toEqual(3)
            done()
          })
      })
    })

    describe('When the id is valid but does not exist', () => {
      it('should return a not found error', () => {
        supertest(app)
          .get('/api/region/42/pepite')
          .expect(404)
      })
    })

    describe('When the id is invalid', () => {
      it('should return a bad request', () => {
        supertest(app)
          .get('/api/region/invalid_id/pepite')
          .expect(400)
      })
    })
  })
})
