import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function profileReducer(state = initialState.profile, action) {
  switch (action.type) {
    case types.UPDATE_PROFILE:
    case types.LOAD_PROFILE_SUCCESS:
      return Object.assign({}, state, action.profile )
    case types.COPY_PROFILE_SUCCESS:
      delete action.profile.situation
      return Object.assign({}, state, action.profile )
    default:
      return state
  }
}
