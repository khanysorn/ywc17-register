import { get } from 'lodash'

export default (form: object) => ({
  activities: get(form, 'activities', ''),
  disease: get(form, 'disease', ''),
  emergencyFirstName: get(form, 'emergencyFirstName', ''),
  emergencyLastName: get(form, 'emergencyLastName', ''),
  emergencyPhone: get(form, 'emergencyPhone', ''),
  emergencyPhoneRelated: get(form, 'emergencyPhoneRelated', ''),
  foodAllergy: get(form, 'foodAllergy', ''),
  knowCamp: Object.assign([], get(form, 'knowCamp', [])),
  major: get(form, 'major', ''),
  medAllergy: get(form, 'medAllergy', ''),
  shirtSize: get(form, 'shirtSize', '')
})
