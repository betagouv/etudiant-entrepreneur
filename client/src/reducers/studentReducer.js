import * as types from '../actions/actionTypes'
import initialState from './initialState'
import objectPath from 'object-path'
import Const from '../components/common/Table/Const'

export default function studentReducer(state = initialState.students, action) {
  switch (action.type) {
    case types.LOAD_STUDENTS_SUCCESS:
      return action.students
    case types.SORT_STUDENTS:
      return state.slice().sort((a, b) => {
        const aValue = objectPath.get(a, action.field), bValue = objectPath.get(b, action.field)
        if (action.order === Const.SORT_ASC) {
          return aValue < bValue
        }
        return aValue > bValue
      })
    default:
      return state
  }
}
