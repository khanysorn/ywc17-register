import { Col, Radio, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

import Content from '../../../assets/images/content.png'
import Design from '../../../assets/images/design.png'
import Marketing from '../../../assets/images/marketing.png'
import Programming from '../../../assets/images/programming.png'

interface ImgProps {
  disabled?: string
}
const Img = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 16px;
  cursor: ${(props: ImgProps) =>
    props.disabled === 'yes' ? 'not-allowed' : 'pointer'};
`

const MyCol = styled(Col)`
  margin-bottom: 24px;
  text-align: center;
`
interface MajorRadioProps {
  value: string
  disabled?: boolean
  onChange(field: string, value: any): any
}

const MajorRadio: React.FC<MajorRadioProps> = ({
  value,
  onChange,
  disabled
}) => {
  const onClickImg = (type: string) => {
    if (!disabled) {
      onChange('major', type)
    }
  }
  return (
    <Radio.Group
      value={value}
      onChange={e => onChange('major', e.target.value)}
      style={{ width: '100%' }}
      disabled={disabled}
    >
      <Row gutter={16}>
        <MyCol xs={24} sm={12} md={6}>
          <Img
            src={Content}
            alt="content"
            disabled={disabled ? 'yes' : 'no'}
            onClick={() => onClickImg('content')}
          />
          <br />
          <Radio value="content">Web Content</Radio>
        </MyCol>
        <MyCol xs={24} sm={12} md={6}>
          <Img
            src={Design}
            alt="design"
            disabled={disabled ? 'yes' : 'no'}
            onClick={() => onClickImg('design')}
          />
          <br />
          <Radio value="design">Web Design</Radio>
        </MyCol>
        <MyCol xs={24} sm={12} md={6}>
          <Img
            src={Marketing}
            alt="marketing"
            disabled={disabled ? 'yes' : 'no'}
            onClick={() => onClickImg('marketing')}
          />
          <br />
          <Radio value="marketing">Web Marketing</Radio>
        </MyCol>
        <MyCol xs={24} sm={12} md={6}>
          <Img
            src={Programming}
            alt="programming"
            disabled={disabled ? 'yes' : 'no'}
            onClick={() => onClickImg('programming')}
          />
          <br />
          <Radio value="programming">Web Programming</Radio>
        </MyCol>
      </Row>
    </Radio.Group>
  )
}

export default MajorRadio
