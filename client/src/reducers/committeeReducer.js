import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function committeeAnswerReducer(state = initialState.committees, action) {
  switch (action.type) {
    case types.LOAD_COMMITTEES_SUCCESS:
      return action.committees

    case types.CREATE_COMMITTEE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.committee)
      ]

    case types.UPDATE_COMMITTEE_SUCCESS:
      return [
        ...state.filter(committee => committee._id !== action.committee._id),
        Object.assign({}, action.committee)
      ]

    case types.DELETE_COMMITTEE_SUCCESS:
      return [
        ...state.filter(committee => committee._id !== action.committee._id)
      ]

    default:
      return state
  }
}
