import { message } from 'antd'
import * as firebase from 'firebase/app'
import { action, observable } from 'mobx'
import { fetch, fetchWithToken } from '../utils/fetch'
import { auth } from '../utils/firebase'
import history from '../utils/history'
import { saveToken } from '../utils/token-helper'

class Auth {
  @observable loading: boolean = false

  @action
  async doAuthentication() {
    this.loading = true
    const provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope('email')
    const accessToken = await auth
      .signInWithPopup(provider)
      .then((result: any) => {
        message.info('กำลังเข้าสู่ระบบ')
        return result.credential.accessToken
      })
      .catch(e => {
        message.error('Something went wrong!')
        throw e
      })

    const login = await fetch('auth/login', { accessToken }, 'POST')

    if (login.status === 'success') {
      saveToken(login.payload.token)

      this.getProfile()
    }
  }

  @action
  async getProfile() {
    const getProfile = await fetchWithToken('users/me', {}, 'GET')

    if (getProfile.status !== 'success') {
      message.error('Something went wrong!')

      this.loading = false

      return
    }

    message.success('เข้าสู่ระบบสำเร็จ')

    if (getProfile.payload.status === 'completed') {
      history.push(`/completed`)
      message.warning('คุณได้ทำการส่งใบสมัครแล้ว')
      this.loading = false
      return
    } else {
      history.push(`/step/${getProfile.payload.step}`)
    }

    this.loading = false
  }
}

export default new Auth()
