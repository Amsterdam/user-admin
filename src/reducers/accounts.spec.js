import accounts from './accounts'

describe('accounts reducer', () => {
  it('should handle initial state', () => {
    expect(
      accounts(undefined, {}).length
    ).toBe(2)
  })

  it('should handle ADD_TODO', () => {
    expect(
      accounts([], {
        type: 'ADD_USER',
        emailAddress: 'john@doe.com',
        name: 'John Doe',
        id: 0
      })
    ).toEqual([
      {
        emailAddress: 'john@doe.com',
        name: 'John Doe',
        id: 0
      }
    ])

    expect(
      accounts([
        {
          emailAddress: 'john@doe.com',
          name: 'John Doe',
          active: true,
          id: 0
        }
      ], {
        type: 'ADD_USER',
        emailAddress: 'jane@doe.com',
        name: 'Jane Doe',
        id: 1
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
    ])
  })
})
