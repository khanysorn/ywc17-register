import * as Yup from 'yup'

export default Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  // tslint:disable-next-line: object-literal-sort-keys
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
})
