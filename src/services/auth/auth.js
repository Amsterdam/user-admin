import queryStringParser from '../query-string-parser/query-string-parser';
import stateTokenGenerator from '../state-token-generator/state-token-generator';

// A map of the error keys, that the OAuth2 authorization service can
// return, to a full description
const ERROR_MESSAGES = {
  invalid_request: 'The request is missing a required parameter, includes an invalid parameter value, ' +
    'includes a parameter more than once, or is otherwise malformed.',
  unauthorized_client: 'The client is not authorized to request an access token using this method.',
  access_denied: 'The resource owner or authorization server denied the request.',
  unsupported_response_type: 'The authorization server does not support obtaining an access token using ' +
    'this method.',
  invalid_scope: 'The requested scope is invalid, unknown, or malformed.',
  server_error: 'The authorization server encountered an unexpected condition that prevented it from ' +
    'fulfilling the request.',
  temporarily_unavailable: 'The authorization server is currently unable to handle the request due to a ' +
    'temporary overloading or maintenance of the server.'
};

// The parameters the OAuth2 authorization service will return on
// success
const AUTH_PARAMS = ['access_token', 'token_type', 'expires_in', 'state'];

const API_ROOT = 'https://acc.api.data.amsterdam.nl/';

// The URI we need to redirect to for communication with the OAuth2
// authorization service
const scopes = encodeURIComponent('AUR/R AUR/W');
const AUTH_PATH = `oauth2/authorize?idp_id=datapunt&response_type=token&client_id=authz_admin&scope=${scopes}`;

// The keys of values we need to store in the session storage
//
// Query string of the state at the moment we redirect to the OAuth2
// authorization service, and need to get back to afterwards
const CALLBACK_PARAMS = 'callbackParams';
// The OAuth2 state(token) (OAuth terminology, has nothing to do with
// our app state), which is a random string
const STATE_TOKEN = 'stateToken';
// The access token returned by the OAuth2 authorization service
// containing user scopes and name
const ACCESS_TOKEN = 'accessToken';

let initialized = false;

/**
 * Removes parameters from the URL, as set by an error callback from
 * the OAuth2 authorization service, to clean up the URL.
 */
function removeErrorParamsFromPath() {
  location.search = '';
}

function removeStateToken() {
  sessionStorage.removeItem(STATE_TOKEN);
}

/**
 * Restores saved search parameters from the session storage (by
 * `savePath`) to the URL.
 *
 * @param {string} path The path as saved in the session storage.
 */
function restorePath(path) {
  sessionStorage.removeItem(CALLBACK_PARAMS);

  // location.replace(); // overwrite the existing location (prevent back button to re-login)
  location.hash = ''; // remove the parameters from the authorization service
  location.pathname = path;
}

/**
 * Finishes an error from the OAuth2 authorization service.
 *
 * @param code {string} Error code as returned from the service.
 * @param description {string} Error description as returned from the
 * service.
 */
function handleError(code, description) {
  removeStateToken(); // Remove state token from session
  restorePath(sessionStorage.getItem(CALLBACK_PARAMS)); // Restore path from session
  removeErrorParamsFromPath();
  throw new Error('Authorization service responded with error ' +
      `${code} [${description}] (${ERROR_MESSAGES[code]})`);
}

/**
 * Handles errors in case they were returned by the OAuth2
 * authorization service.
 */
function catchError() {
  const params = queryStringParser(location.search);
  if (params && params.error) {
    handleError(params.error, params.error_description);
  }
}

/**
 * Restores the access token from session storage when available.
 */
function restoreAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN);
}

/**
 * Redirects to the OAuth2 authorization service.
 */
function login() {
  // Get the URI the OAuth2 authorization service needs to use as
  // callback
  const callback = `${location.protocol}//${location.host}/`;
  // Get a random string to prevent CSRF
  const stateToken = encodeURIComponent(stateTokenGenerator());

  if (!stateToken) {
    throw new Error('crypto library is not available on the current browser');
  }

  // Save current path in session
  sessionStorage.setItem(CALLBACK_PARAMS, location.pathname);
  // Save the state token in session
  sessionStorage.setItem(STATE_TOKEN, stateToken);

  location.href =
    `${API_ROOT}${AUTH_PATH}&state=${stateToken}&redirect_uri=${encodeURIComponent(callback)}`;
}

/**
 * Do the given params form a callback from the OAuth2 authorization
 * service?
 *
 * @param {Object.<string, string>} params The parameters returned.
 * @return boolean True when all `AUTH_PARAMS` are available and the
 * `state` param equals to the value set in the session storage,
 * otherwise false.
 */
function isCallback(params) {
  if (!params) {
    return false;
  }

  const stateToken = sessionStorage.getItem(STATE_TOKEN);

  // The state param must be exactly the same as the state token we
  // have saved in the session (to prevent CSRF)
  const stateTokenValid = params.state && params.state === stateToken;

  // It is a callback when all authorization parameters are defined
  // in the params the fastest check is not to check if all
  // parameters are defined but to check that no undefined parameter
  // can be found
  const paramsValid = !AUTH_PARAMS.some(param => params[param] === undefined);

  if (paramsValid && !stateTokenValid) {
    // This is a callback, but the state token does not equal the
    // one we have saved; report to Sentry
    throw new Error(`Authenticator encountered an invalid state token (${params.state})`);
  }

  return Boolean(stateTokenValid && paramsValid);
}

/**
 * Finishes the callback from the OAuth2 authorization service.
 */
function useAccessToken(token) {
  sessionStorage.setItem(ACCESS_TOKEN, token);
  sessionStorage.removeItem(STATE_TOKEN);
  const pathParams = sessionStorage.getItem(CALLBACK_PARAMS);
  if (pathParams) {
    restorePath(pathParams); // Restore path from session
  }
}

/**
 * Gets the access token in case we have a valid callback. Uses the
 * authorization parameters from the access token.
 *
 * @returns boolean True when this is a callback, otherwise false.
 */
function handleCallback() {
  const params = queryStringParser(location.hash);
  if (isCallback(params)) {
    useAccessToken(params.access_token);
    return true;
  }
  return false;
}

export default function () {
  if (!initialized) {
    initialized = true;
    catchError(); // Catch any error from the OAuth2 authorization service
    handleCallback(); // Handle a callback from the OAuth2 authorization service
  }
  return restoreAccessToken() || // Restore access token from session storage
    login(); // Initiate login process when there is no access token
}

export function getAuthHeaders() {
  return new Headers({ Authorization: `Bearer ${restoreAccessToken()}` });
}
