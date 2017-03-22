import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const committeeAnswerValidationConstraints = {
  opinion: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  status: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  }
}
