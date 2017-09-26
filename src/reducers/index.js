import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import accounts from './accounts';
import roles from './roles';
import visibilityFilter from './visibilityFilter';

const appState = combineReducers({
  accounts,
  roles,
  visibilityFilter,
  router: routerReducer
});

export default appState;
