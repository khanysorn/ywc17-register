import {
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

import { Formik } from 'formik'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import InfoStore from '../../stores/forms/info'

import MapStoreToInitialValues from '../../utils/FormValidate/Info/initialValues'
import validateSchema from '../../utils/FormValidate/Info/schema'

import Container from '../../components/Form/FormContainer'
import Header from '../../components/Header'
// tslint:disable-next-line: ordered-imports
import UploadImg from '../../components/Form/Info/UploadImg'
import NextButton from '../../components/Form/NextButton'
// tslint:disable-next-line: ordered-imports
import moment from 'moment'

const { Title } = Typography

const General = () => {
  const infoStore = useObservable(InfoStore)

  // init
  useEffect(() => {
    const fetch = async () => {
      await infoStore.getAnswers()
    }
    fetch()
  }, [])

  const storeValues = Object.assign({}, infoStore.formData)
  const initialValues = MapStoreToInitialValues(storeValues)

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={validateSchema}
      onSubmit={async (values, actions) => {
        await infoStore.handleSubmit(values)
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
            <Header />
            <Container>
              <Title level={3} style={{ marginBottom: 36 }}>
                ข้อมูลพื้นฐาน
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24} md={12}>
                  <UploadImg onChange={setFieldValue} value={values.picture} />
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="เพศ"
                    validateStatus={errors.sex && 'error'}
                    help={errors.sex}
                  >
                    <Radio.Group
                      name="sex"
                      onChange={handleChange}
                      value={values.sex}
                    >
                      <Radio value="ชาย">ชาย</Radio>
                      <Radio value="หญิง">หญิง</Radio>
                      <Radio value="อื่นๆ">อื่นๆ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="คำนำหน้าชื่อ"
                    validateStatus={errors.title && 'error'}
                    help={errors.title}
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
                    validateStatus={errors.firstName && 'error'}
                    help={errors.firstName}
                  >
                    <Input
                      name="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                      placeholder="คณิศร"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="นามสกุล"
                    validateStatus={errors.lastName && 'error'}
                    help={errors.lastName}
                  >
                    <Input
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      placeholder="ชัยวิชาชาญ"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ชื่อเล่น"
                    validateStatus={errors.nickname && 'error'}
                    help={errors.nickname}
                  >
                    <Input
                      name="nickname"
                      onChange={handleChange}
                      value={values.nickname}
                      placeholder="บอส"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="วัน-เดือน-ปีเกิด"
                    validateStatus={errors.birthdate && 'error'}
                    help={errors.birthdate}
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
                      value={
                        // แปลงกลับ
                        values.birthdate ? moment(values.birthdate) : undefined
                      }
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="เบอร์โทรศัพท์มือถือ"
                    validateStatus={errors.phone && 'error'}
                    help={errors.phone}
                  >
                    <Input
                      name="phone"
                      onChange={handleChange}
                      value={values.phone}
                      placeholder="081-234-5678"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="อีเมล"
                    validateStatus={errors.email && 'error'}
                    help={errors.email}
                  >
                    <Input
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      placeholder="example@ywc17.in.th"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ศาสนา"
                    validateStatus={errors.religion && 'error'}
                    help={errors.religion}
                  >
                    <Input
                      name="religion"
                      onChange={handleChange}
                      value={values.religion}
                      placeholder="พุทธม คริสต์, อิสลาม, ฯลฯ"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Title level={3} style={{ marginBottom: 36, marginTop: 50 }}>
                ที่อยู่ปัจจุบัน
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="ที่อยู่"
                    validateStatus={errors.address && 'error'}
                    help={errors.address}
                  >
                    <Input
                      name="address"
                      onChange={handleChange}
                      value={values.address}
                      placeholder="บ้านเลขที่, หมู่, ซอย, ถนน, ฯลฯ"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="แขวง/ตำบล"
                    validateStatus={errors.subDistrict && 'error'}
                    help={errors.subDistrict}
                  >
                    <Input
                      name="subDistrict"
                      onChange={handleChange}
                      value={values.subDistrict}
                      placeholder="ตลองตันเหนือ"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="เขต/อำเภอ"
                    validateStatus={errors.district && 'error'}
                    help={errors.district}
                  >
                    <Input
                      name="district"
                      onChange={handleChange}
                      value={values.district}
                      placeholder="วัฒนา"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="จังหวัด"
                    validateStatus={errors.province && 'error'}
                    help={errors.province}
                  >
                    <Input
                      name="province"
                      onChange={handleChange}
                      value={values.province}
                      placeholder="กรุงเทพมหานคร"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="รหัสไปรษณีย์"
                    validateStatus={errors.postalCode && 'error'}
                    help={errors.postalCode}
                  >
                    <Input
                      name="postalCode"
                      onChange={handleChange}
                      value={values.postalCode}
                      placeholder="10400"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Title level={3} style={{ marginBottom: 36, marginTop: 50 }}>
                ข้อมูลการศึกษา
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xs={24}>
                  <Form.Item
                    label="กำลังศึกษาอยู่ในระดับ"
                    validateStatus={errors.educationStatus && 'error'}
                    help={errors.educationStatus}
                  >
                    <Radio.Group
                      name="educationStatus"
                      onChange={handleChange}
                      value={values.educationStatus}
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
                    validateStatus={errors.academicYear && 'error'}
                    help={errors.academicYear}
                  >
                    <Select
                      onChange={(e: string) => setFieldValue('academicYear', e)}
                      value={values.academicYear}
                      style={{ width: '100%' }}
                    >
                      {[
                        '-',
                        'ปี 1',
                        'ปี 2',
                        'ปี 3',
                        'ปี 4',
                        'ปี 5',
                        'ปี 6',
                        'ปวส. ปี 1',
                        'ปวส. ปี 2'
                      ].map((value, key) => (
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
                    validateStatus={errors.university && 'error'}
                    help={errors.university}
                  >
                    <Input
                      name="university"
                      onChange={handleChange}
                      value={values.university}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="คณะ"
                    validateStatus={errors.faculty && 'error'}
                    help={errors.faculty}
                  >
                    <Input
                      name="faculty"
                      onChange={handleChange}
                      value={values.faculty}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="สาขาวิชา"
                    validateStatus={errors.department && 'error'}
                    help={errors.department}
                  >
                    <Input
                      name="department"
                      onChange={handleChange}
                      value={values.department}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div
                style={{ textAlign: 'center', marginTop: 96, marginBottom: 16 }}
              >
                <NextButton
                  loading={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  ต่อไป
                </NextButton>
              </div>
            </Container>
          </>
        )
      }}
    />
  )
}

export default observer(General)
