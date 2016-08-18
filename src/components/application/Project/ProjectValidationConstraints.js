import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const projectValidationConstraints = {
  summary: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  type: {
    isValid: (value) => { return (value && value !== "0") },
    errorMessage: "Vous devez sélectionner un type de projet"
  },
  site: {
    isValid: validator.isURL,
    errorMessage: "ton site doit être une url valide"
  },
  blog: {
    isValid: validator.isURL,
    errorMessage: "ton blog doit être une url valide"
  },
  facebook: {
    isValid: validator.isURL,
    errorMessage: "ton facebook doit être une url valide"
  },
  twitter: {
    isValid: validator.isURL,
    errorMessage: "ton twitter doit être une url valide"
  },
  activitySummary: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  nextStepSummary: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  stepSummary: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
}
