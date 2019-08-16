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
import React from 'react'

import Container from '../../components/Form/FormContainer'
import UploadImg from '../../components/Form/Info/UploadImg'
import Steps from '../../components/Form/Steps'

import NextButton from '../../assets/images/Button.png'

const { Title } = Typography

const General = () => {
  return (
    <>
      <Steps current={0} />
      <Container>
        <Title level={3} style={{ marginBottom: 36 }}>
          ข้อมูลพื้นฐาน
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col xs={24} md={12}>
            <UploadImg />
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="ชื่อ">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="นามสกุล">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="เพศ">
              <Radio.Group defaultValue="">
                <Radio value="male">ชาย</Radio>
                <Radio value="female">หญิง</Radio>
                <Radio value="others">อื่นๆ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="ชื่อเล่น">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="วัน-เดือน-ปีเกิด">
              <DatePicker placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="ศาสนา">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="เบอร์โทรศัพท์มือถือ">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="อีเมล">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Title level={3} style={{ marginBottom: 36, marginTop: 50 }}>
          ที่อยู่ปัจจุบัน
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col xs={24} md={12}>
            <Form.Item label="ที่อยู่">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="แขวง/ตำบล">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="เขต/อำเภอ">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="จังหวัด">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="รหัสไปรษณีย์">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Title level={3} style={{ marginBottom: 36, marginTop: 50 }}>
          ข้อมูลการศึกษา
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col xs={24}>
            <Form.Item label="กำลังศึกษาอยู่ในระดับ">
              <Radio.Group defaultValue="">
                <Radio value="1">มัธยมปลาย</Radio>
                <Radio value="2">มหาวิทยาลัย</Radio>
                <Radio value="3">สูงกว่าปริญญาตรี</Radio>
                <Radio value="4">ทำงานแล้ว</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="ชั้นปี">
              <Select defaultValue="1" style={{ width: '100%' }}>
                <Select.Option value="1">1</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="มหาวิทยาลัย">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="คณะ">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="สาขาวิชา">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: 96, marginBottom: 16 }}>
          <img
            src={NextButton}
            style={{ cursor: 'pointer' }}
            alt="next button"
          />
        </div>
      </Container>
    </>
  )
}

export default General
