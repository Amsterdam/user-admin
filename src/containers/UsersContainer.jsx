import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import UserList from '../components/UserList'
import UserDetails from '../components/UserDetails'

const getActiveUsers = (users, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return users
    case 'SHOW_ACTIVE':
      return users.filter(user => user.active)
    case 'SHOW_INACTIVE':
      return users.filter(user => !user.active)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const selectUser = (users, userId) => {
  return users.find(user => user.id === userId)
}

const mapStateToProps = (state, ownProps) => ({
  user: selectUser(state.users, Number(ownProps.match.params.id)),
  users: getActiveUsers(state.users, state.visibilityFilter)
})

const mapDispatchToProps = {
  onUserClick: (user) => selectUser(user.id)
}

const UsersContainer = (props) => (
  <section>
    <Route exact path="/users" render={() => (
      <UserList users={props.users} />
    )} />
    <Route exact path="/users/:id" render={() => (
      <UserDetails user={props.user} onUserClick={props.onUserClick} />
    )} />
  </section>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)
