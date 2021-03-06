import expect from 'expect'
import Validation from './Validation'

function isToto(value) {
  return value === 'toto'
}

function isTiti(value) {
  return value === 'titi'
}

describe('Validation.validateField', () => {
  it("returns the error message of the field'constraint if the isValid predicate is not met", () => {
    const errorMessage = "This is a test errorMessage"
    const constraint = {
      testField: {
        isValid: isToto,
        errorMessage
      }
    }
    const sut = new Validation(constraint)
    expect(sut.validateField("testField", 'titi')).toEqual(errorMessage)
  })
  it("does not return an error message if the predicate is met", () => {
    const errorMessage = "This is a test errorMessage"
    const constraint = {
      testField: {
        isValid: isToto,
        errorMessage
      }
    }
    const sut = new Validation(constraint)
    expect(sut.validateField("testField", 'toto')).toNotExist()
  })
})

describe('Validation.validateAllFields', () => {
  it("returns a list of error messages for fields whom predicate is not met", () => {
    const errorMessage = "This is a test errorMessage"
    const constraint = {
      testField: {
        isValid: isToto,
        errorMessage
      }
    }
    const toValidate = { testField: 'titi' }
    const sut = new Validation(constraint)
    expect(sut.validateAllFields(toValidate)).toEqual({ testField: errorMessage })
  })
  it("returns an empty object if all predicates are met", () => {
    const errorMessage = "This is a test errorMessage"
    const constraint = {
      testField: {
        isValid: isToto,
        errorMessage
      }
    }
    const toValidate = { testField: 'toto' }
    const sut = new Validation(constraint)
    expect(sut.validateAllFields(toValidate)).toEqual({})
  })
  it("returns only the error messages for fields whom validation failed", () => {
    const constraint = {
      testValidField: {
        isValid: isToto,
        errorMessage: "First error message"
      },
      testInvalidField: {
        isValid: isTiti,
        errorMessage: "Second error message"
      }
    }
    const toValidate = { testValidField: 'toto', testInvalidField: 'toto' }
    const sut = new Validation(constraint)
    expect(sut.validateAllFields(toValidate)).toEqual({ testInvalidField: constraint.testInvalidField.errorMessage })
  })
  it("returns all error messages for fields whom validation failed", () => {
    const constraint = {
      testInvalidField_1: {
        isValid: isToto,
        errorMessage: "First error message"
      },
      testInvalidField_2: {
        isValid: isTiti,
        errorMessage: "Second error message"
      }
    }
    const toValidate = { testInvalidField_1: 'tata', testInvalidField_2: 'tata' }
    const sut = new Validation(constraint)
    expect(sut.validateAllFields(toValidate)).toEqual({
      testInvalidField_1: constraint.testInvalidField_1.errorMessage,
      testInvalidField_2: constraint.testInvalidField_2.errorMessage
    })
  })
})
