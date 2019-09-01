import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
  Select,
  Typography
} from 'antd'
import { Formik, getIn } from 'formik'
import { findIndex } from 'lodash'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

import ContactStore from '../../stores/forms/contact'
import MapStoreToInitialValues from '../../utils/FormValidate/Contact/initialValues'
import validateSchema from '../../utils/FormValidate/Contact/schema'
import history from '../../utils/history'

import Container from '../../components/Form/FormContainer'
import Header from '../../components/Header'

import BackButton from '../../components/Form/BackButton'
import ButtonsContainer from '../../components/Form/ButtonsContainer'
import FormItem from '../../components/Form/Contact/CustomFormItem'
import MajorRadio from '../../components/Form/Contact/MajorRadio'
import NextButton from '../../components/Form/NextButton'

const { Title } = Typography

const ShirtSizes = [
  { label: '-', value: '-' },
  { label: 'S (33 นิ้ว)', value: 'S' },
  { label: 'M (36 นิ้ว)', value: 'M' },
  { label: 'L (40 นิ้ว)', value: 'L' },
  { label: 'XL (44 นิ้ว)', value: 'XL' },
  { label: '2XL (48 นิ้ว)', value: '2XL' },
  { label: '3XL (52 นิ้ว)', value: '3XL' }
]
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
    contactStore.getAnswers()
  }, [contactStore])

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
      validationSchema={validateSchema}
      onSubmit={async (values, actions) => {
        if (!confirmMajor) {
          message.error('กรุณากดยืนยันการเลือกสาขา')
          actions.setSubmitting(false)
        } else {
          await contactStore.handleSubmit(values)
          if (fbq) {
            fbq('trackCustom', 'SelectMajor', { major: values.major } as any)
          }
          actions.setSubmitting(false)
        }
      }}
      render={({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting,
        validateForm
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
        const getValidateStatus = (field: string) =>
          getIn(touched, field) && Boolean(getIn(errors, field)) ? 'error' : ''
        const getHelperText = (field: string) =>
          getIn(touched, field) ? getIn(errors, field) : ''

        return (
          <form
            onSubmit={e => {
              e.preventDefault()
              validateForm().then(vErrors => {
                if (Object.keys(vErrors).length > 0) {
                  notification.error({ message: 'คุณยังกรอกข้อมูลไม่ครบ' })
                  handleSubmit()
                } else {
                  handleSubmit()
                }
              })
            }}
          >
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
                    help={getHelperText('disease')}
                    validateStatus={getValidateStatus('disease')}
                  >
                    <Input
                      name="disease"
                      onChange={handleChange}
                      value={values.disease}
                      size="large"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem
                    label="สิ่งที่แพ้ / อาหารที่แพ้"
                    tip="(ถ้าไม่มี ใส่ - )"
                    help={getHelperText('foodAllergy')}
                    validateStatus={getValidateStatus('foodAllergy')}
                  >
                    <Input
                      name="foodAllergy"
                      onChange={handleChange}
                      value={values.foodAllergy}
                      placeholder="กุ้ง ถั่ว กระเทียม ฯลฯ"
                      size="large"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem
                    label="ยาที่แพ้"
                    tip="(ถ้าไม่มี ใส่ - )"
                    help={getHelperText('medAllergy')}
                    validateStatus={getValidateStatus('medAllergy')}
                  >
                    <Input
                      name="medAllergy"
                      onChange={handleChange}
                      value={values.medAllergy}
                      size="large"
                    />
                  </FormItem>
                </Col>
                <Col xs={24} md={12}>
                  <FormItem
                    label="ไซส์เสื้อ"
                    help={getHelperText('shirtSize')}
                    validateStatus={getValidateStatus('shirtSize')}
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(e: string) => setFieldValue('shirtSize', e)}
                      value={values.shirtSize}
                      size="large"
                    >
                      {ShirtSizes.map((value, key) => (
                        <Select.Option
                          key={key}
                          value={value.value !== '-' ? value.value : ''}
                        >
                          {value.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ เช่น ค่าย งานแข่งขัน การประกวด การแสดง ฯลฯ"
                    help={getHelperText('activities')}
                    validateStatus={getValidateStatus('activities')}
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
                        {getHelperText('activities')}
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
                    help={getHelperText('emergencyFirstName')}
                    validateStatus={getValidateStatus('emergencyFirstName')}
                  >
                    <Input
                      name="emergencyFirstName"
                      onChange={handleChange}
                      value={values.emergencyFirstName}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="นามสกุล"
                    help={getHelperText('emergencyLastName')}
                    validateStatus={getValidateStatus('emergencyLastName')}
                  >
                    <Input
                      name="emergencyLastName"
                      onChange={handleChange}
                      value={values.emergencyLastName}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="เบอร์ติดต่อฉุกเฉิน"
                    help={getHelperText('emergencyPhone')}
                    validateStatus={getValidateStatus('emergencyPhone')}
                  >
                    <Input
                      name="emergencyPhone"
                      onChange={handleChange}
                      value={values.emergencyPhone}
                      placeholder="0812345678"
                      maxLength={10}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ความสัมพันธ์"
                    help={getHelperText('emergencyPhoneRelated')}
                    validateStatus={getValidateStatus('emergencyPhoneRelated')}
                  >
                    <Input
                      name="emergencyPhoneRelated"
                      onChange={handleChange}
                      value={values.emergencyPhoneRelated}
                      placeholder="พ่อ, แม่, ลุง, ป้า, ฯลฯ"
                      size="large"
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
                    help={getHelperText('major')}
                    validateStatus={getValidateStatus('major')}
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
                  <NextButton loading={isSubmitting} htmlType="submit">
                    ต่อไป >
                  </NextButton>
                </Col>
              </ButtonsContainer>
            </Container>
          </form>
        )
      }}
    />
  )
}

export default observer(Contact)
