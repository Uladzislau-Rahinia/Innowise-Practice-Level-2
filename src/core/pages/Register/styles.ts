import styled from 'styled-components';

export const RegisterWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Rowdies";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: orange;
  & > span {
    color: white;
    font-size: 50px;
    margin-bottom: 50px;
  }
`;

export const RegisterContainer = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  justify-content: space-evenly;
`;
