import { message } from 'antd'
import * as firebase from 'firebase/app'
import { action, observable } from 'mobx'
import { fetch } from '../utils/fetch'
import { auth } from '../utils/firebase'

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
      message.success('เข้าสู่ระบบสำเร็จ')
      this.loading = false
    }
  }
}

export default new Auth()
