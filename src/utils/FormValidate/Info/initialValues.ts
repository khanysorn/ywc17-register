import { get } from 'lodash'
import moment from 'moment'

export default (form: object) => ({
  academicYear: get(form, 'academicYear', ''),
  address: get(form, 'address', ''),
  birthdate: get(form, 'birthdate', moment('1/1/2000')),
  department: get(form, 'department', ''),
  district: get(form, 'district', ''),
  educationStatus: get(form, 'educationStatus', ''),
  email: get(form, 'email', ''),
  faculty: get(form, 'faculty', ''),
  firstName: get(form, 'firstName', ''),
  lastName: get(form, 'lastName', ''),
  nickname: get(form, 'nickname', ''),
  phone: get(form, 'phone', ''),
  picture: get(form, 'picture', ''),
  postalCode: get(form, 'postalCode', ''),
  province: get(form, 'province', ''),
  religion: get(form, 'religion', ''),
  sex: get(form, 'sex', ''),
  subDistrict: get(form, 'subDistrict', ''),
  title: get(form, 'title', ''),
  university: get(form, 'university', '')
})
