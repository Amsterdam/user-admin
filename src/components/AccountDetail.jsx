import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class AccountDetail extends React.Component {
  constructor(props) {
    super(props);

    const account = props.account || {};

    // NB: Setting state of nested objects, i.e. `{ user: { name: '' } }`, is not supported
    this.state = {
      active: String(account.active) || 'false',
      emailAddress: account.emailAddress || '',
      id: account.id >= 0 ? account.id : null,
      medewerker: account.medewerker || false,
      name: account.name || '',
      speciaal_bevoegd: account.speciaal_bevoegd || false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, result) {
    this.setState({
      // NB: `result.*` is Semantic UI's approach for cross-browser support
      [result.name]: result.value || result.checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.onCreate) {
      this.props.onCreate(this.state);
    }

    if (this.props.onUpdate) {
      this.props.onUpdate(this.state);
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            label="Naam"
            name="name"
            onChange={this.handleChange}
            placeholder="Naam"
            value={this.state.name}
          />
          <Form.Input
            label="E-mailadres"
            name="emailAddress"
            onChange={this.handleChange}
            placeholder="E-mailadres"
            value={this.state.emailAddress}
          />
        </Form.Group>
        <Form.Group inline>
          <label htmlFor="speciaal_bevoegd">Rollen</label>
          <Form.Checkbox
            checked={this.state.speciaal_bevoegd}
            label="Speciaal bevoegd"
            name="speciaal_bevoegd"
            onChange={this.handleChange}
          />
          <Form.Checkbox
            checked={this.state.medewerker}
            label="Medewerker"
            name="medewerker"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label htmlFor="active">Status</label>
          <Form.Radio
            checked={this.state.active === 'true'}
            label="Actief"
            name="active"
            onChange={this.handleChange}
            value="true"
          />
          <Form.Radio
            checked={this.state.active === 'false'}
            label="Inactief"
            name="active"
            onChange={this.handleChange}
            value="false"
          />
        </Form.Group>
        <Form.Button>Opslaan</Form.Button>
      </Form>
    );
  }
}

AccountDetail.defaultProps = {
  account: {},
  onCreate: null,
  onUpdate: null
};

AccountDetail.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    emailAddress: PropTypes.string,
    name: PropTypes.string,
    speciaal_bevoegd: PropTypes.bool,
    medewerker: PropTypes.bool,
    active: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ])
  }),
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func
};

export default AccountDetail;
