import * as types from './actionTypes'

export function savePepite(pepite) {
  return { type: types.UPDATE_PEPITE, pepite }
}

