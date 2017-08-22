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
        to="/users/new"
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
          <th>Actief</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {accounts.map(account => (
          <tr key={account.id}>
            <td>
              <NavLink
                to={`/users/${account.id}`}
                style={{ display: 'block' }}
              >
                {account.name}
              </NavLink>
            </td>
            <td>
              <NavLink
                to={`/users/${account.id}`}
                style={{ display: 'block' }}
              >
                {account.emailAddress}
              </NavLink>
            </td>
            <td>
              {account.medewerker ? 'Medewerker' : ''}
              {account.medewerker && account.speciaal_bevoegd ? ', ' : ''}
              {account.speciaal_bevoegd ? 'Speciaal bevoegd' : ''}
            </td>
            <td>
              <NavLink
                to={`/users/${account.id}`}
                style={{ display: 'block' }}
              >
                {account.active === 'true' ? 'Actief' : 'Inactief'}
              </NavLink>
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
  onRemove: null
};

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onRemove: PropTypes.func
};

export default AccountList;
