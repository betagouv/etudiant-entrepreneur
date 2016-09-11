import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function applicationReducer(state = initialState, action) {
  switch (action.types) {
    case types.LOAD_APPLICATION_SUCCESS:
      return action.application
    case types.UPDATE_APPLICATION_SUCCESS:
      return Object.assign({}, state, action.application )
    default:
      return state
  }
}
