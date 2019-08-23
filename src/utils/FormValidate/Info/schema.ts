import * as Yup from 'yup'

export default Yup.object().shape({
  academicYear: Yup.string(),
  address: Yup.string().required('กรุณาใส่ที่อยู่'),
  birthdate: Yup.string().required('กรุณาเลือกวันเกิด'),
  department: Yup.string().required('กรุณาใส่สาขา'),
  district: Yup.string().required('กรุณาใส่เขต/อำเภอ'),
  educationStatus: Yup.string().required('กรุณาเลือกสถานะการศึกษา'),
  email: Yup.string()
    .email('รูปแบบอีเมลไม่ถูกต้อง')
    .required('กรุณาใส่อีเมล'),
  faculty: Yup.string().required('กรุณาใส่คณะ'),
  firstName: Yup.string().required('กรุณาใส่ชื่อ'),
  lastName: Yup.string().required('กรุณาใส่นามสกุล'),
  nickname: Yup.string().required('กรุณาใส่ชื่อเล่น'),
  phone: Yup.string()
    .min(9, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .max(10, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .matches(/^\d+$/, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .required('กรุณาใส่เบอร์โทรศัพท์'),
  picture: Yup.string().required('กรุณาอัพโหลดรูปโปรไฟล์'),
  postalCode: Yup.string()
    .max(5, 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง')
    .matches(/^\d+$/, 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง')
    .required('กรุณาใส่รหัสไปรษณีย์'),
  province: Yup.string().required('กรุณาใส่จังหวัด'),
  religion: Yup.string().required('กรุณาเลือกศาสนา'),
  sex: Yup.string().required('กรุณาเลือกเพศ'),
  subDistrict: Yup.string().required('กรุณาใส่แขวง/ตำบล'),
  title: Yup.string().required('กรุณาเลือกคำนำหน้าชื่อ'),
  university: Yup.string().required('กรุณาใส่มหาวิทยาลัย')
})
