import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function profileReducer(state = initialState.profile, action) {
  switch (action.type) {
    case types.UPDATE_PROFILE:
      return Object.assign({}, state.profile, action.profile )
    default:
      return state
  }
}
