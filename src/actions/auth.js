import auth from '../services/auth/auth';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken
  };
}

export function initAuth(history) {
  return (dispatch) => { // eslint-disable-line
    dispatch(setAccessToken(auth(history)));
  };
}
