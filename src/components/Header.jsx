import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import { logout } from '../services/auth/auth';

class Header extends React.Component {
  handleLogoutClick() { // eslint-disable-line class-methods-use-this
    logout();
  }

  render() {
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <NavLink to="/accounts">
              DataPunt ADW-beheer
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/accounts">
              Koppelingen
            </NavLink>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item onClick={this.handleLogoutClick}>
              Uitloggen
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default Header;
