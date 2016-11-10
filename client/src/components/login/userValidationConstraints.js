import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const userValidationConstraints = {
  email: {
    isValid: validator.isEmail,
    errorMessage: "Tu dois renseigner une adresse email valide"
  },
  password: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  }
}
