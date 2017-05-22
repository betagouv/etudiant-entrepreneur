import * as types from './actionTypes'

export function loadContactSuccess(contact) {
  return { type: types.LOAD_CONTACT_SUCCESS, contact }
}

export function copyContactSuccess(contact) {
  return { type: types.COPY_CONTACT_SUCCESS, contact }
}

export function updateContact(contact) {
  return { type: types.UPDATE_CONTACT, contact }
}


