import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function committeeAnswerReducer(state = initialState.committeeAnswer, action) {
  switch (action.type) {
    case types.LOAD_COMMITTEE_ANSWER_SUCCESS:
    case types.UPDATE_COMMITTEE_ANSWER:
      return Object.assign({}, state, action.committeeAnswer )
    default:
      return state
  }
}
