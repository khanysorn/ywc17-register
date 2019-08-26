import { message } from 'antd'
import { action, observable } from 'mobx'
import { fetchWithToken } from '../../utils/fetch'
import history from '../../utils/history'

class GeneralQuestion {
  @observable loading: boolean = false
  @observable formData: object = {}

  @action
  async getAnswers() {
    try {
      this.loading = true
      const res = await fetchWithToken('registration/general', {}, 'GET')
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
      await fetchWithToken('registration/general', data, 'PUT')
      history.push('/step/major')
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }
}

export default new GeneralQuestion()
