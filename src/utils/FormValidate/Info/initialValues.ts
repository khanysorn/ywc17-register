import { get } from 'lodash'
import moment from 'moment'

export default (form: object) => ({
  title: get(form, 'title', ''),
  // tslint:disable-next-line: object-literal-sort-keys
  firstName: get(form, 'firstName', ''),
  lastName: get(form, 'lastName', ''),
  nickname: get(form, 'nickname', ''),
  // tslint:disable-next-line: object-literal-sort-keys
  faculty: get(form, 'faculty', ''),
  department: get(form, 'department', ''),
  picture: get(form, 'picture', ''),
  educationStatus: get(form, 'educationStatus', ''),
  academicYear: get(form, 'academicYear', ''),
  university: get(form, 'university', ''),
  sex: get(form, 'sex', ''),
  birthdate: get(form, 'birthdate', moment(Date.now()).format()),
  religion: get(form, 'religion', ''),
  phone: get(form, 'phone', ''),
  address: get(form, 'address', ''),
  subDistrict: get(form, 'subDistrict', ''),
  district: get(form, 'district', ''),
  province: get(form, 'province', ''),
  postalCode: get(form, 'postalCode', ''),
  email: get(form, 'email', '')
})
