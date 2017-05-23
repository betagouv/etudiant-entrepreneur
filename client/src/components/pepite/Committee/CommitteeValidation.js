import validator from 'validator'
import Moment from 'moment'

function isValidDate(date) {
  return new Moment(date).isValid()
}

function isSmallerThan(value, nbCharacters) {
  return (value.length < nbCharacters)
}

export const committeeValidationConstraints = {
  date: {
    isValid: isValidDate,
    errorMessage: "La date doit être valide"
  },
  lastApplicationDate: {
    isValid: isValidDate,
    errorMessage: "La date doit être valide"
  },
  message: {
    isValid: (value) => { return isSmallerThan(value, 160) },
    errorMessage: "Votre message ne peut pas excéder 160 caractères"
  }
}
