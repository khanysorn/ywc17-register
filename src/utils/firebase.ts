import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDvdZVy7KEUkL5Ssi2XzKIjypQSD0NKx1k',
  appId: '1:1096663880632:web:4810efa2b3811e33',
  authDomain: 'ywc17-register.firebaseapp.com',
  databaseURL: 'https://ywc17-register.firebaseio.com',
  messagingSenderId: '1096663880632',
  projectId: 'ywc17-register',
  storageBucket: ''
}

const firebaseInstance = firebase.initializeApp(firebaseConfig)

export const auth = firebaseInstance.auth()

export default firebaseInstance
