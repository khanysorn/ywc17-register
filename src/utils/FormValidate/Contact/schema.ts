import * as Yup from 'yup'

export default Yup.object().shape({
  activities: Yup.string().required('กรุณาระบุรายละเอียดกิจกรรม'),
  disease: Yup.string().required('กรุณาระบุโรคประจำตัว'),
  emergencyFirstName: Yup.string().required('กรุณาระบุ'),
  emergencyLastName: Yup.string().required('กรุณาระบุ'),
  emergencyPhone: Yup.string()
    .min(9, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .max(10, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .matches(/^\d+$/, 'รูปแบบเบอร์โทรไม่ถูกต้อง')
    .required('กรุณาใส่เบอร์โทรศัพท์'),
  emergencyPhoneRelated: Yup.string().required('กรุณาระบุความสัมพันธ์'),
  foodAllergy: Yup.string().required('กรุณาระบุสิ่งที่แพ้ / อาหารที่แพ้'),
  knowCamp: Yup.array().required('กรุณาระบุ'),
  major: Yup.string().required('กรุณาเลือกสาขา'),
  medAllergy: Yup.string().required('กรุณาระบุยาที่แพ้'),
  shirtSize: Yup.string().required('กรุณาเลือก')
})
