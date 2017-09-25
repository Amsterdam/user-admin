import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import { initAuth } from './actions/auth';
import { fetchAccounts } from './actions/account';
import { fetchRoles } from './actions/roles';

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

store.dispatch(initAuth(history));
store.dispatch(fetchAccounts(history));
store.dispatch(fetchRoles(history));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
