import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function pepiteReducer(state = initialState.pepite, action) {
  switch (action.type) {
    case types.UPDATE_PEPITE:
    case types.LOAD_PEPITE_SUCCESS:
      return Object.assign({}, state.pepite, action.pepite )
    default:
      return state
  }
}
