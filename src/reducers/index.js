import {combineReducers} from 'redux'
import application from './applicationReducer'
import project from './projectReducer'
import contact from './contactReducer'

const rootReducer = combineReducers({
  application,
  project,
  contact
})

export default rootReducer
