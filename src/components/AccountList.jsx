import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import FilterLink from '../containers/FilterLink';

const AccountList = ({ accounts, onRemove }) => (
  <section>
    <aside style={{ float: 'left' }}>
      Show:
      {' '}
      <FilterLink filter="SHOW_ALL">
        All
      </FilterLink>
      {', '}
      <FilterLink filter="SHOW_ACTIVE">
        Active
      </FilterLink>
      {', '}
      <FilterLink filter="SHOW_INACTIVE">
        Inactive
      </FilterLink>
    </aside>
    <Button primary style={{ float: 'right', marginBottom: '20px' }}>
      <NavLink
        style={{ color: '#FFF' }}
        to="/accounts/new"
      >
        Account koppelen
      </NavLink>
    </Button>
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Naam</th>
          <th>E-mailadres</th>
          <th>Rollen</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {accounts.map(account => (
          <tr key={account.emailAddress}>
            <td>
              <NavLink
                to={`/accounts/${account.emailAddress}`}
                style={{ display: 'block' }}
              >
                {account.name}
              </NavLink>
            </td>
            <td>
              <NavLink
                to={`/accounts/${account.emailAddress}`}
                style={{ display: 'block' }}
              >
                {account.emailAddress}
              </NavLink>
            </td>
            <td>
              {account.roles.map(role => role.title).sort().join(', ')}
            </td>
            <td>
              <Button
                compact
                onClick={() => onRemove(account)}
              >
                Verwijderen
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

AccountList.defaultProps = {
  onRemove: () => {}
};

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func
};

export default AccountList;
