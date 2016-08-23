import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function applicationReducer(state = initialState.application, action) {
  switch (action.types) {
    case types.LOAD_APPLICATION_SUCCESS:
      return action.application
    default:
      return state
  }
}
