import { Button, Icon, message, Typography, Upload } from 'antd'
import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  height: 180px;
  width: 180px;
  margin-right: 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.09);

  background: rgba(0, 0, 0, 0.04);
`
const StyledIcon = styled(Icon)`
  color: #d9d9d9;
  font-size: 56px;
  left: 60px;
  position: absolute;
  top: 55px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

interface MyProps {
  value: string
  onChange(field: string, value: any): any
}

export default function UploadImg(props: MyProps) {
  const { onChange, value } = props

  const onUpload = async (info: any) => {
    if (info.file.status !== 'uploading') {
      if (info.file.size < 2000000) {
        const preview = await getBase64(info.file.originFileObj)
        onChange('picture', preview)
      }
    }
    if (info.file.status === 'done') {
      if (info.file.size > 2000000) {
        message.error(`ไม่สามารถอัพไฟล์ภาพขนาดเกิน 2 MB`)
      } else {
        message.success(`อัพโหลดไฟล์เรียบร้อยแล้ว`)
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} มีข้อผิดหลาดเกิดขึ้น.`)
    }
  }

  return (
    <Wrapper>
      <Background>
        {value ? (
          <img
            src={value}
            alt="profile_img"
            style={{ width: 180, height: 180 }}
          />
        ) : (
          <StyledIcon type="user" />
        )}
      </Background>
      <div>
        <Typography.Paragraph
          type="secondary"
          style={{ fontSize: 16, marginBottom: 6 }}
        >
          อัพโหลดรูปประจำตัว
        </Typography.Paragraph>
        <Upload
          name="profile_image"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          showUploadList={false}
          headers={{
            authorization: 'authorization-text'
          }}
          onChange={onUpload}
        >
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
        <Typography.Paragraph
          type="secondary"
          style={{ fontSize: 12, marginTop: 6 }}
        >
          ภาพขนาดไม่เกิน 2 MB
        </Typography.Paragraph>
      </div>
    </Wrapper>
  )
}
