import { Form } from 'antd'
import React from 'react'
import styled from 'styled-components'

const Tip = styled.span`
  color: rgba(0, 0, 0, 0.25);
`
interface MyProps {
  label: string
  tip?: string
  help?: any
  error?: boolean
}

const CustomFormItem: React.FC<MyProps> = ({ children, label, tip = '' }) => {
  return (
    <Form.Item
      colon={false}
      label={
        <>
          {label}
          <Tip> {tip}</Tip>
        </>
      }
    >
      {children}
    </Form.Item>
  )
}

export default CustomFormItem
