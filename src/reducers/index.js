import {combineReducers} from 'redux'
import application from './applicationReducer'
import project from './projectReducer'
import contact from './contactReducer'
import pepite from './pepiteReducer'

const rootReducer = combineReducers({
  application,
  project,
  contact,
  pepite
})

export default rootReducer
