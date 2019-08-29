import { message } from 'antd'
import { action, observable } from 'mobx'
import { fetchWithToken } from '../../utils/fetch'

class MajorQuestion {
  @observable loading: boolean = false
  @observable formData: object = {}

  @action
  async getAnswers() {
    try {
      this.loading = true
      const res = await fetchWithToken('registration/major', {}, 'GET')
      this.formData = res.payload
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }
  @action
  async handleSubmit(data: object) {
    try {
      this.loading = true
      await fetchWithToken('registration/major', data, 'PUT')
      // history.push('/completed')
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }
}

export default new MajorQuestion()
