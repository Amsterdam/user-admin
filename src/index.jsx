import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import { fetchAccounts } from './actions/account';
import { fetchRoles } from './actions/roles';
import { initAuth, getReturnPath } from './services/auth/auth';

const history = createHistory();
const router = routerMiddleware(history);

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      router
    )
  )
);

initAuth();
const returnPath = getReturnPath();
if (returnPath) {
  store.dispatch(push(returnPath));
}

store.dispatch(fetchAccounts());
store.dispatch(fetchRoles());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
