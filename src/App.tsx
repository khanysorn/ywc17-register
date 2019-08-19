import { Provider } from 'mobx-react'
import React from 'react'
import Loadable from 'react-loadable'
import { Route, Router, Switch } from 'react-router'
import { createGlobalStyle } from 'styled-components'

import 'antd/dist/antd.css'
import './index.css'

import store from './stores'
import history from './utils/history'

import Loading from './components/Loading'
import NotFound from './pages/NotFound'

const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: Loading
})

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

const Completed = Loadable({
  loader: () => import('./pages/Completed'),
  loading: Loading
})

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Maledpan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html {
    --antd-wave-shadow-color: #E1426F;
  }

  body {
    font-family: 'Maledpan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

  .ant-input:focus {
    border-color: #e1426f;
    box-shadow: 0 0 0 2px rgba(225, 66, 111, 0.2);
  }

  .ant-input:hover {
    border-color: #e1426f;
  }

  .ant-btn:hover, .ant-btn:active, .ant-btn:focus {
    color: #fff;
    border-color: #e1426f;
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: #e1426f;
  }

  .ant-radio:hover {
    border-color: #e1426f;
  }

  .ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner {
    border-color: #e1426f;
  }

  .ant-radio-inner::after {
    background-color: #e1426f;
  }

  .ant-radio-checked::after {
    border: 1px solid #e1426f;
  }
`

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Switch>
          <Route exact={true} path="/" component={Login} />
          <Route exact={true} path="/step/info" component={Info} />
          <Route exact={true} path="/step/contact" component={Contact} />
          <Route exact={true} path="/step/general" component={General} />
          <Route exact={true} path="/step/major" component={Major} />
          <Route exact={true} path="/completed" component={Completed} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
