import { Steps } from 'antd'
import React from 'react'
import styled from 'styled-components'

const { Step } = Steps

const Container = styled.div`
  max-width: 960px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 24px 48px;
  margin-top: 30px;

  @media only screen and (max-width: 1000px) {
    padding: 24px;
  }
`

interface MyProps {
  current: number
}

export default function Stepper(props: MyProps) {
  return (
    <Container>
      <Steps current={props.current}>
        <Step title="ขั้นที่ 1" description="ข้อมูลพื้นฐาน" />
        <Step title="ขั้นที่ 2" description="ข้อมูลเพิ่มเติม" />
        <Step title="ขั้นที่ 3" description="คำถามจากส่วนกลาง" />
        <Step title="ขั้นที่ 4" description="คำถามประจำสาขา" />
        <Step title="ขั้นที่ 5" description="สรุป" />
      </Steps>
    </Container>
  )
}
