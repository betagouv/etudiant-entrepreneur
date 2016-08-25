import ApplicationApi from '../api/mockApplicationApi'
import * as types from './actionTypes'

export function saveProject(project) {
  return { type: types.UPDATE_PROJECT, project }
}

export function saveMember(member) {
  return (dispatch, getState) => {
    const {project} = getState()
    project.team.push(member)
    return dispatch(saveProject(project))
  }
}
