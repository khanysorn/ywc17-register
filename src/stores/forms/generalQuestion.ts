import { message } from 'antd'
import { action, observable } from 'mobx'
import { fetchWithToken } from '../../utils/fetch'
import history from '../../utils/history'
import stepChecker from '../../utils/stepChecker'

class GeneralQuestion {
  @observable loading: boolean = false
  @observable formData: object = {}

  @action
  async getAnswers() {
    try {
      this.loading = true
      const result = await fetchWithToken('registration/general', {}, 'GET')

      if (result.status === 'success') {
        if (stepChecker(result.payload.step, 'general')) {
          return history.push(`/step/${result.payload.step}`)
        }
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
  @action
  async handleSubmit(data: object) {
    try {
      this.loading = true
      const result = await fetchWithToken('registration/general', data, 'PUT')
      if (result.status === 'success') {
        history.push('/step/major')
      }
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }
}

export default new GeneralQuestion()
