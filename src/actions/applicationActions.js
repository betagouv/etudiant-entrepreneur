import ApplicationApi from '../api/mockApplicationApi'
import * as types from './actionTypes'

export function loadApplicationSuccess(application) {
  return {type: types.LOAD_APPLICATION_SUCCESS, application}
}

export function updateApplicationSuccess(application) {
  return { type: types.UPDATE_APPLICATION_SUCCESS, application}
}

export function loadApplication(id) {
  return dispatch => {
    return ApplicationApi.getApplication(id).then(application => {
      dispatch(loadApplicationSuccess(application))
    }).catch(error => {
      throw(error)
    })
  }
}

export function saveApplication() {
  return (dispatch, getState) => {
    const {applicationId, project} = getState()
    return ApplicationApi.saveApplication(Object.assign({applicationId, project})).then(application => {
      dispatch(updateApplicationSuccess(application))
    }).catch(error => {
      throw (error)
    })
  }
}
