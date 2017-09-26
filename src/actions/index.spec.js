import setVisibilityFilter from './index';

describe('user actions', () => {
  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(setVisibilityFilter('active')).toEqual({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'active'
    });
  });
});
