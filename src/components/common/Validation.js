import validator from 'validator'

const Validation = class Validation {
  constructor(constraints) {
    Object.assign(this, { constraints })
  }

  validateField(field, value) {
    if (field in this.constraints && !this.constraints[field].isValid(value)) {
      return this.constraints[field].errorMessage
    }
  }
}

export default Validation
