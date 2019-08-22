import { Button, Icon, message, Typography, Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { observer, useObservable } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'

import AuthStore from '../../../stores/auth'
import { storage } from '../../../utils/firebase'

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

interface UploadImgProps {
  value: string
  onChange(field: string, value: any): any
}

const UploadImg = (props: UploadImgProps) => {
  const { onChange, value } = props

  const authStore = useObservable(AuthStore)

  const onUpload = async (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
      if (info.file.size < 2000000) {
        const type = info.file.type.split('/')[1]

        await storage
          .ref(`${authStore.userId}/profile.${type}`)
          .put(info.file.originFileObj || new Blob())

        message.success('อัพโหลดรูปสำเร็จ')

        const url = await storage
          .ref(`${authStore.userId}/profile.${type}`)
          .getDownloadURL()

        onChange('picture', url)
      } else {
        message.error(`ไม่สามารถอัพไฟล์ภาพขนาดเกิน 2 MB`)
      }
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
          style={{ fontSize: 16, marginBottom: 6, fontWeight: 'bold' }}
        >
          อัพโหลดรูปประจำตัว
        </Typography.Paragraph>
        <Upload name="profile_image" showUploadList={false} onChange={onUpload}>
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

export default observer(UploadImg)
