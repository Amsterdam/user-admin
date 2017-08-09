import React from 'react'
import PropTypes from 'prop-types'

const User = ({ onClick, emailAddress, name }) => (
  <li onClick={onClick}>
    {emailAddress} | {name}
  </li>
)

User.propTypes = {
  onClick: PropTypes.func.isRequired,
  emailAddress: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default User
