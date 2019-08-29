import { message } from 'antd'
import { action, observable } from 'mobx'
import { fetchWithToken } from '../../utils/fetch'
import history from '../../utils/history'

class Contact {
  @observable loading: boolean = false
  @observable formData: object = {}

  @action
  async getAnswers() {
    try {
      this.loading = true
      const res = await fetchWithToken('registration/contact', {}, 'GET')
      this.formData = res.payload
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }
  async handleSubmit(data: object) {
    try {
      this.loading = true
      const result = await fetchWithToken('registration/contact', data, 'PUT')
      if (result.status === 'success') {
        history.push('/step/general')
      }
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }
}

export default new Contact()
