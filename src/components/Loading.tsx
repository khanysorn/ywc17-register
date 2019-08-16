import { Icon, Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'
import CenterContainer from './CenterContainer'

const LoadingContainer = styled(CenterContainer)`
  & > div {
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
