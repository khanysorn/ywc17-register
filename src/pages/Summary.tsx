import { Avatar, Button, Col, Divider, Row, Typography } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import moment from 'moment'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import SummaryStore from '../stores/forms/summary'
import history from '../utils/history'

import TextArea from 'antd/lib/input/TextArea'
import BackButton from '../components/Form/BackButton'
import Container from '../components/Form/FormContainer'
import NextButton from '../components/Form/NextButton'
import Header from '../components/Header'
import Loading from '../components/Loading'
import { GENERAL_QUESTION, MAJOR, MAJOR_QUESTION } from '../utils/const'

const ButtonsContainer = styled(Row)`
  width: 100%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 44px;
`

const FieldName = styled.h3`
  font-family: 'Sarabun';
  font-size: 18px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 1.8;
`

const FieldContent = styled.h3`
  font-family: 'Sarabun';
  font-size: 20px;
`

const AnswerBox = styled(TextArea)`
  margin: 5px auto 25px auto;
  font-family: 'Sarabun';
  font-size: 20px;
  resize: none;

  &:disabled {
    color: rgba(0, 0, 0, 0.85);
    border: 0;
    background-color: transparent;
    line-height: 1.9;
    cursor: default;
  }
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

  const { profile } = summaryStore

  return (
    <>
      <Header current={4} />
      <Container>
        <Title level={3} style={{ marginBottom: 28, textAlign: 'center' }}>
          ข้อมูลพื้นฐาน
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col xs={24} md={24} style={{ textAlign: 'center' }}>
            <Avatar
              icon="user"
              shape="square"
              size={192}
              src={profile.profile.picture}
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginTop: 40 }}>
          <Col xs={24} md={8}>
            <FieldName>ชื่อ</FieldName>
            <FieldContent>{profile.profile.firstName}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>นามสกุล</FieldName>
            <FieldContent>{profile.profile.lastName}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>ชื่อเล่น</FieldName>
            <FieldContent>{profile.profile.nickname}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>วัน-เดือน-ปีเกิด</FieldName>
            <FieldContent>
              {moment(profile.profile.birthdate).calendar()}
            </FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>ศาสนา</FieldName>
            <FieldContent>{profile.profile.religion}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>เบอร์โทรศัพท์มือถือ</FieldName>
            <FieldContent>{profile.profile.phone}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>อีเมล</FieldName>
            <FieldContent>{profile.profile.email}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>เพศ</FieldName>
            <FieldContent>{profile.profile.sex}</FieldContent>
          </Col>
        </Row>
        <Divider />
        <Title level={3} style={{ marginBottom: 28, textAlign: 'center' }}>
          ที่อยู่ปัจจุบัน
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginTop: 40 }}>
          <Col xs={24} md={8}>
            <FieldName>ที่อยู่</FieldName>
            <FieldContent>{profile.profile.address}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>แขวง/ตำบล</FieldName>
            <FieldContent>{profile.profile.subDistrict}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>เขต/อำเภอ</FieldName>
            <FieldContent>{profile.profile.district}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>จังหวัด</FieldName>
            <FieldContent>{profile.profile.province}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>รหัสไปรษณีย์</FieldName>
            <FieldContent>{profile.profile.postalCode}</FieldContent>
          </Col>
        </Row>
        <Divider />
        <Title level={3} style={{ marginBottom: 28, textAlign: 'center' }}>
          ข้อมูลการศึกษา
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginTop: 40 }}>
          <Col xs={24} md={8}>
            <FieldName>กำลังศึกษาอยู่ในระดับ</FieldName>
            <FieldContent>{profile.profile.educationStatus}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>ชั้นปี</FieldName>
            <FieldContent>{profile.profile.academicYear}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>มหาวิทยาลัย</FieldName>
            <FieldContent>{profile.profile.university}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>คณะ</FieldName>
            <FieldContent>{profile.profile.faculty}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>สาขาวิชา</FieldName>
            <FieldContent>{profile.profile.department}</FieldContent>
          </Col>
        </Row>
        <Divider />
        <Title level={3} style={{ marginBottom: 28, textAlign: 'center' }}>
          ข้อมูลเพิ่มเติม
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginTop: 40 }}>
          <Col xs={24} md={8}>
            <FieldName>โรคประจำตัว</FieldName>
            <FieldContent>{profile.profile.disease}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>สิ่งที่แพ้ / อาหารที่แพ้</FieldName>
            <FieldContent>{profile.profile.foodAllergy}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>ยาที่แพ้</FieldName>
            <FieldContent>{profile.profile.medAllergy}</FieldContent>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>ไซส์เสื้อ</FieldName>
            <FieldContent>{profile.profile.shirtSize}</FieldContent>
          </Col>
          <Col xs={24} md={24}>
            <FieldName>
              กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ เช่น ค่าย งานแข่งขัน การประกวด
              การแสดง ฯลฯ
            </FieldName>
            <AnswerBox disabled={true} autosize={true}>
              {profile.profile.activities}
            </AnswerBox>
          </Col>
          <Col xs={24} md={8}>
            <FieldName>รู้จักค่าย YWC จากไหน</FieldName>
            <FieldContent>
              {profile.profile.knowCamp.map(item => (
                <>
                  {item}
                  <br />
                </>
              ))}
            </FieldContent>
          </Col>
        </Row>
        <Divider />
        <Title level={3} style={{ marginBottom: 28, textAlign: 'center' }}>
          ข้อมูลติดต่อฉุกเฉิน
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginTop: 40 }}>
          <Col xs={24} md={12}>
            <FieldName>ชื่อ</FieldName>
            <FieldContent>{profile.profile.emergencyFirstName}</FieldContent>
          </Col>
          <Col xs={24} md={12}>
            <FieldName>นามสกุล</FieldName>
            <FieldContent>{profile.profile.emergencyLastName}</FieldContent>
          </Col>
          <Col xs={24} md={12}>
            <FieldName>เบอร์ติดต่อฉุกเฉิน</FieldName>
            <FieldContent>{profile.profile.emergencyPhone}</FieldContent>
          </Col>
          <Col xs={24} md={12}>
            <FieldName>ความสัมพันธ์</FieldName>
            <FieldContent>{profile.profile.emergencyPhoneRelated}</FieldContent>
          </Col>
        </Row>
        <Divider />
        <Title level={3} style={{ marginBottom: 28, textAlign: 'center' }}>
          คำถามจากส่วนกลาง
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginTop: 40 }}>
          {profile.generalQuestions.map((answer: string, i) => {
            return (
              <Col xs={24} md={24} key={i}>
                <FieldName>
                  {i + 1}. {GENERAL_QUESTION[i]}
                </FieldName>
                <AnswerBox disabled={true} autosize={true}>
                  {answer}
                </AnswerBox>
              </Col>
            )
          })}
        </Row>
        <Divider />
        <Title level={3} style={{ textAlign: 'center' }}>
          คำถามประจำสาขา
        </Title>
        <Title
          level={4}
          style={{
            color: '#E1426F',
            marginBottom: 28,
            marginTop: 0,
            textAlign: 'center'
          }}
        >
          สาขาเว็บ{MAJOR(profile.profile.major)}
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ marginTop: 40 }}>
          {profile.majorQuestions.map((answer: string, i) => {
            if (profile.profile.major === 'design' && i === 3) {
              return (
                <Col xs={24} md={24} key={i}>
                  <FieldName>
                    {i + 1}. {MAJOR_QUESTION(profile.profile.major)[i]}
                  </FieldName>
                  <FieldContent>
                    <Button icon="download" href={answer}>
                      ดาวน์โหลด
                    </Button>
                  </FieldContent>
                </Col>
              )
            }

            return (
              <Col xs={24} md={24} key={i}>
                <FieldName>
                  {i + 1}. {MAJOR_QUESTION(profile.profile.major)[i]}
                </FieldName>
                <AnswerBox disabled={true} autosize={true}>
                  {answer}
                </AnswerBox>
              </Col>
            )
          })}
        </Row>
        <ButtonsContainer type="flex" justify="center">
          <Col
            xs={24}
            sm={12}
            md={6}
            style={{ textAlign: 'center', marginTop: 10 }}
          >
            <BackButton onClick={() => history.push('/step/major')}>
              {'<  กลับไปแก้ไข'}
            </BackButton>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            style={{ textAlign: 'center', marginTop: 10 }}
          >
            <NextButton onClick={summaryStore.doConfirm}>ส่งใบสมัคร</NextButton>
          </Col>
        </ButtonsContainer>
      </Container>
    </>
  )
}

export default observer(Info)
