import expect from 'expect'
import * as applicationActions from './applicationActions'
import * as types from './actionTypes'

import thunk from 'redux-thunk'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

describe('Application Actions', () => {
  describe('loadApplicationSuccess', () => {
    it('should create a LOAD_APPLICATION_SUCCESS action', () => {
      const application = { applicationId: 'test' }
      const expectedAction = {
        type: types.LOAD_APPLICATION_SUCCESS,
        application: application
      }

      const action = applicationActions.loadApplicationSuccess(application)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('updateApplicationSuccess', () => {
    it('should create a UPDATE_APPLICATION_SUCCESS action', () => {
      const application = { applicationId: 'test' }
      const expectedAction = {
        type: types.UPDATE_APPLICATION_SUCCESS,
        application: application
      }

      const action = applicationActions.updateApplicationSuccess(application)

      expect(action).toEqual(expectedAction)
    })
  })

  const middleware = [thunk]
  const mockStore = configureMockStore(middleware)

  describe('Async Actions', () => {
    describe('loadApplication', () => {
      it('should create all LOAD_XX_SUCCESS related actions when loading application', () => {
        const application = {
          applicationId: 'test',
          project: {},
          contact: {},
          pepite: {}
        }
        const expectedActions = [
          { type: types.LOAD_APPLICATION_SUCCESS, application },
          { type: types.LOAD_PROJECT_SUCCESS, project: application.project },
          { type: types.LOAD_CONTACT_SUCCESS, contact: application.contact },
          { type: types.LOAD_PEPITE_SUCCESS, pepite: application.pepite }
        ]
        const store = mockStore({ application: {} })
        store.dispatch(applicationActions.loadApplication(application.applicationId)).then(() => {
          const actions = store.getActions()
          expect(actions[0].type).toEqual(types.LOAD_APPLICATION_SUCCESS)
          expect(actions[1].type).toEqual(types.LOAD_CONTACT_SUCCESS)
          expect(actions[2].type).toEqual(types.LOAD_PROJECT_SUCCESS)
          expect(actions[3].type).toEqual(types.LOAD_PEPITE_SUCCESS)
          //TODO test value with nock
        })
      })
    })
  })
})
