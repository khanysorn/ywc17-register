export const GENERAL_QUESTION = ['1', '2', '3']

export const MAJOR_QUESTION = (major: string) => {
  switch (major) {
    case 'content':
      return ['1', '3', '2', '4']
    case 'design':
      return ['1', '3', '2', '4']
    case 'marketing':
      return ['1', '3', '2', '4']
    case 'programming':
      return ['1', '3', '2', '4']
    default:
      return []
  }
}

interface MajorDetail {
  color: string
  name: string
  value: string
}

export const MAJOR = (major: string): string => {
  const majors = [
    {
      color: 'purple',
      name: 'คอนเทนท์',
      value: 'content'
    },
    {
      color: 'magenta',
      name: 'ดีไซน์',
      value: 'design'
    },
    {
      color: 'volcano',
      name: 'มาร์เก็ตติ้ง',
      value: 'marketing'
    },
    {
      color: 'geekblue',
      name: 'โปรแกรมมิ่ง',
      value: 'programming'
    }
  ]

  const result = majors.find((m: MajorDetail) => m.value === major) || {
    name: ''
  }

  return result.name
}
