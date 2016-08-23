import ProjectApi from '../api/mockProjectApi'
import * as types from './actionTypes'

export function loadProjectSuccess(project) {
  return { type: types.LOAD_PROJECT_SUCCESS, project }
}

export function updateProjectSuccess(project) {
  return { type: types.UPDATE_PROJECT_SUCCESS, project }
}

export function loadProject(id) {
  return dispatch => {
    return ProjectApi.getProject(id).then(project => {
      dispatch(loadProjectSuccess(project))
    }).catch(error => {
      throw (error)
    })
  }
}

export function saveProject(project) {
  return dispatch => {
    return ProjectApi.saveProject(project).then(project => {
      dispatch(updateProjectSuccess(project))
    }).catch(error => {
      throw (error)
    })
  }
}
