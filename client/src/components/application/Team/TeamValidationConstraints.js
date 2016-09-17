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
  }
}
