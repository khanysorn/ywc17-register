import { Avatar, Col, Row } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import AuthStore from '../stores/auth'

import Logo from '../assets/header.svg'
import Steps from './Form/Steps'

const Container = styled.div`
  max-width: 960px;
  margin: auto;
  margin-top: 30px;

  @media only screen and (max-width: 1000px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`

const ProfileColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;

  & > div {
    text-align: right;
    width: 100%;
  }
`

const ProfileBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.2);
  border-radius: 60px;
  font-size: 16px;
  padding: 8px 15px 8px 8px;
  display: inline-block;
  line-height: 36px;
`

const LogoutButton = styled.p`
  display: inline;
  text-decoration-line: underline;
  padding-left: 10px;
  cursor: pointer;
  color: #e1426f;
`

const Header = () => {
  const authStore = useObservable(AuthStore)

  useEffect(() => {
    authStore.getFacebookDisplayName()
  }, [authStore])

  const handleLogout = () => {
    authStore.doLogout()
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <img src={Logo} alt="YWC Logo" />
        </Col>
        <ProfileColumn md={12}>
          <div>
            <ProfileBox>
              <Avatar size={36} icon="user" style={{ marginRight: '10px' }} />
              {authStore.facebookDisplayName}{' '}
              <LogoutButton onClick={handleLogout}>ออกจากระบบ</LogoutButton>
            </ProfileBox>
          </div>
        </ProfileColumn>
      </Row>
      <Row>
        <Steps current={0} />
      </Row>
    </Container>
  )
}

export default observer(Header)
