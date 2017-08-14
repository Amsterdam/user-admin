import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

const Header = () => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header>
        <NavLink to="/users">
          Gemeente Amsterdam IDP
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/users">
          Gebruikers
        </NavLink>
      </Menu.Item>
    </Container>
  </Menu>
)

export default Header
