import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AceCode from './components/aceCode'

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
