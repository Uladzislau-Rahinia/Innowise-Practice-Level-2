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
