import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createAccount, updateAccount } from '../actions/account'
import { getActiveAccounts, selectAccount } from '../reducers/accounts'
import UserList from '../components/UserList'
import UserDetails from '../components/UserDetails'

const mapStateToProps = (state, ownProps) => ({
  account: selectAccount(state.accounts, Number(ownProps.match.params.id)),
  accounts: getActiveAccounts(state.accounts, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onCreate: createAccount,
  onUpdate: updateAccount,
}, dispatch)

const UsersContainer = (props) => (
  <section>
    <Route exact path="/users" render={() => (
      <UserList accounts={props.accounts} />
    )} />
    <Route exact path="/users/:id(\d+)" render={() => (
      <UserDetails
          onUpdate={props.onUpdate}
          account={props.account}
      />
    )} onLeave={props.onLeave} />
    <Route exact path="/users/new" render={() => (
      <UserDetails
          onCreate={props.onCreate}
      />
    )} />
  </section>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)
