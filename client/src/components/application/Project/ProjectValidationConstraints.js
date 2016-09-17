import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export function isOtherSectorRequired(projectSector) {
  return (projectSector == '99')
}

export const projectValidationConstraints = {
  summary: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  type: {
    isValid: isNotEmpty,
    errorMessage: "Vous devez sélectionner un type de projet"
  },
  status: {
    isValid: isNotEmpty,
    errorMessage: "Vous devez sélectionner un statut juridique"
  },
  step: {
    isValid: isNotEmpty,
    errorMessage: "Vous devez sélectionner une étape"
  },
  motiviation: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  sector: {
    isValid: isNotEmpty,
    errorMessage: "Vous devez sélectionner un secteur d'activité"
  },
  site: {
    isValid: (v) => !isNotEmpty(v) || validator.isURL(v),
    errorMessage: "ton site doit être une url valide"
  },
  linkedin: {
    isValid: (v) => !isNotEmpty(v) || validator.isURL(v),
    errorMessage: "ton site doit être une url valide"
  },
  blog: {
    isValid: (v) => !isNotEmpty(v) || validator.isURL(v),
    errorMessage: "ton blog doit être une url valide"
  },
  facebook: {
    isValid: (v) => !isNotEmpty(v) || validator.isURL(v),
    errorMessage: "ton facebook doit être une url valide"
  },
  twitter: {
    isValid: (v) => !isNotEmpty(v) || validator.isURL(v),
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
