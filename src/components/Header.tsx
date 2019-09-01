import { Avatar, Col, message, Row } from 'antd'
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

  @media (max-width: 576px) {
    height: 50px;
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

  @media (max-width: 576px) {
    font-size: 14px;
    padding: 5px;
    border-radius: 30px;
  }
`

const LogoColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  padding-left: 20px;

  & > div {
    width: 100%;
  }

  @media (max-width: 576px) {
    height: 50px;
  }
`

const LogoutButton = styled.p`
  display: inline;
  text-decoration-line: underline;
  padding-left: 10px;
  cursor: pointer;
  color: #e1426f;

  @media (max-width: 576px) {
    padding-left: 0px;
  }
`

const DiaplayName = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
  display: inline;
`

const Image = styled.img`
  width: 100%;
  max-width: 220px;
`

interface MyProps {
  current?: number
}

const Header: React.FC<MyProps> = props => {
  const authStore = useObservable(AuthStore)

  useEffect(() => {
    authStore.getFacebookDisplayName()
  }, [authStore])

  const handleLogout = () => {
    authStore.doLogout()
    message.success('ออกจากระบบสำเร็จ')
  }

  return (
    <Container>
      <Row>
        <LogoColumn xs={12} md={12}>
          <div>
            <Image src={Logo} alt="YWC Logo" />
          </div>
        </LogoColumn>
        <ProfileColumn xs={12} md={12}>
          <div>
            <ProfileBox>
              <Avatar
                size={36}
                icon="user"
                src={authStore.facebookProfilePicture}
                style={{ marginRight: '10px' }}
              />
              <DiaplayName>{authStore.facebookDisplayName} </DiaplayName>
              <LogoutButton onClick={handleLogout}>ออกจากระบบ</LogoutButton>
            </ProfileBox>
          </div>
        </ProfileColumn>
      </Row>
      <Row>
        <Col xs={0} md={24}>
          <Steps current={props.current} />
        </Col>
      </Row>
    </Container>
  )
}

export default observer(Header)
