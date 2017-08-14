import React from 'react'
import PropTypes from 'prop-types'

import User from './User'
import FilterLink from '../containers/FilterLink'

const UserList = ({ users, onUserClick }) => (
  <section>
  <aside>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_INACTIVE">
      Inactive
    </FilterLink>
  </aside>
    <ul>
      {users.map(user =>
        <User
          key={user.id}
          {...user}
          onClick={() => onUserClick(user)}
        />
      )}
    </ul>
  </section>
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
