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
// JSON encoded `history.location` object at the moment we redirect to the
// OAuth2 authorization service, and need to get back to afterwards
const CALLBACK_LOCATION = 'callbackLocation';
// The OAuth2 state(token) (OAuth terminology, has nothing to do with
// our app state), which is a random string
const STATE_TOKEN = 'stateToken';
// The access token returned by the OAuth2 authorization service
// containing user scopes and name
const ACCESS_TOKEN = 'accessToken';

let history; // Browser history object
let initialized = false;
let logingIn = false;

/**
 * Restores saved location from the session storage.
 *
 * Removes the saved location from the session storage.
 *
 * @throws When the session storage contains location data but could not be
 * parsed as JSON.
 */
function restorePath() {
  try {
    const callback = sessionStorage.getItem(CALLBACK_LOCATION);
    if (callback) {
      const location = JSON.parse(callback);
      history.replace(location); // Restore path from session
    }
  } catch (error) {
    throw new Error(`Saved callback location could not be parsed to JSON. ${error}`);
  } finally {
    sessionStorage.removeItem(CALLBACK_LOCATION);
  }
}

/**
 * Finishes an error from the OAuth2 authorization service.
 *
 * @param code {string} Error code as returned from the service.
 * @param description {string} Error description as returned from the
 * service.
 */
function handleError(code, description) {
  sessionStorage.removeItem(STATE_TOKEN);
  restorePath();
  // Remove parameters from the URL, as set by the error callback from the
  // OAuth2 authorization service, to clean up the URL.
  // location.search = '';
  throw new Error('Authorization service responded with error ' +
      `${code} [${description}] (${ERROR_MESSAGES[code]})`);
}

/**
 * Handles errors in case they were returned by the OAuth2
 * authorization service.
 */
function catchError() {
  const params = queryStringParser(history.location.search);
  if (params && params.error) {
    handleError(params.error, params.error_description);
  }
}

/**
 * Returns the access token from session storage when available.
 *
 * @returns {string} The access token.
 */
function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN);
}

/**
 * Redirects to the OAuth2 authorization service.
 */
function login() {
  // Make sure we start the login process only once
  if (logingIn) {
    return;
  }

  logingIn = true;
  // Get the URI the OAuth2 authorization service needs to use as
  // callback
  const callback = `${location.protocol}//${location.host}/`;
  // Get a random string to prevent CSRF
  const stateToken = encodeURIComponent(stateTokenGenerator());

  if (!stateToken) {
    throw new Error('crypto library is not available on the current browser');
  }

  // Save current location in session
  sessionStorage.setItem(CALLBACK_LOCATION, JSON.stringify(history.location));
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
 *
 * @param {string} token The access token.
 */
function useAccessToken(token) {
  sessionStorage.setItem(ACCESS_TOKEN, token);
  sessionStorage.removeItem(STATE_TOKEN);
  restorePath(); // Restore path from session
}

/**
 * Gets the access token in case we have a valid callback. Uses the
 * authorization parameters from the access token.
 *
 * @returns boolean True when this is a callback, otherwise false.
 */
function handleCallback() {
  const params = queryStringParser(history.location.hash);
  if (isCallback(params)) {
    useAccessToken(params.access_token);
    return true;
  }
  return false;
}

/**
 * Initializes the auth service when needed. Catches any callback params and
 * errors from the OAuth2 authorization service when available.
 *
 * Retrieves the access token and returns it. When not available it initiates
 * the login process which will redirect the user to the OAuth2 authorization
 * service.
 *
 * @returns {string} The access token when available;
 */
export default function (hist) {
  history = hist;
  if (!initialized) {
    initialized = true;
    catchError(); // Catch any error from the OAuth2 authorization service
    handleCallback(); // Handle a callback from the OAuth2 authorization service
  }
  return getAccessToken() || // Restore access token from session storage
    login(); // Initiate login process when there is no access token
}

/**
 * Creates an instance of the native JS `Headers` class containing the
 * authorization headers needed for an API call.
 *
 * @returns {Object<string, string>} The headers needed for an API call.
 */
export function getAuthHeaders() {
  return new Headers({ Authorization: `Bearer ${getAccessToken()}` });
}
