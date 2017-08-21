import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import accounts from './accounts'
import visibilityFilter from './visibilityFilter'

const appState = combineReducers({
  accounts,
  visibilityFilter,
  router: routerReducer
})

export default appState
