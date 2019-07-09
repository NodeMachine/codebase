import React from 'react'
import {connect} from 'react-redux'

import {Navbar, CompanyNavbar} from './components'
import Routes from './routes'

const App = props => {
  console.log('>>> ', props.user.id)
  return (
    <div>
      {props.company.id ? <CompanyNavbar /> : <Navbar />}
      <Routes />
    </div>
  )
}

const mapState = state => {
  return {
    company: state.company.company,
    user: state.user.singleUser
  }
}

export default connect(mapState)(App)
