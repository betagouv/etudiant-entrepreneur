import expect from 'expect'
import * as errorsActions from './errorsActions'
import * as types from './actionTypes'

import thunk from 'redux-thunk'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

describe('Errors Actions', () => {
  describe('updateErrorsSuccess', () => {
    it('should create a UPDATE_ERRORS action', () => {
      const errors = { someErrors: 'test' }
      const expectedAction = {
        type: types.UPDATE_ERRORS,
        errors
      }

      const action = errorsActions.updateErrors(errors)

      expect(action).toEqual(expectedAction)
    })
  })

  // const middleware = [thunk]
  // const mockStore = configureMockStore(middleware)

//   describe('Async Actions', () => {
//     describe('validateContact', () => {
//       describe('When contact is invalid', () => {
//         const expectedAction = {
//           type: types.UPDATE_ERRORS,
//           errors: {}
//         }
//         const store = mockStore({
//           errors: {
//             contact: {}
//           },
//           contact: {}
//         })
//         store.dispatch(errorsActions.validateContact())
//         const actions = store.getActions()
//         it('should create a UPDATE_ERRORS action', () => {
//           expect(actions[0].type).toEqual(expectedAction.type)
//         })
//         it('errors should have all contact validation errors', () => {
//           expect(actions[0].errors.contact).toIncludeKeys(['name', 'firstname', 'email', 'phone', 'situation', 'isRenew'])
//         })
//       })
//     })
//   })
})
