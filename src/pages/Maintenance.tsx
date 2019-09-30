import { Button, Icon } from 'antd'
import React from 'react'
import styled from 'styled-components'
import CenterContainer from '../components/CenterContainer'

const Heading = styled.h2`
  margin-top: 1em;
`

const TryButton = styled(Button)`
  margin-top: 2em;
  background-color: #e1426f;
  border-color: #e1426f;

  &:active,
  &:hover,
  &:focus {
    background-color: #e1426f;
    border-color: #e1426f;
  }
`

const Maintenance = () => {
  return (
    <CenterContainer>
      <div>
        <Icon style={{ color: '#E1426F', fontSize: '4em' }} type="warning" />
        <Heading>
          <b>ขออภัย</b> เรากำลังปรับปรุงระบบเพื่อประสบการณ์การสมัครที่ดีขึ้น
          กรุณารอสักครู่
        </Heading>
        <TryButton
          onClick={() => {
            window.location.reload(true)
          }}
          shape="round"
          size="large"
          type="primary"
        >
          ลองใหม่อีกครั้ง
        </TryButton>
      </div>
    </CenterContainer>
  )
}

export default Maintenance
