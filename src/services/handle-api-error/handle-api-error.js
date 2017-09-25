import auth from '../auth/auth';

export default function (history) {
  return (response) => {
    if (!response.ok && response.status === 401) {
      auth(history);
    } else if (!response.ok) {
      throw new Error(`Unexpected response from an XHR call. ${response}`);
    }
    return response;
  };
}
