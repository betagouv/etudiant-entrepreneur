const supertest = require('supertest')
const Server = require('../../server')
const ApplicationModel = require('../../application/application.model')
const applicationData = require('../../application/test/application.seed')

const authHelper = require('../../lib/testUtils/authHelper')

const expect = require('expect')

describe('api: committeeAnswer', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/committeeAnswer/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/committeeAnswer/ping')
        .expect(200, '"pong"', done)
    })
  })

  describe('When requesting /api/committeeAnswer/:id/', () => {
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
          .put('/api/committeeAnswer/someID')
          .expect(401, done)
      })
    })

    describe('When an invalid id is provided', () => {
      it('should return a 400 error', (done) => {
        supertest(app)
          .put('/api/committeeAnswer/someInvalidID')
          .set('Authorization', `Bearer ${validToken.token}`)
          .expect(400, { error: 'bad_request', reason: 'Identifiant de candidature invalide' }, done)
      })
    })

    describe('When an unexisting id is provided', () => {
      const unexistingId = '3defd16a5159536779e9fd16'

      it('should return a 400 error', (done) => {
        supertest(app)
          .put(`/api/committeeAnswer/${unexistingId}`)
          .set('Authorization', `Bearer ${validToken.token}`)
          .expect(404, done)
      })
    })

    describe('When an existing id is provided', () => {
      const existingId = '9c9d6a6b832effc406059b15'

      describe('When status in invalid', () => {
        it('should return a 400 error', (done) => {
          supertest(app)
            .put(`/api/committeeAnswer/${existingId}`)
            .send({ status: 'sent' })
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(400, { error: 'bad_request', reason: 'L\'avis du comité d\engagement l\'approbation du D2E doivent être renseignés' }, done)
        })
      })
    })

    describe('When an existing id is provided', () => {
      const existingId = '9c9d6a6b832effc406059b15'
      const committeeAnswer = {
        opinion: 'someOpinion',
        hasD2E: true,
        status: 'accepted',
      }

      describe('When status in invalid', () => {
        it('should return the updated committee answer', (done) => {
          supertest(app)
            .put(`/api/committeeAnswer/${existingId}`)
            .send(committeeAnswer)
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              expect(res.body).toContain(committeeAnswer)
              return done()
            })
        })
      })
    })
  })
})
