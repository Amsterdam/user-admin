import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

const Header = () => (
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
    </Container>
  </Menu>
);

export default Header;
