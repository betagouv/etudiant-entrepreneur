import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const teamMemberValidationConstraints = {
  firstname: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  name: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  role: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  diploma: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  email: {
    isValid: validator.isEmail,
    errorMessage: "l'adresse email doit être valide"
  },
}
