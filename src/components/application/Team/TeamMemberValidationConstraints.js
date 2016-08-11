import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const teamMemberValidationConstraints = {
  firstname: {
    isValid: isNotEmpty,
    errorMessage: "obligartoire"
  },
  name: {
    isValid: isNotEmpty,
    errorMessage: "obligartoire"
  },
  role: {
    isValid: isNotEmpty,
    errorMessage: "obligartoire"
  },
  diploma: {
    isValid: isNotEmpty,
    errorMessage: "obligartoire"
  },
}
