import { Provider } from 'mobx-react'
import React from 'react'
import Loadable from 'react-loadable'
import { Route, Router } from 'react-router'
import { createGlobalStyle } from 'styled-components'

import 'antd/dist/antd.css'
import './index.css'

import store from './stores'
import history from './utils/history'

const Loading = () => <></>

const Info = Loadable({
  loader: () => import('./pages/forms/Info'),
  loading: Loading
})

const Contact = Loadable({
  loader: () => import('./pages/forms/Contact'),
  loading: Loading
})

const General = Loadable({
  loader: () => import('./pages/forms/GeneralQuestion'),
  loading: Loading
})

const Major = Loadable({
  loader: () => import('./pages/forms/MajorQuestion'),
  loading: Loading
})

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Maledpan';
  }

  body {
    font-family: 'Maledpan';
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(69.01deg, #C73884 7.27%, #E13C6F 51.46%, #9B308E 95.22%);
    background-size: cover;
    background-attachment: fixed;
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #E1426F;
    border-color: #E1426F;
  }

  .ant-calendar-picker {
    width: 100%;
  }
`

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Route exact={true} path="/step/info" component={Info} />
        <Route exact={true} path="/step/contact" component={Contact} />
        <Route exact={true} path="/step/general" component={General} />
        <Route exact={true} path="/step/major" component={Major} />
      </Router>
    </Provider>
  )
}

export default App
