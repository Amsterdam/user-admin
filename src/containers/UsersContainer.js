import React from 'react'
import { connect } from 'react-redux'

import AddUser from './AddUser'
import UserList from '../components/UserList'

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

const mapStateToProps = (state) => ({
  users: getActiveUsers(state.users, state.visibilityFilter)
})

const mapDispatchToProps = {
  onUserClick: (user) => {
    console.log(user);
  }
}

const UsersContainer = (props) => (
  <section>
    <AddUser />
    <UserList users={props.users} onUserClick={() => {}} />
  </section>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)
