import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../actions'

let AddUser = ({ dispatch }) => {
  let user = {
    emailAddress: null,
    name: null
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      if (!user.emailAddress.value.trim() || !user.name.value.trim()) {
        return
      }
      dispatch(addUser({
        emailAddress: user.emailAddress.value,
        name: user.name.value
      }))
      user = {}
    }}>
      <input ref={input => user.emailAddress = input} />
      <input ref={input => user.name = input} />
      <button type="submit">
        Add user
      </button>
    </form>
  )
}

AddUser = connect()(AddUser)

export default AddUser
