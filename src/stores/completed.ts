import { message } from 'antd'
import * as firebase from 'firebase/app'
import { action, observable } from 'mobx'
import CompletedProfile from '../interfaces/CompletedProfile'
import { fetch, fetchWithToken } from '../utils/fetch'
import { auth } from '../utils/firebase'
import history from '../utils/history'
import { saveToken } from '../utils/token-helper'

class Completed {
  @observable loading: boolean = false
  @observable profile: CompletedProfile = {
    firstName: '',
    lastName: '',
    profilePicture: ''
  }

  @action
  async getProfile() {
    const getProfile = await fetchWithToken('users/me', {}, 'GET')

    if (getProfile.status === 'success') {
      if (getProfile.payload.status !== 'completed') {
        message.warn('คุณยังกรอกใบสมัครไม่เรียบร้อย')
        history.push(`/step/${getProfile.payload.step}`)
        this.loading = false

        return
      }

      this.profile = {
        firstName: getProfile.payload.firstName,
        lastName: getProfile.payload.lastName,
        profilePicture: getProfile.payload.picture
      }

      this.loading = false
    } else {
      message.error('Something went wrong!')
    }
  }
}

export default new Completed()
