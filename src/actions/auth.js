import auth from '../services/auth/auth';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const HANDLE_AUTH_CALLBACK_SUCCESS = 'HANDLE_AUTH_CALLBACK_SUCCESS';

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken
  };
}

export function handleAuthCallbackSuccess() {
  return {
    type: HANDLE_AUTH_CALLBACK_SUCCESS
  };
}

export function handleAuthCallback() {
  return (dispatch) => { // eslint-disable-line
    dispatch(setAccessToken(auth()));
  };
}
