import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux'

import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer, devToolsEnhancer())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
