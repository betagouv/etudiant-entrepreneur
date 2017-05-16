const expect = require('expect')
const removeExcelReservedValues = require('../helpers/csvExportHelper').removeExcelReservedValues

describe('csvExportHelper.js', () => {
  describe('removeExcelReservedValues', () => {
    describe('When called with an empty string', () => {
      const text = ''
      it('Should return an empty string', () => {
        expect(removeExcelReservedValues(text)).toEqual('')
      })
    })
    describe('When called with an undefined value', () => {
      const text = undefined
      it('Should return an empty string', () => {
        expect(removeExcelReservedValues(text)).toEqual('')
      })
    })
    describe('When called with an null value', () => {
      const text = null
      it('Should return an empty string', () => {
        expect(removeExcelReservedValues(text)).toEqual('')
      })
    })
    describe('When called with string ', () => {
      describe('Who does not contain any semi colon', () => {
        const text = 'String without any semi colon'
        it('Should return the same string', () => {
          expect(removeExcelReservedValues(text)).toEqual(text)
        })
      })
      describe('Who does contain semi colons', () => {
        const text = 'String; with; semi colons;;;'
        it('Should return the same string', () => {
          expect(removeExcelReservedValues(text)).toEqual('String with semi colons')
        })
      })
    })
  })
})
