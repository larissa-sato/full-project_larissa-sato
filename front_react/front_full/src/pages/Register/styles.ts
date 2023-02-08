import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, #3163ff 0%, #85a4ff 56%, #c6d3ff 95%);
    
  .modalRegistro {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 27px;
    border-radius: 5px;
    z-index: 1;
  }
  .headerRegister {
    min-width: 295px;
    width: 100%;
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .btnBackLogin {
    width: 80%;
    max-width: 80px;
    height: 35px;
    padding: 5px;
    font-size: 12px;
    background-color: transparent;
    color: #000;
    box-shadow: none;
  }
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color:  ;
    font-weight: 700;
  }
  p {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #868e96;
  }
  input {
    width: 100%;
    box-shadow: rgba(43, 85, 190, 0.5);
    border: none;
    background-color: #f5f5f5;
    color: transparent;
    padding-left: 0.6rem;
    ::placeholder {
      color: #000000;
    }
  }
  .input-text {
    min-width: 250px;
    border: 2px solid #1976bd;
    background-color: #0f4670;
    max-width: 500px;
    color: #ffffff;
    padding-left: 0.6rem;
    ::placeholder {
      color: #ffffff;
    }
  }
  .select-text {
    min-width: 250px;
    border: 2px solid #1976bd;
    border-radius: 12px;
    background-color: #0f4670;
    max-width: 500px;
    color: #ffffff;
    padding-left: 0.6rem;
    opacity: 100%;
    ::placeholder {
      color: #ffffff;
    }
 
  @media screen and (min-width: 768px) {
    .headerRegister {
      width: 600px;
    }
  }
`;