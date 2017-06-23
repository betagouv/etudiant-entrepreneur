const supertest = require('supertest')
const expect = require('expect')

const Server = require('../../server')
const ApplicationModel = require('../../application/application.model')
const applicationData = require('./application.seed')
const applicationDiplomaData = require('./application.diploma.seed')
const applicationStatusData = require('./application.status.seed')
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

  describe('When requesting /api/stat/applicationGenderSummary', () => {
    describe('When there is no application registered', () => {
      it('should return empty object', (done) => {
        supertest(app)
          .get('/api/stat/applicationGenderSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual({})
            return done()
          })
      })
    })

    describe('When there is both a male and a female', () => {
      before((done) => {
        ApplicationModel.insertMany(applicationData, done)
      })

      after((done) => {
        ApplicationModel.remove(done)
      })

      it('should return a summary with both male and female', (done) => {
        const expectedGenderSummary = {
          total: 2,
          female: 1,
          male: 1
        }
        supertest(app)
          .get('/api/stat/applicationGenderSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual(expectedGenderSummary)
            return done()
          })
      })
    })
  })

  describe('When requesting /api/stat/applicationDiplomaSummary', () => {
    describe('When there is no application registered', () => {
      it('should return empty object', (done) => {
        supertest(app)
          .get('/api/stat/applicationDiplomaSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual({})
            return done()
          })
      })
    })

    describe('When there is both an application from each diploma sector', () => {
      before((done) => {
        ApplicationModel.insertMany(applicationDiplomaData, done)
      })

      after((done) => {
        ApplicationModel.remove(done)
      })

      it('should return a summary with all diplomas', (done) => {
        const expectedDiplomaSummary = {
          total: 5,
          law: 1,
          letter: 1,
          sport: 1,
          health: 1,
          science: 1
        }
        supertest(app)
          .get('/api/stat/applicationDiplomaSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual(expectedDiplomaSummary)
            return done()
          })
      })
    })
  })

  describe('When requesting /api/stat/applicationStudentSummary', () => {
    describe('When there is no application registered', () => {
      it('should return empty object', (done) => {
        supertest(app)
          .get('/api/stat/applicationStudentSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual({})
            return done()
          })
      })
    })

    describe('When there is both a student and a graduate', () => {
      before((done) => {
        ApplicationModel.insertMany(applicationData, done)
      })

      after((done) => {
        ApplicationModel.remove(done)
      })

      it('should return a summary with both student and graduate count', (done) => {
        const expectedStudentSummary = {
          total: 2,
          student: 1,
          graduate: 1
        }
        supertest(app)
          .get('/api/stat/applicationStudentSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual(expectedStudentSummary)
            return done()
          })
      })
    })
  })

  describe('When requesting /api/stat/applicationStatusSummary', () => {
    describe('When there is no application registered', () => {
      it('should return empty object', (done) => {
        supertest(app)
          .get('/api/stat/applicationStatusSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual({})
            return done()
          })
      })
    })

    describe('When there is an application in each status', () => {
      before((done) => {
        ApplicationModel.insertMany(applicationStatusData, done)
      })

      after((done) => {
        ApplicationModel.remove(done)
      })

      it('should return a summary with both Status and graduate count', (done) => {
        const expectedStatusSummary = {
          total: 4,
          sent: 1,
          accepted: 1,
          refused: 1,
          saved: 1
        }
        supertest(app)
          .get('/api/stat/applicationStatusSummary')
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body).toEqual(expectedStatusSummary)
            return done()
          })
      })
    })
  })
})
