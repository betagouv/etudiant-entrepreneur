import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function projectReducer(state = initialState.project, action) {
  switch (action.type) {
    case types.LOAD_PROJECT_SUCCESS:
      return action.project
    case types.UPDATE_PROJECT_SUCCESS:
      return Object.assign({}, state.project, action.project )
    default:
      return state
  }
}
