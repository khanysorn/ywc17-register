import { Avatar, Col, Divider, Row, Typography } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import SummaryStore from '../stores/forms/summary'
import history from '../utils/history'

import BackButton from '../components/Form/BackButton'
import Container from '../components/Form/FormContainer'
import NextButton from '../components/Form/NextButton'
import Header from '../components/Header'
import Loading from '../components/Loading'

const ButtonsContainer = styled(Row)`
  width: 100%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 44px;
`

const { Title } = Typography

const Info = () => {
  const summaryStore = useObservable(SummaryStore)

  useEffect(() => {
    summaryStore.getInfos()
  }, [summaryStore])

  if (summaryStore.loading) {
    return <Loading />
  }

  return (
    <>
      <Header current={4} />
      <Container>
        <Title level={3} style={{ marginBottom: 28, textAlign: 'center' }}>
          ข้อมูลพื้นฐาน
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col xs={24} md={24} style={{ textAlign: 'center' }}>
            <Avatar icon="user" shape="square" size={128} />
          </Col>
        </Row>
        <Divider />
        <Title level={3} style={{ marginBottom: 28, textAlign: 'center' }}>
          ที่อยู่ปัจจุบัน
        </Title>
        <ButtonsContainer type="flex" justify="center">
          <Col
            xs={24}
            sm={12}
            md={6}
            style={{ textAlign: 'center', marginTop: 10 }}
          >
            <BackButton onClick={() => history.push('/step/major')}>
              {'< แก้ไข'}
            </BackButton>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            style={{ textAlign: 'center', marginTop: 10 }}
          >
            <NextButton htmlType="submit">ต่อไป ></NextButton>
          </Col>
        </ButtonsContainer>
      </Container>
    </>
  )
}

export default observer(Info)
