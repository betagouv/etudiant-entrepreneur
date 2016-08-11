import expect from 'expect'
import Validation from './Validation'

function isToto(value) {
  return value === 'toto'
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
    const toValidate = { testField: 'titi'}
    const sut = new Validation(constraint)
    expect(sut.validateAllFields(toValidate)).toEqual([errorMessage])
  })
  it("returns an empty array if all predicates are met", () => {
    const errorMessage = "This is a test errorMessage"
    const constraint = {
      testField: {
        isValid: isToto,
        errorMessage
      }
    }
    const toValidate = { testField: 'toto'}
    const sut = new Validation(constraint)
    expect(sut.validateAllFields(toValidate).length).toBe(0)
  })
})
