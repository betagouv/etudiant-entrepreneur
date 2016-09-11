import expect from 'expect'
import * as profileActions from './profileActions'
import * as types from './actionTypes'

describe('Profile Actions', () => {
  describe('loadProfileSuccess', () => {
    it('should create a LOAD_PROFILE_SUCCESS action', () => {
      const profile = { someProfile: 'test' }
      const expectedAction = {
        type: types.LOAD_PROFILE_SUCCESS,
        profile: profile
      }

      const action = profileActions.loadProfileSuccess(profile)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('updateProfileSuccess', () => {
    it('should create a UPDATE_PROFILE action', () => {
      const profile = { someProfile: 'test' }
      const expectedAction = {
        type: types.UPDATE_PROFILE,
        profile: profile
      }

      const action = profileActions.updateProfile(profile)

      expect(action).toEqual(expectedAction)
    })
  })
})
