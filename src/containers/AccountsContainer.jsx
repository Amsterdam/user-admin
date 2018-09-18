import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createAccount, removeAccount, updateAccount } from '../actions/account';
import { getActiveAccounts, selectAccount } from '../reducers/accounts';
import AccountList from '../components/AccountList';
import AccountDetail from '../components/AccountDetail';

const mapStateToProps = (state, ownProps) => ({
  account: selectAccount(state.accounts, ownProps.match.params.id),
  accounts: getActiveAccounts(state.accounts, state.visibilityFilter),
  roles: state.roles
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onCreate: createAccount,
  onRemove: removeAccount,
  onUpdate: updateAccount
}, dispatch);

const AccountsContainer = props => (
  <Switch>
    <Route
      exact
      path="/accounts"
      render={() => (
        <AccountList
          accounts={props.accounts}
          onRemove={props.onRemove}
        />
      )}
    />
    <Route
      exact
      path="/accounts/new"
      render={() => (
        <AccountDetail
          onCreate={props.onCreate}
          roles={props.roles}
        />
      )}
    />
    <Route
      exact
      path="/accounts/:id(\S+)"
      render={() => (
        <AccountDetail
          account={props.account}
          onUpdate={props.onUpdate}
          roles={props.roles}
        />
      )}
    />
  </Switch>
);

AccountsContainer.defaultProps = {
  account: {},
  accounts: [],
  roles: []
};

AccountsContainer.propTypes = {
  account: PropTypes.object, // eslint-disable-line
  accounts: PropTypes.arrayOf(PropTypes.object),
  onCreate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsContainer);
