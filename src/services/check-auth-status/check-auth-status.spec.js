import checkAuthStatus from './check-auth-status';
import { login } from '../auth/auth';

jest.mock('../auth/auth');

describe('The check auth status service', () => {
  it('returns a function that returns the response unchanged when ok', () => {
    const response = { ok: true };
    expect(
      checkAuthStatus()(response)
    ).toBe(response);

    const responseExtra = { ok: true, extra: 'sauce' };
    expect(
      checkAuthStatus()(response)
    ).toBe(response);
  });

  it('returns a function that throws an error when the response is not ok', () => {
    const response = { ok: false };
    expect(() => {
      checkAuthStatus()(response)
    }).toThrow('Unexpected response from an XHR call.');

    const responseWithStatus = { ok: false, status: 400 };
    expect(() => {
      checkAuthStatus()(responseWithStatus)
    }).toThrow('Unexpected response from an XHR call.');
  });

  it('returns a function that calls login when the response is a 401', () => {
    const response = { ok: false, status: 401 };
    expect(
      checkAuthStatus()(response)
    ).toBe(response);
    expect(login).toHaveBeenCalledWith();
  });
});
