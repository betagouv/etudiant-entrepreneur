import expect from 'expect'
import * as careerActions from './careerActions'
import * as types from './actionTypes'

describe('Career Actions', () => {
  describe('loadCareerSuccess', () => {
    it('should create a LOAD_CAREER_SUCCESS action', () => {
      const career = { someCareer: 'test' }
      const expectedAction = {
        type: types.LOAD_CAREER_SUCCESS,
        career: career
      }

      const action = careerActions.loadCareerSuccess(career)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('updateCareerSuccess', () => {
    it('should create a UPDATE_CAREER action', () => {
      const career = { someCareer: 'test' }
      const expectedAction = {
        type: types.UPDATE_CAREER,
        career: career
      }

      const action = careerActions.updateCareer(career)

      expect(action).toEqual(expectedAction)
    })
  })
})
