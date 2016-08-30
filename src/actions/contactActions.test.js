import expect from 'expect'
import * as contactActions from './contactActions'
import * as types from './actionTypes'

describe('Contact Actions', () => {
  describe('loadContactSuccess', () => {
    it('should create a LOAD_CONTACT_SUCCESS action', () => {
      const contact = { someContact: 'test' }
      const expectedAction = {
        type: types.LOAD_CONTACT_SUCCESS,
        contact: contact
      }

      const action = contactActions.loadContactSuccess(contact)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('updateContactSuccess', () => {
    it('should create a UPDATE_CONTACT action', () => {
      const contact = { someContact: 'test' }
      const expectedAction = {
        type: types.UPDATE_CONTACT,
        contact: contact
      }

      const action = contactActions.updateContact(contact)

      expect(action).toEqual(expectedAction)
    })
  })
})
