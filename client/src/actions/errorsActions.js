import * as types from './actionTypes'
import {contactValidationConstraints} from '../components/application/Contact/ContactValidationConstraints'
import {isEmptyObject} from '../components/common/validationHelper'
import Validation from '../components/common/Validation'

export function updateErrors(errors) {
  return { type: types.UPDATE_ERRORS, errors }
}

export function updateComponentErrors(component, componentErrors) {
  return (dispatch, getState) => {
    const {errors} = getState()
    return dispatch(updateErrors(Object.assign({}, errors, { [component]: componentErrors })))
  }
}

export function validateContact() {
  return (dispatch, getState) => {
    const {contact} = getState()
    let errors = new Validation(contactValidationConstraints).validateAllFields(contact)
    dispatch(updateComponentErrors('contact', errors))
    return isEmptyObject(errors)
  }
}
