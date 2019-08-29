const env = process.env.REACT_APP_API_DEV

export const API_ENDPOINT =
  env === 'true' ? 'http://localhost:5000' : 'https://api.ywc.in.th'
