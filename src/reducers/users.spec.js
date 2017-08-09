import users from './users'

describe('users reducer', () => {
  it('should handle initial state', () => {
    expect(
      users(undefined, {}).length
    ).toBe(2)
  })

  it('should handle ADD_TODO', () => {
    expect(
      users([], {
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
      users([
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
