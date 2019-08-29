interface ISummaryProfile {
  profile: {
    knowCamp: [string] | []
    _id: string
    email: string
    academicYear: string
    address: string
    birthdate: Date
    department: string
    district: string
    educationStatus: string
    faculty: string
    firstName: string
    lastName: string
    nickname: string
    phone: string
    picture: string
    postalCode: string
    province: string
    religion: string
    sex: string
    subDistrict: string
    title: string
    university: string
    activities: string
    disease:string
    emergencyFirstName: string
    emergencyLastName: string
    emergencyPhone: string
    emergencyPhoneRelated: string
    foodAllergy: string
    major: string
    medAllergy: string
    shirtSize: string
  }
  generalQuestions: [string] | []
  majorQuestions: [string] | []
}

export default ISummaryProfile
