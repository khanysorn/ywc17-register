import { observer, useObservable } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'

import AuthStore from '../stores/auth'

import CenterContainer from '../components/CenterContainer'
import Loading from '../components/Loading'

import Logo from '../assets/logo.svg'

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
`

const LoginHeading = styled.h2`
  margin-top: 2em;
  font-weight: bold;
`

const LoginSubHeading = styled.h2`
  margin-bottom: 2em;
`

const Login = () => {
  const authStore = useObservable(AuthStore)

  const handleLogin = async () => {
    await authStore.doAuthentication()
  }

  if (authStore.loading) {
    return <Loading />
  }

  return (
    <CenterContainer>
      <LoginLayout>
        <img src={Logo} alt="YWC Logo" />
        <LoginHeading>
          ระบบรับสมัคร Young Webmaster Camp ครั้งที่ 17
        </LoginHeading>
        <LoginSubHeading>
          โปรดเข้าสู่ระบบด้วย Facebook เพื่อสมัครค่าย
        </LoginSubHeading>
        <h1 onClick={handleLogin}>Login</h1>
      </LoginLayout>
    </CenterContainer>
  )
}

export default observer(Login)
