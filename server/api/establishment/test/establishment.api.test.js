const supertest = require('supertest')
const Server = require('../../server')
const expect = require('expect')

describe('api: establishment', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/establishment/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/establishment/ping')
        .expect(200, '"pong"', done)
    })
  })

  describe('When requesting /api/establishment', () => {
    it('should return the list of all establishmentss', (done) => {
      supertest(app)
        .get('/api/establishment')
        .expect(200)
        .end((err, res) => {
          const expectedEstablishmentNumber = 141
          if (err) {
            return done(err)
          }
          expect(res.body.length).toEqual(expectedEstablishmentNumber, 'Invalid number of establishment')
          done()
        })
    })
  })

  describe('When requesting /api/establishment/:id', () => {
    describe('When the id is valid and exists', () => {
      it('should return a specific establishment', (done) => {
        supertest(app)
          .get('/api/establishment/1')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.name).toEqual('établissements de l\'académie de Strasgbourg')
            done()
          })
      })
    })

    describe('When the id is valid but does not exist', () => {
      it('should return a not found error', () => {
        supertest(app)
          .get('/api/establishment/42')
          .expect(404)
      })
    })

    describe('When the id is invalid', () => {
      it('should return a bad request', () => {
        supertest(app)
          .get('/api/establishment/invalid_id')
          .expect(400)
      })
    })
  })
})
