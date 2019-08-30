import {
  AutoComplete,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography
} from 'antd'

import { Formik, getIn } from 'formik'
import { observer, useObservable } from 'mobx-react-lite'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import InfoStore from '../../stores/forms/info'

import MapStoreToInitialValues from '../../utils/FormValidate/Info/initialValues'
import validateSchema from '../../utils/FormValidate/Info/schema'

import { SelectValue } from 'antd/lib/select'
import Container from '../../components/Form/FormContainer'
import UploadImg from '../../components/Form/Info/UploadImg'
import NextButton from '../../components/Form/NextButton'
import Header from '../../components/Header'
import { UNIVERSITY } from '../../utils/autoComplete'

const { Title } = Typography

const Info = () => {
  const infoStore = useObservable(InfoStore)

  // init
  useEffect(() => {
    infoStore.getAnswers()
  }, [infoStore])

  const [universities, setUniversites] = useState(UNIVERSITY)
  const [academicYear, setAcademicYear] = useState([
    'ปี 1',
    'ปี 2',
    'ปี 3',
    'ปี 4',
    'ปี 5',
    'ปี 6'
  ])

  const storeValues = Object.assign({}, infoStore.formData)
  const initialValues = MapStoreToInitialValues(storeValues)

  const dateCalaulate = (current: any) => {
    return (
      current && (current < moment('1/1/1996') || current >= moment('1/1/2002'))
    )
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={async (values, actions) => {
        await infoStore.handleSubmit(values)
        actions.setSubmitting(false)
      }}
      render={({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => {
        const onEducationStatusChange = (value: string) => {
          setFieldValue('educationStatus', value)

          switch (value) {
            case 'มัธยมปลาย':
              setAcademicYear([
                'ม. 4',
                'ม. 5',
                'ม. 6',
                'ปวส. ปี 1',
                'ปวส. ปี 2'
              ])
              break
            case 'ปริญญาตรี':
              setAcademicYear(['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4', 'ปี 5', 'ปี 6'])
              break
            case 'สูงกว่าปริญญาตรี':
              setAcademicYear(['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4', 'ปี 5', 'ปี 6'])
              break
            case 'ทำงานแล้ว':
              setFieldValue('university', '-')
              setFieldValue('faculty', '-')
              setFieldValue('department', '-')
              setFieldValue('academicYear', '-')
              break
          }
        }

        const getValidateStatus = (field: string) =>
          getIn(touched, field) && Boolean(getIn(errors, field)) ? 'error' : ''
        const getHelperText = (field: string) =>
          getIn(touched, field) ? getIn(errors, field) : ''

        return (
          <form
            onSubmit={e => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <Header />
            <Container>
              <Title level={3} style={{ marginBottom: 28 }}>
                ข้อมูลพื้นฐาน
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item
                    help={getHelperText('picture')}
                    validateStatus={getValidateStatus('picture')}
                    style={{ margin: 0 }}
                  >
                    <UploadImg
                      onChange={setFieldValue}
                      value={values.picture}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="เพศ"
                    help={getHelperText('sex')}
                    validateStatus={getValidateStatus('sex')}
                  >
                    <Radio.Group
                      name="sex"
                      onChange={handleChange}
                      value={values.sex}
                    >
                      <Radio value="ชาย">ชาย</Radio>
                      <Radio value="หญิง">หญิง</Radio>
                      <Radio value="ไม่ระบุ">ไม่ระบุ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="คำนำหน้าชื่อ"
                    help={getHelperText('title')}
                    validateStatus={getValidateStatus('title')}
                  >
                    <Radio.Group
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                    >
                      <Radio value="นาย">นาย</Radio>
                      <Radio value="นางสาว">นางสาว</Radio>
                      <Radio value="นาง">นาง</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ชื่อ"
                    help={getHelperText('firstName')}
                    validateStatus={getValidateStatus('firstName')}
                  >
                    <Input
                      name="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                      placeholder="คณิศร"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="นามสกุล"
                    help={getHelperText('lastName')}
                    validateStatus={getValidateStatus('lastName')}
                  >
                    <Input
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      placeholder="ชัยวิชาชาญ"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ชื่อเล่น"
                    help={getHelperText('nickname')}
                    validateStatus={getValidateStatus('nickname')}
                  >
                    <Input
                      name="nickname"
                      onChange={handleChange}
                      value={values.nickname}
                      placeholder="บอส"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="วัน-เดือน-ปีเกิด"
                    help={getHelperText('birthdate')}
                    validateStatus={getValidateStatus('birthdate')}
                  >
                    <DatePicker
                      name="birthdate"
                      onChange={value =>
                        // แปลงเป็น string
                        setFieldValue(
                          'birthdate',
                          moment(value || undefined).format()
                        )
                      }
                      disabledDate={dateCalaulate}
                      value={
                        // แปลงกลับ
                        values.birthdate ? moment(values.birthdate) : undefined
                      }
                      format="DD/MM/YYYY"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="เบอร์โทรศัพท์มือถือ"
                    help={getHelperText('phone')}
                    validateStatus={getValidateStatus('phone')}
                  >
                    <Input
                      name="phone"
                      onChange={handleChange}
                      value={values.phone}
                      placeholder="081-234-5678"
                      maxLength={10}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="อีเมล"
                    help={getHelperText('email')}
                    validateStatus={getValidateStatus('email')}
                  >
                    <Input
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      placeholder="example@ywc17.in.th"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ศาสนา"
                    help={getHelperText('religion')}
                    validateStatus={getValidateStatus('religion')}
                  >
                    <Input
                      name="religion"
                      onChange={handleChange}
                      value={values.religion}
                      placeholder="พุทธ, คริสต์, อิสลาม, ฯลฯ"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Title level={3} style={{ marginBottom: 28, marginTop: 56 }}>
                ที่อยู่ปัจจุบัน
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ที่อยู่"
                    help={getHelperText('address')}
                    validateStatus={getValidateStatus('address')}
                  >
                    <Input
                      name="address"
                      onChange={handleChange}
                      value={values.address}
                      placeholder="บ้านเลขที่, หมู่, ซอย, ถนน, ฯลฯ"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="แขวง/ตำบล"
                    help={getHelperText('subDistrict')}
                    validateStatus={getValidateStatus('subDistrict')}
                  >
                    <Input
                      name="subDistrict"
                      onChange={handleChange}
                      value={values.subDistrict}
                      placeholder="ตลองตันเหนือ"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="เขต/อำเภอ"
                    help={getHelperText('district')}
                    validateStatus={getValidateStatus('district')}
                  >
                    <Input
                      name="district"
                      onChange={handleChange}
                      value={values.district}
                      placeholder="วัฒนา"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="จังหวัด"
                    help={getHelperText('province')}
                    validateStatus={getValidateStatus('province')}
                  >
                    <Input
                      name="province"
                      onChange={handleChange}
                      value={values.province}
                      placeholder="กรุงเทพมหานคร"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="รหัสไปรษณีย์"
                    help={getHelperText('postalCode')}
                    validateStatus={getValidateStatus('postalCode')}
                  >
                    <Input
                      name="postalCode"
                      onChange={handleChange}
                      value={values.postalCode}
                      placeholder="10400"
                      maxLength={5}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Title level={3} style={{ marginBottom: 28, marginTop: 56 }}>
                ข้อมูลการศึกษา
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24}>
                  <Form.Item
                    label="กำลังศึกษาอยู่ในระดับ"
                    help={getHelperText('educationStatus')}
                    validateStatus={getValidateStatus('educationStatus')}
                  >
                    <Radio.Group
                      name="educationStatus"
                      onChange={e => onEducationStatusChange(e.target.value)}
                      value={values.educationStatus}
                      size="large"
                    >
                      <Radio value="มัธยมปลาย">มัธยมปลาย</Radio>
                      <Radio value="ปริญญาตรี">ปริญญาตรี</Radio>
                      <Radio value="สูงกว่าปริญญาตรี">สูงกว่าปริญญาตรี</Radio>
                      <Radio value="ทำงานแล้ว">ทำงานแล้ว</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ชั้นปี"
                    help={getHelperText('academicYear')}
                    validateStatus={getValidateStatus('academicYear')}
                  >
                    <Select
                      onChange={(e: string) => setFieldValue('academicYear', e)}
                      value={values.academicYear}
                      style={{ width: '100%' }}
                      disabled={values.educationStatus === 'ทำงานแล้ว'}
                      size="large"
                    >
                      {academicYear.map((value, key) => (
                        <Select.Option
                          key={key}
                          value={value !== '-' ? value : ''}
                        >
                          {value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="มหาวิทยาลัย"
                    help={getHelperText('university')}
                    validateStatus={getValidateStatus('university')}
                  >
                    <AutoComplete
                      size="large"
                      placeholder="มหาวิทยาลัย"
                      value={values.university}
                      onChange={(value: SelectValue) => {
                        setFieldValue('university', value)
                      }}
                      dataSource={universities}
                      onSelect={(value: SelectValue, option: any) => {
                        setFieldValue('university', value)
                      }}
                      onSearch={(value: string) => {
                        setUniversites(
                          UNIVERSITY.filter(u => u.includes(value))
                        )
                      }}
                      disabled={values.educationStatus === 'ทำงานแล้ว'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="คณะ"
                    help={getHelperText('faculty')}
                    validateStatus={getValidateStatus('faculty')}
                  >
                    <Input
                      name="faculty"
                      onChange={handleChange}
                      value={values.faculty}
                      disabled={values.educationStatus === 'ทำงานแล้ว'}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="สาขาวิชา"
                    help={getHelperText('department')}
                    validateStatus={getValidateStatus('department')}
                  >
                    <Input
                      name="department"
                      onChange={handleChange}
                      value={values.department}
                      disabled={values.educationStatus === 'ทำงานแล้ว'}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div
                style={{ textAlign: 'center', marginTop: 96, marginBottom: 16 }}
              >
                <NextButton loading={isSubmitting} htmlType="submit">
                  ต่อไป
                </NextButton>
              </div>
            </Container>
          </form>
        )
      }}
    />
  )
}

export default observer(Info)
