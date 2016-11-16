import expect from 'expect'
import * as userActions from './userActions'
import * as types from './actionTypes'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import moxios from 'moxios'

describe('User Actions', function () {
  describe('loginUserSuccess', () => {
    it('should create a LOGIN_USER_SUCCESS action', () => {
      const user = { someUser: 'test' }
      const expectedAction = {
        type: types.LOGIN_USER_SUCCESS,
        user
      }

      const action = userActions.loginUserSuccess(user)

      expect(action).toEqual(expectedAction)
    })
  })

  const middleware = [thunk]
  const mockStore = configureMockStore(middleware)

  describe('Async Actions', () => {
    beforeEach(function () {
      moxios.install()
    })

    afterEach(function () {
      moxios.uninstall()
    })

    describe('loginUser', () => {
      it('should create an LOGIN_USER_SUCCESS action', () => {
        const expectedToken = 'expectedValidToken'

        moxios.wait(() => {
          let request = moxios.requests.mostRecent()
          request.respondWith({
            status: 200,
            response: { token: expectedToken }
          })
        })

        const expectedUser = {
          username: 'test',
          token: expectedToken,
          isAuthenticated: true
        }
        const expecedValidPassword = 'test'
        const expectedActions = [
          { type: types.LOGIN_USER_SUCCESS, user: expectedUser }
        ]
        const store = mockStore({})
        return store.dispatch(userActions.loginUser({ email: expectedUser.username, password: expecedValidPassword })).then(() => {
          const actions = store.getActions()
          expect(actions[0].type).toEqual(types.LOGIN_USER_SUCCESS)
          expect(actions[0].user).toEqual(expectedUser)
        })
      })
    })
  })
})
