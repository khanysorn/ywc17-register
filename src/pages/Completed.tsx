import { Avatar } from 'antd'
import { observer, useObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import CenterContainer from '../components/CenterContainer'
import NextButton from '../components/Form/NextButton'
import Loading from '../components/Loading'
import UserStore from '../stores/auth'
import CompletedStore from '../stores/completed'

const CompletedLayout = styled.div`
  text-align: center;
`

const CompletedHeading = styled.h2`
  margin-top: 1em;
  font-weight: bold;
`

const Completed = () => {
  const completedStore = useObservable(CompletedStore)
  const userStore = useObservable(UserStore)

  useEffect(() => {
    completedStore.getProfile()
  }, [completedStore])
  useEffect(() => {
    if (fbq) {
      fbq('track', 'CompleteRegistration')
    }
  }, [])
  const handleLogout = () => {
    userStore.doLogout()
  }

  if (completedStore.loading) {
    return <Loading />
  }

  return (
    <CenterContainer>
      <div>
        <CompletedLayout>
          <Avatar size={128} src={completedStore.profile.profilePicture} />
          <CompletedHeading>
            ยินดีด้วย คุณ {completedStore.profile.firstName}{' '}
            {completedStore.profile.lastName}
          </CompletedHeading>
          <h2>คุณได้ทำการลงทะเบียนเสร็จเรียบร้อยแล้ว</h2>
          <h2>โปรดรอฟังประกาศผลในวันที่ xx พฤศจิกายน 2562</h2>
          <NextButton onClick={handleLogout}>ออกจากระบบ</NextButton>
        </CompletedLayout>
      </div>
    </CenterContainer>
  )
}

export default observer(Completed)
