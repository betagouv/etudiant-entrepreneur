const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const Server = require('../../server')
const expect = require('expect')

describe('api: auth', () => {
  let app
  let validToken

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/auth/', () => {
    describe('When user is missing', () => {
      it('should return 401', (done) => {
        supertest(app)
          .post('/api/auth/')
          .expect(401, { message: 'Missing credentials' }, done)
      })
    })
    describe('When email and password are invalid', () => {
      it('should return 401', (done) => {
        supertest(app)
          .post('/api/auth/')
          .send({ email: 'anonymous', password: 'wrongPassword' })
          .expect(401, { 'message': 'Email ou mot de passe incorrect' }, done)
      })
    })
    describe('When password is invalid', () => {
      it('should return 401', (done) => {
        supertest(app)
          .post('/api/auth/')
          .send({ email: 'peel@univ-lorraine.fr', password: 'wrongPassword' })
          .expect(401, { message: 'Email ou mot de passe incorrect' }, done)
      })
    })
    describe('When email and password are valid', () => {
      const validEmail = 'peel@univ-lorraine.fr'
      it('should return 200 and a token given', (done) => {
        supertest(app)
          .post('/api/auth/')
          .send({ email: validEmail, password: 'test' })
          .expect(200)
          .expect((res) => {
            if (!('token' in res.body)) {
              throw new Error('Missing token key')
            }
            validToken = res.body.token
            describe('Token payload', () => {
              const tokenPayload = jwt.decode(validToken, {complete: true}).payload
              it('should contain _id', () => {
                expect(tokenPayload).toInclude({ '_id': 21 })
              })
              it('should contain name', () => {
                expect(tokenPayload).toInclude({ 'name': validEmail })
              })
              it('should contain a role', () => {
                expect(tokenPayload).toInclude({ 'role': 'pepite' })
              })
            })
          })
          .end(done)
      })
    })
  })

  describe('When requesting route requiring authentication', () => {
    describe('When no token is provided', () => {
      it('should return 401', (done) => {
        supertest(app)
          .get('/api/auth/authProtected')
          .expect(401, done)
      })
    })
    describe('When an invalid token is provided', () => {
      it('should return 401 ', (done) => {
        supertest(app)
          .get('/api/auth/authProtected')
          .set('Authorization', 'Bearer invalidToken')
          .expect(401, 'The provided token is invalid', done)
      })
    })
    describe('When a valid token is provided', () => {
      it('should return 200', (done) => {
        supertest(app)
          .get('/api/auth/authProtected')
          .set('Authorization', `Bearer ${validToken}`)
          .expect(200, '"pong"', done)
      })
    })
  })
})
