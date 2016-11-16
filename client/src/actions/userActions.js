import * as types from './actionTypes'
import userApi from '../api/userApi'

export function loginUserSuccess(user) {
  return { type: types.LOGIN_USER_SUCCESS, user }
}

export function loginUser(user) {
  return (dispatch) => {
    return userApi.loginUser(user).then((token) => {
      dispatch(loginUserSuccess({username: user.email, token, isAuthenticated: true}))
    })
  }
}
