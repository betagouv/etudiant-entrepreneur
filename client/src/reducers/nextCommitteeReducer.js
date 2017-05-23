import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function nextCommitteeReducer(state = initialState.nextCommittee, action) {
  switch (action.type) {
    case types.LOAD_NEXT_COMMITTEE_SUCCESS:
      if (!action.nextCommittee) {
        return null
      }
      return Object.assign({}, state, action.nextCommittee)
    default:
      return state
  }
}
