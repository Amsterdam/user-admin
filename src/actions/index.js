export const ADD_USER = 'ADD_USER'
export const SELECT_USER = 'SELECT_USER'
export const UPDATE_USER = 'UPDATE_USER'

let nextUserId = 2

export const addUser = (user) => ({
  type: ADD_USER,
  id: nextUserId++,
  emailAddress: user.emailAddress,
  name: user.name
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const selectUser = (userId) => ({
  type: SELECT_USER,
  userId
})

export const updateUser = (user) => ({
  type: UPDATE_USER,
  ...user
})

// TODO: Verify necessity of `export default`
export default addUser
