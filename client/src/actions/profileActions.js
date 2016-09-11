import * as types from './actionTypes'

export function loadProfileSuccess(profile) {
  return { type: types.LOAD_PROFILE_SUCCESS, profile }
}

export function updateProfile(profile) {
  return { type: types.UPDATE_PROFILE, profile }
}

