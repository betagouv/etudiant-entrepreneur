import committeeApi from '../api/committeeApi'
import * as types from './actionTypes'
import { loadNextCommittee } from './nextCommitteeActions'

export function loadCommittesSuccess(committees) {
  return {
    type: types.LOAD_COMMITTEES_SUCCESS,
    committees
  }
}

export function createCommitteeSuccess(committee) {
  return {
    type: types.CREATE_COMMITTEE_SUCCESS,
    committee
  }
}

export function updateCommitteeSuccess(committee) {
  return {
    type: types.UPDATE_COMMITTEE_SUCCESS,
    committee
  }
}

export function deleteCommitteeSuccess(committee) {
  return {
    type: types.DELETE_COMMITTEE_SUCCESS,
    committee
  }
}

export function loadPepiteCommittees() {
  return (dispatch, getState) => {
    const { user } = getState()
    return committeeApi.getCommittees(user.id).then((committees) => {
      dispatch(loadCommittesSuccess(committees))
      dispatch(loadNextCommittee())
    })
  }
}

export function deleteCommittee(committee) {
  return (dispatch, getState) => {
    const { user } = getState()
    return committeeApi.deleteCommittee(committee._id, user.id, user.token).then(() => {
      dispatch(deleteCommitteeSuccess(committee))
      dispatch(loadNextCommittee())
    })
  }
}

export function createCommittee(committee) {
  return (dispatch, getState) => {
    const { user } = getState()
    return committeeApi.addCommittee(committee, user.id, user.token).then((committee) => {
      dispatch(createCommitteeSuccess(committee))
      dispatch(loadNextCommittee())
    })
  }
}

export function updateCommittee(committee) {
  return (dispatch, getState) => {
    const { user } = getState()
    return committeeApi.updateCommittee(committee, user.id, user.token).then((committee) => {
      dispatch(updateCommitteeSuccess(committee))
      dispatch(loadNextCommittee())
    })
  }
}
