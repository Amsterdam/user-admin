import * as actions from './index';

describe('user actions', () => {
  it('addUser should create ADD_USER action', () => {
    expect(actions.addUser({emailAddress: 'john@doe.com', name: 'John Doe'})).toEqual({
      type: 'ADD_USER',
      id: 2,
      emailAddress: 'john@doe.com',
      name: 'John Doe'
    });
  });

  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'active'
    });
  });
});
