import { message } from 'antd'
import * as firebase from 'firebase/app'
import { action, observable } from 'mobx'
import { fetch, fetchWithToken } from '../utils/fetch'
import { auth } from '../utils/firebase'
import history from '../utils/history'
import { getToken, removeToken, saveToken } from '../utils/token-helper'

class Auth {
  @observable loading: boolean = true
  @observable facebookDisplayName: string = ''
  @observable facebookProfilePicture: string = ''

  @action
  async doAuthentication() {
    this.loading = true
    const accessToken = await auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        const provider = new firebase.auth.FacebookAuthProvider()
        provider.addScope('email')
        return firebase.auth().signInWithPopup(provider)
      })
      .then((result: any) => {
        message.info('กำลังเข้าสู่ระบบ')
        return result.credential.accessToken
      })
      .catch(e => {
        message.error('Something went wrong!')
        this.loading = false
        throw e
      })

    const login = await fetch('auth/login', { accessToken }, 'POST')

    if (login.status === 'success') {
      saveToken(login.payload.token)

      this.getProfile()
    }
  }

  @action
  getFacebookDisplayName() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.facebookDisplayName = user.displayName || ''
        this.facebookProfilePicture = user.photoURL || ''
      } else {
        message.error('กรุณาเข้าสู่ระบบก่อนสมัคร')
        this.doLogout()
      }
    })
  }

  @action
  async doLogout() {
    await firebase.auth().signOut()
    removeToken()
    history.push('/')
  }

  @action
  async checkAuthentication() {
    if (getToken()) {
      const getProfile = await fetchWithToken('users/me', {}, 'GET')

      if (getProfile.status === 'success') {
        await this.getProfile()
        return
      }
    }
    this.loading = false
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
      message.info('เรากำลังนำคุณไปยังขั้นตอนล่าสุด')
      history.push(`/step/${getProfile.payload.step}`)
    }

    this.loading = false
  }
}

export default new Auth()
