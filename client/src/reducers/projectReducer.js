import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function projectReducer(state = initialState.project, action) {
  switch (action.type) {
    case types.UPDATE_PROJECT:
    case types.LOAD_PROJECT_SUCCESS:
      return Object.assign({}, state, action.project )
    default:
      return state
  }
}
