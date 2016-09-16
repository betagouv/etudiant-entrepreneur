import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_APPLICATION_SUCCESS:
    case types.UPDATE_APPLICATION_SUCCESS:
      console.log('id ', action.application)
      return Object.assign({}, state, action.application )
    default:
      return state
  }
}
