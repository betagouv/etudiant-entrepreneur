import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const bacValidationConstraints = {
  isOriginal: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  country: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  year: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  type: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  establishment: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  city: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  }
}

export const diplomaValidationConstraints = {
  name: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  year: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  type: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  establishment: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  city: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  }
}
