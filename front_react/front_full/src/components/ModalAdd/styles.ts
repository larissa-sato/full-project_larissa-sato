import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  .headerModal {
    width: 450px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: space-around;
    background-color: #343b41;
    border-radius: 4px;
    gap: 12rem;
  }
  .modalBox {
    width: 450px;
    height: 450px;
    background-color: #212529;
    color: #fff;
    border-radius: 4px;
  }
  .btnClose {
    height: auto;
    background-color: transparent;
    color: #868e96;
    border: none;
    cursor: pointer;
  }
  .btnSubmit {
    width: 80%;
    background-color: #343b41;
    color: #868e96;
    border: none;
    cursor: pointer;
  }
  label {
    text-align: left;
  }
  h2 {
    background-color: #343b41;
    font-size: 18px;
    font-weight: 700;
  }
  input{
    width: 80%;
    heigh: 10px;
  }
  label{
    font-size: 14px
  }
  `;