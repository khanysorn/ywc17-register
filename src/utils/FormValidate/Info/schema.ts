import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup.string().required('กรุณาเลือกคำนำหน้าชื่อ'),
  // tslint:disable-next-line: object-literal-sort-keys
  sex: Yup.string().required('กรุณาเลือกเพศ'),
  firstName: Yup.string().required('กรุณาใส่ชื่อ'),
  lastName: Yup.string().required('กรุณาใส่นามสกุล'),
  nickname: Yup.string().required('กรุณาใส่ชื่อเล่น'),
  faculty: Yup.string().required('กรุณาใส่คณะ'),
  department: Yup.string().required('กรุณาใส่สาขา'),
  educationStatus: Yup.string().required('กรุณาเลือกสถานะการศึกษา'),
  // no required
  academicYear: Yup.string(),
  picture: Yup.string(),
  email: Yup.string()
    .email('รูปแบบอีเมลไม่ถูกต้อง')
    .required('กรุณาใส่อีเมล'),

  university: Yup.string().required('กรุณาใส่มหาวิทยาลัย'),
  birthdate: Yup.string().required('กรุณาเลือกวันเกิด'),
  religion: Yup.string().required('กรุณาเลือกศาสนา'),
  phone: Yup.string()
    .min(9, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .max(10, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .matches(/^\d+$/, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .required('กรุณาใส่เบอร์โทรศัพท์'),
  address: Yup.string().required('กรุณาใส่ที่อยู่'),
  subDistrict: Yup.string().required('กรุณาใส่แขวง/ตำบล'),
  district: Yup.string().required('กรุณาใส่เขต/อำเภอ'),
  province: Yup.string().required('กรุณาใส่จังหวัด'),
  postalCode: Yup.string().required('กรุณาใส่รหัสไปรษณีย์')
})
