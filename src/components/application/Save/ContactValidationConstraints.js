import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const contactValidationConstraints = {
  firstname: {
    isValid: isNotEmpty,
    errorMessage: "obligartoire"
  },
  name: {
    isValid: isNotEmpty,
    errorMessage: "obligartoire"
  },
  email: {
    isValid: validator.isEmail,
    errorMessage: "Tu dois avoir une adresse email valide"
  }
}
