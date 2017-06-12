function isSet(value) {
  return (value && Number(value))
}

export const pepiteValidationConstraints = {
  pepite: {
    isValid: isSet,
    errorMessage: "obligatoire"
  },
  region: {
    isValid: isSet,
    errorMessage: "obligatoire"
  }
}
