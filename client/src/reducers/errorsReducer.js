import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function errorsReducer(state = initialState.errors, action) {
  switch (action.type) {
    case types.UPDATE_ERRORS:
      return Object.assign({}, state, action.errors )
    default:
      return state
  }
}
