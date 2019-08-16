import styled from 'styled-components'

const CenterContainer = styled.div`
  max-width: 960px;
  width: 100%;
  height: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    text-align: center;
  }
`

export default CenterContainer
