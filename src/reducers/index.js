import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import accounts from './accounts';
import roles from './roles';
import visibilityFilter from './visibilityFilter';

const appState = combineReducers({
  auth,
  accounts,
  roles,
  visibilityFilter,
  router: routerReducer
});

export default appState;
