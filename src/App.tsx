import React from 'react'
import { createGlobalStyle } from 'styled-components'
////
import General from './pages/forms/general'

const GlobalStyle = createGlobalStyle`
  body {
    /* font-family: Maledpan; */
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(69.01deg, #C73884 7.27%, #E13C6F 51.46%, #9B308E 95.22%);
  }
`

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <General />
    </>
  )
}

export default App
