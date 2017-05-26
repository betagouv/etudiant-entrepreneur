import * as types from '../actions/actionTypes'
import initialState from './initialState'
import { getUniversityYear } from '../components/common/yearHelper'

export default function careerReducer(state = initialState.career, action) {
  switch (action.type) {
    case types.UPDATE_CAREER:
    case types.LOAD_CAREER_SUCCESS:
      return Object.assign({}, state, action.career)
    case types.UPDATE_STUDENT_CAREER:
      return Object.assign({}, state,
        {
          diploma: Object.assign(state.diploma, { year: getUniversityYear(action.schoolYear) })
        })
    default:
      return state
  }
}
