import styled from 'styled-components';

export const FeedWrapper = styled.div`
    max-width: 768px;
    display:flex;
    flex-direction: column;
    align-items:center;
`;

export const PostItem = styled.div`
    min-height: 320px;
    width: 90%;
    display:flex;
    flex-direction: column;
    align-items:center;
    margin-top:20px;

    & > img {
        border: 10px solid black;
        width: 100%;
    }

    & > div {
        width: 100%;
        display:flex;
        flex-direction: row;
        justify-content:space-evenly;
    }
`;
