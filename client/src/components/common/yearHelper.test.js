import expect from 'expect'
import {getDescYearList, getUniversityYear} from './yearHelper.js'

describe('getYearList', () => {
  it('should return the list of previous years', () => {
    const exptedResult = [2002, 2001, 2000, 1999]
    const startYear = 2002
    const nbPreviousYears = 3
    expect(getDescYearList(startYear, nbPreviousYears)).toEqual(exptedResult)
  })
})

describe('getUniversityYear', () => {
  it('should return the univeristy year pair', () => {
    const exptedResult = "2009-2010"
    const givenYear = 2009
    expect(getUniversityYear(givenYear)).toEqual(exptedResult)
  })
})
