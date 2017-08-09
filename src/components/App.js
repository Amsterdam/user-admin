import React from 'react'
import Footer from './Footer'
import AddUser from '../containers/AddUser'
import UsersContainer from '../containers/UsersContainer'

const App = () => (
  <div>
    <AddUser />
    <UsersContainer />
    <Footer />
  </div>
)

export default App
