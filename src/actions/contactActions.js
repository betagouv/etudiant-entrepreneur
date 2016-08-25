import * as types from './actionTypes'

export function saveContact(contact) {
  return { type: types.UPDATE_CONTACT, contact }
}

