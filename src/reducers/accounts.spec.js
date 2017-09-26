import accounts from './accounts';

describe('accounts reducer', () => {
  it('should handle initial state', () => {
    expect(
      accounts(undefined, {}).length
    ).toBe(0);
  });

  describe('FETCH_ACCOUNT_SUCCESS', () => {
    it('adds an account to an empty state', () => {
      expect(
        accounts([], {
          type: 'FETCH_ACCOUNT_SUCCESS',
          account: {
            emailAddress: 'john@doe.com',
            name: 'John Doe',
            id: 0
          }
        })
      ).toEqual([
        {
          emailAddress: 'john@doe.com',
          name: 'John Doe',
          id: 0
        }
      ]);
    });

    it('adds an account to a non-empty state', () => {
      expect(
        accounts([
          {
            emailAddress: 'john@doe.com',
            name: 'John Doe',
            active: true,
            id: 0
          }
        ], {
          type: 'FETCH_ACCOUNT_SUCCESS',
          account: {
            emailAddress: 'jane@doe.com',
            name: 'Jane Doe',
            id: 1
          }
        })
      ).toEqual([
        {
          emailAddress: 'john@doe.com',
          name: 'John Doe',
          active: true,
          id: 0
        }, {
          emailAddress: 'jane@doe.com',
          name: 'Jane Doe',
          id: 1
        }
      ]);
    });

    it('overwrites an existing account', () => {
      expect(
        accounts([
          {
            emailAddress: 'john@doe.com',
            name: 'John Doe',
            id: 0
          }
        ], {
          type: 'FETCH_ACCOUNT_SUCCESS',
          account: {
            emailAddress: 'john@doe.com',
            name: 'Jane Doe',
            id: 1
          }
        })
      ).toEqual([
        {
          emailAddress: 'john@doe.com',
          name: 'Jane Doe',
          id: 1
        }
      ]);
    });
  });
});
