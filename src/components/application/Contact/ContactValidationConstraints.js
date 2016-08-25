import validator from 'validator'

function isNotEmpty(value) {
  return (value && value.length && value.trim())
}

export const contactValidationConstraints = {
  firstname: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  name: {
    isValid: isNotEmpty,
    errorMessage: "obligatoire"
  },
  email: {
    isValid: validator.isEmail,
    errorMessage: "Tu dois avoir une adresse email valide"
  },
  phone: {
    isValid: (phone => validator.isMobilePhone(phone, 'fr-FR')),
    errorMessage: "Tu dois avoir un numéro de téléphone valide"
  }
}
