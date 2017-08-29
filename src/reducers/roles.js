import { FETCH_ROLES_SUCCESS } from '../actions/roles';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ROLES_SUCCESS:
      return [...action.roles];
    default:
      return state;
  }
}
