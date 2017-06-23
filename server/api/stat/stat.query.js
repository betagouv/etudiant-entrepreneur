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

function applicationStudentSummary() {
  return Application.aggregate([
    { $match: { status: { $ne: 'saved' }, 'contact.schoolYear': 2017 } },
    {
      $project: {
        student: { $cond: [{$eq: ['$contact.situation', 'student']}, 1, 0]},
        graduate: { $cond: [{$eq: ['$contact.situation', 'graduate']}, 1, 0]}
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        student: { $sum: '$student' },
        graduate: { $sum: '$graduate' }
      }
    },
    {
      $project: {
        _id: 0,
        total: 1,
        student: 1,
        graduate: 1
      }
    }
  ])
}

function applicationDiplomaSummary() {
  return Application.aggregate([
    { $match: { status: { $ne: 'saved' }, 'contact.schoolYear': 2017 } },
    {
      $project: {
        law: { $cond: [{$eq: ['$career.diploma.sector', 'law']}, 1, 0]},
        letter: { $cond: [{$eq: ['$career.diploma.sector', 'letter']}, 1, 0]},
        science: { $cond: [{$eq: ['$career.diploma.sector', 'science']}, 1, 0]},
        sport: { $cond: [{$eq: ['$career.diploma.sector', 'sport']}, 1, 0]},
        health: { $cond: [{$eq: ['$career.diploma.sector', 'health']}, 1, 0]}
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        law: { $sum: '$law' },
        letter: { $sum: '$letter' },
        science: { $sum: '$science' },
        sport: { $sum: '$sport' },
        health: { $sum: '$health' }
      }
    },
    {
      $project: {
        _id: 0,
        total: 1,
        law: 1,
        letter: 1,
        science: 1,
        sport: 1,
        health: 1
      }
    }
  ])
}

function applicationStatusSummary() {
  return Application.aggregate([
    { $match: { 'contact.schoolYear': 2017 } },
    {
      $project: {
        saved: { $cond: [{$eq: ['$status', 'saved']}, 1, 0]},
        sent: { $cond: [{$eq: ['$status', 'sent']}, 1, 0]},
        accepted: { $cond: [{$eq: ['$status', 'accepted']}, 1, 0]},
        refused: { $cond: [{$eq: ['$status', 'refused']}, 1, 0]}
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        saved: { $sum: '$saved' },
        sent: { $sum: '$sent' },
        accepted: { $sum: '$accepted' },
        refused: { $sum: '$refused' },
      }
    },
    {
      $project: {
        _id: 0,
        total: 1,
        saved: 1,
        sent: 1,
        accepted: 1,
        refused: 1,
      }
    }
  ])
}

module.exports = {
  applicationSummary,
  applicationGenderSummary,
  applicationStudentSummary,
  applicationDiplomaSummary,
  applicationStatusSummary
}
