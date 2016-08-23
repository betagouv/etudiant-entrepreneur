import ApplicationApi from '../api/mockApplicationApi'
import * as types from './actionTypes'

export function loadApplicationSuccess(application) {
  return {type: types.LOAD_APPLICATION_SUCCESS, application}
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
