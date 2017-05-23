import committeeApi from '../api/committeeApi'
import * as types from './actionTypes'

export function loadNextCommitteSuccess(nextCommittee) {
  return {
    type: types.LOAD_NEXT_COMMITTEE_SUCCESS,
    nextCommittee
  }
}

export function loadNextCommittee(pepiteId = 0) {
  return (dispatch, getState) => {
    if (!pepiteId) {
      const { user } = getState()
      pepiteId = user.id
    }
    return committeeApi.getNextCommittee(pepiteId).then((nextCommittee) => {
      dispatch(loadNextCommitteSuccess(nextCommittee))
    })
  }
}
