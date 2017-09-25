import { getAuthHeaders } from '../services/auth/auth';
import handleApiError from '../services/handle-api-error/handle-api-error';

export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';

const apiUrl = 'https://acc.api.data.amsterdam.nl/authz_admin/roles';

export function fetchRolesSuccess(roles) {
  return {
    type: FETCH_ROLES_SUCCESS,
    roles
  };
}

export function fetchRoles(history) {
  return (dispatch) => { // eslint-disable-line
    return fetch(apiUrl, { headers: getAuthHeaders() })
      .then(handleApiError(history))
      .then(response => response.json())
      .then(response => response._links.item)
      .then(roles => dispatch(fetchRolesSuccess(roles)))
      .catch((error) => { throw error; });
  };
}
