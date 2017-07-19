import applicationApi from '../api/applicationApi'
import { loadContactSuccess, copyContactSuccess } from './contactActions'
import { loadProjectSuccess } from './projectActions'
import { loadPepiteSuccess } from './pepiteActions'
import { loadProfileSuccess, copyProfileSuccess } from './profileActions'
import { loadCareerSuccess } from './careerActions'
import { loadCommitteeAnswerSuccess, applicationToCommitteeAnswer } from './committeeAnswerActions'
import * as types from './actionTypes'


export function loadApplicationSuccess(application) {
  return {
    type: types.LOAD_APPLICATION_SUCCESS,
    application: {
      id: application.id,
      status: application.status
    }
  }
}

export function updateApplicationSuccess(application) {
  return { type: types.UPDATE_APPLICATION_SUCCESS,
    application: {
      id: application.id,
      status: application.status
    }
  }
}

export function loadApplication(id) {
  return dispatch => {
    return applicationApi.getApplication(id).then(application => {
      dispatch(loadApplicationSuccess(application))
      dispatch(loadContactSuccess(application.contact))
      dispatch(loadCommitteeAnswerSuccess(applicationToCommitteeAnswer(application)))
      if (application.project) {
        dispatch(loadProjectSuccess(application.project))
      }
      if (application.pepite) {
        dispatch(loadPepiteSuccess(application.pepite))
      }
      if (application.profile) {
        dispatch(loadProfileSuccess(application.profile))
      }
      if (application.career) {
        dispatch(loadCareerSuccess(application.career))
      }
      return application
    }).catch(error => {
      throw (error)
    })
  }
}

export function copyApplication(id) {
  return dispatch => {
    return applicationApi.getApplication(id).then(application => {
      dispatch(copyContactSuccess(application.contact))
      dispatch(loadCommitteeAnswerSuccess(applicationToCommitteeAnswer(application)))
      if (application.project) {
        dispatch(loadProjectSuccess(application.project))
      }
      if (application.pepite) {
        dispatch(loadPepiteSuccess(application.pepite))
      }
      if (application.profile) {
        dispatch(copyProfileSuccess(application.profile))
      }
      if (application.career) {
        dispatch(loadCareerSuccess(application.career))
      }
      return application
    }).catch(error => {
      throw (error)
    })
  }
}

export function saveApplication() {
  return (dispatch, getState) => {
    const {application, project, contact, profile, pepite, career} = getState()
    if (!application.id) {
      return applicationApi.saveApplication(Object.assign({ project, contact, profile, career, pepite })).then(application => {
        dispatch(updateApplicationSuccess(application))
        return application
      })
    }
    else {
      return applicationApi.updateApplication(application.id, Object.assign({ project, contact, profile, career, pepite })).then(application => {
        dispatch(updateApplicationSuccess(application))
        return application
      })
    }
  }
}

export function sendApplication() {
  return (dispatch, getState) => {
    const {application, project, contact, profile, pepite, career} = getState()
    if (!application.id) {
      throw (new Error('Il faut sauvegarder la candidature avant de pouvoir l\envoyer'))
    }
    else {
      return applicationApi.sendApplication(application.id, Object.assign({ project, contact, profile, career, pepite })).then(application => {
        dispatch(updateApplicationSuccess(application))
        return application
      })
    }
  }
}

export function getPepiteApplication() {
  return (dispatch, getState) => {
    const {user} = getState()
    return applicationApi.getAllPepiteApplications(user.id, user.token)
  }
}

export function getOtherApplication(id) {
  return (dispatch, getState) => {
    const {user} = getState()
    return applicationApi.getOtherApplication(id, user.token)
  }
}

export function getAllApplication(filter, page) {
  return (dispatch, getState) => {
    const {user} = getState()
    return applicationApi.getAllApplication(filter, page, user.token)
  }
}

export function getPepiteApplicationXls() {
  return (dispatch, getState) => {
    const {user} = getState()
    return applicationApi.getAllPepiteApplicationsXls(user.id, user.token)
  }
}
