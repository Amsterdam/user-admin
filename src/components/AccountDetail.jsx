import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Form, Header } from 'semantic-ui-react';

class AccountDetail extends React.Component {
  constructor(props) {
    super(props);

    // NB: Setting state of nested objects, i.e. `{ account: { name: '' } }`, is not supported
    this.state = {
      emailAddress: props.account.emailAddress || '',
      name: props.account.name || '',
      // NB: Set all roles directly on the state
      ...(props.account.roles || [])
        .map(role => role.title)
        .reduce((prev, curr) => ({
          ...prev,
          [curr]: true
        }), {})
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.keys(nextProps.account).length) {
      return;
    }

    this.setState({
      emailAddress: nextProps.account.emailAddress,
      name: nextProps.account.name,
      // NB: Set all roles directly on the state
      ...(nextProps.account.roles || [])
        .map(role => role.title)
        .reduce((prev, curr) => ({
          ...prev,
          [curr]: true
        }), {})
    });
  }

  handleChange(event, result) {
    this.setState({
      // NB: `result.*` is Semantic UI's approach for cross-browser support
      [result.name]: result.value || result.checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const account = {
      emailAddress: this.state.emailAddress,
      name: this.state.name,
      // NB: Reverse mapping of roles directly to the state
      roles: this.props.roles.reduce((prev, curr) => (this.state[curr.title] ?
        prev.concat(curr) : prev), [])
    };

    if (this.props.onCreate) {
      this.props.onCreate(account);
    }

    if (this.props.onUpdate) {
      this.props.onUpdate(account);
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Header as="h2">Koppeling wijzigen</Header>
        <Form.Group widths="equal">
          <Form.Input
            disabled={!!this.props.account.emailAddress}
            label="E-mailadres"
            name="emailAddress"
            onChange={this.handleChange}
            placeholder="E-mailadres"
            value={this.state.emailAddress}
          />
        </Form.Group>
        <Form.Group inline>
          <label htmlFor="employee_plus">Rollen</label>
          {this.props.roles.map(role => (
            <Form.Checkbox
              checked={this.state[role.title]}
              key={role.href}
              label={role.title}
              name={role.title}
              onChange={this.handleChange}
            />
          ))}
        </Form.Group>
        <Form.Group inline>
          <Form.Button primary>Opslaan</Form.Button>
          {/* Use classes on a `<div>` instead of `<Button>` for Firefox support */}
          <div className="ui button">
            <NavLink
              style={{ color: '#FFF' }}
              to="/accounts"
            >
              Annuleren
            </NavLink>
          </div>
        </Form.Group>
      </Form>
    );
  }
}

AccountDetail.defaultProps = {
  account: {},
  onCreate: () => {},
  onUpdate: () => {},
  roles: []
};

AccountDetail.propTypes = {
  account: PropTypes.shape({
    emailAddress: PropTypes.string,
    name: PropTypes.string,
    roles: PropTypes.array
  }),
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.object)
};

export default AccountDetail;
