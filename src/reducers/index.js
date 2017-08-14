import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import users from './users'
import visibilityFilter from './visibilityFilter'

const appState = combineReducers({
  users,
  visibilityFilter,
  router: routerReducer
})

export default appState
