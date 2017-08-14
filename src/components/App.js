import React from 'react'
import { Route } from 'react-router'

import Footer from './Footer'
import UsersContainer from '../containers/UsersContainer'

const App = () => (
  <div>
    <Route exact path="/" component={UsersContainer}/>
    <Footer />
  </div>
)

export default App
