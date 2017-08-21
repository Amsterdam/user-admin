import { push } from 'react-router-redux'

export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS'
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'
export const REMOVE_ACCOUNT_SUCCESS = 'REMOVE_ACCOUNT_SUCCESS'
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS'

const apiUrl = 'http://localhost:3001/accounts/'

export const createAccountSuccess = (account) => {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    account
  }
};

export const createAccount = (account) => {
  return (dispatch) => {
    return fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(account),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json()
      })
      .then(account => {
        return dispatch(createAccountSuccess(account))
      })
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/users'))
      })
      .catch(error => {
        throw(error)
      })
  }
}

export const fetchAccountsSuccess = (accounts) => {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    accounts
  }
}

export const fetchAccounts = () => {
  return (dispatch) => {
    return fetch(apiUrl)
      .then(response => {
        return response.json()
      })
      .then(accounts => {
        dispatch(fetchAccountsSuccess(accounts))
      })
      .catch(error => {
        throw(error)
      });
  };
}

export const updateAccountSuccess = (account) => {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    account
  }
}

export const updateAccount = (account) => {
  return (dispatch) => {
    return fetch(`${apiUrl}/${account.id}`, {
      method: 'PUT',
      body: JSON.stringify(account),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.json()
      })
      .then(account => {
        dispatch(updateAccountSuccess(account))
      })
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(push('/users'))
      })
      .catch(error => {
        throw(error)
      })
  }
}

export const removeAccountSuccess = (account) => {
  return {
    type: REMOVE_ACCOUNT_SUCCESS,
    account
  }
}

export const removeAccount = (account) => {
  return (dispatch) => {
    return fetch(`${apiUrl}/${account.id}`, {
      method: 'DELETE'
    })
      .then(response => {
        return response.json()
      })
      .then(account => {
        return dispatch(removeAccountSuccess(account))
      })
      .then(() => {
        // TODO: Find alternative approach letting the container handle this
        dispatch(fetchAccounts())
      })
      .catch(error => {
        throw(error)
      })
  }
}
