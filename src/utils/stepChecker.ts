const steps = ['info', 'contact', 'general', 'major', 'summary']

const stepChecker = (step: string, request: string) => {
  if (steps.indexOf(step) < steps.indexOf(request)) {
    return true
  }

  return false
}

export default stepChecker
