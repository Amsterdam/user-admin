import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

class UserDetail extends React.Component {
  constructor(props) {
    super(props)

    // NB: Setting state of nested objects, i.e. `{ user: { name: '' } }`, is not supported
    this.state = {
      active: String(props.user.active) || 'true',
      emailAddress: props.user.emailAddress || '',
      medewerker: props.user.medewerker || false,
      name: props.user.name || '',
      speciaal_bevoegd: props.user.speciaal_bevoegd || false,
    }
  }

  handleChange = (event, result) => {
    this.setState({
      // NB: `result.*` is Semantic UI's approach for cross-browser support
      [result.name]: result.value || result.checked
    })
  }

  render() {
    return (
      <Form>
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
          <label>Rollen</label>
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
          <label>Status</label>
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
    )
  }
}

UserDetail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    speciaal_bevoegd: PropTypes.bool,
    medewerker: PropTypes.bool,
    active: PropTypes.bool.isRequired
  }),
  onUserClick: PropTypes.func.isRequired
}

export default UserDetail
