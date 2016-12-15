import applicationApi from '../api/applicationApi'
import * as types from './actionTypes'


export function loadCommitteeAnswerSuccess(committeeAnswer) {
  return { type: types.LOAD_COMMITTEE_ANSWER_SUCCESS, committeeAnswer }
}

export function updateCommitteeAnswer(committeeAnswer) {
  return { type: types.UPDATE_COMMITTEE_ANSWER, committeeAnswer }
}

export function applicationToCommitteeAnswer(application) {
  let status = ''
  if (application.status == 'refused') {
    status = 'refused'
  } else if (application.status == 'accepted') {
    if (application.hasD2E) {
      status = 'D2E'
    } else {
      status = 'SNEE'
    }
  }
  return ({
    opinion: application.opinion,
    status
  })
}

function committeeAnswerToApplication(committeeAnswer) {
  switch (committeeAnswer.status) {
    case 'refused':
      return ({
        opinion: committeeAnswer.opinion,
        hasD2E: false,
        status: 'refused'
      })
    case 'D2E':
      return ({
        opinion: committeeAnswer.opinion,
        hasD2E: true,
        status: 'accepted'
      })
    case 'SNEE':
      return ({
        opinion: committeeAnswer.opinion,
        hasD2E: false,
        status: 'accepted'
      })

    default:
      return ({
        opinion: committeeAnswer.opinion,
        hasD2E: false,
        status: 'refused'
      })
  }
}

export function loadCommitteeAnswer(applicationId) {
  return dispatch => {
    return applicationToCommitteeAnswer(applicationApi.getApplication(applicationId))
  }
}

export function saveCommitteeAnswer(applicationId, committeeAnswer) {
  return (dispatch, getState) => {
    const {user} = getState()
    return applicationApi.updateCommitteeAnswer(applicationId, committeeAnswerToApplication(committeeAnswer), user.token).then(application => {
      return applicationToCommitteeAnswer(application)
    })
  }
}
