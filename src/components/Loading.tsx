import { Icon, Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  max-width: 960px;
  width: 100%;
  height: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    text-align: center;

    h1 {
      font-weight: bold;
      margin-top: 2em;
    }
  }
`

const Loading = () => (
  <LoadingContainer>
    <div>
      <Spin
        indicator={
          <Icon
            type="loading"
            style={{ fontSize: 128, color: '#E1426F' }}
            spin={true}
          />
        }
      />
      <br />
      <h1>โปรดรอซักครู่</h1>
    </div>
  </LoadingContainer>
)

export default Loading
