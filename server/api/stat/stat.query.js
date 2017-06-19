'use strict'

const Application = require('../application/application.model')
const Pepite = require('../pepite/pepite.model')

function applicationSummary() {
  return Application.aggregate([
    { $match: { status: { $ne: 'saved' }, 'contact.schoolYear': 2017 } },
    { $group: { _id: { pepite: '$pepite.pepite', status: '$status' }, total: { $sum: 1 } } },
    { $project: { pepiteId: '$_id.pepite', total: 1, status: '$_id.status' } },
    { $sort: { pepite: 1 } }
  ])
    .then((applicationStatusCount) => {
      return Pepite.find({}, { email: 0 }).then((pepites) => {
        const applicationSummary = pepites.map((p) => { return p.toObject() })
        applicationStatusCount.forEach((statusCount) => {
          applicationSummary[Number(statusCount.pepiteId) - 1][statusCount.status] = statusCount.total
        })
        return applicationSummary
      })
    })
}

module.exports = {
  applicationSummary
}
