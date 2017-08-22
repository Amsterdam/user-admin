import { push } from 'react-router-redux';

export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const REMOVE_ACCOUNT_SUCCESS = 'REMOVE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';

const apiUrl = 'http://localhost:3001/accounts/';

export function createAccountSuccess(account) {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    account
  };
}

export function createAccount(account) {
  return (dispatch) => { // eslint-disable-line
    return fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(account),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(account_ => dispatch(createAccountSuccess(account_)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/users'));
      })
      .catch((error) => { throw error; });
  };
}

export function fetchAccountsSuccess(accounts) {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    accounts
  };
}

export function fetchAccounts() {
  return (dispatch) => { // eslint-disable-line
    return fetch(apiUrl)
      .then(response => response.json())
      .then(accounts => dispatch(fetchAccountsSuccess(accounts)))
      .catch((error) => { throw error; });
  };
}

export function updateAccountSuccess(account) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    account
  };
}

export function updateAccount(account) {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${account.id}`, {
      method: 'PUT',
      body: JSON.stringify(account),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(account_ => dispatch(updateAccountSuccess(account_)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/users'));
      })
      .catch((error) => { throw error; });
  };
}

export function removeAccountSuccess(account) {
  return {
    type: REMOVE_ACCOUNT_SUCCESS,
    account
  };
}

export function removeAccount(account) {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${account.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(account_ => dispatch(removeAccountSuccess(account_)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        // TODO: Use a more consistent approach compared to other actions
        dispatch(fetchAccounts());
      })
      .catch((error) => { throw error; });
  };
}
