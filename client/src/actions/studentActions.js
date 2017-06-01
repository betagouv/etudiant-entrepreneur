import applicationApi from '../api/applicationApi'
import * as types from './actionTypes'

export function loadStudentsSuccess(students) {
  return {
    type: types.LOAD_STUDENTS_SUCCESS,
    students
  }
}

export function sortStudents(order, field) {
  return {
    type: types.SORT_STUDENTS,
    field,
    order
  }
}

function isStudent(application) {
  return application.status === 'accepted'
}

export function loadPepiteStudents() {
  return (dispatch, getState) => {
    const {user} = getState()
    return applicationApi.getAllPepiteApplications(user.id, user.token).then((applications) => {
      const students = applications.filter(isStudent)
      dispatch(loadStudentsSuccess(students))
      return students
    })
  }
}
