const supertest = require('supertest')
const Server = require('../../server')

describe('api: auth', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/auth/ with user missing', () => {
    it('should return 401', (done) => {
      supertest(app)
        .post('/api/auth/')
        .expect(401, { message: 'Missing credentials'}, done)
    })
  })

  describe('When requesting /api/auth/ with invalid user and password', () => {
    it('should return 401', (done) => {
      supertest(app)
        .post('/api/auth/')
        .send({email: 'anonymous', password: 'wrongPassword'})
        .expect(401, { 'message': 'Email ou mot de passe incorrect'}, done)
    })
  })

  describe('When requesting /api/auth/ with invalid passoword', () => {
    it('should return 401', (done) => {
      supertest(app)
        .post('/api/auth/')
        .send({email: 'peel@univ-lorraine.fr', password: 'wrongPassword'})
        .expect(401, { message: 'Email ou mot de passe incorrect'}, done)
    })
  })

  describe('When requesting /api/auth/ with valid credentials', () => {
    it('should return 401', (done) => {
      supertest(app)
        .post('/api/auth/')
        .send({email: 'peel@univ-lorraine.fr', password: 'test'})
        .expect(200)
        .expect((res) => {
          if (!('token' in res.body)) {
            throw new Error('Missing token key')
          }
        })
        .end(done)
    })
  })
})
