const removeExcelReservedValues = require('../lib/helpers/csvExportHelper').removeExcelReservedValues

module.exports = [
  '_id',
  'contact.schoolYear',
  'contact.firstname',
  'contact.name',
  'contact.email',
  'contact.phone',
  'contact.situation',
  'contact.isRenew',
  'sentDate',
  'status',
  'hasD2E',
  'opinion',
  'pepite.pepite',
  'pepite.askCoworking',
  'project.teamType',
  'project.team',
  'project.step',
  'project.type',
  'project.name',
  {
    label: 'project.summary',
    value: (row) => {
      return removeExcelReservedValues(row.project.summary)
    }
  },
  {
    label: 'project.stepSummary',
    value: (row) => {
      return removeExcelReservedValues(row.project.stepSummary)
    }
  },
  {
    label: 'project.nextStepSummary',
    value: (row) => {
      return removeExcelReservedValues(row.project.nextStepSummary)
    }
  },
  {
    label: 'project.activitySummary',
    value: (row) => {
      return removeExcelReservedValues(row.project.activitySummary)
    }
  },
  {
    label: 'project.motiviation',
    value: (row) => {
      return removeExcelReservedValues(row.project.motiviation)
    }
  },
  'project.status',
  'project.siret',
  'project.sector',
  'project.otherSector',
  'project.site',
  'project.linkedin',
  'project.blog',
  'project.facebook',
  'project.twitter',
  'career.tutor.name',
  'career.tutor.firstname',
  'career.tutor.skill',
  'career.tutor.email',
  'career.tutor.askYearOff',
  'career.tutor.replaceModule',
  'career.tutor.replaceInternship',
  'career.bac.isOriginal',
  'career.bac.country',
  'career.bac.year',
  'career.bac.type',
  'career.bac.stream',
  'career.bac.establishment',
  'career.bac.city',
  'career.diploma.city',
  'career.diploma.establishment',
  'career.diploma.sector', {
    label: 'career.diploma.name',
    value: (row) => {
      return removeExcelReservedValues(row.career.diploma.name)
    }
  },
  'career.diploma.type',
  'career.diploma.year',
  'profile.gender',
  'profile.situation',
  'profile.askD2E',
  'profile.birthDate',
  'profile.birthPlace',
  'profile.nationality',
  'profile.ine', {
    label: 'profile.motivation',
    value: (row) => {
      return removeExcelReservedValues(row.profile.motivation)
    }
  },
  'profile.address',
  'profile.cp',
  'profile.city',
  'profile.country',
  'profile.hasActivity',
  'profile.activity',
  'profile.isUnemployed',
  'profile.isFreelance',
  'profile.isPartTime',
  'profile.twitter',
  'profile.facebook',
  'profile.linkedin',
  'profile.viadeo',
  'career.entrepreneurship'
]
