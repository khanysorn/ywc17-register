import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import App from './App'

ReactGA.initialize('UA-42284958-1')

ReactDOM.render(<App />, document.getElementById('root'))
