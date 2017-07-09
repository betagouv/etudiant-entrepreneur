import {combineReducers} from 'redux'
import application from './applicationReducer'
import project from './projectReducer'
import contact from './contactReducer'
import pepite from './pepiteReducer'
import errors from './errorsReducer'
import career from './careerReducer'
import profile from './profileReducer'
import user from './userReducer'
import committeeAnswer from './committeeAnswerReducer'
import committees from './committeeReducer'
import students from './studentReducer'
import nextCommittee from './nextCommitteeReducer'
import pepiteList from './pepiteListReducer'

const rootReducer = combineReducers({
  application,
  project,
  contact,
  pepite,
  career,
  profile,
  user,
  errors,
  committeeAnswer,
  committees,
  nextCommittee,
  students,
  pepiteList
})

export default rootReducer
