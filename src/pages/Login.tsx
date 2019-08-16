import React from 'react'
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login'

import CenterContainer from '../components/CenterContainer'

import Logo from '../assets/logo.svg'

const Login = () => {
  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    // tslint:disable-next-line: no-console
    console.log(response)
  }

  return (
    <CenterContainer>
      <div>
        <img src={Logo} alt="YWC Logo" />
        <FacebookLogin
          appId="715340261988670"
          autoLoad={true}
          scope="email"
          callback={responseFacebook}
        />
      </div>
    </CenterContainer>
  )
}

export default Login
