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
import nextCommittee from './nextCommitteeReducer'

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
  nextCommittee
})

export default rootReducer
