import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const pepiteValidationConstraints = {
  pepite: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  region: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  }
}
