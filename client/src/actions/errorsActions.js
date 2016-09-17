import * as types from './actionTypes'
import {contactValidationConstraints} from '../components/application/Contact/ContactValidationConstraints'
import {bacValidationConstraints, diplomaValidationConstraints} from '../components/application/Career/CareerValidationConstraints'
import {profileValidationConstraints} from '../components/application/Profile/ProfileValidationConstraints'
import {projectValidationConstraints} from '../components/application/Project/ProjectValidationConstraints'
import {pepiteValidationConstraints} from '../components/application/Pepite/PepiteValidationConstraints'
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
    const errors = new Validation(contactValidationConstraints).validateAllFields(contact)
    dispatch(updateComponentErrors('contact', errors))
    return isEmptyObject(errors)
  }
}

export function validateBac() {
  return (dispatch, getState) => {
    const {career} = getState()
    const errors = new Validation(bacValidationConstraints).validateAllFields(career.bac)
    dispatch(updateComponentErrors('bac', errors))
    return isEmptyObject(errors)
  }
}

export function validateDiploma() {
  return (dispatch, getState) => {
    const {career} = getState()
    const errors = new Validation(diplomaValidationConstraints).validateAllFields(career.diploma)
    dispatch(updateComponentErrors('diploma', errors))
    return isEmptyObject(errors)
  }
}

export function validateCareer() {
  return (dispatch, getState) => {
    return dispatch(validateBac()) && dispatch(validateDiploma())
  }
}

export function validatePepite() {
  return (dispatch, getState) => {
    const {pepite} = getState()
    const errors = new Validation(pepiteValidationConstraints).validateAllFields(pepite)
    dispatch(updateComponentErrors('pepite', errors))
    return isEmptyObject(errors)
  }
}

export function validateProfile() {
  return (dispatch, getState) => {
    const {profile} = getState()
    const errors = new Validation(profileValidationConstraints).validateAllFields(profile)
    dispatch(updateComponentErrors('profile', errors))
    return isEmptyObject(errors)
  }
}

export function validateProject() {
  return (dispatch, getState) => {
    const {project} = getState()
    const errors = new Validation(projectValidationConstraints).validateAllFields(project)
    dispatch(updateComponentErrors('project', errors))
    return isEmptyObject(errors)
  }
}

export function validateApplication() {
  return (dispatch, getState) => {
    let valid = true
    valid &= dispatch(validateContact())
    valid &= dispatch(validateCareer())
    valid &= dispatch(validatePepite())
    valid &= dispatch(validateProfile())
    valid &= dispatch(validateProject())
    return valid
  }
}
