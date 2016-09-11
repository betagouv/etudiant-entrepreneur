import * as types from './actionTypes'

export function loadCareerSuccess(career) {
  return { type: types.LOAD_CAREER_SUCCESS, career }
}

export function updateCareer(career) {
  return { type: types.UPDATE_CAREER, career }
}

