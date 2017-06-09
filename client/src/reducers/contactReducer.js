import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function contactReducer(state = initialState.contact, action) {
  switch (action.type) {
    case types.UPDATE_CONTACT:
    case types.LOAD_CONTACT_SUCCESS:
      return Object.assign({}, state, action.contact)
    case types.COPY_CONTACT_SUCCESS:
      delete action.contact.schoolYear
      delete action.contact.situation
      delete action.contact.isRenew
      return Object.assign({}, state, action.contact)
    default:
      return state
  }
}
