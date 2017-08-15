import React from 'react'
import { Route } from 'react-router'
import { Container } from 'semantic-ui-react'

import Header from '../components/Header'
import UsersContainer from '../containers/UsersContainer'

const App = () => (
  <div>
    <Header />
    <Container style={{ marginTop: '7em' }}>
      <Route exact path="/" component={UsersContainer} />
      <Route exact path="/users/:id?" component={UsersContainer} />
    </Container>
  </div>
)

export default App
