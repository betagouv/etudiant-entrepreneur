import expect from 'expect'
import * as pepiteActions from './pepiteActions'
import * as types from './actionTypes'

describe('Pepite Actions', () => {
  describe('loadPepiteSuccess', () => {
    it('should create a LOAD_PEPITE_SUCCESS action', () => {
      const pepite = { somePepite: 'test' }
      const expectedAction = {
        type: types.LOAD_PEPITE_SUCCESS,
        pepite: pepite
      }

      const action = pepiteActions.loadPepiteSuccess(pepite)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('updatePepiteSuccess', () => {
    it('should create a UPDATE_PEPITE action', () => {
      const pepite = { somePepite: 'test' }
      const expectedAction = {
        type: types.UPDATE_PEPITE,
        pepite: pepite
      }

      const action = pepiteActions.updatePepite(pepite)

      expect(action).toEqual(expectedAction)
    })
  })
})
