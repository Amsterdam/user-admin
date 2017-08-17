import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import FilterLink from '../containers/FilterLink'

const UserList = ({ users, onUserClick }) => (
  <section>
    <aside style={{ float: 'left' }}>
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
    <Button primary style={{ float: 'right', marginBottom: '20px' }}>
      <NavLink
          style={{ color: '#FFF' }}
          to="/users/new">
        Account koppelen
      </NavLink>
    </Button>
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Naam</th>
          <th>E-mailadres</th>
          <th>Rollen</th>
          <th>Actief</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              <NavLink
                  to={`/users/${user.id}`}
                  style={{ display: 'block' }}
              >
                {user.name}
              </NavLink>
            </td>
            <td>
              <NavLink
                  to={`/users/${user.id}`}
                  style={{ display: 'block' }}
              >
                {user.emailAddress}
              </NavLink>
            </td>
            <td>Geen</td>
            <td>
              <NavLink
                  to={`/users/${user.id}`}
                  style={{ display: 'block' }}
              >
                {user.active ? 'Actief' : 'Inactief'}
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onUserClick: PropTypes.func
}

export default UserList
