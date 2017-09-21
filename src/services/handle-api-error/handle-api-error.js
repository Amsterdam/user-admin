import auth from '../auth/auth';

export default function (response) {
  if (!response.ok && response.status === 401) {
    auth();
  } else if (!response.ok) {
    throw new Error(`something went wrong ${response}`);
  }
  return response;
}
