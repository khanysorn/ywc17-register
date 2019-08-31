import { message } from 'antd'
import { action, observable } from 'mobx'
import { fetchWithToken } from '../../utils/fetch'
import history from '../../utils/history'

class Info {
  @observable loading: boolean = false
  @observable formData: object = {}

  @action
  async getAnswers() {
    try {
      this.loading = true
      const result = await fetchWithToken('registration/info', {}, 'GET')

      if (result.status === 'success') {
        this.formData = result.payload
      } else if (result.status === 'completed') {
        history.push('/completed')
      }
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }
  async handleSubmit(data: object) {
    try {
      this.loading = true
      const result = await fetchWithToken('registration/info', data, 'PUT')
      if (result.status === 'success') {
        history.push('/step/contact')
      }
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }
}

export default new Info()
