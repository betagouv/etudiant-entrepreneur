import * as types from './actionTypes'

export function saveProject(project) {
  return { type: types.UPDATE_PROJECT, project }
}

export function saveTeam(team) {
  return (dispatch, getState) => {
    const {project} = getState()
    return dispatch(saveProject(Object.assign({project}, {team})))
  }
}
