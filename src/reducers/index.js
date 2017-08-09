import { combineReducers } from 'redux'
import users from './users'
import visibilityFilter from './visibilityFilter'

const appState = combineReducers({
  users,
  visibilityFilter
})

export default appState
