import React from 'react'
import PropTypes from 'prop-types'

import FilterLink from '../containers/FilterLink'

const UserDetail = ({ user }) => (
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
    <dl>
      <dt>ID:</dt>
      <dd>{user.id}</dd>
      <dt>Name:</dt>
      <dd>{user.name}</dd>
      <dt>E-mailadres:</dt>
      <dd>{user.emailAddress}</dd>
    </dl>
  </section>
)

UserDetail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onUserClick: PropTypes.func
}

export default UserDetail
