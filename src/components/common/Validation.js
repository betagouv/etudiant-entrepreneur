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

  validateAllFields(value) {
    let errors = []
    let error

    for (let field in value) {
      if (value.hasOwnProperty(field)) {
        error = this.validateField(field, value[field])
        if (error) {
          errors.push(error)
        }
      }
    }

    return errors
  }
}

export default Validation
