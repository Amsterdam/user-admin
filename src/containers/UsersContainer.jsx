import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addUser, updateUser } from '../actions/index'
import { getActiveUsers, selectUser } from '../reducers/users'
import UserList from '../components/UserList'
import UserDetails from '../components/UserDetails'

const mapStateToProps = (state, ownProps) => ({
  user: selectUser(state.users, Number(ownProps.match.params.id)),
  users: getActiveUsers(state.users, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onCreate: addUser,
  onUpdate: updateUser,
}, dispatch)

const UsersContainer = (props) => (
  <section>
    <Route exact path="/users" render={() => (
      <UserList users={props.users} />
    )} />
    <Route exact path="/users/:id(\d+)" render={() => (
      <UserDetails
          onLeave={props.onLeave}
          onUpdate={props.onUpdate}
          user={props.user}
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
