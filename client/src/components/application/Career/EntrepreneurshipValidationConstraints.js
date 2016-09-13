import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const entrepreneurshipValidationConstraints = {
  name: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  year: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  desc: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  }
}
