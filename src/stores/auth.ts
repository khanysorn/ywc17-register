import firebase from 'firebase'
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
        return result.credential.accessToken
      })
      .catch(() => {
        return ''
      })

    if (accessToken === '') {
      return
    }

    const login = await fetch('auth/login', { accessToken }, 'POST')

    if (login.status === 'success') {
      this.loading = false
    }
  }
}

export default new Auth()
