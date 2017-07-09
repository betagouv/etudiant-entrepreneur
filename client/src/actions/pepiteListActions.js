import * as types from './actionTypes'
import pepiteApi from '../api/pepiteApi'

export function loadPepiteListSuccess(pepiteList) {
  return { type: types.LOAD_PEPITE_LIST_SUCCESS, pepiteList }
}

export function loadPepiteList() {
  return (dispatch, getState) => {
    return pepiteApi.getAllPepites().then((pepiteList) => {
      dispatch(loadPepiteListSuccess(pepiteList))
    })
  }
}
