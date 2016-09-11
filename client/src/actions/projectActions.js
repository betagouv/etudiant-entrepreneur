import * as types from './actionTypes'

export function loadProjectSuccess(project) {
  return { type: types.LOAD_PROJECT_SUCCESS, project }
}

export function updateProject(project) {
  return { type: types.UPDATE_PROJECT, project }
}

export function updateTeam(team) {
  return (dispatch, getState) => {
    const {project} = getState()
    return dispatch(updateProject(Object.assign({project}, {team})))
  }
}
