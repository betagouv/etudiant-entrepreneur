import ApplicationApi from '../api/mockApplicationApi'
import * as types from './actionTypes'

export function saveProject(project) {
  return { type: types.UPDATE_PROJECT, project }
}
