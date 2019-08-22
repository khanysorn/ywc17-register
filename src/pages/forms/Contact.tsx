import {
  Checkbox,
  Col,
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
import Header from '../../components/Header'

import NextButton from '../../assets/images/Button.png'
import FormItem from '../../components/Form/Contact/CustomFormItem'

const { Title } = Typography

const Contact = () => {
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
            <FormItem label="สิ่งที่แพ้ / อาหารที่แพ้" tip="(ถ้าไม่มี ใส่ - )">
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
                {['1', '2', '3'].map((value, key) => (
                  <Select.Option key={key} value={value !== '-' ? value : ''}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col xs={24}>
            <Form.Item label="กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ เช่น ค่าย งานแข่งขัน การประกวด การแสดง ฯลฯ">
              <Input.TextArea placeholder="บรรยายเหตุการณ์เหล่านั้น" rows={8} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="รู้จักค่าย YWC จากไหน">
              <Checkbox.Group style={{ width: '100%' }}>
                <Row gutter={16}>
                  {[
                    'Facebook',
                    'Twitter',
                    'Instagram',
                    'เพื่อน',
                    'ผู้ปกครอง',
                    'สถานศึกษา'
                  ].map((value, key) => (
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
                    <>
                      <Checkbox value="ผู้ปกครอง" />
                      <span style={{ margin: '0 8px' }}>อื่นๆ</span>
                      <Input placeholder="โปรดระบุ" />
                    </>
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
            <Form.Item label="กำลังศึกษาอยู่ในระดับ">
              <Radio.Group defaultValue="">
                <Radio value="1">มัธยมปลาย</Radio>
                <Radio value="2">มหาวิทยาลัย</Radio>
                <Radio value="3">สูงกว่าปริญญาตรี</Radio>
                <Radio value="4">ทำงานแล้ว</Radio>
              </Radio.Group>
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

export default Contact
