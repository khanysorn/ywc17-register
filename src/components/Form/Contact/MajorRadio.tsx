import { Col, Radio, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

import Content from '../../../assets/images/content.png'
import Design from '../../../assets/images/design.png'
import Marketing from '../../../assets/images/marketing.png'
import Programming from '../../../assets/images/programming.png'

const Img = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 16px;
  cursor: pointer;
`

const MyCol = styled(Col)`
  margin-bottom: 24px;
  text-align: center;
`
interface MyProps {
  value: string
  onChange(field: string, value: any): any
}

const MajorRadio: React.FC<MyProps> = ({ value, onChange }) => {
  return (
    <Radio.Group
      value={value}
      onChange={e => onChange('major', e.target.value)}
      style={{ width: '100%' }}
    >
      <Row gutter={16}>
        <MyCol xs={24} sm={12} md={6}>
          <Img
            src={Content}
            alt="content"
            onClick={() => onChange('major', 'content')}
          />
          <br />
          <Radio value="content">Web Content</Radio>
        </MyCol>
        <MyCol xs={24} sm={12} md={6}>
          <Img
            src={Design}
            alt="design"
            onClick={() => onChange('major', 'design')}
          />
          <br />
          <Radio value="design">Web Design</Radio>
        </MyCol>
        <MyCol xs={24} sm={12} md={6}>
          <Img
            src={Marketing}
            alt="marketing"
            onClick={() => onChange('major', 'marketing')}
          />
          <br />
          <Radio value="marketing">Web Marketing</Radio>
        </MyCol>
        <MyCol xs={24} sm={12} md={6}>
          <Img
            src={Programming}
            alt="programming"
            onClick={() => onChange('major', 'programming')}
          />
          <br />
          <Radio value="programming">Web Programmer</Radio>
        </MyCol>
      </Row>
    </Radio.Group>
  )
}

export default MajorRadio
