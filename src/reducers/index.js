import {combineReducers} from 'redux'
import application from './applicationReducer'
import project from './projectReducer'
import contact from './contactReducer'
import pepite from './pepiteReducer'
import career from './careerReducer'
import profile from './profileReducer'

const rootReducer = combineReducers({
  application,
  project,
  contact,
  pepite,
  career,
  profile
})

export default rootReducer
