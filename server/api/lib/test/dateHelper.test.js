const expect = require('expect')
const dateHelper = require('../testUtils/dateHelper')

describe('dateHelper.js', () => {
  describe('isValidDate', () => {
    describe('When called with a valid jsonDate', () => {
      const validJsonDate = '2017-09-29T10:00:00.000Z'
      it('Should return true', () => {
        expect(dateHelper.isValidDate(validJsonDate)).toBe(true)
      })
    })
    describe('When called with an invalid jsonDate', () => {
      const validJsonDate = '2017-42-29T10:00:00.000Z'
      it('Should return true', () => {
        expect(dateHelper.isValidDate(validJsonDate)).toBe(false)
      })
    })
    describe('When called with null', () => {
      it('Should return true', () => {
        expect(dateHelper.isValidDate(null)).toBe(false)
      })
    })
    describe('When called with undefined', () => {
      it('Should return true', () => {
        expect(dateHelper.isValidDate(undefined)).toBe(false)
      })
    })
    describe('When called with a non date string', () => {
      it('Should return true', () => {
        expect(dateHelper.isValidDate('NotaDate')).toBe(false)
      })
    })
  })
  describe('yesterday', () => {
    it('Should be a date true', () => {
      expect(dateHelper.yesterday()).toBeA(Date)
    })
  })
})
