import { message } from 'antd'
import { action, observable } from 'mobx'
import ISummaryProfile from '../../interfaces/ISummaryProfile'
import { fetchWithToken } from '../../utils/fetch'
import history from '../../utils/history'

class Summary {
  @observable loading: boolean = true
  @observable profile = {} as ISummaryProfile

  @action
  async getInfos() {
    try {
      this.loading = true
      const getSummary = await fetchWithToken('registration/summary', {}, 'GET')
      if (getSummary.status === 'success') {
        this.profile = getSummary.payload
      }
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    } finally {
      this.loading = false
    }
  }

  @action
  async doConfirm() {
    try {
      const postConfirm = await fetchWithToken(
        'registration/confirm',
        {},
        'POST'
      )
      if (postConfirm.status === 'success') {
        history.push('/completed')
      } else {
        throw postConfirm.payload
      }
    } catch (error) {
      message.error('มีข้อผิิดพลาดเกิิดขึ้น กรุณาลองอีกครั้ง')
    }
  }
}

export default new Summary()
