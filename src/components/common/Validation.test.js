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
