import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function projectReducer(state = initialState.project, action) {
  switch (action.type) {
    case types.UPDATE_PROJECT:
      return Object.assign({}, state.project, action.project )
    default:
      return state
  }
}
