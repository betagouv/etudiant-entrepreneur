import ApplicationApi from '../api/ApplicationApi'
import {loadContactSuccess, } from './contactActions'
import {loadProjectSuccess} from './projectActions'
import {loadPepiteSuccess} from './pepiteActions'
import {loadProfileSuccess} from './profileActions'
import {loadCareerSuccess} from './careerActions'
import * as types from './actionTypes'


export function loadApplicationSuccess(application) {
  return { type: types.LOAD_APPLICATION_SUCCESS, application }
}

export function updateApplicationSuccess(application) {
  return { type: types.UPDATE_APPLICATION_SUCCESS, application }
}

export function loadApplication(id) {
  return dispatch => {
    return ApplicationApi.getApplication(id).then(application => {
      dispatch(loadApplicationSuccess({ id: application.id }))
      dispatch(loadContactSuccess(application.contact))
      if (application.project) {
        dispatch(loadProjectSuccess(application.project))
      }
      if (application.pepite) {
        dispatch(loadPepiteSuccess(application.pepite))
      }
      if (application.pepite) {
        dispatch(loadProfileSuccess(application.profile))
      }
      if (application.pepite) {
        dispatch(loadCareerSuccess(application.career))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

export function saveApplication() {
  return (dispatch, getState) => {
    const {application, project, contact, profile, pepite, career} = getState()
    if (!application.id) {
      return ApplicationApi.saveApplication(Object.assign({ project, contact, profile, career, pepite })).then(application => {
        dispatch(updateApplicationSuccess({ id: application.id }))
        return application
      })
    }
    else {
      return ApplicationApi.updateApplication(application.id, Object.assign({ project, contact, profile, career, pepite })).then(application => {
        dispatch(updateApplicationSuccess({ id: application.id }))
        return application
      })
    }
  }
}
