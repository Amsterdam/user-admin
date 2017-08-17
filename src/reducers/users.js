import { ADD_USER, UPDATE_USER } from '../actions';

const initialState = [
  {
    id: 0,
    emailAddress: 'employee@amsterdam.nl',
    name: 'Employee',
    active: true
  },
  {
    id: 1,
    emailAddress: 'employee_plus@amsterdam.nl',
    name: 'Employee Plus',
    active: false
  }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          id: action.id,
          emailAddress: action.emailAddress,
          name: action.name
        }
      ]
    case UPDATE_USER:
      return state.map(user => user.id === action.id ? action : user)
    default:
      return state
  }
}

// TODO: Determine better location for store querying
export const getActiveUsers = (users, filter) => {
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

export const selectUser = (users, userId) => {
  return users.find(user => user.id === userId)
}
