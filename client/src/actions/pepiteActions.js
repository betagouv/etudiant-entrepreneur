import * as types from './actionTypes'
import pepiteApi from '../api/pepiteApi'

export function loadPepiteSuccess(pepite) {
  return { type: types.LOAD_PEPITE_SUCCESS, pepite }
}

export function updatePepite(pepite) {
  return { type: types.UPDATE_PEPITE, pepite }
}

export function getRegions() {
  return (dispatch, getState) => {
    return pepiteApi.getRegions()
  }
}

export function getEstablishments(regionId) {
  return (dispatch, getState) => {
    return pepiteApi.getEstablishments(regionId)
  }
}

export function getPepites(regionId, pepiteId) {
  return (dispatch, getState) => {
    if (pepiteId) {
      return [pepiteApi.getPepite(pepiteId)]
    } else {
      return pepiteApi.getPepites(regionId)
    }
  }
}
