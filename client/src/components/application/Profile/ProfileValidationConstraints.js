import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const profileValidationConstraints = {
  gender: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  birthDate: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
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
