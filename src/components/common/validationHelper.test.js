import expect from 'expect'
import {isEmptyObject} from './validationHelper.js'

describe('isEmptyObject', () => {
  it('should return false if the object has any number of own properties', () => {
    const sut = { test: 'prop' }
    expect(isEmptyObject(sut)).toBe(false)
  })
  it('should return true if the object does not have properties', () => {
    const sut = {}
    expect(isEmptyObject(sut)).toBe(true)
  })
  it('should return true if the object has only inherited properties', () => {
    const sut = []
    expect(isEmptyObject(sut)).toBe(true)
  })
})
