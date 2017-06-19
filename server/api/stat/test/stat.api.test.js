const supertest = require('supertest')
const expect = require('expect')

const Server = require('../../server')
const ApplicationModel = require('../../application/application.model')
const applicationData = require('./application.seed')
const pepiteData = require('../../pepite/pepite.seed')

describe('api: stat', () => {
  let app

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting /api/stat/ping', () => {
    it('should return pong', (done) => {
      supertest(app)
        .get('/api/stat/ping')
        .expect(200, '"pong"', done)
    })
  })

  describe('When requesting /api/stat/applicationSummary', () => {
    const expectedApplicationSummary = pepiteData.map((p) => { return { _id: p._id, name: p.name } })
    describe('When there is no application registered', () => {
      it('should return pepite populated array', (done) => {
        supertest(app)
          .get('/api/stat/applicationSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            const applicationSummay = res.body
            expect(applicationSummay.length).toEqual(pepiteData.length)
            for (var index = 0; index < applicationSummay.length; index++) {
              expect(applicationSummay[index]).toInclude(expectedApplicationSummary[index])
            }
            return done()
          })
      })
    })

    describe('When there is at least an application', () => {
      before((done) => {
        ApplicationModel.insertMany(applicationData, done)
      })

      after((done) => {
        ApplicationModel.remove(done)
      })

      it('should return pepite populated array', (done) => {
        const expectedPepiteSummary = Object.assign({}, expectedApplicationSummary[0], {
          sent: 1,
          accepted: 1
        })
        supertest(app)
          .get('/api/stat/applicationSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.length).toEqual(expectedApplicationSummary.length)
            expect(res.body[0]).toEqual(expectedPepiteSummary)
            return done()
          })
      })
    })
  })
})
