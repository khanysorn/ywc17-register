import { message } from 'antd'
import * as firebase from 'firebase/app'
import { action, observable } from 'mobx'
import { fetch } from '../../utils/fetch'
import { auth } from '../../utils/firebase'

class Info {
  @observable loading: boolean = false

  @action
  async handleSubmit() {
    this.loading = true

    this.loading = false
  }
}

export default new Info()
