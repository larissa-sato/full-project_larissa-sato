import styled from "styled-components";

export const MainDash = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #09153e;
  color: #fff;
  .dashHeader{
    display: flex;
    flex-direction: row;
    justify-content:space-evenly;
    padding: 1rem
  }
  .headerList{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 1rem;
  }
  h2 {
    color: #93abbd;
    font-size: 0.5rem;
  }
  .btnAddClient{
    border: none;
    border-radius: 5px;
    padding: 5px;
    color: #000;
    font-weight: 500;
    cursor: pointer;
  }
  .btnBack{
    border: none;
    border-radius: 5px;
    padding: 5px;
    color: #000;
    font-weight: 500;
    cursor: pointer;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
    .section-sub {
      display: flex;
      align-items: flex-start;
      flex-direction: row-reverse;
      gap: 1rem;
      width: 98%;
      margin-top: 1rem;
      padding: 0;
    }
  }
`;