import React from 'react';
import { Route, Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';

import Header from '../components/Header';
import AccountsContainer from '../containers/AccountsContainer';

const App = () => (
  <div>
    <Header />
    <Container style={{ marginTop: '7em' }}>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/accounts" />
        )}
      />
      <Route exact path="/accounts/:id?" component={AccountsContainer} />
    </Container>
  </div>
);

export default App;
