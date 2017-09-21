import { getAuthHeaders } from '../services/auth/auth';

export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';

const apiUrl = 'https://acc.api.data.amsterdam.nl/authz_admin/roles';

export function fetchRolesSuccess(roles) {
  return {
    type: FETCH_ROLES_SUCCESS,
    roles
  };
}

export function fetchRoles() {
  return (dispatch) => { // eslint-disable-line
    return fetch(apiUrl, { headers: getAuthHeaders() })
      .then(response => response.json())
      .then(response => response._links.item)
      .then(roles => dispatch(fetchRolesSuccess(roles)))
      .catch((error) => { throw error; });
  };
}
