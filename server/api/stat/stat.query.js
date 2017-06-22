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

function applicationGenderSummary() {
  return Application.aggregate([
    { $match: { status: { $ne: 'saved' }, 'contact.schoolYear': 2017 } },
    {
      $project: {
        male: { $cond: [{ $eq: ['$profile.gender', 'male'] }, 1, 0] },
        female: { $cond: [{ $eq: ['$profile.gender', 'female'] }, 1, 0] },
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        male: { $sum: '$male' },
        female: { $sum: '$female' },
      }
    },
    {
      $project: {
        _id: 0,
        total: 1,
        female: 1,
        male: 1
      }
    }
  ])
}

module.exports = {
  applicationSummary,
  applicationGenderSummary
}
