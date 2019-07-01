import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AceCode from './components/aceCode'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

const App = () => {
  return (
    <div>
      <Navbar />
      <AceCode />
      <Routes />
    </div>
  )
}

export default App
