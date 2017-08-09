import React from 'react'
import PropTypes from 'prop-types'
import User from './User'

const UserList = ({ users, onUserClick }) => (
  <ul>
    {users.map(user =>
      <User
        key={user.id}
        {...user}
        onClick={() => onUserClick(user)}
      />
    )}
  </ul>
)

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onUserClick: PropTypes.func.isRequired
}

export default UserList
