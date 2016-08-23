import {combineReducers} from 'redux'
import application from './applicationReducer'
import project from './projectReducer'

const rootReducer = combineReducers({
  application,
  project
})

export default rootReducer
