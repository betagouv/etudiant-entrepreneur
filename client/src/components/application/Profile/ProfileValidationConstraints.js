import validator from 'validator'
import Moment from 'moment'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

function isValidBirthDate(value) {
  const date = new Moment(value)
  return (date.isBefore(new Moment().subtract(11, 'years')))
}

export const profileValidationConstraints = {
  gender: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  birthDate: {
    isValid: isValidBirthDate,
    errorMessage: "Ta date de naissance doit être valide"
  },
  birthPlace: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  nationality: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  motivation: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  address: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  cp: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  city: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  country: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  hasActivity: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  isUnemployed: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  isFreelance: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  }
}
