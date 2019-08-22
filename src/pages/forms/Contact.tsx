import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography
} from 'antd'
import { Formik } from 'formik'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import ContactStore from '../../stores/forms/contact'
import MapStoreToInitialValues from '../../utils/FormValidate/Contact/initialValues'
import validateSchema from '../../utils/FormValidate/Contact/schema'

import Container from '../../components/Form/FormContainer'
import Header from '../../components/Header'

import BackButton from '../../components/Form/BackButton'
import FormItem from '../../components/Form/Contact/CustomFormItem'
import MajorRadio from '../../components/Form/Contact/MajorRadio'
import NextButton from '../../components/Form/NextButton'

const ButtonsContainer = styled.div`
  width: 325px;
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 44px;
  flex-wrap: wrap;
`

const { Title } = Typography

const ShirtSizes = ['-', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
const Socials = [
  'Facebook',
  'Twitter',
  'Instagram',
  'เพื่อน',
  'ผู้ปกครอง',
  'สถานศึกษา'
]

const Contact = () => {
  const contactStore = useObservable(ContactStore)

  // init
  useEffect(() => {
    const fetch = async () => {
      await contactStore.getAnswers()
    }
    fetch()
  }, [])

  const storeValues = Object.assign({}, contactStore.formData)
  const initialValues = MapStoreToInitialValues(storeValues)
  // console.log(initialValues)
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange={false}
      // validationSchema={validateSchema}
      onSubmit={async (values, actions) => {
        // await infoStore.handleSubmit(values)
        actions.setSubmitting(false)
      }}
      render={({
        values,
        errors,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => {
        return (
          <>
            <Header current={1} />
            <Container>
              <Title level={3} style={{ marginBottom: 28 }}>
                ข้อมูลเพิ่มเติม
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24} md={12}>
                  <FormItem label="โรคประจำตัว" tip="(ถ้าไม่มี ใส่ - )">
                    <Input />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem
                    label="สิ่งที่แพ้ / อาหารที่แพ้"
                    tip="(ถ้าไม่มี ใส่ - )"
                  >
                    <Input placeholder="กุ้ง ถั่ว กระเทียม ฯลฯ" />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem label="ยาที่แพ้" tip="(ถ้าไม่มี ใส่ - )">
                    <Input />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem label="ไซส์เสื้อ">
                    <Select style={{ width: '100%' }}>
                      {ShirtSizes.map((value, key) => (
                        <Select.Option
                          key={key}
                          value={value !== '-' ? value : ''}
                        >
                          {value}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col xs={24}>
                  <Form.Item label="กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ เช่น ค่าย งานแข่งขัน การประกวด การแสดง ฯลฯ">
                    <Input.TextArea
                      placeholder="บรรยายเหตุการณ์เหล่านั้น"
                      rows={8}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="รู้จักค่าย YWC จากไหน">
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row gutter={16}>
                        {Socials.map((value, key) => (
                          <Col
                            xs={12}
                            sm={8}
                            md={4}
                            key={key}
                            style={{ marginTop: 10 }}
                          >
                            <Checkbox value={value}>{value}</Checkbox>
                          </Col>
                        ))}
                        <Col
                          xs={20}
                          sm={12}
                          md={8}
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                            marginTop: 10
                          }}
                        >
                          <Checkbox value="ผู้ปกครอง" />
                          <span style={{ margin: '0 8px' }}>อื่นๆ</span>
                          <Input placeholder="โปรดระบุ" />
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Title level={3} style={{ marginBottom: 28, marginTop: 56 }}>
                ข้อมูลติดต่อฉุกเฉิน
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item label="ชื่อ">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="นามสกุล">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="เบอร์ติดต่อฉุกเฉิน">
                    <Input placeholder="081-234-5678" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="ความสัมพันธ์">
                    <Input placeholder="พ่อ, แม่, ลุง, ป้า, ฯลฯ" />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Title level={3} style={{ marginBottom: 28, marginTop: 56 }}>
                สาขาที่เลือก
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24}>
                  <MajorRadio value={values.major} onChange={setFieldValue} />
                  <div style={{ textAlign: 'center', marginTop: 30 }}>
                    <Checkbox value={''}>ยืนยันการเลือกสาขา</Checkbox>
                    <p style={{ color: '#F5222D', marginTop: 24 }}>
                      **หากยืนยันการเลือกสาขาแล้ว
                      จะไม่สามารถเปลี่ยนสาขาได้ภายหลัง
                    </p>
                  </div>
                </Col>
              </Row>
              <ButtonsContainer>
                <BackButton>{'< ย้อนกลับ'}</BackButton>
                <NextButton>ต่อไป ></NextButton>
              </ButtonsContainer>
            </Container>
          </>
        )
      }}
    />
  )
}

export default observer(Contact)
