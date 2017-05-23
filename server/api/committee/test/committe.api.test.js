const supertest = require('supertest')
const Server = require('../../server')

const CommitteeModel = require('../committee.model')

const authHelper = require('../../lib/testUtils/authHelper')
const dateHelper = require('../../lib/testUtils/dateHelper')

const expect = require('expect')

describe('api: pepite/:pepiteId/committee', () => {
  let app
  const validPepiteId = 21

  before(() => {
    app = new Server({ isTest: true }).getApp()
  })

  describe('When requesting pepite/:pepiteId/committee/ping', () => {
    describe('When a valid pepiteId is provided', () => {
      it('should return pong', (done) => {
        supertest(app)
          .get(`/api/pepite/${validPepiteId}/committee/ping`)
          .expect(200, '"pong"', done)
      })
    })
    describe('When a invalid pepiteId is provided', () => {
      it('should return pong', (done) => {
        supertest(app)
          .get('/api/pepite/invalidId/committee/ping')
          .expect(404, done)
      })
    })
  })

  describe('When creating a committee', () => {
    let validToken = {}

    before((done) => {
      authHelper.getToken(app, 'peel@univ-lorraine.fr', 'test', validToken, done)
    })

    after((done) => {
      CommitteeModel.remove(done)
    })

    describe('When an invalidtoken is provided', () => {
      it('should return a 401 error', (done) => {
        supertest(app)
          .post(`/api/pepite/${validPepiteId}/committee`)
          .expect(401, done)
      })
    })

    describe('When an valid token is provided', () => {
      describe('When committee date is invalid', () => {
        it('should return a 400 error', (done) => {
          supertest(app)
            .post(`/api/pepite/${validPepiteId}/committee`)
            .send({ date: 'invalidDate' })
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(400, done)
        })
      })

      describe('When committee date is valid', () => {
        const committee = {
          date: '2017-09-29T10:00:00.000Z',
          lastApplicationDate: '2017-09-29T10:00:00.000Z'
        }
        let response = null
        it('should return a 201', (done) => {
          supertest(app)
            .post(`/api/pepite/${validPepiteId}/committee`)
            .send(committee)
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(201)
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              response = res
              return done()
            })
        })
        it('should contain the provided dates', () => {
          expect(response.body).toContain(committee)
        })
        it('should include an _id field', () => {
          expect(response.body).toIncludeKey('_id')
        })
        it('should include a creation date field', () => {
          expect(response.body).toIncludeKey('createdAt')
          expect(dateHelper.isValidDate(response.body.createdAt)).toBe(true)
        })
        it('should include an update date field', () => {
          expect(response.body).toIncludeKey('updatedAt')
          expect(dateHelper.isValidDate(response.body.updatedAt)).toBe(true)
        })
        it('should include pepite id field', () => {
          expect(response.body).toIncludeKey('pepite')
          expect(response.body.pepite).toBe(21)
        })
      })
    })
  })

  describe('When retrieving committees', () => {
    const savedCommittees = [{
      pepite: 21,
      date: '2017-09-29T10:00:00.000Z',
      lastApplicationDate: '2017-09-29T10:00:00.000Z',
    }, {
      pepite: 21,
      date: '2017-10-29T10:00:00.000Z',
      lastApplicationDate: '2017-09-29T10:00:00.000Z',
    }, {
      pepite: 2,
      date: '2017-10-29T10:00:00.000Z',
      lastApplicationDate: '2017-09-29T10:00:00.000Z',
    }, {
      pepite: 3,
      date: '2017-10-29T10:00:00.000Z',
      lastApplicationDate: '2017-09-29T10:00:00.000Z',
    }]

    before((done) => {
      CommitteeModel.insertMany(savedCommittees, done)
    })

    after((done) => {
      CommitteeModel.remove(done)
    })

    describe('When PEPITE has several committees', () => {
      let committees = null
      it('should return a 200 response', (done) => {
        supertest(app)
          .get(`/api/pepite/${validPepiteId}/committee`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            committees = res.body
            return done()
          })
      })
      it('should return all PEPITE\'s committes', () => {
        expect(committees.length).toBe(2)
        expect(committees[0]).toContain(savedCommittees[0])
        expect(committees[1]).toContain(savedCommittees[1])
      })
    })

    describe('When PEPITE does not have any committees', () => {
      let committees = null
      const pepiteIdWithoutCommittee = 4
      it('should return a 200 response', (done) => {
        supertest(app)
          .get(`/api/pepite/${pepiteIdWithoutCommittee}/committee`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            committees = res.body
            return done()
          })
      })
      it('should return an empty array', () => {
        expect(committees.length).toBe(0)
        expect(committees).toBeAn('array')
      })
    })
  })

  describe('When retrieving the next committee', () => {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const tomorrow = new Date()
    tomorrow.setUTCHours(0, 0, 0, 0)
    tomorrow.setDate(today.getDate() + 1)
    const yesterday = new Date()
    yesterday.setUTCHours(0, 0, 0, 0)
    yesterday.setDate(today.getDate() - 1)

    describe('When PEPITE has several committees', () => {
      const savedCommittees = [{
        pepite: 21,
        date: tomorrow,
        lastApplicationDate: tomorrow,
      }, {
        pepite: 21,
        date: today,
        lastApplicationDate: today,
      }, {
        pepite: 21,
        date: yesterday,
        lastApplicationDate: yesterday,
      }]

      before((done) => {
        CommitteeModel.insertMany(savedCommittees, done)
      })

      after((done) => {
        CommitteeModel.remove(done)
      })

      let committee = null
      it('should return a 200 response with the next committee', (done) => {
        supertest(app)
          .get(`/api/pepite/${validPepiteId}/committee/next`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            committee = res.body
            return done()
          })
      })
      it('should return the next occuring committee by lastApplicationDate', () => {
        expect(new Date(committee.lastApplicationDate)).toEqual(savedCommittees[1].lastApplicationDate)
      })
    })

    describe('When PEPITE has no future committees', () => {
      const savedCommittees = [{
        pepite: 21,
        date: yesterday,
        lastApplicationDate: yesterday,
      }, {
        pepite: 10,
        date: tomorrow,
        lastApplicationDate: tomorrow,
      }]

      before((done) => {
        CommitteeModel.insertMany(savedCommittees, done)
      })

      after((done) => {
        CommitteeModel.remove(done)
      })

      it('should return a 404 response', (done) => {
        supertest(app)
          .get(`/api/pepite/${validPepiteId}/committee/next`)
          .expect(404, done)
      })
    })

    describe('When PEPITE has a future committee', () => {
      const savedCommittees = [{
        pepite: 21,
        date: tomorrow,
        lastApplicationDate: tomorrow,
      }]

      before((done) => {
        CommitteeModel.insertMany(savedCommittees, done)
      })

      after((done) => {
        CommitteeModel.remove(done)
      })

      let committee = null
      it('should return a 200 response with the futur committee', (done) => {
        supertest(app)
          .get(`/api/pepite/${validPepiteId}/committee/next`)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            committee = res.body
            return done()
          })
      })
      it('should return the next occuring committee by lastApplicationDate', () => {
        expect(new Date(committee.lastApplicationDate)).toEqual(savedCommittees[0].lastApplicationDate)
      })
    })
  })

  describe('When updating a committee', () => {
    let validToken = {}
    const existingId = '9b754413ed0ba56803929a9b'
    const unexistingId = '5e587219b8fa9d73f410eb17'
    const validPepiteId = 21

    const savedCommittees = [{
      _id: existingId,
      pepite: 21,
      date: '2017-09-29T10:00:00.000Z',
      lastApplicationDate: '2017-09-29T10:00:00.000Z',
    }, {
      _id: '7c97a7dbff2ab0fa85746b41',
      pepite: 3,
      date: '2017-10-29T10:00:00.000Z',
      lastApplicationDate: '2017-09-29T10:00:00.000Z',
    }]

    before((done) => {
      CommitteeModel.insertMany(savedCommittees, () => {
        authHelper.getToken(app, 'peel@univ-lorraine.fr', 'test', validToken, done)
      })
    })

    after((done) => {
      CommitteeModel.remove(done)
    })

    describe('When an invalidtoken is provided', () => {
      it('should return a 401 error', (done) => {
        supertest(app)
          .put(`/api/pepite/${validPepiteId}/committee/${existingId}`)
          .expect(401, done)
      })
    })

    describe('When a valid token is provided', () => {
      describe('When committee id does not exist', () => {
        it('should return a 404 error', (done) => {
          supertest(app)
            .put(`/api/pepite/${validPepiteId}/committee/${unexistingId}`)
            .send({ date: '2017-09-27T10:00:00.000Z' })
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(404, done)
        })
      })

      describe('When committee id is invalid', () => {
        it('should return a 404 error', (done) => {
          supertest(app)
            .put(`/api/pepite/${validPepiteId}/committee/invalidId`)
            .send({ date: '2017-09-27T10:00:00.000Z' })
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(404, done)
        })
      })

      describe('When committee date is invalid', () => {
        it('should return a 400 error', (done) => {
          supertest(app)
            .put(`/api/pepite/${validPepiteId}/committee/${existingId}`)
            .send({ date: 'invalidDate' })
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(400, done)
        })
      })

      describe('When committee date is valid', () => {
        const committee = {
          date: '2017-09-28T10:00:00.000Z'
        }
        let response = null
        it('should return a 200', (done) => {
          supertest(app)
            .put(`/api/pepite/${validPepiteId}/committee/${existingId}`)
            .send(committee)
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              response = res
              return done()
            })
        })
        it('should contain the updated date', () => {
          expect(response.body).toContain(committee)
        })
        it('should include an _id field', () => {
          expect(response.body).toIncludeKey('_id')
        })
        it('should include a creation date field', () => {
          expect(response.body).toIncludeKey('createdAt')
          expect(dateHelper.isValidDate(response.body.createdAt)).toBe(true)
        })
        it('should include an update date field', () => {
          expect(response.body).toIncludeKey('updatedAt')
          expect(dateHelper.isValidDate(response.body.updatedAt)).toBe(true)
        })
        it('should include pepite id field', () => {
          expect(response.body).toIncludeKey('pepite')
          expect(response.body.pepite).toBe(21)
        })
      })

      describe('When committee message is prodivded', () => {
        const committee = {
          message: 't'.repeat(160)
        }
        let response = null
        it('should return a 200', (done) => {
          supertest(app)
            .put(`/api/pepite/${validPepiteId}/committee/${existingId}`)
            .send(committee)
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              response = res
              return done()
            })
        })
        it('should contain the updated message', () => {
          expect(response.body).toContain(committee)
        })
        it('should include an _id field', () => {
          expect(response.body).toIncludeKey('_id')
        })
        it('should include a creation date field', () => {
          expect(response.body).toIncludeKey('createdAt')
          expect(dateHelper.isValidDate(response.body.createdAt)).toBe(true)
        })
        it('should include an update date field', () => {
          expect(response.body).toIncludeKey('updatedAt')
          expect(dateHelper.isValidDate(response.body.updatedAt)).toBe(true)
        })
        it('should include pepite id field', () => {
          expect(response.body).toIncludeKey('pepite')
          expect(response.body.pepite).toBe(21)
        })
      })

      describe('When committee message is too long', () => {
        const committee = {
          message: 't'.repeat(161)
        }
        it('should return a 400', (done) => {
          supertest(app)
            .put(`/api/pepite/${validPepiteId}/committee/${existingId}`)
            .send(committee)
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(400, done)
        })
      })
    })
  })

  describe('When deleting a committee', () => {
    let validToken = {}
    const existingId = '9b754413ed0ba56803929a9b'
    const unexistingId = '5e587219b8fa9d73f410eb17'
    const validPepiteId = 21

    const savedCommittees = [{
      _id: existingId,
      pepite: 21,
      date: '2017-09-29T10:00:00.000Z',
      lastApplicationDate: '2017-09-29T10:00:00.000Z',
    }, {
      _id: '7c97a7dbff2ab0fa85746b41',
      pepite: 3,
      date: '2017-10-29T10:00:00.000Z',
      lastApplicationDate: '2017-09-29T10:00:00.000Z',
    }]

    before((done) => {
      CommitteeModel.insertMany(savedCommittees, () => {
        authHelper.getToken(app, 'peel@univ-lorraine.fr', 'test', validToken, done)
      })
    })

    after((done) => {
      CommitteeModel.remove(done)
    })

    describe('When an invalidtoken is provided', () => {
      it('should return a 401 error', (done) => {
        supertest(app)
          .delete(`/api/pepite/${validPepiteId}/committee/${existingId}`)
          .expect(401, done)
      })
    })

    describe('When a valid token is provided', () => {
      describe('When committee id does not exist', () => {
        it('should return a 404 error', (done) => {
          supertest(app)
            .delete(`/api/pepite/${validPepiteId}/committee/${unexistingId}`)
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(404, done)
        })
      })

      describe('When committee id is invalid', () => {
        it('should return a 404 error', (done) => {
          supertest(app)
            .delete(`/api/pepite/${validPepiteId}/committee/invalidId`)
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(404, done)
        })
      })

      describe('When committee date is valid', () => {
        let response = null
        it('should return a 204', (done) => {
          supertest(app)
            .delete(`/api/pepite/${validPepiteId}/committee/${existingId}`)
            .set('Authorization', `Bearer ${validToken.token}`)
            .expect(204)
            .end((err, res) => {
              if (err) {
                return done(err)
              }
              response = res
              return done()
            })
        })
        it('should not contain a body', () => {
          expect(response.body).toEqual({})
        })
      })
    })
  })
})
