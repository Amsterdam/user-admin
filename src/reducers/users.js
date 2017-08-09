import { ADD_USER } from '../actions';

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
    default:
      return state
  }
}
