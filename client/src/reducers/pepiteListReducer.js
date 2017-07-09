import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function pepiteListReducer(state = initialState.pepiteList, action) {
  switch (action.type) {
    case types.LOAD_PEPITE_LIST_SUCCESS:
      return action.pepiteList
    default:
      return state
  }
}
