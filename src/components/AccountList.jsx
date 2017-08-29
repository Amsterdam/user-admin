import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const AccountList = ({ accounts, onRemove }) => (
  <section>
    {/* Use classes on a `<div>` instead of `<Button>` for Firefox support */}
    <div className="ui primary button">
      <NavLink
        style={{ color: '#FFF' }}
        to="/accounts/new"
      >
        Account koppelen
      </NavLink>
    </div>
    <table className="ui celled table">
      <thead>
        <tr>
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
