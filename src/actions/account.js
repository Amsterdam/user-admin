import { push } from 'react-router-redux';
import { getAuthHeaders } from '../services/auth/auth';
import checkAuthStatus from '../services/check-auth-status/check-auth-status';

export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const REMOVE_ACCOUNT_SUCCESS = 'REMOVE_ACCOUNT_SUCCESS';

const apiUrl = 'https://acc.api.data.amsterdam.nl/authz_admin/accounts';

export function fetchAccountSuccess(account) {
  return {
    type: FETCH_ACCOUNT_SUCCESS,
    account
  };
}

export function fetchAccount(account) {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${account.emailAddress}`, { headers: getAuthHeaders() })
      .then(checkAuthStatus())
      .then(response => response.json())
      .then(response => ({
        etag: response._etag,
        emailAddress: response._links.self.name,
        name: response._links.self.title,
        roles: response._links.role
      }))
      .then(response => dispatch(fetchAccountSuccess(response)))
      .catch((error) => { throw error; });
  };
}

export function createAccount(account) {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${account.emailAddress}`, {
      method: 'PUT',
      body: JSON.stringify({
        _links: {
          role: account.roles
        },
        name: account.emailAddress,
        title: account.name
      }),
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/hal+json',
        'If-None-Match': '*'
      }
    })
      .then(() => dispatch(fetchAccount(account)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/accounts'));
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
    return fetch(`${apiUrl}?embed=item`, { headers: getAuthHeaders() })
      .then(checkAuthStatus())
      .then(response => response.json())
      .then(response => response._embedded.item)
      .then(response => response.map(account => ({
        etag: account._etag,
        emailAddress: account._links.self.name,
        name: account._links.self.title,
        roles: account._links.role
      })))
      .then(accounts => dispatch(fetchAccountsSuccess(accounts)))
      .catch((error) => { throw error; });
  };
}

export function updateAccount(account) {
  return (dispatch) => { // eslint-disable-line
    return fetch(`${apiUrl}/${account.emailAddress}`, {
      method: 'PUT',
      body: JSON.stringify({
        _links: {
          role: account.roles
        },
        name: account.emailAddress,
        title: account.name
      }),
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/hal+json',
        'If-Match': account.etag
      }
    })
      .then(() => dispatch(fetchAccount(account)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/accounts'));
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
    return fetch(`${apiUrl}/${account.emailAddress}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
        'If-Match': account.etag
      }
    })
      .then(() => dispatch(removeAccountSuccess(account)))
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/accounts'));
      })
      .catch((error) => { throw error; });
  };
}
