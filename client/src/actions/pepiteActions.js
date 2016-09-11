import * as types from './actionTypes'

export function loadPepiteSuccess(pepite) {
  return { type: types.LOAD_PEPITE_SUCCESS, pepite }
}

export function updatePepite(pepite) {
  return { type: types.UPDATE_PEPITE, pepite }
}

