import * as types from './actionTypes'
import userApi from '../api/userApi'
import jwt_decode from 'jwt-decode'

export function loginUserSuccess(user) {
  return { type: types.LOGIN_USER_SUCCESS, user }
}

export function loginUser(user) {
  return (dispatch) => {
    return userApi.loginUser(user).then((token) => {
      const decodedToken = jwt_decode(token)
      dispatch(loginUserSuccess({id: decodedToken._id, username: decodedToken.name, role: decodedToken.role, token, isAuthenticated: true}))
    })
  }
}
