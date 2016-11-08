const supertest = require('supertest')
const Server = require('../../server')

describe('api: auth', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/auth/ with user missing', () => {
    it('should return 401 given email and password are missing', (done) => {
      supertest(app)
        .post('/api/auth/')
        .expect(401, { message: 'Missing credentials'}, done)
    })
    it('should return 401 given email and password are invalid', (done) => {
      supertest(app)
        .post('/api/auth/')
        .send({email: 'anonymous', password: 'wrongPassword'})
        .expect(401, { 'message': 'Email ou mot de passe incorrect'}, done)
    })
    it('should return 401 given password is invalid', (done) => {
      supertest(app)
        .post('/api/auth/')
        .send({email: 'peel@univ-lorraine.fr', password: 'wrongPassword'})
        .expect(401, { message: 'Email ou mot de passe incorrect'}, done)
    })
    it('should return 200 and a token given email and password are valid', (done) => {
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
