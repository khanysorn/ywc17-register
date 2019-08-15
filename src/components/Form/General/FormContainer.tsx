import styled from 'styled-components'

export default styled.div`
  max-width: 960px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 48px;
  margin-top: 32px;

  @media only screen and (max-width: 1000px) {
    margin-left: 20px;
    margin-right: 20px;
  }
  @media only screen and (max-width: 575px) {
    padding: 24px;
  }
`
