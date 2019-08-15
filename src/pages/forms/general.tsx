import { Button, Col, Form, Icon, Input, Radio, Row, Typography } from 'antd'
import React from 'react'

import Container from '../../components/Form/General/FormContainer'
import UploadImg from '../../components/Form/General/UploadImg'
import Steps from '../../components/Form/Steps'

const { Title } = Typography

export default (props: any) => {
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
              <Input placeholder="input placeholder" />
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
      </Container>
    </>
  )
}
