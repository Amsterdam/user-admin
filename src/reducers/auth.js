import {
  SET_ACCESS_TOKEN
} from '../actions/auth';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken
      };
    default:
      return state;
  }
}

export function getAccessToken(state) {
  return state.accessToken;
}
