import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography
} from 'antd'
import { Formik } from 'formik'
import { findIndex } from 'lodash'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import ContactStore from '../../stores/forms/contact'
import MapStoreToInitialValues from '../../utils/FormValidate/Contact/initialValues'
import validateSchema from '../../utils/FormValidate/Contact/schema'
import history from '../../utils/history'

import Container from '../../components/Form/FormContainer'
import Header from '../../components/Header'

import BackButton from '../../components/Form/BackButton'
import FormItem from '../../components/Form/Contact/CustomFormItem'
import MajorRadio from '../../components/Form/Contact/MajorRadio'
import NextButton from '../../components/Form/NextButton'

const ButtonsContainer = styled(Row)`
  width: 100%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 44px;
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

  // state ของ confirm major ไม่ได้รวมใน formik
  const [confirmMajor, setConfirmMajor] = useState(!!initialValues.major)
  // ถ้าเจอ major จาก store ให้ lock
  const lockMajor = !!initialValues.major
  // observe initialValues.major
  useEffect(() => {
    setConfirmMajor(!!initialValues.major)
  }, [initialValues.major])

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange={false}
      // validationSchema={validateSchema}
      onSubmit={async (values, actions) => {
        if (!confirmMajor) {
          message.error('กรุณากดยืนยันการเลือกสาขา')
        } else {
          await contactStore.handleSubmit(values)
          actions.setSubmitting(false)
        }
      }}
      render={({
        values,
        errors,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => {
        // knowCamp field 'อื่นๆ' logic
        const onChangeKnowCampEtc = (value: string) => {
          // update knowCamp 'อื่นๆ' ให้เพิ่มรายละเอียดไปด้วย
          const newArray = values.knowCamp.map((item: string) => {
            if (!item.includes('อื่นๆ')) {
              return item
            }
            return 'อื่นๆ: ' + value
          })
          setFieldValue('knowCamp', newArray)
        }
        const etcIndex = findIndex(values.knowCamp, (el: string) =>
          el.includes('อื่นๆ')
        )
        //
        return (
          <>
            <Header current={1} />
            <Container>
              <Title level={3} style={{ marginBottom: 28 }}>
                ข้อมูลเพิ่มเติม
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24} md={12}>
                  <FormItem
                    label="โรคประจำตัว"
                    tip="(ถ้าไม่มี ใส่ - )"
                    validateStatus={errors.disease && 'error'}
                    help={errors.disease}
                  >
                    <Input
                      name="disease"
                      onChange={handleChange}
                      value={values.disease}
                    />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem
                    label="สิ่งที่แพ้ / อาหารที่แพ้"
                    tip="(ถ้าไม่มี ใส่ - )"
                    validateStatus={errors.foodAllergy && 'error'}
                    help={errors.foodAllergy}
                  >
                    <Input
                      name="foodAllergy"
                      onChange={handleChange}
                      value={values.foodAllergy}
                      placeholder="กุ้ง ถั่ว กระเทียม ฯลฯ"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem
                    label="ยาที่แพ้"
                    tip="(ถ้าไม่มี ใส่ - )"
                    validateStatus={errors.medAllergy && 'error'}
                    help={errors.medAllergy}
                  >
                    <Input
                      name="medAllergy"
                      onChange={handleChange}
                      value={values.medAllergy}
                    />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem
                    label="ไซส์เสื้อ"
                    validateStatus={errors.shirtSize && 'error'}
                    help={errors.shirtSize}
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e: string) => setFieldValue('shirtSize', e)}
                      value={values.shirtSize}
                    >
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
                  <Form.Item
                    label="กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ เช่น ค่าย งานแข่งขัน การประกวด การแสดง ฯลฯ"
                    validateStatus={errors.activities && 'error'}
                    help={errors.activities}
                  >
                    <Input.TextArea
                      placeholder="บรรยายเหตุการณ์เหล่านั้น"
                      rows={8}
                      name="activities"
                      onChange={handleChange}
                      value={values.activities}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="รู้จักค่าย YWC จากไหน"
                    help={
                      <span style={{ color: '#EB5757' }}>
                        {errors.knowCamp}
                      </span>
                    }
                  >
                    <Checkbox.Group
                      name="knowCamp"
                      value={values.knowCamp}
                      onChange={list => setFieldValue('knowCamp', list)}
                      style={{ width: '100%' }}
                    >
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
                          <Checkbox
                            // เช็คว่า 'อื่นๆ' ได้เช็ครึยัง ถ้าเช็คแล้ว input 'etc' เปลี่ยน ให้มาอัพเดท value ตัวนี้ด้วย
                            value={
                              etcIndex !== -1
                                ? values.knowCamp[etcIndex]
                                : 'อื่นๆ'
                            }
                          />
                          <span style={{ margin: '0 8px' }}>อื่นๆ</span>
                          <Input
                            name="etc"
                            value={
                              etcIndex !== -1
                                ? values.knowCamp[etcIndex].split(' ')[1]
                                : ''
                            }
                            // disable input ถ้าไม่ได้กด checkbox
                            disabled={etcIndex === -1}
                            onChange={e => onChangeKnowCampEtc(e.target.value)}
                            placeholder="โปรดระบุ"
                          />
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
                  <Form.Item
                    label="ชื่อ"
                    validateStatus={errors.emergencyFirstName && 'error'}
                    help={errors.emergencyFirstName}
                  >
                    <Input
                      name="emergencyFirstName"
                      onChange={handleChange}
                      value={values.emergencyFirstName}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="นามสกุล"
                    validateStatus={errors.emergencyLastName && 'error'}
                    help={errors.emergencyLastName}
                  >
                    <Input
                      name="emergencyLastName"
                      onChange={handleChange}
                      value={values.emergencyLastName}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="เบอร์ติดต่อฉุกเฉิน"
                    validateStatus={errors.emergencyPhone && 'error'}
                    help={errors.emergencyPhone}
                  >
                    <Input
                      name="emergencyPhone"
                      onChange={handleChange}
                      value={values.emergencyPhone}
                      placeholder="081-234-5678"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ความสัมพันธ์"
                    validateStatus={errors.emergencyPhoneRelated && 'error'}
                    help={errors.emergencyPhoneRelated}
                  >
                    <Input
                      name="emergencyPhoneRelated"
                      onChange={handleChange}
                      value={values.emergencyPhoneRelated}
                      placeholder="พ่อ, แม่, ลุง, ป้า, ฯลฯ"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Title level={3} style={{ marginBottom: 28, marginTop: 56 }}>
                สาขาที่เลือก
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24}>
                  <Form.Item
                    validateStatus={errors.major && 'error'}
                    help={errors.major}
                  >
                    <MajorRadio
                      value={values.major}
                      onChange={setFieldValue}
                      disabled={lockMajor}
                    />
                  </Form.Item>
                  <div style={{ textAlign: 'center', marginTop: 30 }}>
                    <Checkbox
                      checked={confirmMajor}
                      disabled={lockMajor}
                      onChange={e => setConfirmMajor(e.target.checked)}
                    >
                      ยืนยันการเลือกสาขา
                    </Checkbox>
                    <p style={{ color: '#F5222D', marginTop: 24 }}>
                      **หากยืนยันการเลือกสาขาแล้ว
                      จะไม่สามารถเปลี่ยนสาขาได้ภายหลัง
                    </p>
                  </div>
                </Col>
              </Row>
              <ButtonsContainer type="flex" justify="center">
                <Col
                  xs={24}
                  sm={12}
                  md={6}
                  style={{ textAlign: 'center', marginTop: 10 }}
                >
                  <BackButton onClick={() => history.push('/step/info')}>
                    {'< ย้อนกลับ'}
                  </BackButton>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={6}
                  style={{ textAlign: 'center', marginTop: 10 }}
                >
                  <NextButton
                    loading={isSubmitting}
                    onClick={() => handleSubmit()}
                  >
                    ต่อไป >
                  </NextButton>
                </Col>
              </ButtonsContainer>
            </Container>
          </>
        )
      }}
    />
  )
}

export default observer(Contact)
