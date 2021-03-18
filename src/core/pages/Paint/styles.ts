import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
    border: 5px solid black;
`;

export const PaintWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:center;
    min-height: 100vh;
    & > span {
        font-size: 50px;
        font-weight: bolder;
    }
`;

export const ButtonWrapper = styled.div`
  max-width: 768px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin:20px;

  @media(max-width:768px) {
      flex-direction: column;
      align-items: center;
  }

  & > * {
      margin-bottom: 20px;
  }
`;
