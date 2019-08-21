// import { message } from 'antd'
// import * as firebase from 'firebase/app'
import { action, observable } from 'mobx'
import { fetchWithToken } from '../../utils/fetch'
// import initialValues from '../../utils/FormValidate/Info/initialValues'
// import { auth } from '../../utils/firebase'
import history from '../../utils/history'

class Info {
  @observable loading: boolean = false
  @observable formData: object = {}

  @action
  async getAnswers() {
    try {
      this.loading = true
      const res = await fetchWithToken('registration/info', {}, 'GET')
      this.formData = res.payload
    } catch (error) {
      return
    } finally {
      this.loading = false
    }
  }
  async handleSubmit(data: object) {
    try {
      this.loading = true
      await fetchWithToken('registration/info', data, 'PUT')
      history.push('/step/contact')
    } catch (error) {
      return
    } finally {
      this.loading = false
    }
  }
}

export default new Info()
