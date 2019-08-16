import { Button, Icon, Typography, Upload } from 'antd'
import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  height: 180px;
  width: 180px;
  margin-right: 16px;
  margin-bottom: 16px;

  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
`
const StyledIcon = styled(Icon)`
  color: #d9d9d9;
  font-size: 56px;
  left: 60px;
  position: absolute;
  top: 55px;
`

export default function UploadImg() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <Background>
        <StyledIcon type="user" />
      </Background>
      <div>
        <Typography.Paragraph
          type="secondary"
          style={{ fontSize: 16, marginBottom: 6 }}
        >
          อัพโหลดรูปประจำตัว
        </Typography.Paragraph>
        <Upload fileList={[]}>
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
    </div>
  )
}
