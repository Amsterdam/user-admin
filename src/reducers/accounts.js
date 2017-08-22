import {
  CREATE_ACCOUNT_SUCCESS,
  FETCH_ACCOUNTS_SUCCESS,
  REMOVE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS
} from '../actions/account';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_SUCCESS:
      return [
        ...state.filter(account => account.id !== action.account.id),
        Object.assign({}, action.account)
      ];
    case FETCH_ACCOUNTS_SUCCESS:
      return action.accounts;
    case REMOVE_ACCOUNT_SUCCESS:
      return state.filter(account => account.id !== action.account.id);
    case UPDATE_ACCOUNT_SUCCESS:
      return state.map(account => (account.id === action.account.id ? action.account : account));
    default:
      return state;
  }
}

// TODO: Determine better location for store querying
export function getActiveAccounts(accounts, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return accounts;
    case 'SHOW_ACTIVE':
      return accounts.filter(account => account.active);
    case 'SHOW_INACTIVE':
      return accounts.filter(account => !account.active);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
}

export function selectAccount(accounts, accountId) {
  return accounts.find(account => account.id === accountId);
}
